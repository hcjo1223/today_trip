package com.spring.app.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.CalenderDTO;
import com.spring.app.domain.CalenderDTO;
import com.spring.app.domain.CardsDTO;
import com.spring.app.domain.UsersDTO;
import com.spring.app.domain.UsersProfileDAO;

@Service
public class UserProfileService {
	UsersProfileDAO dao;
	
	private SqlSession session;
	
	@Autowired
	public void setSqlSession(SqlSession sqlsession) {
		this.session = sqlsession;
	}
	
	public List<CalenderDTO> selectUserCalender() {
		dao = session.getMapper(UsersProfileDAO.class);
		return dao.selectUserCalender();
	}
	
	public List<CardsDTO> selectUserCards(){
		dao = session.getMapper(UsersProfileDAO.class);
		return dao.selectUserCards();
	}
	
	public List<UsersDTO> selectUserInfo(){
		dao = session.getMapper(UsersProfileDAO.class);
		return dao.selectUsersInfo();
	}
	
}
