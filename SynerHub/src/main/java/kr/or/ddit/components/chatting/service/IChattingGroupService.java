package kr.or.ddit.components.chatting.service;

import java.util.List;

import kr.or.ddit.components.chatting.vo.AlarmVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;
import kr.or.ddit.vo.MemberVO;


public interface IChattingGroupService {

	public List<ChattingGroupVO> getChattingGroupList();

	public int insertChatting(ChattingGroupVO group);

	public List<AlarmVO> getAlarmInfo(String userId);

	public void deleteAlarm(int alarmNo);

	public int joinChattingGroup(ChattingMemberVO member);

	public int outChattingGroup(ChattingGroupVO chattingGroup);

	public List<MemberVO> getMembers();

	public MemberVO getUser(MemberVO user);

	public List<ChattingMemberVO> getChattingMember(int stNo);

	public List<ChattingGroupVO> getGroupNo(ChattingGroupVO checkGroup);

	public int getCount(ChattingGroupVO groupVO);

}
