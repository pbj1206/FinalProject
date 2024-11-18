package kr.or.ddit.components.board.qna.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.board.qna.service.IQnaMapper;
import kr.or.ddit.components.board.qna.service.IQnaService;
import kr.or.ddit.components.board.qna.vo.QnaStatsVO;
import kr.or.ddit.components.board.qna.vo.QnaVO;
import kr.or.ddit.vo.PaginationInfoVO;
import kr.or.ddit.vo.PagingVO;

@Service
@Primary
public class QnaServiceImpl implements IQnaService {

	@Inject
    private IQnaMapper qnaMapper;

    @Override
    public List<QnaVO> qnaList(QnaVO qnaVO) {
        return qnaMapper.qnaList(qnaVO);
    }

	@Override
	public QnaVO selectQna(int qnaNo) {
		return qnaMapper.selectQna(qnaNo);
	}

	@Override
	public int deleteQna(int qnaNo) {
		return qnaMapper.deleteQna(qnaNo);
	}

	@Override
	public int modifyQna(QnaVO qnaVO) {
		return qnaMapper.modifyQna(qnaVO);
	}

	@Override
	public void insertQna(QnaVO qnaVO) {
		qnaMapper.insertQna(qnaVO);
	}

	
	
	
	// 여기서 부터 관리자용
	@Override
	public int adminInsertQna(QnaVO qnaVO) {
		return qnaMapper.adminInsertQna(qnaVO);
	}

	@Override
	public int deleteQna(List<Integer> qnaNos) {
	    int totalDeleted = 0; // 삭제된 개수 카운트

	    // 각 qnaNo에 대해 삭제 작업 수행
	    for (int qnaNo : qnaNos) {
	        totalDeleted += qnaMapper.deleteQna(qnaNo); // 매퍼를 통해 삭제
	    }

	    return totalDeleted; // 삭제된 총 개수 반환
	}

	@Override
	public ServiceResult updateQna(HttpServletRequest req, QnaVO qnaVO) {
	    ServiceResult result = null;
	    int status = qnaMapper.updateQna(qnaVO); // QnaVO를 수정하는 메서드 호출

	    if (status > 0) {  // 수정 성공
	        result = ServiceResult.OK;
	    } else {  // 수정 실패
	        result = ServiceResult.FAILED;
	    }

	    return result;
	}

	@Override
	public int selectQnaCount(PaginationInfoVO<QnaVO> pagingVO) {
		return qnaMapper.selectQnaCount(pagingVO);
	}

	@Override
	public List<QnaVO> selectQnaList(PaginationInfoVO<QnaVO> pagingVO) {
		return qnaMapper.selectQnaList(pagingVO);
	}

	@Override
	public List<QnaStatsVO> qnaStats() {
		return qnaMapper.qnaStats();
	}

	@Override
	public List<QnaStatsVO> qnaStatsPerMonth(int month) {
		return qnaMapper.qnaStatsPerMonth(month);
	}

	@Override
	public int getTotalPosts() {
		return qnaMapper.getTotalPosts();
	}

	public List<QnaVO> getUnansweredCount() {
	    return qnaMapper.getUnansweredCount();
	}

	@Override
	public List<QnaVO> selectUnAQnaList(PaginationInfoVO<QnaVO> pagingVO) {
		return qnaMapper.selectUnAQnaList(pagingVO);
	}

	@Override
	public int selectUnAQnaCount(PaginationInfoVO<QnaVO> pagingVO) {
		return qnaMapper.selectUnAQnaCount(pagingVO);
	}

	// 여기서 부터 페이징
	@Override
	public int qnaTotal(PagingVO<QnaVO> pagingVO) {
		return qnaMapper.qnaTotal(pagingVO);
	}

	@Override
	public List<QnaVO> qnaList2(PagingVO<QnaVO> pagingVO) {
		return qnaMapper.qnaList2(pagingVO);
	}
	
}
