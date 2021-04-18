package com.spring.app.service;import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.spring.app.domain.UsersDTO;

public interface UserService {
	public void register(UsersDTO usersDTO) throws Exception;

	public UsersDTO login(UsersDTO usersDTO) throws Exception;
	
	public void update(UsersDTO usetsDTO) throws Exception;
	
}
