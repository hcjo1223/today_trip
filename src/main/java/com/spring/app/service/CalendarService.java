package com.spring.app.service;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.app.domain.CalendarDAO;
import com.spring.app.domain.CalendarDTO;
import com.spring.app.domain.MemoDTO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.domain.TourLocationDTO;

@Service
public class CalendarService {
	
	CalendarDAO dao;
	
	private SqlSession sqlSession;
	
	@Autowired
	ServletContext servletContext;
	
	@Autowired
	public void setSqlSession(SqlSession sqlSession) {
		System.out.println("SqlSession() 생성");
		this.sqlSession = sqlSession;
	}
	
	// 디폴트 생성자
	public CalendarService() {
		super();
		System.out.println("CalendarService() 생성");
	}
	
	// 여행게시판 글 쓰기
	public int insert(CalendarDTO dto) throws IllegalStateException, IOException {
		
		dao = sqlSession.getMapper(CalendarDAO.class);
		
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
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.placeSearch(keyword, contentType);
	}
	
	// 여행게시판 메모 추가하기
	public int insertMemo(MemoDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.insertMemo(dto);
	}
	
	// 여행게시판 장소 추가하기
	public int insertTL(TourLocationDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.insertTL(dto);
	}
	
	// 여행게시판 글 하나 읽기
	public CalendarDTO selectOne(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.selectOne(dto);
	}
	
	// 여행게시판 글 1개의 메모 읽어 오기
	public List<MemoDTO> listMemo(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.listMemo(dto);
	}
	
	// 여행게시판 글 1개의 장소 읽어 오기
	public List<TourLocationDTO> listTL(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.listTL(dto);
	}
	
	// 여행게시판 글 전체 읽기
	public List<CalendarDTO> selectList(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.selectList(dto);
	}
	
	// 여행게시판 페이징
	public int CountOfTour() throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.CountOfTour();
	}
	
	// 여행게시판 글 하나의 메모 삭제하기
	public int deleteMemo(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.deleteMemo(dto);
	}
	// 여행게시판 글 하나의 장소 삭제하기	
	public int deleteTL(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
	
		return dao.deleteTL(dto);
	}
	
	// 여행게시판 글 수정하기
	public int update(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.update(dto);
	}
	
	// 여행게시판 글 삭제하기
	public int delete(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
		
		return dao.delete(dto);
	}
	
	// 좋아요
	public int TourLikeCount(CalendarDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CalendarDAO.class);
	
		return dao.TourLikeCount(dto);
	}
	
	// 조회수
	public int TourHits(CalendarDTO dto) throws IllegalStateException, IOException{
		dao = sqlSession.getMapper(CalendarDAO.class);
	
		return dao.TourHits(dto);
	}
	

	
}
