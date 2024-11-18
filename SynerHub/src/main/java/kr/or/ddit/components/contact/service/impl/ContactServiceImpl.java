package kr.or.ddit.components.contact.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.contact.service.ContactMapper;
import kr.or.ddit.components.contact.service.IContactService;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Primary
@Slf4j
@Service
public class ContactServiceImpl implements IContactService {

	@Inject
	private ContactMapper mapper;

	@Override
	public List<MemberVO> getContactList(int chNo, int memNo) {
		List<MemberVO> contactList = mapper.getContactList(chNo, memNo);
	    return contactList;
	}


	
}
