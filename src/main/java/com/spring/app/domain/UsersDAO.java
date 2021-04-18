package com.spring.app.domain;

public interface UsersDAO {
	public void register(UsersDTO usersDTO) throws Exception;
	
	public UsersDTO login(UsersDTO usersDTO) throws Exception;
	
	public void update(UsersDTO usersDTO) throws Exception;
	
}
