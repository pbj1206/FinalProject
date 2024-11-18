package kr.or.ddit.components.channel.service;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChInviteVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelStatVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;

public interface IChannelMapper {

	public List<ChannelVO> getChList(MemberVO member);

	public ChannelVO chUpdate(ChannelVO channel);

	public int chInsert(ChannelVO channel);
	
	public int chMemInsert(ChannelMemberVO chMember);

	public List<MemberVO> getChMemberList(int no);

	public void chCreateMemberInsert(ChannelVO channel);

	public int getChNo();

	public List<ChannelThreadVO> getThList(int no);

	public int getChCreator(int no);

	public String getChRole(int no);

	public int updateChRole(ChannelVO channelVO);

	public int updateChMemRole(ChannelMemberVO cmVO);

	public int updateChRoleList(ChannelVO channelVO);

	public int updateChMngrRoleList(ChannelVO channelVO);

	public String getMemRoleList(int no);

	public String getMemMngrRoleList(int no);

	public boolean chCodeExists(String newCode);

	public ChannelVO chSelect(ChannelMemberVO channelMemberVO);

	public void addThToCh(ChannelThreadVO threadVO);

	public void inviteMemToCh(ChInviteVO chInviteVO);

	public List<ChannelVO> checkInvite(int chNo);

	public void acceptInvite(ChannelVO channelVO);

	public int chMemTotal(ChannelMemberVO channelMemberVO);

	public ChannelVO getChAndTh(ChannelVO channelVO);

	public void chConnect(ChannelMemberVO channelMemberVO);

	public List<ChannelThreadVO> getThByChNo(int chNo);

	public List<ChannelVO> pagingChList(PaginationInfoVO<ChannelVO> pagingVO);

	public List<ChannelMemberVO> chMemberList(ChannelVO channel);

	public ChannelVO getCntForDashBoard(ChannelMemberVO channelMemberVO);
	
	// 관리자 페이지
	public List<ChannelVO> channelList(PaginationInfoVO<ChannelVO> pagingVO);

	public List<ChannelThreadVO> getThByChNo(ChannelMemberVO channelMemberVO);

	public int chCount(PaginationInfoVO<ChannelVO> pagingVO);

	public int channelInsertCheck(MemberVO memNm);

	public void denyInvite(ChannelVO channelVO);

	public List<ChannelVO> getChannelStats();

	public int exitChannel(int chNo, int memNo, int chMemNo);

	public int updateDelyn(int chNo);

	public String getChDelyn(int chNo);


}
