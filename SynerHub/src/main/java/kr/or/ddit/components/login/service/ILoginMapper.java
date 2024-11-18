package kr.or.ddit.components.login.service;

import kr.or.ddit.components.login.vo.MemLogVO;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.RoleVO;

public interface ILoginMapper {

	public MemberVO loginCheck(MemberVO member);

	public MemberVO idCheck(String memId);

	public int signup(MemberVO memberVO);

	public void signupAuth(RoleVO roleVO);
//	public void signupAuth(int memNo);

	public MemberVO readByUserId(String username);
	
	public int signupProfile(MemberVO memberVO);

	public String findId(MemberVO member);

	public MemberVO find(MemberVO member);

	public void updatePw(MemberVO member);

	public int phoneCheck(String userPhoneNumber);

	public void signupProfileAdmin(MemberVO memberVO);

	public int signupAuthAdmin(RoleVO roleVO);

	public void updateStatusToLogin(int memNo);

	public void updateStatusToLogout(int memNo);

	public void updateStatusToAfk(int memNo);

	public void updateLogTime(MemLogVO mlVO);

	public int logNo();
}
