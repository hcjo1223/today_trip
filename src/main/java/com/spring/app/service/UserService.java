package com.spring.app.service;import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.spring.app.domain.LoginDTO;
import com.spring.app.domain.UsersDTO;

public interface UserService {
	public void register(UsersDTO usersDTO) throws Exception;
	
	public void registerAuth(UsersDTO usersDTO) throws Exception;
	
	public UsersDTO login(LoginDTO loginDTO) throws Exception;
	
	public void keepLogin(String userId, String sessionId, Date next) throws Exception;
	
	public UsersDTO checkLoginBefore(String value) throws Exception;
	
	public void update(UsersDTO usersDTO) throws Exception;
	
	public void updateImage(String userId, String userPic) throws Exception;

	
	//사진 게시판의 사진 가져오기

}
