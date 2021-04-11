package com.spring.app.service;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.HomeDAO;

@Service
public class HomeService {
	
	HomeDAO dao;
	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	public void saveLog() {
		dao = sqlSession.getMapper(HomeDAO.class);
		String logContent;
		logContent = "log] " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm:ss")) + " visit";
		dao.insertLog(logContent);
		
	}
	
}
