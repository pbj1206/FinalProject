package kr.or.ddit.components.admin.membership.web;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationStatsVO;
import kr.or.ddit.components.plan.service.IPlanService;
import kr.or.ddit.components.plan.vo.PlanVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminMemberShipController {

	@Inject
	private IPlanService planService;
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/paymentList")
	public String paymentList(Model model) {
		List<PlanVO> adminMemShipList = planService.adminMemShipList();
		PlanVO allPrice = planService.PaymentAllPrice();
		float BronzePercent = planService.bronzePercent();
		float SilverPercent = planService.silverPercent();
		float GoldPercent = planService.goldPercent();
		model.addAttribute("adminMemShipList", adminMemShipList);
		model.addAttribute("AllPrice", allPrice);
		model.addAttribute("BronzePercent", BronzePercent);
		model.addAttribute("SilverPercent", SilverPercent);
		model.addAttribute("GoldPercent", GoldPercent);
		return "admin/paymentList";
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/paymentDetail/{planNm}/{planPrice}")
	public String paymentDetail(Model model, @PathVariable ("planNm") String planNm, @PathVariable ("planPrice") String planPrice) {
		List<PlanVO> adminPyamentDetail = planService.adminPaymentDetail(planNm);
		PlanVO plusPrice = planService.paymentPluse(planNm);
		PlanVO planMinuse = planService.paymentMinuse(planNm);
		model.addAttribute("planPrice", planPrice);
		model.addAttribute("adminPyamentDetail", adminPyamentDetail);
		model.addAttribute("plusPrice", plusPrice);
		model.addAttribute("planMinuse", planMinuse);
		return "admin/paymentDetail";
	}
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/membership")
	public String membershipBronze(Model model) {
		List<PlanVO> planCateNm = planService.planCateName();
		model.addAttribute("planCateNm", planCateNm);

		List<PlanVO> planDetail = planService.list(0);
		model.addAttribute("planDetail", planDetail);
		
		List<PlanVO> planExpList = planService.planExpList();
		model.addAttribute("planExpList", planExpList);
		return "admin/memberShipDetail";
	}

	@PostMapping("/planDetailInsert/{type}")
	public ResponseEntity<String> planDetailInsert(@RequestBody PlanVO planVO, @PathVariable ("type") String type) {
		if(type.equals("update")) {
			planService.adminPlanUpdate(planVO);
		}else {
			planService.AdminPlanInsert(planVO);
		}
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PostMapping("/planDetailDelete")
	public ResponseEntity<String> planDetailDelete(@RequestBody PlanVO planVO){
		planService.adminPlanDelete(planVO);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@ResponseBody
	@GetMapping("/paymentPriceAverage")
	public ResponseEntity<List<PlanVO>> getDclrStatsByYearAndMonth() {
	    try {
	        List<PlanVO> stats = planService.paymentPriceAverage();
	        return ResponseEntity.ok(stats);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	@ResponseBody
	@GetMapping("/paymentJoinNumAverage")
	public ResponseEntity<List<PlanVO>> paymentJoinNumAverage() {
		try {
			List<PlanVO> stats = planService.paymentJoinNumAverage();
			return ResponseEntity.ok(stats);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	
}
