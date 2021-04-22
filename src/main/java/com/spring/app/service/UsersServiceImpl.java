
package com.spring.app.service;

import java.io.PrintWriter;
import java.util.Date;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.spring.app.domain.LoginDTO;
import com.spring.app.domain.UsersDAO;
import com.spring.app.domain.UsersDAOImpl;
import com.spring.app.domain.UsersDTO;

@Service
public class UsersServiceImpl implements UserService{
	
	@Inject UsersDAO dao;
	
	@Override
	public void register(UsersDTO usersDTO) throws Exception{
		
		dao.register(usersDTO);
		System.out.println("레지스터 생성");
		
	}
	
	@Override
	public UsersDTO login(LoginDTO loginDTO) throws Exception{
		return dao.login(loginDTO);
	}
	
	@Override
	public void keepLogin(String userId, String sessionId, Date sessionLimit) throws Exception{
		dao.keepLogin(userId, sessionId, sessionLimit);
	}
	
	@Override
	public UsersDTO checkLoginBefore(String value) throws Exception{
		return dao.checkUserWithSessionKey(value);
	}
	
	@Override
	public void update(UsersDTO usersDTO) throws Exception{
		dao.update(usersDTO);
	}
	
	@Override
	public void updateImage(String userId, String userPic) throws Exception{
		dao.updateImage(userId, userPic);
	}

	@Override
	public void registerAuth(UsersDTO usersDTO) throws Exception {
		dao.registerAuth(usersDTO);
		
	}
	
	//사진 게시판의 사진 가져오기

}
