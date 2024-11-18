 package kr.or.ddit.components.threaddailyboard.web;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.declaration.web.MediaUtils;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.components.threadboard.service.IThreadBoardService;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.components.threaddailyboard.service.IDailyworkBoardService;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/thdailyboard")
public class DailyworkBoardController {

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IThreadBoardService thBoardService;

	@Inject
	private IDailyworkBoardService DailywokrBoardService;

	@Inject
	private IAtchFileService atchFileService;

	@PostMapping("/list")
	public ResponseEntity<Map<String, Object>> DailyworkBoardList(@RequestBody ThreadBoardVO thboardVO) {
		int thNo = thboardVO.getThNo();

		List<ThreadBoardVO> DailyworkList = DailywokrBoardService.Dailyworklist(thboardVO);
		String thTtl = thBoardService.getThTtl(thNo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("thTtl", thTtl);
		map.put("DailyworkList", DailyworkList);

		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	@ResponseBody 
	@PostMapping("/list2")
	public ResponseEntity<Map<String, Object>> DailyworkBoardList2(@RequestBody PagingVO<ThreadBoardVO> pagingVO) {
		/*
		PagingVO 필수 데이터
		(page=1, 
		rowCnt=5, 
		thNo=238)
		 */
		log.info("DailyworkBoardList2->pagingVO : " + pagingVO);
		
		//DailyworkBoardList2->thNo : 238
		int thNo = pagingVO.getThNo();
		//DailyworkBoardList2->page : 1
		int page = pagingVO.getPage();
		PagingVO<ThreadBoardVO> pagingVO2 = new PagingVO<ThreadBoardVO>();
		
		//전체 글 수
		int total = thBoardService.thboardDailyTotal(pagingVO);
		pagingVO2.setTotal(total);
		pagingVO2.setRowCnt(pagingVO.getRowCnt());
		
		//글 목록
		List<ThreadBoardVO> thBoardVOList = thBoardService.thboardDailyList(pagingVO);
		pagingVO2.setList(thBoardVOList);
		
		String thTtl = thBoardService.getThTtl(thNo);
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 권한 
		int thDailyAuthority = DailywokrBoardService.thDailyAuthority(pagingVO);
		// 권한 정보 추가
		map.put("thDailyAuthority",thDailyAuthority);
		
		map.put("page",page);
		map.put("thTtl", thTtl);
		map.put("thNo", thNo);
		map.put("thboardDailyList", pagingVO2);//total과 rowCnt 값이 들어있는지 꼭 체크!

		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@PostMapping("/insert")
	public ResponseEntity<ThreadBoardVO> DailyworkBoardInsert(ThreadBoardVO thboardVO) {
		// 첨부파일 정보 등록
		AtchFileVO atchFileVO = new AtchFileVO();
		atchFileVO.setAtchFileExpln("thdailyboard");
 
		// 첨부파일 정보를 DB에 저장하고 ID를 받아옴
		atchFileService.thboardInsert(atchFileVO);
		int thatchFileId = atchFileVO.getAtchFileId();
		// 첨부파일 리스트가 있을 경우
		if (thboardVO.getThboardFileList() != null && !thboardVO.getThboardFileList().isEmpty()) {
			for (MultipartFile file : thboardVO.getThboardFileList()) {
				if (!file.isEmpty()) {
					try {
						// 파일 저장
						String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes());

						// AtchFileDetailVO 객체 생성 및 속성 설정
						AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
						atchFileDetailVO.setAtchFileId(thatchFileId); // 받아온 ID 설정
						atchFileDetailVO.setAtchFilePath(savedPath);
						atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
						atchFileDetailVO.setAtchFileSize((Long) file.getSize());
						atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
						atchFileDetailVO.setAtchFileSaveNm(savedPath);

						// DB에 파일 상세 정보 저장
						atchFileService.insertDetail(atchFileDetailVO);
					} catch (Exception e) {
						log.error("저장 오류: {}", e.getMessage());

					}
				}
			}
		}
		thboardVO.setBrdAtchFileId(thatchFileId);

		DailywokrBoardService.thDailyInsert(thboardVO);
		int brdNo = thboardVO.getBrdNo();
		thboardVO = thBoardService.thboardSelect(brdNo); //시퀀스로 brdNo 받았기떄문에 select에 있는 brdNo가지고 select 값을 가져와 쓸수있다..

		return new ResponseEntity<ThreadBoardVO>(thboardVO, HttpStatus.OK);
	}

	// 파일 업로드를 위한 statice
	private String uploadFile(String originalName, byte[] fileData) throws Exception {
		UUID uuid = UUID.randomUUID();
		String thsavedName = uuid.toString() + "_" + originalName;

		// OS에 따라 파일 경로 설정
		String os = System.getProperty("os.name").toLowerCase();
		if (os.contains("mac")) {
			localPath = uploadPathForMac;
		}
		// 폴더 경로를 만들고 경로를 리턴
		String savedPath = UploadFileUtiles.calcPath(localPath);
		File file = new File(localPath + "thdailyboard/" + savedPath);
		if (!file.exists()) {
			file.mkdirs();
		}

		File target = new File(localPath + "thdailyboard/" + savedPath.replaceFirst("/", ""), thsavedName);
		FileCopyUtils.copy(fileData, target);

		String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
		String uploadedFileName = resourcePath + "thdailyboard" + savedPath.replace(File.separatorChar, '/') + "/"
				+ thsavedName;

		// 이미지 파일이면 썸네일 생성
		if (MediaUtils.getMediaType(formatName) != null) {
			UploadFileUtiles.makeThumbnail((localPath + "thdailyboard/"), savedPath, thsavedName);
		}
		return uploadedFileName; // 상대 경로 반환
	}
	// 파일 확장자를 반환하는 메서드
	private String getFileExtension(String filename) {
		return filename.substring(filename.lastIndexOf(".") + 1);
	}
	
	@PostMapping("/select")
	public ResponseEntity<Map<String,Object>> DailyworkBoardSelect(@RequestBody ThreadBoardVO thboardVO){
		int brdNo = thboardVO.getBrdNo();
//		String BrdTtl = thboardVO.getBrdTtl();
//		String BrdConts = thboardVO.getBrdConts();
		int no3 = thboardVO.getSynerhub1();
		int no4 = thboardVO.getSynerhub2();
		
		thboardVO = DailywokrBoardService.thDailySelect(brdNo);
		Map<String,Object>map = new HashMap<String, Object>();
		
		PagingVO<ThreadBoardVO> pagingVO = new PagingVO<ThreadBoardVO>();
		 pagingVO.setSynerhub1(no3);
		 pagingVO.setSynerhub2(no4);
	     int thboardAuthority = thBoardService.thboardAuthority(pagingVO);
		
		
		map.put("thboardAuthority",thboardAuthority);
		map.put("thTtl", thboardVO.getThTtl()); 
		map.put("thboardVO", thboardVO);  
		return new ResponseEntity<Map<String,Object>>(map,HttpStatus.OK);
	}
	
	@PostMapping("/delete")
	public ResponseEntity<String> DailyworkBoardDelete(@RequestBody ThreadBoardVO thboardVO){
		DailywokrBoardService.thDailyDelete(thboardVO);
		return new ResponseEntity<String>("SUCEESS",HttpStatus.OK);
	}
	
	@PostMapping("/update")
	public ResponseEntity<Map<String,Object>> thDailyworkBoardUpdate(@RequestBody ThreadBoardVO thboardVO){
		int brdNo = thboardVO.getBrdNo();
		DailywokrBoardService.thDailyUpdate(thboardVO); 
		
		thboardVO = DailywokrBoardService.thDailySelect(brdNo);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("thboardVO", thboardVO);
		
		return new ResponseEntity<Map<String,Object>>(map,HttpStatus.OK);
	}
	
	@PostMapping("/dailySearch")
	public ResponseEntity<List<ThreadBoardVO>> DailyBoardSearch(@RequestBody ThreadBoardVO thboardVO){
		log.info("DailyBoardSearch 실행!!");
		List<ThreadBoardVO> res = DailywokrBoardService.thDailySearch(thboardVO);
			
		return new ResponseEntity<List<ThreadBoardVO>>(res, HttpStatus.OK);
	}

}
