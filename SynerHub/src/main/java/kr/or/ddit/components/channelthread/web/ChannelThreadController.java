package kr.or.ddit.components.channelthread.web;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.channel.service.IChannelService;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.channelthread.service.IChannelThreadSerivce;
import kr.or.ddit.components.equipment.service.IEquipmentService;
import kr.or.ddit.components.equipment.vo.EquipmentVO;
import kr.or.ddit.components.project.service.IProjectService;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.components.threadboard.service.IThreadBoardService;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
@RequestMapping("/thread")
public class ChannelThreadController {
	
	@Inject
	private IThreadBoardService thBoardService;
	
	@Inject
	private IChannelThreadSerivce ThreadService;
	
	@Inject
	private IChannelService service; 
	
	@Inject
	private IProjectService pjtService;
	
	@Inject
	private IEquipmentService eqpService;
	
	@PostMapping("/insert")
	public ResponseEntity<ChannelThreadVO> threadInsert(@RequestBody ChannelThreadVO ThreadVO) {
		int chNo = ThreadVO.getChNo();
		ThreadService.insert(ThreadVO);
		
		
		return new ResponseEntity<ChannelThreadVO>(ThreadVO, HttpStatus.OK);
	}
	// 스레드사이드 전체 리스트 
	@PostMapping("/list")
	public ResponseEntity<List<ChannelThreadVO>> threadList(@RequestBody ChannelThreadVO ThreadVO){
		int chNo =ThreadVO.getChNo();
		
		List<ChannelThreadVO> Threadlist = null;
		Threadlist = ThreadService.list();
		log.info("Threadlist == >> " ,Threadlist);
		return new ResponseEntity<List<ChannelThreadVO>>(Threadlist,HttpStatus.OK);
	}
	
	// 스레드 메인화면
	@PostMapping("/select")
	public ResponseEntity<ChannelThreadVO> threadselect(@RequestBody ChannelThreadVO ThreadVO) throws IOException, ParseException {
	    // 스레드 정보 가져오기
	    ChannelThreadVO select = ThreadService.threadselect(ThreadVO);
	    
	    //날씨 API
	    StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); 
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=oG2aa7BOAnm12tkIUfXkeDFPYYaHbGzi4ZXQrSiE1DwurK6f843fuJs1zuHjqshV9NClgIokeB2VEhQ0I41gXg%3D%3D"); 
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode("20241114", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode("0500", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode("68", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); 
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        log.info("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close(); 
        conn.disconnect(); 
        
	    // 	project 정보 가져오기
	    PagingVO<ProjectPrgrsInfoVO> page = new PagingVO<ProjectPrgrsInfoVO>();
	    page.setPage(1);
	    page.setThNo(ThreadVO.getSynerhub2());
	    page.setList(pjtService.getChProjectInfo(page));
	    
	    // 게시글 목록 가져오기
	    ThreadBoardVO thboardVO = new ThreadBoardVO();
	    thboardVO.setThNo(ThreadVO.getThNo()); // thNo 설정
	    
	    // 스레드 멤버 List 
	    List<ChannelMemberVO> threadMemberList = ThreadService.thMemberList(ThreadVO);
	    
	    //스레드 게시판
	    List<ThreadBoardVO> thboardFreeList = thBoardService.thboardFree(thboardVO);
	    //스레드 일일게시판
	    List<ThreadBoardVO> thboardDailyList =thBoardService.thboardDaily(thboardVO);
	    int total = ThreadService.threadMemberTotal(ThreadVO);
	    // 게시글 목록을 ChannelThreadVO에 설정
	    
	    PagingVO<ThreadBoardVO> pagingVO = new PagingVO<ThreadBoardVO>();
	    pagingVO.setSynerhub1(ThreadVO.getSynerhub1());
	    pagingVO.setSynerhub2(ThreadVO.getSynerhub2());
	    int thboardAuthority = thBoardService.thboardAuthority(pagingVO);
	    
	    
	    
	    select.setThboardAuthority(thboardAuthority);
	    select.setThraedMemberList(threadMemberList);
	    select.setThreadFreeBoard(thboardFreeList);
	    select.setThreadDailyBoard(thboardDailyList);
	    select.setThreadTotal(total);	
	    select.setPage(page);
	    
	    ChannelMemberVO channelMemberVO = new ChannelMemberVO();
	    channelMemberVO.setChNo(select.getChNo());
	    channelMemberVO.setThNo(select.getThNo());
	    channelMemberVO.setMemNo(select.getMemNo());
	    
	    ChannelVO temp = service.getCntForDashBoard(channelMemberVO);
	     
	    select.setDocToApprovalCnt(temp.getDocToApprovalCnt());
	    select.setDocOnGoingCnt(temp.getDocOnGoingCnt());
	    select.setPjtOnGoingCnt(temp.getPjtOnGoingCnt());
	    
	    return new ResponseEntity<ChannelThreadVO>(select, HttpStatus.OK);
	}
	
	@PostMapping("/delete")
	public ResponseEntity<String> threadDelete(@RequestBody ChannelThreadVO ThreadVO){
		ThreadService.threadDelete(ThreadVO);
		return new ResponseEntity<String>("SUCEESS",HttpStatus.OK);
	}
	
	@PostMapping("/thMemberSearch")
	public ResponseEntity<List<ChannelMemberVO>> threadMemberSearch(@RequestBody ChannelThreadVO ThreadVO){
		List<ChannelMemberVO> res = ThreadService.thMemberSearch(ThreadVO);
		return new ResponseEntity<List<ChannelMemberVO>>(res, HttpStatus.OK);
	}
	
	@PostMapping("/threadEqpCount")
	public ResponseEntity<Integer> threadEqpCount(@RequestBody EquipmentVO eqpVO){
		log.info("===============threadeqpcount==============");
		int eqpCount = eqpService.eqpCount(eqpVO);
		return new ResponseEntity<Integer>(eqpCount, HttpStatus.OK);
	}
	
	@PostMapping("/threadEqpUsingCount")
	public ResponseEntity<Integer> threadEqpUsingCount(@RequestBody EquipmentVO eqpVO){
		log.info("===============threadeqUsingpcount==============");
		int eqpUsingCount = eqpService.eqpUsingCount(eqpVO);
		return new ResponseEntity<Integer>(eqpUsingCount, HttpStatus.OK);
	}
	
}
