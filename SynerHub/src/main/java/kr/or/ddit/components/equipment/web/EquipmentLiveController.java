package kr.or.ddit.components.equipment.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.equipment.service.IEquipmentService;
import kr.or.ddit.components.equipment.vo.EquipmentUsingVO;
import kr.or.ddit.components.equipment.vo.EquipmentVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/equipmentLive")
public class EquipmentLiveController {

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IEquipmentService eqpService;

	@PostMapping("/eqpLiveList")
	public ResponseEntity<List<EquipmentUsingVO>> eqpLiveList(@RequestBody EquipmentUsingVO eqpusingvoVo) {
		Date end;
		List<EquipmentUsingVO> eqpUsingListTh = eqpService.eqpLiveList(eqpusingvoVo.getChNo());
		for (EquipmentUsingVO eqpUseList : eqpUsingListTh) {
			end = DateUtils.addDays(eqpUseList.getRtnEstmtDt(), 1);
			eqpUseList.setRtnEstmtDt(end);
		}
		return new ResponseEntity<List<EquipmentUsingVO>>(eqpUsingListTh, HttpStatus.OK);
	}

	@PostMapping("/EqpLiveDetailForm")
	public ResponseEntity<EquipmentUsingVO> eqpLiveDetailForm(@RequestBody EquipmentUsingVO eqpUsingVO) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		EquipmentUsingVO eqpUsingSel = eqpService.eqpUsingSelectOne(eqpUsingVO);
		eqpUsingSel.setStartDate(sdf.format(eqpUsingSel.getUseStrtDt()));
		eqpUsingSel.setEndDate(sdf.format(eqpUsingSel.getRtnEstmtDt()));
		return new ResponseEntity<EquipmentUsingVO>(eqpUsingSel, HttpStatus.OK);
	}

	@PostMapping("/eqpUsingLiveUpdate")
	public ResponseEntity<EquipmentVO> eqpUsingLiveUpdate(@RequestBody EquipmentUsingVO eqpUsingVO) {
		eqpService.eqpUsingLiveUpdate(eqpUsingVO);
		return new ResponseEntity<EquipmentVO>(HttpStatus.OK);
	}

	@PostMapping("/eqpUsingReturn")
	public ResponseEntity<String> eqpUsingReturn(@RequestBody EquipmentUsingVO eqpUsingVO) {
		eqpService.eqpUsingReturn(eqpUsingVO.getLogNo());
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PostMapping("/eqpMove")
	public ResponseEntity<String> eqpMove(@RequestBody EquipmentUsingVO eqpUsingVO){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		EquipmentUsingVO UsingCal = eqpService.eqpUsingSelectOne(eqpUsingVO);
		
		if(("move").equals(eqpUsingVO.getState())){
			Date nst = DateUtils.addDays(UsingCal.getUseStrtDt(), eqpUsingVO.getEvent());
			UsingCal.setStartDate(sdf.format(nst));
			UsingCal.setUseStrtDt(nst);
		}
		
		Date nend = DateUtils.addDays(UsingCal.getRtnEstmtDt(), eqpUsingVO.getEvent());
		UsingCal.setEndDate(sdf.format(nend));
		UsingCal.setRtnEstmtDt(nend);
		eqpService.eqpUsingLiveUpdate(UsingCal);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

}