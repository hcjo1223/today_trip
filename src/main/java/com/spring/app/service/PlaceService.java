package com.spring.app.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.PlaceDAO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.domain.ReviewDAO;
import com.spring.app.domain.ReviewDTO;

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
	
	
	ReviewDAO dao2;
	
	public int reviewCount(int pl_uid) throws Exception {
		dao2 = sqlSession.getMapper(ReviewDAO.class);
		return dao2.reviewCount(pl_uid);
	}
	
	public List<ReviewDTO> reviewList(int pl_uid, int from, int pageRows) throws Exception {
		dao2 = sqlSession.getMapper(ReviewDAO.class);
		return dao2.reviewList(pl_uid, from, pageRows);
	}
	
	public int reviewInsert(ReviewDTO dto) throws Exception{
		dao2 = sqlSession.getMapper(ReviewDAO.class);
		return dao2.reviewInsert(dto);
	}
	
	public int reviewUpdate(ReviewDTO dto) throws Exception{
		dao2 = sqlSession.getMapper(ReviewDAO.class);
		return dao2.reviewUpdate(dto);
	}
	
	public int reviewDelete(int re_uid) throws Exception{
		dao2 = sqlSession.getMapper(ReviewDAO.class);
		return dao2.reviewDelete(re_uid);
	}
	
}