package kr.or.ddit.components.channel.vo;


import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.components.project.vo.ProjectVO;
import kr.or.ddit.vo.PagingVO;
import lombok.Data;

@Data
public class ChannelVO {
	
	private int chMemNo;
	private int chNo;
	private String chTtl;
	private String chCd;
	private String chCmnt;
	private MultipartFile imgFile;
	private List<ChannelThreadVO> thList;
	private List<ChInviteVO> invList;
	private String chMemNm;
	private String memRoleList;
	private String memMngrRoleList;
	private int planNo;
	private String planPic;
	private int planCcl;
	
	private int docToApprovalCnt;
	private int docOnGoingCnt;
	private int pjtOnGoingCnt;
	private List<ProjectVO> thPjtProgressList;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date chRgdt;
	private String chPlanExpry;
	private String chRole;
	private String chLmg;
	private List<ChannelMemberVO> chMemList;
	private List<String> inviteList;
	private List<String> threadNameList;
	
	private List<ChannelBoardVO> channelBoardList;	// 채널 게시판
	private List<ChannelBoardVO> channelNoticeList;	// 채널 공지사항
	private List<ChannelMemberVO> channelMemberList; // 채널 멤버 리스트
	private List<ProjectPrgrsInfoVO> pjtInfoList;
	
	private int memNo;
	private int channelTotal;	// 채널 총인원
	private int planMax;
	private String planNm;
	private int paidNo;

	
    private MultipartFile chMemProfile;
    private String chMemLmg;
    
	
	public void setCnts(ChannelVO temp) {
		
		this.docToApprovalCnt = temp.getDocToApprovalCnt();
		this.docOnGoingCnt = temp.getDocOnGoingCnt();
		this.pjtOnGoingCnt = temp.getPjtOnGoingCnt();
	}
	
	private PagingVO<?> page;

}
