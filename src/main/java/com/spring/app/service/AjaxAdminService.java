package com.spring.app.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.AjaxDAO;
import com.spring.app.domain.PlaceDTO;

@Service
public class AjaxAdminService {
	AjaxDAO dao;
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<PlaceDTO> listAccommodation(int from, int pageRows, int contentTypeId){
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.selectPlaceRow(from, pageRows, contentTypeId);
	}
	
	public List<PlaceDTO> listRestarurant(int from, int pageRows, int contentTypeId){
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.selectPlaceRow(from, pageRows, contentTypeId);
	}
	
	public List<PlaceDTO> listSights(int from, int pageRows, int contentTypeId){
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.selectPlaceRow(from, pageRows, contentTypeId);
	}
	
	public int count(int contentTypeId) {
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.placeCountAll(contentTypeId);
	}
	public int count() {
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.countAll();
	}
	
	public List<PlaceDTO> listCalender(int from, int pageRows){
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.selectCalenderRow(from, pageRows);
	}

	public List<PlaceDTO> listUsers(int from, int pageRows){
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.selectUsersRow(from, pageRows);
	}
	
	public int deleteByUid(int [] uids) {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		return dao.deleteByUid(uids);
	}
	
	public int restoreByUid(int [] uids) {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		return dao.restoreByUid(uids);
	}


}
