package kr.or.ddit.components.admin.channel.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.admin.channel.service.IChannelStatisticsMapper;
import kr.or.ddit.components.admin.channel.service.IChannelStatisticsService;
import kr.or.ddit.components.admin.channel.vo.ChannelDataVO;
import kr.or.ddit.vo.PagingVO;

@Primary
@Service
public class ChannelStatisticsServiceImpl implements IChannelStatisticsService {

	@Inject
	private IChannelStatisticsMapper mapper;
	
	@Override
	public int getChTotal() {
		return mapper.getChTotal();
	}

	@Override
	public List<ChannelDataVO> getChList(PagingVO<ChannelDataVO> page) {
		return mapper.getChList(page);
	}

}
