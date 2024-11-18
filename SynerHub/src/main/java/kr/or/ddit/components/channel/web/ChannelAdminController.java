package kr.or.ddit.components.channel.web;


import java.util.List;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.components.channel.service.IChannelService;
import kr.or.ddit.components.channel.vo.ChannelStatVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.vo.PaginationInfoVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class ChannelAdminController {
	
	@Inject
	private IChannelService service;
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping("/channel")
	public String chManage(
	        @RequestParam(name = "currentPage", required = false, defaultValue = "1") int currentPage,
	        @RequestParam(name = "searchType", required = false, defaultValue = "title") String searchType,
	        @RequestParam(name = "searchWord", required = false) String searchWord,
	        Model model) {
	    log.info("채널 관리 페이지 실행!");

	    // PaginationInfoVO 객체 생성 (페이지당 10개, 페이지 링크 5개)
	    PaginationInfoVO<ChannelVO> pagingVO = new PaginationInfoVO<>(10, 5);
	    
	    // 검색어가 존재할 경우
	    if (StringUtils.isNotBlank(searchWord)) {
	        pagingVO.setSearchWord(searchWord);
	        pagingVO.setSearchType(searchType);
	        model.addAttribute("searchWord", searchWord);
	        model.addAttribute("searchType", searchType);
	    }
	    
	 
	    // 현재 페이지 설정
	    pagingVO.setCurrentPage(currentPage);
	    log.info("currentPage : {}", currentPage);
	    
	    // 총 레코드 수를 가져오는 서비스 호출
	    int totalRecord = service.chCount(pagingVO);
	    pagingVO.setTotalRecord(totalRecord);
	    
	    // 채널 리스트 가져오기
	    List<ChannelVO> chList = service.channelList(pagingVO);
	    
	    for (ChannelVO channel : chList) {
	        if (channel.getPlanNm() == null) {
	            channel.setPlanMax(50); // 멤버십이 없을 경우 인원수를 50으로 설정
	        }
	    }
	    
	    pagingVO.setDataList(chList);
	    
	    model.addAttribute("pagingVO", pagingVO);
	    model.addAttribute("chList", chList);
	    
	    return "admin/channel";
	}

	@ResponseBody
	@GetMapping("/channelStats")
	public ResponseEntity<List<ChannelVO>> getChannelStats() {
	    try {
	        // 채널 통계 데이터 가져오기
	        List<ChannelVO> stats = service.getChannelStats();
	        return ResponseEntity.ok(stats);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
}
