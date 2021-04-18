package com.spring.app.domain;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
	
	//로그인 유지기능 
	@Override
	public void keepLogin(String userId, String sessionId, Date sessionLimit) throws Exception{
	Map<String, Object> paramMap = new HashMap<String, Object>();
	paramMap.put("userId", userId);
	paramMap.put("sessionId", sessionId);
	paramMap.put("sessionLimit", sessionLimit);
	
	session.update(NAMESPACE + ".keepLogin", paramMap);
	}
	
	@Override
	public UsersDTO checkUserWithSessionKey(String value) throws Exception{
		return session.selectOne(NAMESPACE + ".checkUserWithSessionKey" , value);
	}
	@Override
	public void update(UsersDTO usersDTO) throws Exception{
		session.update(NAMESPACE + ".update",usersDTO);
	}
	
}
