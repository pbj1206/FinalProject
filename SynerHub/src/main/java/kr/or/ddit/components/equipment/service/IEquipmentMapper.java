package kr.or.ddit.components.equipment.service;

import java.util.List;

import kr.or.ddit.components.equipment.vo.EquipmentCateVO;
import kr.or.ddit.components.equipment.vo.EquipmentUsingVO;
import kr.or.ddit.components.equipment.vo.EquipmentVO;
import kr.or.ddit.vo.PagingVO;

public interface IEquipmentMapper {

	public List<EquipmentCateVO> cateList(EquipmentCateVO eqpCateVO);

	public void cateInsert(EquipmentCateVO eqpCateVO);

	public void cateUpdate(EquipmentCateVO eqpCateVO);

	public void cateDelete(int comDetailCdId);

	public void eqpInsert(EquipmentVO eqpVO);

	public List<EquipmentVO> selectList(PagingVO<EquipmentVO> pagingVO);

	public EquipmentVO selectOne(EquipmentVO eqpVO);

	public void eqpUpdate(EquipmentVO eqpVO);

	public void eqpDelete(int eqpmntNo);

	public void eqpUnable(EquipmentVO eqpVO);

	public void eqpUsingInsert(EquipmentUsingVO eqpUseVO);

	public void eqpUsingUpdate(int eqpNo);

	public List<EquipmentUsingVO> eqpLiveList(int chNo);

	public EquipmentUsingVO eqpUsingSelectOne(EquipmentUsingVO eqpUsingVo);

	public void eqpUsingLiveUpdate(EquipmentUsingVO eqpUsingVO);

	public void eqpUsingReturn(int logNo);

	public void eqpUsingReturnState(int logNo);
	
	public void eqpUnableUsingReturn(EquipmentVO eqpVO);

	public EquipmentVO getChUser(EquipmentVO eqpVO);

	public int equipmentTotal(PagingVO<EquipmentVO> pagingVO);

	public int eqpCount(EquipmentVO eqpVO);

	public int eqpUsingCount(EquipmentVO eqpVO);

	public int getChNo(int thNo);

}
