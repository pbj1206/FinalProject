package kr.or.ddit.components.chatting.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.components.chatting.vo.AlarmVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;
import kr.or.ddit.vo.MemberVO;

public interface IChattingMapper {

	public List<ChattingGroupVO> getChattingGroupList();

	public int insertChatting(ChattingGroupVO group);

	public void addChattingMember(ChattingGroupVO group);

	public List<MemberVO> getUserList(int memNo);

	public void insertAlarm(Map<String, Object> map);

	public List<AlarmVO> getAlarmInfo(String userId);

	public void deleteAlarm(int alarmNo);

	public int joinChattingGroup(ChattingMemberVO member);

	public int outChattingGroup(ChattingGroupVO chattingGroup);

	public List<MemberVO> getMembers();

	public MemberVO getUser(MemberVO member);

	public List<ChattingMemberVO> getChattingMember(int groupNo);

	public List<ChattingGroupVO> getGroupNo(ChattingGroupVO checkGroup);

	public int getCount(ChattingGroupVO groupVo);


}
