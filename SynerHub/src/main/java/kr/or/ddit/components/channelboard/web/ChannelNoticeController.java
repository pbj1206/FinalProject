package kr.or.ddit.components.channelboard.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.channelboard.service.IChannelNoticeService;
import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/chNotice")
public class ChannelNoticeController {
	
	@Inject
	private IChannelNoticeService service;
	
	@PostMapping("/chNlist")
	public ResponseEntity<Map<String, Object>> chNoticeList(@RequestBody PagingVO<ChannelBoardVO> pagingVO){
		
		log.info("채널 공지사항 실행");
		int chNo = pagingVO.getChNo();
		
		int page = pagingVO.getPage();
		
		PagingVO<ChannelBoardVO> pagingVO2 = new PagingVO<>();
		
		int total = service.chNtcTotal(pagingVO);
		pagingVO2.setTotal(total);
		pagingVO2.setRowCnt(pagingVO.getRowCnt());
		
		List<ChannelBoardVO> chNoticeList = service.chNtcList(pagingVO);
		pagingVO2.setList(chNoticeList);
		log.info("channelNotice 리스트 : " , chNoticeList);
		String chTtl = service.getChTtl(chNo);
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("page", page);
		map.put("chTtl", chTtl);
		map.put("chNo", chNo);
		map.put("chNoticeList", pagingVO2);
		
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	

	@PostMapping("/chNinsert")
	public ResponseEntity<ChannelBoardVO> thNtcInsert(ChannelBoardVO chBoard){
		
		log.info("채널 공지사항 등록 실행");
		service.chNtcInsert(chBoard);
		
		int brdNo = chBoard.getBrdNo();
		
		return new ResponseEntity<ChannelBoardVO>(chBoard, HttpStatus.OK);
	}
   
   
   // 채널 공지사항 상세보기
   @PostMapping("/chNselect")
   public ResponseEntity<Map<String, Object>> chNtcSelect(@RequestBody ThreadBoardVO chBoard) {
      int brdNo = chBoard.getBrdNo();

      String BrdTtl = chBoard.getBrdTtl();
      String BrdConts = chBoard.getBrdConts();

      chBoard = service.chNtcSelect(brdNo);

      Map<String, Object> map = new HashMap<String, Object>();
      map.put("chNotice", chBoard);
      
      return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);  
   }
   
   @PostMapping("/chNDelete")
   public ResponseEntity<String> chNDelete(@RequestBody ChannelBoardVO chBoard) {
	   log.info("공지사항 삭제 : " + chBoard.getBrdNo());
	   service.deleteChNtc(chBoard.getBrdNo());
	   return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);
   }
   
   @PostMapping("/chNUpdate")
   public ResponseEntity<Map<String, Object>> chBoardUpdate(@RequestBody ChannelBoardVO chBoard) {
		log.info("채널 게시판 수정!");
		
		int brdNo = chBoard.getBrdNo();
		service.chNtcUpdate(chBoard);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("chNotice", chBoard);
				
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
   
}
