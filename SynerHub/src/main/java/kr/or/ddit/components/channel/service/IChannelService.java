package kr.or.ddit.components.channel.service;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChInviteVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelStatVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;

public interface IChannelService {

	public List<ChannelVO> getChList(MemberVO member);

	public ChannelVO chUpdate(ChannelVO channel);

	public int chInsert(ChannelVO channel);

	public List<MemberVO> getChMemberList(int no);

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

	public boolean isChannelCodeExists(String newCode);

	public ChannelVO chSelect(ChannelMemberVO channelMemberVO);

	public void addThToCh(ChannelThreadVO threadVO);

	public void inviteMemToCH(ChInviteVO chInviteVO);

	public MemberVO SearchMemId(String memId);

	public List<ChannelVO> checkInvite(int chNo);

	public void acceptInvite(ChannelVO channelVO);

	public int chMemTotal(ChannelMemberVO channelMemberVO);

	public ChannelVO getChAndTh(ChannelVO channelVO);

	public List<ChannelThreadVO> getThByChNo(ChannelMemberVO channelMemberVO);

	public List<ChannelVO> pagingChList(PaginationInfoVO<ChannelVO> pagingVO);

	public List<ChannelMemberVO> chMemberList(ChannelVO channel);

	public ChannelVO getCntForDashBoard(ChannelMemberVO channelMemberVO);
	
	// 관리자
	public List<ChannelVO> channelList(PaginationInfoVO<ChannelVO> pagingVO);

	public int chCount(PaginationInfoVO<ChannelVO> pagingVO);

	public int channelInsertCheck(MemberVO memNm);

	public void denyInvite(ChannelVO channelVO);

	public List<ChannelVO> getChannelStats();

	public int chDelete(int chNo);

	public int exitChannel(int chNo, int memNo, int chMemNo);

	public int updateDelyn(int chNo);


}
