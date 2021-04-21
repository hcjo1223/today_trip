package com.spring.app.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.spring.app.domain.AdminDAO;
import com.spring.app.domain.CalendarDTO;
import com.spring.app.domain.LogDTO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.domain.UsersDTO;

@Service
public class AdminService {

		AdminDAO dao;
		
		private SqlSession sqlSession;

		@Autowired
		public void setSqlSession(SqlSession sqlSession) {
			this.sqlSession = sqlSession;
		}
		
		public List<PlaceDTO> listAdminPlaceA(){
			dao = sqlSession.getMapper(AdminDAO.class);
			return dao.selectAdminPlaceA();
		}
		
		public List<PlaceDTO> listAdminPlaceR(){
			dao = sqlSession.getMapper(AdminDAO.class);
			return dao.selectAdminPlaceR();
		}

		public List<PlaceDTO> listAdminPlaceS(){
			dao = sqlSession.getMapper(AdminDAO.class);
			return dao.selectAdminPlaceS();
		}
		
		public List<PlaceDTO> listHomePlace(){
			dao = sqlSession.getMapper(AdminDAO.class);
			return dao.selectHomePlace();
		}

		public List<CalendarDTO> listHomeCalender(){
			dao = sqlSession.getMapper(AdminDAO.class);
			return dao.selectHomeCalender();
		}
		
		public List<UsersDTO> listHomeUsers(){
			dao = sqlSession.getMapper(AdminDAO.class);
			return dao.selectHomeUsers();
		}
		
		public List<LogDTO> listLogCount() {
			dao = sqlSession.getMapper(AdminDAO.class);
			String startDate = LocalDateTime.now().minusDays(7).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			String endDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			return dao.selectLogCount(startDate, endDate);
		}
		
	
	
		
}
