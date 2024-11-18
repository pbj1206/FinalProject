package kr.or.ddit.components.login.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import kr.or.ddit.components.login.service.ILoginService;
import kr.or.ddit.components.login.vo.MemLogVO;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class SynerHubLoginController {

	@Inject
	private ILoginService loginservice;
	
	@Inject
	private PasswordEncoder pe;
	
	@PostConstruct
	public void init() {
		log.info("################ " + pe.encode("1234"));
	}
	
	//로그인 화면
	@RequestMapping(value = "/login.do", method=RequestMethod.GET)
	public String SynerHebLogin() {
		log.info("/login.do 실행");
		return "login/login";
	}
	//로그인 체크 (시큐리티떄문에 Detail한 부분은 잠시 대기)
	@PostMapping("/loginCheck")
	public String loginCheck( HttpServletRequest req, MemberVO member, Model model) {
		
		log.info("######"+member.toString()+"######");
		String goPage ="";
		Map<String, String> errors = new HashMap<String, String>();
		if(StringUtils.isBlank(member.getMemId())) {
			errors.put("memId","아이디를 입력해주세요!");
		}
		if(StringUtils.isBlank(member.getMemPw())) {
			errors.put("memPw", "비밀번호를 입력해주세요!");
		}
		//로그인 에러가 발생했을떄  
		if(errors.size() > 0) {
			model.addAttribute("errors", errors);
			model.addAttribute("member",member);
			goPage = "login/login";
		}else {
			MemberVO memberVO = loginservice.loginCheck(member);
			if(memberVO != null) { //로그인 성공했을때
				HttpSession session = req.getSession();
				session.setAttribute("SessionInfo",memberVO);
				goPage = "redirect:/synerHub/main";	//메인페이지
			}else {
				model.addAttribute("message","로그인 정보를 정확하게 입력해주세요!");
				model.addAttribute("member", member);
				goPage ="login/login";
			}
		}
		return null;
	}
	
	@PostMapping("/statuslogin")
	public int updateStatusToLogin(@RequestBody MemLogVO mlVO) {
		loginservice.updateStatusToLogin(mlVO.getMemNo());
		return loginservice.updateLogTime(mlVO);
	}
	
	@PostMapping("/statuslogout")
	public int updateStatusToLogout(@RequestBody MemLogVO mlVO) {
		loginservice.updateStatusToLogout(mlVO.getMemNo());
		return loginservice.updateLogTime(mlVO);
	}
	
	@PostMapping("/afk")
	public int updateStatusToAfk(@RequestBody MemLogVO mlVO) {
		loginservice.updateStatusToAfk(mlVO.getMemNo());
		return loginservice.updateLogTime(mlVO);
	}
	
}
