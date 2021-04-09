package com.spring.app.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.AdminDAO;
import com.spring.app.domain.PlaceDTO;

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
}
