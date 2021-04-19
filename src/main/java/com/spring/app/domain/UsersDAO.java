package com.spring.app.domain;

import java.util.Date;

public interface UsersDAO {
	
	// 회원가입
	public void register(UsersDTO usersDTO) throws Exception;
	
	// 로그인
	public UsersDTO login(LoginDTO loginDTO) throws Exception;
	
	// 로그인 유지 처리
	public void keepLogin(String userId, String sessionId, Date sessionLimit) throws Exception;
	
	// 세션키 검증
	public UsersDTO checkUserWithSessionKey(String value) throws Exception;

	public void update(UsersDTO usersDTO) throws Exception;
	
	
}
