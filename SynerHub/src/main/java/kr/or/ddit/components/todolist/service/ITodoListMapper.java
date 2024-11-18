package kr.or.ddit.components.todolist.service;

import java.util.List;

import kr.or.ddit.components.todolist.vo.TodoListVO;

public interface ITodoListMapper {

	public List<TodoListVO> tdlList(TodoListVO todoListVO);

	public void insertTdlTask(TodoListVO todoListVO);
	
	public TodoListVO selectTdl(TodoListVO todoListVO);

	public int deleteTdlTask(int tdlNo);

	public int updateTdlTask(TodoListVO todoListVO);

	public int updateTdlState(TodoListVO todoListVO);

	public int deleteTaskAll(List<Integer> tdlNos);

	public void insertTdlList(TodoListVO todoListVO);

}
