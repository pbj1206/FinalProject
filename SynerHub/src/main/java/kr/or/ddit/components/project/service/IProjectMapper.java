package kr.or.ddit.components.project.service;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.project.vo.ProjectDetailSubWrkVO;
import kr.or.ddit.components.project.vo.ProjectDetailVO;
import kr.or.ddit.components.project.vo.ProjectGroupMemberVO;
import kr.or.ddit.components.project.vo.ProjectGroupVO;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.components.project.vo.ProjectVO;
import kr.or.ddit.vo.PagingVO;

public interface IProjectMapper {

	public int insertProject();
	
	public List<ProjectVO> getProjectList(PagingVO<ProjectVO> page);

	public ProjectVO getProjectDetail(long no);

	public ProjectVO updateProject(ProjectVO pv);

	public int deleteProject(long no);

//	public int getTotal(PagingVO<ProjectVO> page);

	public int projectGo(long no);

	public int projectTerminate(long no);

	public int projectStop(long no);

	public ProjectDetailVO projectDetailList(long no);

	public List<ProjectVO> getProjectDetailList(PagingVO<ProjectVO> page);

	public int getProjectDetailTotal(PagingVO<ProjectVO> page);

	public int projectDetailGo(long no);

	public int projectDetailStop(long no);

	public int projectDetailTerminate(long no);

	public int getTotal(PagingVO<ProjectVO> page);

	public List<ProjectVO> getList(PagingVO<ProjectVO> page);

	public ChannelMemberVO getMyinfo(PagingVO<DocumentVO> page);

	public List<DocumentVO> getDocList(PagingVO<DocumentVO> page);

	public int getDocListTotal(PagingVO<DocumentVO> page);

	public void projectInsert(ProjectVO pjtVO);

	public void projectGroupInsert(ProjectGroupVO pgVO);

	public void projectGroupMemberInsert(ProjectGroupMemberVO pgmVO);

	public ProjectVO getProject(PagingVO<ProjectVO> page);

	public List<AtchFileDetailVO> getFileList(PagingVO<ProjectVO> page);

	public void inserPjtDetail(ProjectDetailVO projectDetailVO);

	public ProjectDetailVO getPjtDetailVO(int no);

	public ProjectDetailVO getPjtDtlSubWrkList(int no);

	public int uploadPds(ProjectDetailSubWrkVO pdsVO);

	public ProjectDetailSubWrkVO getPds(int no);

	public int getMaxPdsNo();

	public void updatePrgrs(ProjectDetailVO pdVO);

	public int selectPjt(ProjectDetailVO pdVO);

	public List<ProjectDetailVO> getDataList(int no);

	public List<ProjectGroupMemberVO> getPjtMemList(int no);

	public List<ProjectPrgrsInfoVO> getChProjectInfo(PagingVO<ProjectPrgrsInfoVO> page);

	public int getChProjectInfoTotal(PagingVO<ProjectPrgrsInfoVO> page);
	
}
