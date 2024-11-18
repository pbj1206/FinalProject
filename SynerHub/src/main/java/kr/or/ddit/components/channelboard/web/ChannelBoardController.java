package kr.or.ddit.components.channelboard.web;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.channelboard.service.IChannelBoardService;
import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.declaration.web.MediaUtils;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/chBoard")
public class ChannelBoardController {
	
	@Resource(name = "localPath")
	private String localPath;
	
	@Resource(name = "uploadPath")
	private String resourcePath;
	
	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;
	
	@Inject
	private IChannelBoardService service;
	
	@Inject
	private IAtchFileService atService;
	
	@PostMapping("/chBlist")
	public ResponseEntity<Map<String, Object>> chBoardList(@RequestBody PagingVO<ChannelBoardVO> paging) {
	    
	    log.info("chBoard -> paging : " + paging);
	    
	    // 채널 번호 -> chNo : 66 -> 채널번호 불러오기
	    int chNo = paging.getChNo();
	    
	    // 검색어 추가
	    
	    // 페이지 번호 -> 페이지 : 1
	    int page = paging.getPage();
	    
	    PagingVO<ChannelBoardVO> pagingVO = new PagingVO<ChannelBoardVO>();
	    
	    // 총 게시글 수
	    int total = service.chBoardTotal(paging);
	    pagingVO.setTotal(total);
	    pagingVO.setRowCnt(paging.getRowCnt());
	    
	    // 채널 게시판 리스트(목록)
	    List<ChannelBoardVO> chBoardList = service.chBoardList(paging); // PagingVO를 그대로 사용
	    pagingVO.setList(chBoardList);
	    
	    String chTtl = service.getChTtl(chNo);
	    Map<String, Object> map = new HashMap<String, Object>();
	    
	    map.put("page", page);
	    map.put("chTtl", chTtl);
	    map.put("chNo", chNo);
	    map.put("chBoardList", pagingVO);
	    
	    return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
		
	@PostMapping("/chbDelete")
	public ResponseEntity<String> chbDelete(@RequestBody ChannelBoardVO chBoard) {
		log.info("게시글 삭제 실행 : " + chBoard.getBrdNo());
		service.deleteChb(chBoard.getBrdNo());
		return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);
	}
	
	@PostMapping("/chBInsert")
	public ResponseEntity<ChannelBoardVO> chBoardInsert(ChannelBoardVO chBoard) {
	    log.info("chBoardInsert 실행!");

	    // 첨부파일 정보 저장
	    AtchFileVO atchFileVO = new AtchFileVO();
	    atchFileVO.setAtchFileExpln("channelBoard");
	    
	    // 첨부파일 등록
	    atService.insert(atchFileVO);
	    int atFileId = atchFileVO.getAtchFileId();
	    log.info("atchFileId : " + atFileId);
	    
	    // 첨부파일 리스트가 있는 경우 처리
	    if (chBoard.getChBoardFileList() != null && !chBoard.getChBoardFileList().isEmpty()) {
	        for (MultipartFile file : chBoard.getChBoardFileList()) {
	            if (!file.isEmpty()) {
	                try {
	                    // 파일 저장 경로
	                    String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes());

	                    // 파일 상세 정보 등록
	                    AtchFileDetailVO atFileDetailVO = new AtchFileDetailVO();
	                    atFileDetailVO.setAtchFileId(atFileId);
	                    atFileDetailVO.setAtchFilePath(savedPath);
	                    atFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
	                    atFileDetailVO.setAtchFileSize((Long) file.getSize());
	                    atFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
	                    atFileDetailVO.setAtchFileSaveNm(savedPath);
	                    
	                    atService.insertDetail(atFileDetailVO);
	                } catch (Exception e) {
	                    log.error("저장 오류 : {}", e.getMessage(), e);
	                }
	            }
	        }
	    }

	    // 게시글 등록
	    chBoard.setBrdAtchFileId(atFileId);
	    service.chBoardInsert(chBoard);
	    
	    // 등록된 게시글 정보 조회
	    int brdNo = chBoard.getBrdNo();
	    chBoard = service.chBoardSelect(brdNo);

	    return new ResponseEntity<ChannelBoardVO>(chBoard, HttpStatus.OK);
	}
	
	private String uploadFile(String originalName, byte[] fileData) throws Exception {
		UUID uuid = UUID.randomUUID();
        String savedName = uuid.toString() + "_" + originalName;

        // OS에 따라 파일 경로 설정
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("mac")) {
            localPath = uploadPathForMac;
        }

        // 폴더 경로를 만들고 경로를 리턴
        String savedPath = UploadFileUtiles.calcPath(localPath);
        File file = new File(localPath + "chBoard/" + savedPath);
        if (!file.exists()) {
            file.mkdirs();
        }

        File target = new File(localPath + "chBoard/" + savedPath.replaceFirst("/", ""), savedName);
        FileCopyUtils.copy(fileData, target);

        String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
        String uploadedFileName = resourcePath + "chBoard" + savedPath.replace(File.separatorChar, '/') + "/" + savedName;

        // 이미지 파일이면 썸네일 생성
        if (MediaUtils.getMediaType(formatName) != null) {
            UploadFileUtiles.makeThumbnail((localPath + "chBoard/"), savedPath, savedName);
        }

        return uploadedFileName; // 상대 경로 반환
	}
	
	// 파일 확장자 변환 메소드
	private String getFileExtension(String filename) {
		return filename.substring(filename.lastIndexOf(".") + 1);
	}

	@PostMapping("/chSelect")
	public ResponseEntity<Map<String, Object>> chBoardSelect(@RequestBody ChannelBoardVO chBoard) {
		log.info("chBoardSelect 실행!");		
		int brdNo = chBoard.getBrdNo();
		String BrdTtl = chBoard.getBrdTtl();
		String BrdConts = chBoard.getBrdConts();
		
		chBoard = service.chBoardSelect(brdNo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("chBoard", chBoard);
		
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	@PostMapping("/chBUpdate")
	public ResponseEntity<Map<String, Object>> chBoardUpdate(@RequestBody ChannelBoardVO chBoard) {
		log.info("채널 게시판 수정!");
		
		int brdNo = chBoard.getBrdNo();
		service.chBoardUpdate(chBoard);
		
		chBoard = service.chBoardSelect(brdNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("chBoard", chBoard);
				
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	@PostMapping("/chBDelete")
	public ResponseEntity<String> chBoardDelete(@RequestBody ChannelBoardVO chBoard){
		service.chBoardDelete(chBoard);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
		
	
}
