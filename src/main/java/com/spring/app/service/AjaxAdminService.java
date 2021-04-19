package com.spring.app.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.AdminAjaxDAO;
import com.spring.app.domain.AdminDTO;
import com.spring.app.domain.CardsDTO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.domain.UsersDTO;

@Service
public class AjaxAdminService {
	AdminAjaxDAO dao;
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<PlaceDTO> listAccommodation(int from, int pageRows, int contentTypeId){
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.selectPlaceRow(from, pageRows, contentTypeId);
	}
	
	public List<PlaceDTO> listRestarurant(int from, int pageRows, int contentTypeId){
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.selectPlaceRow(from, pageRows, contentTypeId);
	}
	
	public List<PlaceDTO> listSights(int from, int pageRows, int contentTypeId){
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.selectPlaceRow(from, pageRows, contentTypeId);
	}
	
	public int count(int contentTypeId) {
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.placeCountAll(contentTypeId);
	}
	public int calenderCount() {
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.calenderCountAll();
	}

	public int CardsCount() {
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.CardsCountAll();
	}

	public int UsersCount() {
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.UsersCountAll();
	}
	
	public List<PlaceDTO> listCalender(int from, int pageRows){
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.selectCalenderRow(from, pageRows);
	}

	public List<CardsDTO> listCards(int from, int pageRows){
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.selectCardsRow(from, pageRows);
	}

	public List<AdminDTO> listUsers(int from, int pageRows){
		dao = sqlSession.getMapper(AdminAjaxDAO.class);
		return dao.selectUsersRow(from, pageRows);
	}
	
	public int deleteByUid(int [] uids,int  type) {
		dao = sqlSession.getMapper(AdminAjaxDAO.class); // MyBatis 사용
		if (type == 1) {
			return dao.deleteCalenderByUid(uids);
		}else {
			return dao.deleteCardsByUid(uids);
		}
		
	}
	
	public int restoreByUid(int [] uids,int  type) {
		dao = sqlSession.getMapper(AdminAjaxDAO.class); // MyBatis 사용
		if (type == 1) {
			return dao.restoreCalenderByUid(uids);
		} else {
			return dao.restoreCardsByUid(uids);
		}
		
	}


}