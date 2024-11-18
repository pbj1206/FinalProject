package kr.or.ddit.components.equipment.web;

import java.io.File;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.declaration.web.MediaUtils;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.equipment.service.IEquipmentService;
import kr.or.ddit.components.equipment.vo.EquipmentCateVO;
import kr.or.ddit.components.equipment.vo.EquipmentUsingVO;
import kr.or.ddit.components.equipment.vo.EquipmentVO;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/equipment")
public class EquipmentController {

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IEquipmentService eqpService;

	@Inject
	private IAtchFileService atchFileService;

	@PostMapping("/cateList")
	public ResponseEntity<List<EquipmentCateVO>> cateList(@RequestBody EquipmentCateVO eqpCateVO) {
		List<EquipmentCateVO> cateList = eqpService.cateList(eqpCateVO);
		return new ResponseEntity<List<EquipmentCateVO>>(cateList, HttpStatus.OK);
	}

	@PostMapping("/cateInsert")
	public ResponseEntity<String> cateInsert(@RequestBody EquipmentCateVO eqpCateVO) {
		eqpService.cateInsert(eqpCateVO);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@PostMapping("/cateUpdate")
	public ResponseEntity<String> cateUpdate(@RequestBody EquipmentCateVO eqpCateVO) {
		eqpService.cateUpdate(eqpCateVO);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@PostMapping("/cateDelete")
	public ResponseEntity<String> cateDelete(@RequestBody EquipmentCateVO eqpCateVO) {
		eqpService.cateDelete(eqpCateVO.getEqpmntCateNo());
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@RequestMapping(value = "/eqpInsert", method = RequestMethod.POST)
	public ResponseEntity<String> eqpInsert(EquipmentVO eqpVO) {
		// 첨부파일 정보 등록
		if (eqpVO.getEqpFileList() != null && !eqpVO.getEqpFileList().isEmpty()) {
			AtchFileVO atchFileVO = new AtchFileVO();
			atchFileVO.setAtchFileExpln("equipment");

			// 첨부파일 정보를 DB에 저장하고 ID를 받아옴
			atchFileService.insert(atchFileVO);
			int eqpAtchFileId = atchFileVO.getAtchFileId();
			for (MultipartFile file : eqpVO.getEqpFileList()) {
				try {
					String savePath = uploadFile(file.getOriginalFilename(), file.getBytes());

					AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
					atchFileDetailVO.setAtchFileId(eqpAtchFileId); // 받아온 ID 설정
					atchFileDetailVO.setAtchFilePath(savePath);
					atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
					atchFileDetailVO.setAtchFileSize((Long) file.getSize());
					atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
					atchFileDetailVO.setAtchFileSaveNm(savePath);

					atchFileService.insertDetail(atchFileDetailVO);
				} catch (Exception e) {
					log.error("저장 오류 : {}", e.getMessage());
				}
			}
			eqpVO.setEqpAtchFileId(eqpAtchFileId);
		}
		if (eqpVO.getType().equals("update")) {
			eqpService.eqpUpdate(eqpVO);
			return new ResponseEntity<String>("비품이 정상적으로 변경되었습니다.", HttpStatus.OK);
		} else {
			eqpService.eqpInsert(eqpVO);
			return new ResponseEntity<String>("비품이 정상적으로 저장되었습니다.", HttpStatus.OK);
		}
	}

	private String uploadFile(String originalFileName, byte[] fileData) throws Exception {
		UUID uuid = UUID.randomUUID();

		// UUID_원본 파일명
		String createdFileName = uuid.toString() + "_" + originalFileName;

		String os = System.getProperty("os.name").toLowerCase();
		if (os.contains("mac")) {
			localPath = uploadPathForMac;
		}

		String savedPath = UploadFileUtiles.calcPath(localPath);
		File file = new File(localPath + "equipment/" + savedPath);
		if (!file.exists()) {
			file.mkdirs();
		}

		File target = new File(localPath + "equipment/" + savedPath.replaceFirst("/", ""), createdFileName);
		FileCopyUtils.copy(fileData, target);

		String formatName = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
		String uploadFileName = resourcePath + "equipment" + savedPath.replace(File.separatorChar, '/') + "/"
				+ createdFileName;

		if (MediaUtils.getMediaType(formatName) != null) {
			UploadFileUtiles.makeThumbnail((localPath + "equipment/"), savedPath, createdFileName);
		}

		return uploadFileName;
	}

	private String getFileExtension(String filename) {
		return filename.substring(filename.lastIndexOf(".") + 1);
	}

	@PostMapping("/eqpList")
	public ResponseEntity<PagingVO<EquipmentVO>> eqpList(@RequestBody PagingVO<EquipmentVO> pagingVO) {
		
		// 전체 개시글 수
		int total = eqpService.equipmentTotal(pagingVO);
		// 페이지 전체 글수 vo에 저장
		pagingVO.setTotal(total);
		
		// 자원 리스트 목록 가져오기
		List<EquipmentVO> eqpList = eqpService.selectList(pagingVO);
		// 리스트 목록 vo에 저장
		pagingVO.setList(eqpList);
		
		return new ResponseEntity<PagingVO<EquipmentVO>>(pagingVO, HttpStatus.OK);
	}

	@PostMapping("/eqpDetail")
	public ResponseEntity<EquipmentVO> eqpDetail(@RequestBody EquipmentVO eqpVO) {
		eqpVO = eqpService.selectOne(eqpVO);
		return new ResponseEntity<EquipmentVO>(eqpVO, HttpStatus.OK);
	}

	@PostMapping("/eqpDelete")
	public ResponseEntity<String> eqpDelete(@RequestBody EquipmentVO eqpVO) {
		eqpService.eqpDelete(eqpVO.getEqpmntNo());
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@PostMapping("/eqpUnable")
	public ResponseEntity<String> eqpUnable(@RequestBody EquipmentVO eqpVO) {
		eqpService.eqpUnable(eqpVO);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@PostMapping("/eqpUsingInsert")
	public ResponseEntity<String> eqpUsingInsert(@RequestBody EquipmentUsingVO eqpUseVO) {
		eqpService.eqpUsingInsert(eqpUseVO);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@PostMapping("/getChUser")
	public ResponseEntity<EquipmentVO> getChUser(@RequestBody EquipmentVO eqpVO) {
		EquipmentVO getUser = eqpService.getChUser(eqpVO);
		return new ResponseEntity<EquipmentVO>(getUser, HttpStatus.OK);
	}
}