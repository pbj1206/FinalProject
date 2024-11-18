package kr.or.ddit.components.todolist.web;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.components.board.qna.vo.QnaVO;
import kr.or.ddit.components.todolist.service.ITodoListService;
import kr.or.ddit.components.todolist.vo.TodoListVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/todolist")
public class TodoListController {
	
	@Inject
    private ITodoListService tdlService;
	
	
	// 업무 리스트
	@PostMapping("/list")
    public ResponseEntity<List<TodoListVO>> TdlList(@RequestBody TodoListVO todoListVO) {
        log.info("TdlList() 실행 !!!");
        log.info("TO DO LIST NUMBER: " + todoListVO.getTdlNo());
        List<TodoListVO> tdlList = tdlService.tdlList(todoListVO); // Todo List 목록 가져오기
        
        log.info("TdlList: {}", tdlList); 
        
        return new ResponseEntity<List<TodoListVO>>(tdlList, HttpStatus.OK); // 200 OK 응답과 함께 목록 반환
    }
	
	
	// 업무 추가
	@PostMapping("/register")
	public ResponseEntity<TodoListVO> insertTdlTask(@RequestBody TodoListVO todoListVO) {
	    log.info("insertTdlTask() 실행 !!!");
	    
	    tdlService.insertTdlTask(todoListVO);
	    
	    todoListVO = tdlService.selectTdl(todoListVO);

	    return new ResponseEntity<>(todoListVO, HttpStatus.OK);
	}
	
	
	// 업무 삭제
	@GetMapping("/delete/{tdlNo}")
	public ResponseEntity<String> deleteTdlTask(@PathVariable int tdlNo){
    	log.info("deleteTdlTask() 실행 !!!");
		String res = "";
		if(tdlService.deleteTdlTask(tdlNo) < 1) {
			res = "삭제 완료.";
		} else { 
			res = "삭제 실패";
		}
		
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	
	// 업무 수정
	@ResponseBody
    @PostMapping("/update")
    public ResponseEntity<String> updateTdlTask(@RequestBody TodoListVO todoListVO) {
        log.info("updateTdlTask() 실행 !!!");
        
        int cnt = tdlService.updateTdlTask(todoListVO);
        log.info("성공실패 여부" + cnt);
        
        String flag = "false";
        
        HttpStatus status = HttpStatus.BAD_REQUEST;
        
        if(cnt > 0) {
        	flag = "true";
        	status = HttpStatus.OK;
        }
        
        return new ResponseEntity<>(flag, status); // 수정 실패 시 400 응답
    }

	
	// 드래그로 업무 상태 수정
	@ResponseBody
	@PostMapping("/updateState")
	public ResponseEntity<String> updateTdlState(@RequestBody TodoListVO todoListVO) {
	    log.info("updateTdlState() 실행 !!!");
	    
	    String flag = "false";
	    HttpStatus status = HttpStatus.BAD_REQUEST;

	    try {
	        // tdlState 업데이트 로직
	        int result = tdlService.updateTdlState(todoListVO);
	        log.info("성공실패 여부: " + result);
	        
	        if (result > 0) {
	            flag = "true";
	            status = HttpStatus.OK;
	        }
	    } catch (Exception e) {
	        log.error("업데이트 중 오류 발생: ", e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류: " + e.getMessage());
	    }
	    
	    return new ResponseEntity<>(flag, status); // 수정 실패 시 400 응답
	}
	
	
	// 목록 비우기
	// 할 일 삭제
    @PostMapping("/deleteTaskAll")
    public ResponseEntity<String> deleteTaskAll(@RequestBody List<Integer> tdlNos) {
        String res;
        try {
            // tdlNo를 이용해 할 일 삭제
            int cnt = tdlService.deleteTaskAll(tdlNos);
            
            if (cnt > 0) {
                res = "삭제 완료.";
            } else {
                res = "삭제 실패";
            }
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res = "삭제 실패: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }


    // 목록 추가
 	@PostMapping("/addList")
 	public ResponseEntity<TodoListVO> insertTdlList(@RequestBody TodoListVO todoListVO) {
 	    log.info("insertTdlList() 실행 !!!");
 	    
 	    tdlService.insertTdlList(todoListVO);
 	    
 	    return new ResponseEntity<>(todoListVO, HttpStatus.OK);
 	}
}
