package kr.or.ddit.components.project.vo;

import java.util.List;

import lombok.Data;

@Data
public class ProjectDetailVO {
	private int pjtDtlNo;
	private String pjtWrkNm;
	private String wrkStrtDt;
	private String wrkEstEndDt;
	private String wrkEndDt;
	private String prgrs;
	private String pjtNote;
	private int memNo;
	private int memNo2;
	private int pjtNo;
	private int pjtAtchFile;
	private String memNm;
	private String memNm2;
	private String docTtl;
	private String pjtDtlStat;
	
	private List<ProjectDetailSubWrkVO> pdsList;
}
