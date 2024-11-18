package kr.or.ddit.components.channel.vo;

import java.util.Date;
import java.util.List;

import kr.or.ddit.components.project.vo.ProjectVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;
import lombok.Data;

@Data
public class ChannelThreadVO {
	private int thNo;
	private String thTtl;
	private String thPw;
	private Date thRgdt;	
	private String thClr;
	private int chNo;
	private int memNo;
	private String threadLeader;
	private int thMemCount;
	
	//스레드 메인화면 channelvo값 가져오기
	private String chTtl; //채널 제목
	private String chCd;  //채널 코드
	private String chCmnt; //채널 소개
	private String thMemNm; //스레드 멤버 이름
	

	//ChannelMemberVO
	private int chMemNo;

	private String chMemThNm;
	private int chMemThNo;
	private int chRole;
	private String chRoleNm;
	private String chPrp;
	private String chMemNm;
	private String chPrfImg;
	private String memName; 
	private String memEmail;
	private String memPrflimg;
	private String chRegdt;
	private String chLmg;
	
	private List<ThreadBoardVO> threadFreeBoard; // 자유 게시판 목록 추가
	private List<ThreadBoardVO> threadDailyBoard; // 일일 업무게시판 목록 추가
	
	private List<ChannelMemberVO> thraedMemberList;// 스레드 멤버 리스트
	private int threadTotal;	  //총인원
	private int thboardAuthority; //권한
	
	private int docToApprovalCnt;
	private int docOnGoingCnt;
	private int pjtOnGoingCnt;
	private List<ProjectVO> thPjtProgressList;
	
	private PagingVO<?> page;
	
	private int synerhub1;
	private int synerhub2;
	private String synerhub3;
}

