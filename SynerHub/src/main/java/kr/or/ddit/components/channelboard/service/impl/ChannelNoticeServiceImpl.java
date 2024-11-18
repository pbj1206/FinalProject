package kr.or.ddit.components.channelboard.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.channelboard.service.IChannelNoticeMapper;
import kr.or.ddit.components.channelboard.service.IChannelNoticeService;
import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

@Primary
@Service
public class ChannelNoticeServiceImpl implements IChannelNoticeService{
	
	@Inject
	private IChannelNoticeMapper mapper;
	
	@Override
	public int chNtcTotal(PagingVO<ChannelBoardVO> pagingVO) {
		
		return mapper.chNtcTotal(pagingVO);
	}

	@Override
	public List<ChannelBoardVO> chNtcList(PagingVO<ChannelBoardVO> pagingVO) {
		
		return mapper.chNtcList(pagingVO);
	}

	@Override
	public ThreadBoardVO chNtcSelect(int brdNo) {
		mapper.incrementNtcHit(brdNo);
		return mapper.chNtcSelect(brdNo);
	}

	@Override
	public void chNtcInsert(ChannelBoardVO chBoard) {
		
		mapper.chNtcInsert(chBoard);
		
	}

	@Override
	public void deleteChNtc(int brdNo) {
		
		mapper.deleteChNtc(brdNo);
	}

	@Override
	public void chNtcUpdate(ChannelBoardVO chBoard) {
		
		mapper.chNtcUpdate(chBoard);
		
	}

	@Override
	public String getChTtl(int chNo) {
		
		return mapper.getChTtl(chNo);
	}
	
	
	
}
