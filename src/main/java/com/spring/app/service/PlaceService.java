package com.spring.app.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.PlaceDAO;
import com.spring.app.domain.PlaceDTO;

@Service
public class PlaceService {

	PlaceDAO dao;
	
	// MyBatis
	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	public List<PlaceDTO> list(int from, int pageRows){
		dao = sqlSession.getMapper(PlaceDAO.class);
		return dao.selectFromRow(from, pageRows);
	}
	
	public int count() {
		dao = sqlSession.getMapper(PlaceDAO.class);
		return dao.countAll();
	}
	
	public List<PlaceDTO> list(){
		dao = sqlSession.getMapper(PlaceDAO.class);
		return dao.select();
	}
	
	public List<PlaceDTO> viewByUid(int contentId){
		dao = sqlSession.getMapper(PlaceDAO.class);
		
		dao.incViewCnt(contentId);
		
		return dao.selectByUid(contentId);
	}
	
}