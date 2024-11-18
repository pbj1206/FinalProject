package kr.or.ddit.components.channel.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.autograph.vo.AutographVO;
import kr.or.ddit.components.project.vo.ProjectVO;
import kr.or.ddit.vo.RoleVO;
import lombok.Data;

@Data
public class ChannelMemberVO {
	
	private int chMemNo;
	private int memNo;
	private String chMemThNm;
	private int chMemThNo;
	private int chRole;
	private String chRoleNm;
	private String chPrp;
	private int chNo;
	private String chMemNm;
	private int chPrfImg;
	private String memName;
	private String memEmail;
	private String memPh;
	private String memStatus;
	private String memPrflimg;
	private String chRegdt;
	private String chCnntdt;
	
	private int thNo;
	private String chTtl;
	private String thTtl;
	private int planNo;
	private MultipartFile imgFile;
	private List<RoleVO> roleList;
	private List<AutographVO> myAtgrphList;
	
	private String memAddr1;
	private String memAddr2;
	private int memPstCd;
	private String memIntr;
	private int planCcl;
	
	private int total;

}
