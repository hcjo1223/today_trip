package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface CalenderDAO {
	
	// 여행게시판 글 쓰기
	public abstract int insert(CalenderDTO dto);
	
	// 여행게시판 메모 추가하기
	public abstract int insertMemo(MemoDTO dto);
		
	// 여행게시판 장소 검색하기
//	public abstract List<PlaceDTO> placeSearch(String keyword, String contentType);
	public abstract List<PlaceDTO> placeSearch(@Param("keyword") String keyword, @Param("contentType") String contentType) throws Exception;

	// 여행게시판 장소 추가하기
	public abstract int insertTL(TourLocationDTO dto);
	
	// 여행게시판 글 하나 읽기
	public abstract CalenderDTO selectOne(CalenderDTO dto);

	// 여행게시판 글 1개의 메모 읽기
	public abstract List<MemoDTO> listMemo(CalenderDTO dto);
	
	// 여행게시판 글 1개의 장소 읽기
	public abstract List<TourLocationDTO> listTL(CalenderDTO dto);
	
	// 여행게시판 글 전체 읽기
	public abstract List<CalenderDTO> selectList(CalenderDTO dto);
	
	// 여행게시판 페이징
	public abstract int CountOfTour();

	// 여행게시판 글 1개의 메모 삭제하기
	public abstract int deleteMemo(CalenderDTO dto);

	// 여행게시판 글 1개의 장소 삭제하기
	public abstract int deleteTL(CalenderDTO dto);		

	// 여행게시판 글 수정하기
	public abstract int update(CalenderDTO dto);
	
	// 여행게시판 글 삭제하기
	public abstract int delete(CalenderDTO dto);
	
	// 좋아요
	public abstract int TourLikeCount(CalenderDTO dto);
	// 조회수
	public abstract int TourHits(CalenderDTO dto);
	
}
