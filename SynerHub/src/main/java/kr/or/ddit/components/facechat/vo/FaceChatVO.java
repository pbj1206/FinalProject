package kr.or.ddit.components.facechat.vo;

import java.time.LocalDate;

import lombok.Data;

@Data
public class FaceChatVO {

	private int roomNo;
	private int chNo;
	private int thNo;
	private int memNo;
	private String roomTitle;
	private String roomPasswd;
	private String roomUrlId;
	private String roomOpen;
	private int maxJoinCount;
	private String startTime;
	private String strEndDate;
	private String ldEndDate;
	private String roomId;
	private String maxJoinCnt;
	private String memNm;
	private String chTtl;
	private String thTtl;

	public void setCH(int chNo, int memNo, String roomTitle, String passwd, String roomUrlId, String ldEndDate) {
		this.chNo = chNo;
		this.memNo = memNo;
		this.roomTitle = roomTitle;
		this.roomPasswd = passwd;
		this.roomUrlId = roomUrlId;
		this.roomOpen = "Y";
		this.ldEndDate = ldEndDate;
	}
	public void setTH(int chNo, int thNo, int memNo, String roomTitle, String passwd, String roomUrlId, String ldEndDate) {
		this.chNo = chNo;
		this.thNo = thNo;
		this.memNo = memNo;
		this.roomTitle = roomTitle;
		this.roomPasswd = passwd;
		this.roomUrlId = roomUrlId;
		this.roomOpen = "Y";
		this.ldEndDate = ldEndDate;
	}
	
	public FaceChatVO() {
		
	}

	/**
	 * 방을 만들 때 사용한다.
	 * @param roomTitle		방 생성시 입력 받음
	 * @param passwd		방 생성시 입력 받음
	 * @param roomUrlId		방 생성 후 응답으로 받음
	 */
	public FaceChatVO(int chNo, int thNo, int memNo, String roomTitle, String passwd, String roomUrlId) {
		this.chNo = chNo;
		this.thNo = thNo;
		this.memNo = memNo;
		this.roomTitle = roomTitle;
		this.roomPasswd = passwd;
		this.roomUrlId = roomUrlId;
		this.roomOpen = "Y";
	}
	// 체널버전
	public FaceChatVO(int chNo, int memNo, String roomTitle, String passwd, String roomUrlId) {
		this.chNo = chNo;
		this.memNo = memNo;
		this.roomTitle = roomTitle;
		this.roomPasswd = passwd;
		this.roomUrlId = roomUrlId;
		this.roomOpen = "Y";
	}

}
