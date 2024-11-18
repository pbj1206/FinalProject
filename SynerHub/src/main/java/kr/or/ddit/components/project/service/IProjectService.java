package kr.or.ddit.components.project.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.project.vo.ProjectDetailSubWrkVO;
import kr.or.ddit.components.project.vo.ProjectDetailVO;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.components.project.vo.ProjectVO;
import kr.or.ddit.vo.PagingVO;

public interface IProjectService {

	public List<ProjectVO> getProjectList(PagingVO<ProjectVO> page);

	public ProjectVO getProjectDetail(long no);

	public ProjectVO updateProject(ProjectVO pv);

	public int deleteProject(long no);

//	public int getTotal(PagingVO<ProjectVO> page);

	public int projectGo(long no);

	public int projectStop(long no);

	public int projectTerminate(long no);

	public ProjectDetailVO projectDtailList(long no);

	public List<ProjectVO> getProjectDetailList(PagingVO<ProjectVO> page);

	public int getProjectDetailTotal(PagingVO<ProjectVO> page);

	public int projectDetailGo(long no);

	public int projectDetailStop(long no);

	public int projectDetailTerminate(long no);

	public int getTotal(PagingVO<ProjectVO> page);

	public List<ProjectVO> getList(PagingVO<ProjectVO> page);

	public PagingVO<DocumentVO> dataForInsert(PagingVO<DocumentVO> page);

	public ProjectVO projectInsert(ProjectVO pjtVO);

	public ProjectVO getProject(PagingVO<ProjectVO> page);

	public ProjectDetailVO insertPjtDetail(ProjectDetailVO projectDetailVO);

	public ProjectDetailVO getPjtDtlSubWrkList(int no);

	public ProjectDetailSubWrkVO uploadPds(ProjectDetailSubWrkVO pdsVO);

	public Map<String, Object> updatePrgrs(ProjectDetailVO pdVO);

	public List<ProjectPrgrsInfoVO> getChProjectInfo(PagingVO<ProjectPrgrsInfoVO> page);
	
}
