package kr.or.ddit.components.todolist.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.todolist.service.ITodoListMapper;
import kr.or.ddit.components.todolist.service.ITodoListService;
import kr.or.ddit.components.todolist.vo.TodoListVO;

@Service
@Primary
public class TodoListServiceImpl implements ITodoListService {
	
	@Inject
	private ITodoListMapper tdlMapper;

	@Override
	public List<TodoListVO> tdlList(TodoListVO todoListVO) {
		return tdlMapper.tdlList(todoListVO);
	}

	@Override
	public void insertTdlTask(TodoListVO todoListVO) {
		tdlMapper.insertTdlTask(todoListVO);
	}
	
	@Override
	public TodoListVO selectTdl(TodoListVO todoListVO) {
		return tdlMapper.selectTdl(todoListVO);
	}

	@Override 
	public int deleteTdlTask(int tdlNo) {
		return tdlMapper.deleteTdlTask(tdlNo);
	}

	@Override
	public int updateTdlTask(TodoListVO todoListVO) {
		return tdlMapper.updateTdlTask(todoListVO);
	}

	@Override
	public int updateTdlState(TodoListVO todoListVO) {
		return tdlMapper.updateTdlState(todoListVO);
	}

	@Override
	public int deleteTaskAll(List<Integer> tdlNos) {
		return tdlMapper.deleteTaskAll(tdlNos);
	}

	@Override
	public void insertTdlList(TodoListVO todoListVO) {
		tdlMapper.insertTdlList(todoListVO);
	}

}
