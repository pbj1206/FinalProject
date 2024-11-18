package kr.or.ddit.components.channel.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.channel.service.IChannelMapper;
import kr.or.ddit.components.channel.service.IChannelService;
import kr.or.ddit.components.channel.vo.ChInviteVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelStatVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.login.service.ILoginMapper;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;

@Primary
@Service
public class ChannelServiceImpl implements IChannelService {
	
	@Inject
	private IChannelMapper mapper;
	
	@Inject
	private ILoginMapper Iloginmapper;
	
	@Override
	public List<ChannelVO> getChList(MemberVO member) {
		
		List<ChannelVO> chList = mapper.getChList(member);
		return chList;
	}

	@Override
	public ChannelVO chUpdate(ChannelVO channel) {
		
		return mapper.chUpdate(channel);
	}


	@Override
	public int chInsert(ChannelVO channel) {
		int a = mapper.chInsert(channel);
		mapper.chCreateMemberInsert(channel);
		return a;
		
	}

	@Override
	public List<MemberVO> getChMemberList(int no) {
		return mapper.getChMemberList(no);
	}

	@Override
	public int getChNo() {
		return mapper.getChNo();
	}

	@Override
	public List<ChannelThreadVO> getThList(int no) {
		return mapper.getThList(no);
	}

	@Override
	public int getChCreator(int no) {
		return mapper.getChCreator(no);
	}

	@Override
	public String getChRole(int no) {
		return mapper.getChRole(no);
	}

	@Override
	public int updateChRole(ChannelVO channelVO) {
		return mapper.updateChRole(channelVO);
	}

	@Override
	public int updateChMemRole(ChannelMemberVO cmVO) {
		return mapper.updateChMemRole(cmVO);
	}

	@Override
	public int updateChRoleList(ChannelVO channelVO) {
		return mapper.updateChRoleList(channelVO);
	}

	@Override
	public int updateChMngrRoleList(ChannelVO channelVO) {
		return mapper.updateChMngrRoleList(channelVO);
	}

	@Override
	public String getMemRoleList(int no) {
		return mapper.getMemRoleList(no);
	}

	@Override
	public String getMemMngrRoleList(int no) {
		return mapper.getMemMngrRoleList(no);
	}

	@Override
	public boolean isChannelCodeExists(String newCode) {
		
		return mapper.chCodeExists(newCode);
	}

	@Override
	public ChannelVO chSelect(ChannelMemberVO channelMemberVO) {
		// 채널 접속기록 남기기
		mapper.chConnect(channelMemberVO);
		
		return mapper.chSelect(channelMemberVO);
	}


	@Override
	public void addThToCh(ChannelThreadVO threadVO) {
		mapper.addThToCh(threadVO);
		
	}

	@Override
	public void inviteMemToCH(ChInviteVO chInviteVO) {
		
		mapper.inviteMemToCh(chInviteVO);
		
	}

	@Override
	public MemberVO SearchMemId(String memId) {
		return Iloginmapper.idCheck(memId);
	}

	@Override
	public List<ChannelVO> checkInvite(int memNo) {
		return mapper.checkInvite(memNo);
	}

	@Override
	public void acceptInvite(ChannelVO channelVO) {
		mapper.acceptInvite(channelVO);
	}
	
	@Override
	public void denyInvite(ChannelVO channelVO) {
		mapper.denyInvite(channelVO);
	}

	@Override
	public int chMemTotal(ChannelMemberVO channelMemberVO) {
		
		return mapper.chMemTotal(channelMemberVO);
	}

	@Override
	public ChannelVO getChAndTh(ChannelVO channelVO) {
		return mapper.getChAndTh(channelVO);
	}

	@Override
	public List<ChannelThreadVO> getThByChNo(ChannelMemberVO channelMemberVO) {
		
		return mapper.getThByChNo(channelMemberVO);
	}


	@Override
	public List<ChannelVO> pagingChList(PaginationInfoVO<ChannelVO> pagingVO) {
		
		return mapper.pagingChList(pagingVO);
	}

	
	@Override
	public List<ChannelMemberVO> chMemberList(ChannelVO channelVO) {
		
		return mapper.chMemberList(channelVO);
	}

	@Override
	public ChannelVO getCntForDashBoard(ChannelMemberVO channelMemberVO) {
		return mapper.getCntForDashBoard(channelMemberVO);
	}

	@Override
	public List<ChannelVO> channelList(PaginationInfoVO<ChannelVO> pagingVO) {
		return mapper.channelList(pagingVO);
	}

	@Override
	public int chCount(PaginationInfoVO<ChannelVO> pagingVO) {
		return mapper.chCount(pagingVO);
	}

	@Override
	public int channelInsertCheck(MemberVO memNm) {
		return mapper.channelInsertCheck(memNm);
	}

	@Override
	public List<ChannelVO> getChannelStats() {
		
		return mapper.getChannelStats();
	}

	@Override
	public int chDelete(int chNo) {
	    String chDelyn = mapper.getChDelyn(chNo);
	    
	    // CH_DELYN이 'N'일 때만 업데이트 진행
	    if ("N".equals(chDelyn)) {
	        // CH_DELYN 값을 'Y'로 업데이트
	        int updateResult = updateDelyn(chNo); // CH_DELYN 업데이트 호출
	        
	        if (updateResult > 0) {
	            return updateResult; // 업데이트 성공 시 업데이트된 행 수 반환
	        } else {
	            return 0; // 업데이트 실패
	        }
	    } else {
	    	return 0; // CH_DELYN이 이미 'Y'인 경우, 업데이트하지 않음
	    }
	}

	@Override
	public int exitChannel(int chNo, int memNo, int chMemNo) {
		
		return mapper.exitChannel(chNo, memNo, chMemNo);
	}

	@Override
	public int updateDelyn(int chNo) {
		
		return mapper.updateDelyn(chNo);
	}


	
}
