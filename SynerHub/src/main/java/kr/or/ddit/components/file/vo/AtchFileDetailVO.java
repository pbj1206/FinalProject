package kr.or.ddit.components.file.vo;

import java.util.Date;

import lombok.Data;

@Data
public class AtchFileDetailVO {
	private int memNo;
	private int atchDetailFileId;		// 첨부파일 상세 아이디
	private int atchFileId;				// 첨부파일 아이디 
	private String atchFilePath;		// 첨부파일 저장 경로
	private Long atchFileSize;			// 첨부파일 크기
	private String atchFileExtn;		// 첨부파일 확장자
	private String atchFileOrgnlNm;		// 첨부파일 원본명
	private String atchFileSaveNm;		// 첨부파일 저장명
	private Date atchFileRegDt;			// 첨부파일 등록일
	private String atchFileRemoveYn;	// 첨부파일 삭제여부
	private String atchFileUseYn;		// 첨부파일 사용여부
	
	private String strDt;
	private String atchFileRegDtStr;
	private String memName;
	private Long totalSize;
}
