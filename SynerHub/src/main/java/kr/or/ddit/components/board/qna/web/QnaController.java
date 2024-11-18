package kr.or.ddit.components.board.qna.web;

import java.io.File;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.board.qna.service.IQnaService;
import kr.or.ddit.components.board.qna.vo.QnaVO;
import kr.or.ddit.components.declaration.web.MediaUtils;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/qna")
public class QnaController {
	
	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
    private IQnaService qnaService;
	
	@Inject
	private IAtchFileService atchFileService;

    @PostMapping("/list")
    public ResponseEntity<List<QnaVO>> qnaList(@RequestBody QnaVO qnaVO) {
        List<QnaVO> list = qnaService.qnaList(qnaVO); // QnA 목록 가져오기
        
        return new ResponseEntity<List<QnaVO>>(list, HttpStatus.OK); // 200 OK 응답과 함께 목록 반환
    }
    
    
    @ResponseBody
    @PostMapping("/list2")
    public ResponseEntity<Map<String, Object>> qnaList2(
            @RequestBody PagingVO<QnaVO> pagingVO) {

        int qnaNo = pagingVO.getQnaNo();
        int page = pagingVO.getPage();
        PagingVO<QnaVO> pagingVO1 = new PagingVO<>();
        
        // 전체 글 수
        int total = qnaService.qnaTotal(pagingVO);
        pagingVO1.setTotal(total);
        pagingVO1.setRowCnt(pagingVO.getRowCnt());
        
        // 글 목록
        List<QnaVO> qnaVOList = qnaService.qnaList2(pagingVO);
        pagingVO1.setList(qnaVOList);
//        String qnaTtl = qnaService.getQnaTtl(qnaNo);
        Map<String, Object> map = new HashMap<>();

        map.put("page", page);
//        map.put("qnaTtl", qnaTtl);
        map.put("qnaNo", qnaNo);
        map.put("qnaList", pagingVO1);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    
    @RequestMapping(value = "/{qnaNo}", method = RequestMethod.POST)
    public ResponseEntity<QnaVO> selectQna(@PathVariable("qnaNo") int qnaNo) {

        QnaVO qnaVO = qnaService.selectQna(qnaNo);
        
        return new ResponseEntity<QnaVO>(qnaVO, HttpStatus.OK);
    }
    
    
    @GetMapping("/delete/{qnaNo}")
	public ResponseEntity<String> deleteQna(@PathVariable int qnaNo){
		String res = "";
		if(qnaService.deleteQna(qnaNo) < 1) {
			res = "삭제 완료.";
		} else { 
			res = "삭제 실패";
		}
		
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
    
    
    @ResponseBody
    @PostMapping("/update")
    public ResponseEntity<String> modifyQna(@RequestBody QnaVO qnaVO) {
        
        int cnt = qnaService.modifyQna(qnaVO);
        
        String flag = "false";
        
        HttpStatus status = HttpStatus.BAD_REQUEST;
        
        if(cnt > 0) {
        	flag = "true";
        	status = HttpStatus.OK;
        }
        
        return new ResponseEntity<>(flag, status); // 수정 실패 시 400 응답
    }
    
    
    
    @PostMapping("/insert")
    public ResponseEntity<List<QnaVO>> insertQna(QnaVO qnaVO) {

        // 첨부파일 정보 등록
        AtchFileVO atchFileVO = new AtchFileVO();
        atchFileVO.setAtchFileExpln("qna");

        // 첨부파일 정보를 DB에 저장하고 ID를 받아옴
        atchFileService.insert(atchFileVO);
        int atchFileId = atchFileVO.getAtchFileId();

        // 첨부파일 리스트가 있을 경우
        if (qnaVO.getQnaFileList() != null && !qnaVO.getQnaFileList().isEmpty()) {
            for (MultipartFile file : qnaVO.getQnaFileList()) {
                if (!file.isEmpty()) {
                    try {
                        // 파일 저장
                        String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes());

                        // AtchFileDetailVO 객체 생성 및 속성 설정
                        AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
                        atchFileDetailVO.setAtchFileId(atchFileId); // 받아온 ID 설정
                        atchFileDetailVO.setAtchFilePath(savedPath);
                        atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
                        atchFileDetailVO.setAtchFileSize((Long) file.getSize());
                        atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
                        atchFileDetailVO.setAtchFileSaveNm(savedPath);

                        // DB에 파일 상세 정보 저장
                        atchFileService.insertDetail(atchFileDetailVO);
                    } catch (Exception e) {
                        
                    }
                }
            }
        }
        qnaVO.setQnaAtchFileId(atchFileId);
        qnaService.insertQna(qnaVO);

        List<QnaVO> list = qnaService.qnaList(qnaVO);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 파일 업로드를 위한 static method
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
        File file = new File(localPath + "qna/" + savedPath);
        if (!file.exists()) {
            file.mkdirs();
        }

        File target = new File(localPath + "qna/" + savedPath.replaceFirst("/", ""), savedName);
        FileCopyUtils.copy(fileData, target);

        String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
        String uploadedFileName = resourcePath + "qna" + savedPath.replace(File.separatorChar, '/') + "/" + savedName;

        // 이미지 파일이면 썸네일 생성
        if (MediaUtils.getMediaType(formatName) != null) {
            UploadFileUtiles.makeThumbnail((localPath + "qna/"), savedPath, savedName);
        }

        return uploadedFileName; // 상대 경로 반환
    }

    // 파일 확장자를 반환하는 메서드
    private String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}