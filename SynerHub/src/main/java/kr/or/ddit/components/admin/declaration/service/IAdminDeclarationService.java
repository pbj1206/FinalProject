package kr.or.ddit.components.admin.declaration.service;

import java.util.List;

import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationStatsVO;
import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationVO;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;

public interface IAdminDeclarationService {
	public AdminDeclarationVO selectDclr(int dclrNo);
	public List<AdminDeclarationVO> getRecentDclr(int dclrSubId);
	public AdminDeclarationVO rctDclrDetail(int dclrNo);
	public int increaseWarningCount(int dclrSubId);
	public int decreaseWarningCount(int dclrSubId);
	public void blackListInsert(AdminDeclarationVO adminDclVO);
	public int selectDclrCount(PaginationInfoVO<AdminDeclarationVO> pagingVO);
	public List<AdminDeclarationVO> dclrList(PaginationInfoVO<AdminDeclarationVO> pagingVO);
	public int selectBlackCount(PaginationInfoVO<MemberVO> pagingVO);
	public List<MemberVO> blackListManage(PaginationInfoVO<MemberVO> pagingVO);
	public int selectHandledCount(AdminDeclarationVO pagingVO);
	public int selectUnHandledCount(AdminDeclarationVO pagingVO);
	public List<AdminDeclarationStatsVO> dclrStats();
//	public List<AdminDeclarationStatsVO> dclrStatsPerMonth(int month);
	public List<AdminDeclarationStatsVO> dclrStatsPerYear(int year);
	public List<AdminDeclarationStatsVO> dclrStatsPerYearAndMonth(int year, int month);
}