package kr.or.ddit.components.calendar.service;

import java.util.List;

import kr.or.ddit.components.calendar.vo.CalVO;

public interface ICalMapper {

	public List<CalVO> list(CalVO cal);

	public void insert(CalVO cal);

	public CalVO selectone(int schdlNo);

	public void update(CalVO cal);

	public List<CalVO> gubunList(CalVO cal);

	public void delete(int schdlNo);

	public String selectThColor(int thNo);

}
