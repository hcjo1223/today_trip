package com.spring.app.service;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.HomeDAO;
import com.spring.app.domain.HomeDTO;
import com.spring.app.domain.picLibDTO;

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
		String nowDate;
		
		logContent = "log] " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm:ss")) + " visit";
		nowDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		dao.insertLog(logContent, nowDate);
		
	}
	public List<picLibDTO> listPopularPic() {
		
		String startDate;
		String endDate;
		
		startDate = LocalDateTime.now().minusDays(30).format(DateTimeFormatter.ofPattern("yy-MM-dd"));
		endDate = LocalDateTime.now().plusDays(1).format(DateTimeFormatter.ofPattern("yy-MM-dd"));
		
		System.out.println(dao.selectPopularPic(startDate, endDate));
		return dao.selectPopularPic(startDate, endDate);
		
		
	}
	public List<HomeDTO> listHomeCalender() {
		return dao.selectHomeCalender();
	}
	public List<HomeDTO> listHomePic() {
		return dao.selectHomePic();
	}
	
}
