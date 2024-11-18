package kr.or.ddit.components.plan.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import kr.or.ddit.components.plan.service.IPlanMapper;
import kr.or.ddit.components.plan.service.IPlanService;
import kr.or.ddit.components.plan.vo.ApproveResponseVO;
import kr.or.ddit.components.plan.vo.ChannelPlanVO;
import kr.or.ddit.components.plan.vo.PlanVO;
import kr.or.ddit.components.plan.vo.ReadyResponseVO;
import lombok.extern.slf4j.Slf4j;

@Primary
@Service
@Slf4j
public class PlanServiceImpl implements IPlanService {
	String tid = null;

	@Inject
	private IPlanMapper mapper;

	@Override
	public List<PlanVO> list(int planNo) {
		return mapper.list(planNo);
	}

	@Override
	public int delete(ChannelPlanVO channelPlanVO) {
		mapper.planMinuse(channelPlanVO);
		return mapper.delete(channelPlanVO);
	}

	@Override
	public void update(int chNo) {
		mapper.update(chNo);
	}

	@Override
	public PlanVO buyChNo(int chNo) {
		return mapper.buyChNo(chNo);
	}

	@Override
	public int planExpCount() {
		return mapper.planExpCount();
	}

	@Override
	public int totalAmount(String itemName) {
		return mapper.totalAmount(itemName);
	}

	@Override
	public String kakaoPay(ApproveResponseVO approveResponseVO) {
		ReadyResponseVO readyVO = new ReadyResponseVO();

		RestTemplate template = new RestTemplate();
		template.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "KakaoAK" + " 930030a7b3bc28255b87d54074d3f1c3");
		headers.add("Accept", "application/json");
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		MultiValueMap<String, String> paramss = new LinkedMultiValueMap<String, String>();
		paramss.add("cid", "TC0ONETIME"); // 가맹점 코드 - 테스트용
		paramss.add("partner_order_id", "1001"); // 주문 번호
		paramss.add("partner_user_id", Integer.toString(approveResponseVO.getMemNo())); // 회원 아이디
		paramss.add("item_name", approveResponseVO.getItemName()); // 상품 명
		paramss.add("quantity", "1"); // 상품 수량
		paramss.add("total_amount", Integer.toString(approveResponseVO.getTotalAmount())); // 상품 가격
		paramss.add("tax_free_amount", "0"); // 상품 비과세 금액
		paramss.add("approval_url",
				"http://localhost/synerhub/plan/paySuccess?itemName=" + approveResponseVO.getItemName()
						+ "&totalAmount=" + approveResponseVO.getTotalAmount() + "&memNo="
						+ approveResponseVO.getMemNo() + "&planNo=" + approveResponseVO.getPlanNo() + "&chNo="
						+ approveResponseVO.getChNo() + "&updateTF=" + approveResponseVO.getUpdateTF());
		paramss.add("cancel_url", "http://localhost:8080/payment/cancel"); // 취소 시 redirect url
		paramss.add("fail_url", "http://localhost:8080/payment/fail"); // 실패 시 redirect url

		// 카카오페이 결제준비 api 요청
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(paramss,
				headers);

