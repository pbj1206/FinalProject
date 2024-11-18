package kr.or.ddit.components.notice.web;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.notice.service.INoticeService;
import kr.or.ddit.components.notice.vo.NoticeVO;
import kr.or.ddit.vo.PaginationInfoVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class NoticeAdminController {
	
	@Inject
	private INoticeService service;
		
	@GetMapping("/notice")
	public String chList(
			@RequestParam(name="page", required = false, defaultValue = "1") int currentPage,
			@RequestParam(required = false, defaultValue = "title") String searchType,
			@RequestParam(required = false) String searchWord,
			Model model) {
		
		log.info("admin 공지사항 목록 실행!");
		
		PaginationInfoVO<NoticeVO> paging = new PaginationInfoVO<NoticeVO>(10, 5);
		
		if(StringUtils.isNotBlank(searchWord)) {
			paging.setSearchWord(searchWord);
			paging.setSearchType(searchType);
			model.addAttribute("searchWord", searchWord);
			model.addAttribute("searchType", searchType);
		}
		
		List<NoticeVO> ntcList = service.getNoticeList();
		
		List<String> ntcWtrDisplayList = ntcList.stream()
			.map(ntc->ntc.getNtcWtr() == 0 ? "SynerHub 관리자" : "Unknown")
			.collect(Collectors.toList());
		
		
		// 공지사항 리스트 가져오기
		model.addAttribute("ntcWtrDisplayList", ntcWtrDisplayList);
		paging.setDataList(ntcList);
		model.addAttribute("paging", paging);
		
		return "admin/notice"; // JSP 파일 경로
	}
	

	@GetMapping("/noticeUpdate")
	public String ntcUpdateForm(@RequestParam(required = false) Integer ntcNo, Model model) {
		
		NoticeVO notice = service.detailNotice(ntcNo);
		model.addAttribute("notice", notice);
		model.addAttribute("status", "u");
		return "admin/noticeForm";
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/noticeUpdate")
	public String ntcUpdate(
		HttpServletRequest req, RedirectAttributes ra,
		NoticeVO notice, Model model) {
		String result = "";
		ServiceResult res = service.ntcUpdate(req, notice);
		if(res.equals(ServiceResult.OK)) {
			ra.addFlashAttribute("msg", "수정완료");
			result = "redirect:/admin/noticeDetail?ntcNo=" + notice.getNtcNo();
		} else {
			model.addAttribute("msg", "수정 실패");
			model.addAttribute("notice", notice);
			model.addAttribute("status", "u");
			result = "admin/noticeForm";
		}
		
		return result;
		
	}
	
	
	@GetMapping("/noticeDetail")
	public String ntcDetail(@RequestParam(required = false) Integer ntcNo, Model model) {
			
		NoticeVO notice = service.detailNotice(ntcNo);
		model.addAttribute("notice", notice);
		return "admin/noticeDetail";
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/noticeDelete")
	public String ntcDelete(@RequestParam(required = false) Integer ntcNo, RedirectAttributes ra, Model model, HttpServletRequest req) {
	    
//		if (ntcNo == null) {
//	        ra.addFlashAttribute("msg", "삭제할 공지사항 번호가 없습니다.");
//	        return "redirect:/admin/notice"; // 적절한 경로로 리다이렉트
//	    }
		
		String result = "";
		ServiceResult res = service.deleteNotice(req, ntcNo);
		
		if(res.equals(ServiceResult.OK)) {
			ra.addFlashAttribute("msg", "삭제 완료");
			result = "redirect:/admin/notice";
		} else {
			ra.addFlashAttribute("msg", "삭제 실패");
			result = "redirect:/admin/noticeDetail?ntcNo=" + ntcNo;
		}
		
		return result;
		
	}
	
}
