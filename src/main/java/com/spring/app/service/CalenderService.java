package com.spring.app.service;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.CalenderDAO;
import com.spring.app.domain.CalenderDTO;
import com.spring.app.domain.MemoDTO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.domain.TourLikeDTO;
import com.spring.app.domain.TourLocationDTO;

@Service
public class CalenderService {
	
	CalenderDAO dao;
	
	private SqlSession sqlSession;
	
	@Autowired
	ServletContext servletContext;
	
	@Autowired
	public void setSqlSession(SqlSession sqlSession) {
		System.out.println("SqlSession() 생성");
		this.sqlSession = sqlSession;
	}
	
	// 디폴트 생성자
	public CalenderService() {
		super();
		System.out.println("CalenderService() 생성");
	}
	
	// 여행게시판 글 쓰기
	public int insert(CalenderDTO dto) throws IllegalStateException, IOException {
		
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		// String으로 입력받은 여행시작날짜, 여행종료날짜를
		// Date로 형변환하기
		String strStartDate = dto.getTu_start_tour();
		String strEndDate = dto.getTu_end_tour();
		
		Date startDate = Date.valueOf(strStartDate);
		Date endDate = Date.valueOf(strEndDate);
		
		startDate.getTime();
		
		// period(기간) 계산하기
		long calDate = endDate.getTime() - startDate.getTime();
		long period = calDate / (24 * 60 * 60 * 1000) + 1;
		
		dto.setTu_period(period);
		
		int result = dao.insert(dto);
		
		return result;

	}
	
	// 여행게시판 장소 검색하기
	public List<PlaceDTO> placeSearch(String keyword, String contentType) throws Exception {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.placeSearch(keyword, contentType);
	}
	
	// 여행게시판 메모 추가하기
	public int insertMemo(MemoDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.insertMemo(dto);
	}
	
	// 여행게시판 장소 추가하기
	public int insertTL(TourLocationDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.insertTL(dto);
	}
	
	// 여행게시판 글 하나 읽기
	public CalenderDTO selectOne(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.selectOne(dto);
	}
	
	// 여행게시판 글 1개의 메모 읽어 오기
	public List<MemoDTO> listMemo(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.listMemo(dto);
	}
	
	// 여행게시판 글 1개의 장소 읽어 오기
	public List<TourLocationDTO> listTL(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.listTL(dto);
	}
	
	// 여행게시판 글 전체 읽기
	public List<CalenderDTO> selectList(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.selectList(dto);
	}
	
	// 여행게시판 글 검색하기
	public List<CalenderDTO> tourSearch(String keyword) throws Exception {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.tourSearch(keyword);
	}
	
	// 여행게시판 페이징
	public int CountOfTour() throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.CountOfTour();
	}
	
	// 여행게시판 글 하나의 메모 삭제하기
	public int deleteMemo(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.deleteMemo(dto);
	}
	// 여행게시판 글 하나의 장소 삭제하기	
	public int deleteTL(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
	
		return dao.deleteTL(dto);
	}
	
	// 여행게시판 글 수정하기
	public int update(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.update(dto);
	}
	
	// 여행게시판 글 삭제하기
	public int delete(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
		
		return dao.delete(dto);
	}
	
	// 좋아요
	public int TourLikeCount(CalenderDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalenderDAO.class);
	
		return dao.TourLikeCount(dto);
	}
	
	// 좋아요 여부
	public TourLikeDTO TourLike(TourLikeDTO dto) throws IllegalStateException, IOException{
		dao = sqlSession.getMapper(CalenderDAO.class);
	
		return dao.TourLike(dto);
	}
	
	// 좋아요 생성 
	public int addTourLike(TourLikeDTO dto) throws IllegalStateException, IOException{
		dao = sqlSession.getMapper(CalenderDAO.class);
	
		return dao.addTourLike(dto);
	}
	
	// 좋아요 삭제
	public int delTourLike(TourLikeDTO dto) throws IllegalStateException, IOException{
		dao = sqlSession.getMapper(CalenderDAO.class);
	
		return dao.delTourLike(dto);
	}
	
	// 조회수
	public int TourHits(CalenderDTO dto) throws IllegalStateException, IOException{
		dao = sqlSession.getMapper(CalenderDAO.class);
	
		return dao.TourHits(dto);
	}
	

	
}
