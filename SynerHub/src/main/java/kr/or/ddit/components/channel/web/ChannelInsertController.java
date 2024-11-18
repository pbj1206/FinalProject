package kr.or.ddit.components.channel.web;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.ddit.components.channel.service.IChannelService;
import kr.or.ddit.components.channel.vo.ChInviteVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.declaration.web.MediaUtils;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/channel")
public class ChannelInsertController {

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IChannelService service;

	@GetMapping(value = "/form")
	public String chInsertForm() {
		log.info("chInsertForm 실행");
		return "channel/form";
	}

	@PostMapping("/invitealarm")
	public ResponseEntity<List<ChannelVO>> InviteAlarm(@RequestBody ChannelVO channelVO) {
		log.info("=========invitealram=-==============");
		List<ChannelVO> InviteChk = service.checkInvite(channelVO.getMemNo());
		log.info("invitechk  : " + InviteChk);
		return new ResponseEntity<List<ChannelVO>>(InviteChk, HttpStatus.OK);
	}

	@RequestMapping(value = "/acceptInvite", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<String> acceptInvite(@ModelAttribute ChannelVO channelVO) throws Exception {
		
		MultipartFile file = channelVO.getChMemProfile();
		if (file != null && !file.isEmpty()) {
			log.info("originalFileName : {}", file.getOriginalFilename());
			log.info("size : {}", file.getSize());
			log.info("contentType : {}", file.getContentType());

			// 파일 업로드 진행
			String createdFileName = uploadLmg(file.getOriginalFilename(), file.getBytes());
			channelVO.setChMemLmg(createdFileName); // 파일 경로 설정
		}
		log.info("chMEMlmg : {}", channelVO);
		service.acceptInvite(channelVO);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@PostMapping("/denyInvite")
	public ResponseEntity<String> denyInvite(@RequestBody ChannelVO channelVO) {
		service.denyInvite(channelVO);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@RequestMapping(value = "/insert", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<String> chInsert(@ModelAttribute ChannelVO channelVO, @RequestParam String inviteList,
			@RequestParam String threadNameList, @RequestParam String threadColorList) throws Exception {
		log.info("chInsert 실행.");

		ObjectMapper objectMapper = new ObjectMapper();
		List<String> inviteMember = objectMapper.readValue(inviteList, new TypeReference<List<String>>() {
		});
		List<String> threadNm = objectMapper.readValue(threadNameList, new TypeReference<List<String>>() {
		});
		List<String> threadClr = objectMapper.readValue(threadColorList, new TypeReference<List<String>>() {
		});

		log.info("channelVO : " + channelVO);
		log.info("inviteList : " + inviteMember);
		log.info("threadNameList : " + threadNm);

		log.info("chInsert" + channelVO);

		// 채널 로고 파일 업로드
		MultipartFile file = channelVO.getImgFile();
		if (file != null && !file.isEmpty()) {
			log.info("originalFileName : {}", file.getOriginalFilename());
			log.info("size : {}", file.getSize());
			log.info("contentType : {}", file.getContentType());

			// 파일 업로드 진행
			String createdFileName = uploadLmg(file.getOriginalFilename(), file.getBytes());
			channelVO.setChLmg(createdFileName); // 파일 경로 설정
		}

		String ranChCd = ranChannelCode();
		channelVO.setChCd(ranChCd);

		// 채널 등록 서비스 호출
		int cnt = service.chInsert(channelVO);
		// 스레드 처리
		for (int i = 0; i < threadNm.size(); i++) {
			ChannelThreadVO threadVO = new ChannelThreadVO();
			threadVO.setThTtl(threadNm.get(i));
			threadVO.setChNo(channelVO.getChNo());
			threadVO.setThClr(threadClr.get(i));
			service.addThToCh(threadVO);
		}

		// 스레드 색깔 처리
//		for(String threadColor : threadClr) {
//			ChannelThreadVO threadVO = new ChannelThreadVO();
//			threadVO.setThClr(threadColor);
//			service.addThToCh(threadVO);
//		}

		String chNo = service.getChNo() + "";

		HttpStatus status = HttpStatus.BAD_REQUEST;

		if (cnt > 0) {
			log.info("chCd : " + ranChCd);
			status = HttpStatus.OK;
		}

		// 멤버 초대 실행
		if(inviteMember.size() > 0) {
			for (String memNAme : inviteMember) {
				ChInviteVO inviteVo = new ChInviteVO();
				MemberVO memNm = service.SearchMemId(memNAme);
				inviteVo.setMemNo(memNm.getMemNo());
				inviteVo.setChNo(channelVO.getChNo());
				service.inviteMemToCH(inviteVo);
			}
		}
		
		return new ResponseEntity<>(String.valueOf(chNo), status);
	}

	private String ranChannelCode() {

		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 사용할 문자 집합
		StringBuilder channelCode;
		String newCode;

		Random random = new Random();

		do {
			channelCode = new StringBuilder("#"); // 앞에 # 추가

			for (int i = 0; i < 9; i++) { // 9자리 코드 생성 (총 10자리 - # 포함)
				int index = random.nextInt(characters.length());
				channelCode.append(characters.charAt(index));
			}
			newCode = channelCode.toString();
		} while (service.isChannelCodeExists(newCode)); // 중복 체크

		return newCode;
	}

	private String uploadLmg(String originalFilename, byte[] bytes) throws Exception {
		log.info("channel logo..");
		UUID uuid = UUID.randomUUID(); // UUID로 파일명 생성

		// UUID_원본파일명
		String createdFileName = uuid.toString() + "_" + originalFilename;

		String os = System.getProperty("os.name").toLowerCase();
		if (os.contains("mac")) {
			localPath = "/Users/upload/temp/";
		}

		localPath = localPath + "channelLmg/";
		resourcePath = resourcePath + "channelLmg/";

		// localPath 활용
		File file = new File(localPath);
		if (!file.exists()) {
			file.mkdirs();
		}
		File target = new File(localPath, createdFileName); // 파일 업로드 준비
		FileCopyUtils.copy(bytes, target); // 파일 복사
		return resourcePath + createdFileName;
	}

	@RequestMapping(value = "/channelInsertMember", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<Integer> channelInsertMember(@ModelAttribute ChannelVO channelVO,
			@RequestParam String channelInviteList) throws Exception {
		log.info("===========channelInsertMe==================");
		log.info("=========invitelist : " + channelInviteList);
		ObjectMapper objectMapper = new ObjectMapper();
		List<String> channelInviteMember = objectMapper.readValue(channelInviteList, new TypeReference<List<String>>() {
		});
		log.info("=========invitelist : " + channelInviteMember);
		int cnt = 0;
		for (String memNAme : channelInviteMember) {
			ChInviteVO inviteVo = new ChInviteVO();
			MemberVO memNm = service.SearchMemId(memNAme);
			memNm.setChNo(channelVO.getChNo());
			cnt = service.channelInsertCheck(memNm);
			
			if (cnt == 1) {
				cnt = 1;
			} else {
				cnt = 0;
				inviteVo.setMemNo(memNm.getMemNo());
				inviteVo.setChNo(channelVO.getChNo());
				service.inviteMemToCH(inviteVo);
			}
		}
		return new ResponseEntity<Integer>(cnt, HttpStatus.OK);
	}
}
