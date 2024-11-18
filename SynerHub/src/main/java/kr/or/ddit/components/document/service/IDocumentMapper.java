package kr.or.ddit.components.document.service;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.document.vo.AplnVO;
import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.project.vo.ProjectDetailVO;
import kr.or.ddit.vo.PagingVO;

public interface IDocumentMapper {

	public int getTotal(PagingVO<DocumentVO> page);

	public List<DocumentVO> getDocList(PagingVO<DocumentVO> page);
	
	public int getDocCurrentTotal(PagingVO<DocumentVO> page);

	public List<DocumentVO> getDocCurrentList(PagingVO<DocumentVO> page);

	public int getDocApprovalTotal(PagingVO<DocumentVO> page);

	public List<DocumentVO> getDocApprovalList(PagingVO<DocumentVO> page);

	public DocumentVO getDocDetail(int no);

	public void aplnInsert(AplnVO aplnVO);

	public void docInsert(DocumentVO docVO);

	public List<ChannelMemberVO> getAutographer(ChannelThreadVO ctVO);

	public List<AtchFileDetailVO> getDocFileList(int docNo);

	public int cancleDocuemt(int no);

	public int returnDocument(int no);

	public int getDocTotalByStat(PagingVO<DocumentVO> pagingVO);

	public List<DocumentVO> getDocListByStat(PagingVO<DocumentVO> pagingVO);

	public void docUpdate(DocumentVO docVO);

	public void aplnUpdate(AplnVO aplnVO);

	public int docApprove(AplnVO aplnVO);

	public void aplnLnUpdate(AplnVO aplnVO);

	public void cancleApln(int no);

	public int aplnDelete(AplnVO aplnVO);

	public int docReject(DocumentVO docVO);

	public int getDocCompleteTotal(PagingVO<DocumentVO> page);

	public List<DocumentVO> getDocCompleteList(PagingVO<DocumentVO> page);

	public int getDocOnGointTotal(PagingVO<DocumentVO> page);

	public List<DocumentVO> getDocOnGointList(PagingVO<DocumentVO> page);

	public ChannelMemberVO getBoss(ChannelThreadVO ctVO);

}
