
package com.spring.app.service;

import java.io.PrintWriter;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.spring.app.domain.UsersDAO;
import com.spring.app.domain.UsersDAOImpl;
import com.spring.app.domain.UsersDTO;

@Service
public class UsersServiceImpl implements UserService{
	
	@Inject UsersDAO dao;
	
	@Override
	public void register(UsersDTO usersDTO) throws Exception{
		
		dao.register(usersDTO);
	}
	
	@Override
	public UsersDTO login(UsersDTO usersDTO) throws Exception{
		return dao.login(usersDTO);
	}
	
	@Override
	public void update(UsersDTO usersDTO) throws Exception{
		dao.update(usersDTO);
	}
}
