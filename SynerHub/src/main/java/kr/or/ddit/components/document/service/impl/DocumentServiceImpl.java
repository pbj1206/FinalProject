package kr.or.ddit.components.document.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.autograph.service.impl.IAutographMapper;
import kr.or.ddit.components.autograph.vo.AutographVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.document.service.IDocumentMapper;
import kr.or.ddit.components.document.service.IDocumentService;
import kr.or.ddit.components.document.vo.AplnVO;
import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.project.vo.ProjectDetailVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Primary
@Service
public class DocumentServiceImpl implements IDocumentService{

	@Inject
	private IDocumentMapper mapper;
	
	@Inject
	private IAutographMapper atgrphMapper;
	
	@Override
	public int getTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocOnGointTotal(page);
	}

	@Override
	public List<DocumentVO> getDocList(PagingVO<DocumentVO> page) {
		return mapper.getDocOnGointList(page);
	}

	@Override
	public int getDocCurrentTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocCurrentTotal(page);
	}

	@Override
	public List<DocumentVO> getDocCurrentList(PagingVO<DocumentVO> page) {
		return mapper.getDocCurrentList(page);
	}

	@Override
	public int getDocApprovalTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocApprovalTotal(page);
	}

	@Override
	public List<DocumentVO> getDocApprovalList(PagingVO<DocumentVO> page) {
		return mapper.getDocApprovalList(page);
	}

	@Override
	public DocumentVO getDocDetail(int no) {
		return mapper.getDocDetail(no);
	}

	@Override
	public void docInsert(DocumentVO docVO) {
		mapper.docInsert(docVO);
		int docNo = docVO.getDocNo();
		int memNo = docVO.getMemNo();
		List<AplnVO> list = docVO.getAplnList();
		int order = 1;
		for (AplnVO aplnVO : list) {
			aplnVO.setDocNo(docNo);
			if(memNo == aplnVO.getAplnMemNo()) {
				aplnVO.setAplnStat("APST01");
			} else {
				aplnVO.setAplnStat("APST00");
			}
			aplnVO.setAplnOrder(order++);
			mapper.aplnInsert(aplnVO);
		}
	}

	@Override
	public List<ChannelMemberVO> getAutographer(ChannelThreadVO ctVO) {
		List<ChannelMemberVO> list = mapper.getAutographer(ctVO);
		ChannelMemberVO boss = mapper.getBoss(ctVO);
		boolean isBossExist = false;
		AutographVO atVO = new AutographVO();
		atVO.setMemNo(ctVO.getMemNo());
		for (ChannelMemberVO cm : list) {
			if(cm.getMemNo() == boss.getMemNo()) {
				isBossExist = true;
			}
			
			if(cm.getChMemNo() == ctVO.getMemNo()) {
				cm.setMyAtgrphList(atgrphMapper.getAutograph(atVO));
			}
		}
		
		if(!isBossExist) {
			list.add(0, boss);
		}
		return list;
	}

	@Override
	public List<AtchFileDetailVO> getDocFileList(int docNo) {
		return mapper.getDocFileList(docNo);
	}

	@Override
	public int cancleDocument(int no) {
		mapper.cancleApln(no);
		return mapper.cancleDocuemt(no);
	}

	@Override
	public int returnDocument(int no) {
		mapper.aplnDelete(new AplnVO(no));
		return mapper.returnDocument(no);
	}

	@Override
	public int getDocTotalByStat(PagingVO<DocumentVO> pagingVO) {
		return mapper.getDocTotalByStat(pagingVO);
	}

	@Override
	public List<DocumentVO> getDocListByStat(PagingVO<DocumentVO> pagingVO) {
		return mapper.getDocListByStat(pagingVO);
	}

	@Override
	public void docUpdate(DocumentVO docVO) {
		mapper.docUpdate(docVO);
		int docNo = docVO.getDocNo();
		int memNo = docVO.getMemNo();
		int order = 1;
		List<AplnVO> list = docVO.getAplnList();
		for (AplnVO aplnVO : list) {
			aplnVO.setDocNo(docNo);
			aplnVO.setAplnOrder(order++);
			if(memNo == aplnVO.getAplnMemNo()) {
				aplnVO.setAplnStat("APST01");
			} else {
				aplnVO.setAplnStat("APST00");
			}
			mapper.aplnLnUpdate(aplnVO);
		}
	}

	@Override
	public int docApprove(AplnVO aplnVO) {
		return mapper.docApprove(aplnVO);
	}

	@Override
	public int docReject(DocumentVO docVO) {
		
		AplnVO aplnVO = docVO.getAplnList().get(0);
		
		if(mapper.docReject(docVO) > 0) {
			return mapper.aplnDelete(aplnVO);
		} else {
			return -1;
		}
	}

	@Override
	public Map<String, PagingVO<DocumentVO>> getMainDocList(PagingVO<DocumentVO> page) {
		
		PagingVO<DocumentVO> p1 = new PagingVO<DocumentVO>();
		PagingVO<DocumentVO> p2 = new PagingVO<DocumentVO>();
		PagingVO<DocumentVO> p3 = new PagingVO<DocumentVO>();
		PagingVO<DocumentVO> p4 = new PagingVO<DocumentVO>();
		
		page.setPage(1);
		page.setRowCnt(5);
		page.setStat("DCST00");
		p1.setTotal(mapper.getDocOnGointTotal(page));
		p1.setList(mapper.getDocOnGointList(page));
		page.setStat("DCST00");
		p2.setTotal(mapper.getDocApprovalTotal(page));
		p2.setList(mapper.getDocApprovalList(page));
		p2.setStat("toApprove");
		page.setStat("DCST02");
		p3.setTotal(mapper.getDocTotalByStat(page));
		p3.setList(mapper.getDocListByStat(page));
		page.setStat("DCST04");
		p4.setTotal(mapper.getDocTotalByStat(page));
		p4.setList(mapper.getDocListByStat(page));
		
		Map<String, PagingVO<DocumentVO>> map = new HashMap<String, PagingVO<DocumentVO>>();
		
		map.put("onGoingList", p1);
		map.put("toApproveList", p2);
		map.put("returnedList", p3);
		map.put("rejectedList", p4);
		
		return map;
	}

	@Override
	public int getDocCompleteTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocCompleteTotal(page);
	}

	@Override
	public List<DocumentVO> getDocCompleteList(PagingVO<DocumentVO> page) {
		return mapper.getDocCompleteList(page);
	}


}

