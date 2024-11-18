package kr.or.ddit.components.channel.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.channel.service.IChannelService;
import kr.or.ddit.components.channel.vo.ChThMemListVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.channelboard.service.IChannelBoardService;
import kr.or.ddit.components.channelboard.service.IChannelNoticeService;
import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.project.service.IProjectService;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/channel")
public class ChannelController {
	
	@Inject
	private IChannelService service; 
		
	@Inject
	private IChannelBoardService chBoardService;
	
	@Inject
	private IChannelNoticeService chNtcService;
	
	@Inject
	private IProjectService pjtService;
	
	@PreAuthorize("hasAnyRole('ROLE_MEMBER')")
	@PostMapping("/list")
	public ResponseEntity<List<ChannelVO>> getChannel(@RequestBody MemberVO member) {
		List<ChannelVO> chList = service.getChList(member);
		
		return new ResponseEntity<List<ChannelVO>>(chList, HttpStatus.OK);
	}
	
	@PostMapping("/select")
	public ResponseEntity<ChannelVO> chSelect(@RequestBody ChannelMemberVO channelMemberVO){
		// project 정보 가져오기
		PagingVO<ProjectPrgrsInfoVO> page = new PagingVO<ProjectPrgrsInfoVO>();
		page.setPage(1);
		page.setChNo(channelMemberVO.getChNo());
		page.setList(pjtService.getChProjectInfo(page));

		// channel 정보 가져오기
		ChannelVO select = service.chSelect(channelMemberVO);
		
		
		// 채널 게시글 목록 가져오기
		ChannelBoardVO chBoard = new ChannelBoardVO();
		chBoard.setChNo(channelMemberVO.getChNo());
		
		
		// 채널 멤버 리스트
		List<ChannelMemberVO> chMemberList = service.chMemberList(select);
		
		// 채널 게시판
		List<ChannelBoardVO> chBoardList2 = chBoardService.chBoardList2(chBoard);
		
		// 채널 공지사항
		List<ChannelBoardVO> chNtcList = chBoardService.chNtcList(chBoard);
		
		// 스레드 목록 가져오기
		List<ChannelThreadVO> threadList = service.getThByChNo(channelMemberVO);
		int total = service.chMemTotal(channelMemberVO);
		
		
		// 게시글 목록을  ChannelVO에 설정
		select.setChannelMemberList(chMemberList);
		select.setChannelBoardList(chBoardList2);
		select.setChannelNoticeList(chNtcList);
		select.setChannelTotal(total);
		select.setThList(threadList);
		select.setPjtInfoList(page.getList());
		select.setPage(page);
		
		ChannelVO temp = service.getCntForDashBoard(channelMemberVO);
		select.setCnts(temp);
		
		return new ResponseEntity<ChannelVO>(select, HttpStatus.OK);
	}
		
	@GetMapping("/update") 
	public ResponseEntity<ChannelVO> chModify(ChannelVO channel) {
		log.info("채널 수정");
		return new ResponseEntity<ChannelVO>(service.chUpdate(channel), HttpStatus.OK);
	}
	
	@PostMapping("/leave/{chNo}/{memNo}/{chMemNo}")
	public ResponseEntity<String> exitChannel(@PathVariable int chNo, @PathVariable int memNo, @PathVariable int chMemNo) {
		
		String result = "";
		
		int exitCh = service.exitChannel(chNo, memNo, chMemNo);
		if(exitCh > 0) {
			result = "채널 나가기 성공.";
		} else {
			result = "나가실수 없습니다.";
		}
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/delete/{chNo}")
	public ResponseEntity<String> chDelete(@PathVariable int chNo) {
	    log.info("채널 삭제 요청: chNo={}", chNo);
	    String result;

	    // CH_DELYN 값을 'Y'로 업데이트
	    int updateResult = service.updateDelyn(chNo);
	    
	    if (updateResult > 0) {
	        result = "Delete"; // 업데이트 성공 시 반환할 메시지
	    } else {
	        result = "Update Fail"; // 업데이트 실패 시 반환할 메시지
	    }

	    return new ResponseEntity<>(result, HttpStatus.OK);
	}

	
	@GetMapping("/memberthreadlist/{no}")
	public ResponseEntity<ChThMemListVO> chMemberList(@PathVariable int no) {
		
		List<ChannelThreadVO> thList = service.getThList(no);
		List<MemberVO> memList = service.getChMemberList(no);
		String memRoleList = service.getMemRoleList(no);
		String memMngrRoleList = service.getMemMngrRoleList(no);
		
		ChThMemListVO chThMemList = new ChThMemListVO(thList, memList, memRoleList, memMngrRoleList);
		
		return new ResponseEntity<ChThMemListVO>(chThMemList, HttpStatus.OK);
	}
	
	@GetMapping("/chdata/{no}")
	public ResponseEntity<Map<String, String>> getChCreator(@PathVariable int no) {
		Map<String, String> data = new HashMap<String, String>();
		
		String num = String.valueOf(service.getChCreator(no));
		String role = service.getChRole(no);
		
		data.put("num", num);
		data.put("role", role);
		
		return new ResponseEntity<Map<String, String>>(data, HttpStatus.OK);
	}
	
	@PostMapping("/updatechrole")
	public ResponseEntity<String> updateChRole(@RequestBody ChannelVO channelVO) {
		String res = "";
		
		if(service.updateChRole(channelVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	@PostMapping("updatechmemrolr")
	public ResponseEntity<String> updateChMemRole(@RequestBody ChannelMemberVO cmVO) {
		String res = "";
		
		if(service.updateChMemRole(cmVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	@PostMapping("updatechrolelist")
	public ResponseEntity<String> updateChRoleList(@RequestBody ChannelVO channelVO) {
		String res = "";
		
		if(service.updateChRoleList(channelVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	@PostMapping("updatechmngrrolelist")
	public ResponseEntity<String> updateChMngrRoleList(@RequestBody ChannelVO channelVO) {
		String res = "";
		
		if(service.updateChMngrRoleList(channelVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	
}
