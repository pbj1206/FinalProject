package kr.or.ddit.components.admin.customerService.qna;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.board.qna.service.IQnaService;
import kr.or.ddit.components.board.qna.vo.QnaStatsVO;
import kr.or.ddit.components.board.qna.vo.QnaVO;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.vo.PaginationInfoVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminQnaController {

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;
	
	@Inject
	private IQnaService qnaService;
	
	@Inject
	private IAtchFileService atchFileService;
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/qna")
    public String qna(
        @RequestParam(name="currentPage", required = false, defaultValue = "1") int currentPage,
        @RequestParam(name="searchType", required = false, defaultValue = "title") String searchType,
        @RequestParam(name="searchWord", required = false) String searchWord,
        Model model) {
        
        // 페이징 정보 객체 생성
        PaginationInfoVO<QnaVO> pagingVO = new PaginationInfoVO<>(10, 5);

        // 검색 기능 추가
        if (StringUtils.isNotBlank(searchWord)) {
            pagingVO.setSearchWord(searchWord);
            pagingVO.setSearchType(searchType);
            model.addAttribute("searchWord", searchWord);
            model.addAttribute("searchType", searchType);
        }

        // 현재 페이지 설정
        pagingVO.setCurrentPage(currentPage);
        
        // 총 게시글 수를 이용하여 총 페이지 수를 결정
        int totalRecord = qnaService.selectQnaCount(pagingVO); // QnA 총 개수 조회
        pagingVO.setTotalRecord(totalRecord);

        // QnA 목록 가져오기
        List<QnaVO> list = qnaService.selectQnaList(pagingVO);
        pagingVO.setDataList(list);
        
        // 모델에 추가
        model.addAttribute("pagingVO", pagingVO);
        model.addAttribute("list", list);
        
        // 답변 대기 중인 게시글 수 카운트
        List<QnaVO> unAnsweredQnaList = qnaService.getUnansweredCount();
        int unAnsweredCount = unAnsweredQnaList.size();

        // 모델에 추가
        model.addAttribute("qnaList", unAnsweredQnaList);
        model.addAttribute("unAnsweredCount", unAnsweredCount);
        
        // 총 게시글 수 가져오기
        int totalPosts = qnaService.getTotalPosts(); // 총 게시글 수 가져오기
        model.addAttribute("totalPosts", totalPosts); // 모델에 추가

        return "admin/qna";
    }

	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/qnaForm")
	public String qnaInsertForm(HttpServletRequest resq, Model model) {
		int no = Integer.parseInt(resq.getParameter("qnaNo"));
		QnaVO qnaVo = qnaService.selectQna(no);
		model.addAttribute("res", qnaVo);
		return "admin/qnaInsert";
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/qnaInsert")
	public String insertQna(QnaVO qnaVO, Model model) {

		int cnt = qnaService.adminInsertQna(qnaVO); // 서비스 호출

		Map<String, Object> response = new HashMap<>();
		response.put("success", cnt > 0);
		response.put("qnaData", qnaVO); // QnaVO 데이터 추가

		HttpStatus status = (cnt > 0) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		int no = qnaVO.getQnaNo();
		QnaVO qnaVo = qnaService.selectQna(no);
		model.addAttribute("res", qnaVo);

		return "admin/qnaInsert"; // Map<String, Object> 반환
	}

	@PostMapping("/qnaUpdate")
	public String qnaUpdate(RedirectAttributes ra, 
							HttpServletRequest req, 
							QnaVO qnaVO, Model model) {
		String goPage = "";
		ServiceResult result = qnaService.updateQna(req, qnaVO);
		int no = qnaVO.getQnaNo();
		QnaVO qnaVo = qnaService.selectQna(no);
		model.addAttribute("res", qnaVo);
		if (result.equals(ServiceResult.OK)) { // 수정 성공
			goPage = "admin/qnaInsert";
		} else { // 수정 실패
			model.addAttribute("qnaVO", qnaVO);
			model.addAttribute("status", "u");
			goPage = "admin/qnaInsert";
		}

		return goPage;
	}

	@PostMapping("/qnaDelete")
	public String qnaDelete(RedirectAttributes ra, String selectedQnaNos, Model model) {
		String goPage = "";

// 선택된 qnaNos를 배열로 변환
		String[] qnaNoArray = selectedQnaNos.split(",");
		List<Integer> qnaNos = new ArrayList<>();

		for (String qnaNoStr : qnaNoArray) {
			try {
				int qnaNo = Integer.parseInt(qnaNoStr.trim());
				qnaNos.add(qnaNo);
			} catch (NumberFormatException e) {
				ra.addFlashAttribute("message", "잘못된 요청입니다.");
				return "redirect:/admin/qna";
			}
		}

		int totalDeleted = qnaService.deleteQna(qnaNos);

		if (totalDeleted > 0) {
			ra.addFlashAttribute("message", "삭제가 완료되었습니다!");
		} else {
			ra.addFlashAttribute("message", "서버에러, 다시 시도해주세요!");
		}
		goPage = "redirect:/admin/qna";

		return goPage;
	}
	
	
	// 차트
	@GetMapping("/qnaStats")
	public String qnaStats(Model model) {
	    List<QnaStatsVO> list = qnaService.qnaStats();
	    int totalPosts = qnaService.getTotalPosts(); // 총 게시글 수 가져오기

	    model.addAttribute("qnaStats", list);
	    model.addAttribute("totalPosts", totalPosts); // 총 게시글 수 모델에 추가
	    return "admin/qna"; 
	}
	
	
	@GetMapping("/api/data/{month}")
	@ResponseBody
	public ResponseEntity<List<QnaStatsVO>> getQnaStatsData(@PathVariable int month) {
	    try {
	        List<QnaStatsVO> stats = qnaService.qnaStatsPerMonth(month);
	        return ResponseEntity.ok(stats);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/qna/unanswered")
	public String qnaUnA(
			@RequestParam(name="currentPage", required = false, defaultValue = "1") int currentPage,
	        @RequestParam(name="searchType", required = false, defaultValue = "title") String searchType,
	        @RequestParam(name="searchWord", required = false) String searchWord,
	        Model model) {

	    // 페이징 정보 객체 생성
	    PaginationInfoVO<QnaVO> pagingVO = new PaginationInfoVO<>(10, 5);

	    // 검색 기능 추가
	    if (StringUtils.isNotBlank(searchWord)) {
	        pagingVO.setSearchWord(searchWord);
	        pagingVO.setSearchType(searchType);
	        model.addAttribute("searchWord", searchWord);
	        model.addAttribute("searchType", searchType);
	    }

	    // 현재 페이지 설정
	    pagingVO.setCurrentPage(currentPage);
	    
	    // 총 게시글 수를 이용하여 총 페이지 수를 결정
	    int totalRecord = qnaService.selectUnAQnaCount(pagingVO); // QnA 총 개수 조회
	    pagingVO.setTotalRecord(totalRecord);

	    // QnA 목록 가져오기
	    List<QnaVO> list = qnaService.selectUnAQnaList(pagingVO);
	    pagingVO.setDataList(list);
	    
	    // 모델에 추가
	    model.addAttribute("pagingVO", pagingVO);
	    model.addAttribute("list", list);
	    
	    // 총 게시글 수 가져오기
        int totalPosts = qnaService.getTotalPosts(); // 총 게시글 수 가져오기
        model.addAttribute("totalPosts", totalPosts); // 모델에 추가
	    
	    return "admin/qnaUnA";
	}



}