		// 요청 결과
		try {
			// Kakao 결제 요청 페이지 호출
			readyVO = template.postForObject("https://kapi.kakao.com/v1/payment/ready", body, ReadyResponseVO.class);
			tid = readyVO.getTid();
			// 결제 성공 시 페이지 이동
			return readyVO.getNext_redirect_pc_url();
		} catch (RestClientException e) {
			e.printStackTrace();
		}
		return "/pay";
	}

	@Override
	public ApproveResponseVO kakaoPayInfo(String parameter, String price, String memNo, String tids) {
		log.debug("KakaoPay승인............................................");
		RestTemplate restTemplate = new RestTemplate();

		// 서버로 요청할 Header
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "KakaoAK " + "930030a7b3bc28255b87d54074d3f1c3");
		headers.add("Accept", "application/json");
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME");

		if (tid == null) {
			params.add("tid", tids);
		} else {
			params.add("tid", tid);
		}

		params.add("partner_order_id", "1001");
		params.add("partner_user_id", memNo);
		params.add("pg_token", parameter);
		params.add("total_amount", price);

		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

		try {
			ApproveResponseVO approveResponseVO = restTemplate
					.postForObject("https://kapi.kakao.com/v1/payment/approve", body, ApproveResponseVO.class);
			return approveResponseVO;
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String kakaoCancel(ApproveResponseVO approveResponseVO) {
		ReadyResponseVO readyVO = new ReadyResponseVO();

		RestTemplate template = new RestTemplate();
		template.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "KakaoAK " + "930030a7b3bc28255b87d54074d3f1c3");
		headers.add("Accept", "application/json");
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME"); // 가맹점 코드 - 테스트용
		params.add("tid", approveResponseVO.getTid()); // 주문 번호
		params.add("cancel_amount", Integer.toString(approveResponseVO.getTotalAmount())); // 상품 가격
		params.add("cancel_tax_free_amount", "0"); // 상품 비과세 금액

		// 카카오페이 결제준비 api 요청
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

		// 요청 결과
		try {
			// Kakao 결제 요청 페이지 호출
			readyVO = template.postForObject("https://kapi.kakao.com/v1/payment/cancel", body, ReadyResponseVO.class);
			// 결제 성공 시 페이지 이동
			return readyVO.getNext_redirect_pc_url();
		} catch (RestClientException e) {
			e.printStackTrace();
		}
		return "/pay";
	}

	@Override
	public void payInsert(ApproveResponseVO approveResponseVO) {
		mapper.ChannelPlanInsert(approveResponseVO);
		mapper.paymentInsert(approveResponseVO);
	}

	@Override
	public int setPlanNo(String itemName) {
		return mapper.setPlanNo(itemName);
	}

	@Override
	public int chplanCnt() {
		return mapper.chplantCnt();
	}

	@Override
	public ApproveResponseVO getPrice(int chNo) {
		return mapper.getPrice(chNo);
	}

	@Override
	public ChannelPlanVO newPrc(int planNo) {
		return mapper.newPrc(planNo);
	}

	@Override
	public void changeDelete(int chNo) {
		ChannelPlanVO chVO = mapper.changePrc(chNo);
		chVO.setChNo(chNo);
		chVO.setNewPrc(chVO.getNewPrc() * -1);
		mapper.planMinuse(chVO);
	}

	@Override
	public List<PlanVO> adminMemShipList() {
		return mapper.adminMemShipList();
	}

	@Override
	public String AdminTotalAmount() {
		return mapper.AdminTotalAmount();
	}

	@Override
	public List<PlanVO> planExpList() {
		return mapper.planExpList();
	}

	@Override
	public List<PlanVO> planCateName() {
		return mapper.planCateName();
	}

	@Override
	public void AdminPlanInsert(PlanVO planVO) {
		if (planVO.getBzInput() != null) {
			mapper.AdminBzPlanInsert(planVO);
			mapper.AdminSvPlanInsert(planVO);
			mapper.AdminGdPlanInsert(planVO);
		} else {
			mapper.AdminBzCheckInsert(planVO);
			mapper.AdminSvCheckInsert(planVO);
			mapper.AdminGdCheckInsert(planVO);
		}
	}

	@Override
	public void adminPlanUpdate(PlanVO planVO) {

		if (planVO.getPlanCateNm() == null) {
			if (planVO.getBzInput() != null) {
				mapper.AdminBzPlanUpdate(planVO);
				mapper.AdminSvPlanUpdate(planVO);
				mapper.AdminGdPlanUpdate(planVO);
			} else {
				mapper.AdminBzCheckUpdate(planVO);
				mapper.AdminSvCheckUpdate(planVO);
				mapper.AdminGdCheckUpdate(planVO);
			}
		} else if (planVO.getPlanCateNm().equals("가격")) {
			mapper.AdminBzPlanPriceUpdate(planVO);
			mapper.AdminSvPlanPriceUpdate(planVO);
			mapper.AdminGdPlanPriceUpdate(planVO);
		}

		else if (planVO.getPlanCateNm().equals("용량")) {

			int BzSize = (int) planVO.getBzSize();
			int SvSize = (int) planVO.getSvSize();
			int GdSize = (int) planVO.getGdSize();
			if (BzSize < 1) {
				planVO.setBzInput(BzSize * 1000 + "GB");
				planVO.setBzNo(2);
			} else if (BzSize >= 1) {
				planVO.setBzInput(BzSize + "TB");
				planVO.setBzNo(2);
			}

			if (SvSize < 1) {
				planVO.setSvInput(SvSize * 1000 + "GB");
				planVO.setSvNo(4);
			} else if (SvSize >= 1) {
				planVO.setSvInput(SvSize + "TB");
				planVO.setSvNo(4);
			}

			if (GdSize < 1) {
				planVO.setGdInput(GdSize * 1000 + "GB");
				planVO.setGdNo(6);
			} else if (GdSize >= 1) {
				planVO.setGdInput(GdSize + "TB");
				planVO.setGdNo(6);
			}

			if (planVO.getBzInput() != null) {
				mapper.AdminBzPlanUpdate(planVO);
				mapper.AdminSvPlanUpdate(planVO);
				mapper.AdminGdPlanUpdate(planVO);
			} else {
				mapper.AdminBzCheckUpdate(planVO);
				mapper.AdminSvCheckUpdate(planVO);
				mapper.AdminGdCheckUpdate(planVO);
			}
		}

		else if (planVO.getPlanCateNm().equals("멤버수")) {
			mapper.AdminBzPlanMemNoUpdate(planVO);
			mapper.AdminSvPlanMemNoUpdate(planVO);
			mapper.AdminGdPlanMemNoUpdate(planVO);
			planVO.setBzNo(1);
			planVO.setSvNo(3);
			planVO.setGdNo(5);

			planVO.setBzInput(planVO.getBzInput() + "명");
			planVO.setSvInput(planVO.getSvInput() + "명");
			planVO.setGdInput(planVO.getGdInput() + "명");
			mapper.BzPlanMemNoUpdate(planVO);
			mapper.SvPlanMemNoUpdate(planVO);
			mapper.GdPlanMemNoUpdate(planVO);

		}
	}

	@Override
	public void adminPlanDelete(PlanVO planVO) {
		mapper.AdminBzDelete(planVO);
		mapper.AdminSvDelete(planVO);
		mapper.AdminGdDelete(planVO);
	}

	@Override
	public List<PlanVO> adminPaymentDetail(String planNm) {
		return mapper.adminPaymentDetail(planNm);
	}

	@Override
	public PlanVO PaymentAllPrice() {
		return mapper.PaymentAllPrice();
	}

	@Override
	public PlanVO paymentPluse(String planNm) {
		return mapper.paymentPluse(planNm);
	}

	@Override
	public PlanVO paymentMinuse(String planNm) {
		return mapper.paymentMinuse(planNm);
	}

	@Override
	public float bronzePercent() {
		int bronzeLastYear = mapper.bronzeLastYear();
		int bronzeThisYear = mapper.bronzeThisYear();
		float bronzePercent = (float) (Math.round(((float)(bronzeThisYear - bronzeLastYear) / bronzeThisYear) * 100 ));
		return bronzePercent;
	}
	
	@Override
	public float silverPercent() {
		int silverLastYear = mapper.silverLastYear();
		int silverThisYear = mapper.silverThisYear();
		float bronzePercent = (float) (Math.round(((float)(silverThisYear - silverLastYear) / silverThisYear) * 100 ));
		return bronzePercent;
	}
	
	@Override
	public float goldPercent() {
		int goldLastYear = mapper.goldLastYear();
		int goldThisYear = mapper.goldThisYear();
		float bronzePercent = (float) (Math.round(((float)(goldThisYear - goldLastYear) / goldThisYear) * 100 ));
		return bronzePercent;
	}

	@Override
	public List<PlanVO> paymentPriceAverage() {
		return mapper.paymentPriceAverage();
	}
	
	@Override
	public List<PlanVO> paymentJoinNumAverage() {
		return mapper.paymentJoinNumAverage();
	}
}
