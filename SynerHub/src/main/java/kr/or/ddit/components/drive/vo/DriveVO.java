package kr.or.ddit.components.drive.vo;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class DriveVO {
	private int cldNo;
	private int memNo;
	private int cldFileNo;
	private Date cldRgdt;
	private int chNo;
	private int thNo;
	
	private List<MultipartFile> fileList;
	private MultipartFile updateFile;
	private int updateFileId;
	private int updateMem;
	
	private Long chSize;
	private int planCcl;
}
