package kr.or.ddit.components.drive.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.drive.service.IDriveMapper;
import kr.or.ddit.components.drive.service.IDriveService;
import kr.or.ddit.components.drive.vo.DriveVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Primary
public class DriveServiceImpl implements IDriveService{
	
	@Inject
	private IDriveMapper mapper;

	@Override
	public List<ChannelMemberVO> getChList(ChannelMemberVO channelMemberVO) {
		return mapper.getChList(channelMemberVO);
	}

	@Override
	public List<ChannelMemberVO> getThList(ChannelMemberVO channelMemberVO) {
		return mapper.getThList(channelMemberVO);
	}

	@Override
	public List<AtchFileDetailVO> getFileList(ChannelMemberVO channelMemberVO) {
		return mapper.getFileList(channelMemberVO);
	}

	@Override
	public int deletFile(DriveVO driveVO) {
		return mapper.deletFile(driveVO);
	}

	@Override
	public int updateFile(DriveVO driveVO) {
		return mapper.updateFile(driveVO);
	}

	@Override
	public int uploadFile(DriveVO driveVO) {
		return mapper.uploadFile(driveVO);
	}

	@Override
	public DriveVO sizeCheck(DriveVO driveVO) {
		
		DriveVO drive2 = driveVO;
		
		if(driveVO.getChNo() == 0 && driveVO.getThNo() == 0) {
			return mapper.sizeMyCheck(driveVO);
		}else {
			if(driveVO.getChNo() != 0) {
				driveVO = mapper.getChDriveSize(driveVO);
			}else if(driveVO.getThNo() != 0) {
				driveVO = mapper.getThDriveSize(driveVO);
			}
			
			log.info("driveVO.getChSize() : " + driveVO);
			
			if(driveVO == null) {
				drive2.setChSize(52428800L);
			}else if(driveVO.getPlanCcl() == 0) {
				drive2.setChSize(52428800L);
			}else {
				drive2.setChSize(driveVO.getChSize());
			}
			
			return mapper.sizeCheck(drive2);
		}
		
	}

	@Override
	public DriveVO getTotalSizeToCh(int chNo) {
		return mapper.getTotalSizeToCh(chNo);
	}

	@Override
	public DriveVO getTotalSizeToTh(int thNo) {
		return mapper.getTotalSizeToTh(thNo);
	}

}
