package com.spring.app.domain;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UsersDAOImpl implements UsersDAO{

	private final String NAMESPACE = "com.spring.app.domain.UsersDAO";
	@Inject SqlSession session;
	
	@Override
	public void register(UsersDTO usersDTO) throws Exception {
		session.insert(NAMESPACE + ".register",usersDTO);
	}
	
	
	
	@Override
	public UsersDTO login(LoginDTO loginDTO) throws Exception {
		return session.selectOne(NAMESPACE + ".login", loginDTO);
	}
	
	
	@Override
	public void update(UsersDTO usersDTO) throws Exception{
		session.update(NAMESPACE + ".update",usersDTO);
	}
	
}
