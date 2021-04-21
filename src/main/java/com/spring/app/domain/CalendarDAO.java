package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface CalendarDAO {
	
	// 여행게시판 글 쓰기
	public abstract int insert(CalendarDTO dto);
	
	// 여행게시판 메모 추가하기
	public abstract int insertMemo(MemoDTO dto);
		
	// 여행게시판 장소 검색하기
//	public abstract List<PlaceDTO> placeSearch(String keyword, String contentType);
	public abstract List<PlaceDTO> placeSearch(@Param("keyword") String keyword, @Param("contentType") String contentType) throws Exception;

	// 여행게시판 장소 추가하기
	public abstract int insertTL(TourLocationDTO dto);
	
	// 여행게시판 글 하나 읽기
	public abstract CalendarDTO selectOne(CalendarDTO dto);

	// 여행게시판 글 1개의 메모 읽기
	public abstract List<MemoDTO> listMemo(CalendarDTO dto);
	
	// 여행게시판 글 1개의 장소 읽기
	public abstract List<TourLocationDTO> listTL(CalendarDTO dto);
	
	// 여행게시판 글 전체 읽기
	public abstract List<CalendarDTO> selectList(CalendarDTO dto);
	
	// 여행게시판 페이징
	public abstract int CountOfTour();

	// 여행게시판 글 1개의 메모 삭제하기
	public abstract int deleteMemo(CalendarDTO dto);

	// 여행게시판 글 1개의 장소 삭제하기
	public abstract int deleteTL(CalendarDTO dto);		

	// 여행게시판 글 수정하기
	public abstract int update(CalendarDTO dto);
	
	// 여행게시판 글 삭제하기
	public abstract int delete(CalendarDTO dto);
	
	// 좋아요
	public abstract int TourLikeCount(CalendarDTO dto);
	// 조회수
	public abstract int TourHits(CalendarDTO dto);
	
}
