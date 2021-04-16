package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface PlaceDAO {

	/*
	 *  페이징용 SELECT
	 *  @Param from : 몇번째 row 부터
	 *  @Param pageRows : 몇개의 데이터(게시글)
	 *  @Return
	 */
	List<PlaceDTO> selectFromRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows);
	
	// 전체 글의 개수
	int countAll();
	
	// 전체 select
	List<PlaceDTO> select();
	
	// 특정 uid 글 내용 읽기, 조회수 증가
	// viewcnt 도 1 증가 해야 하고, 읽어와야 한다. --> 트랜잭션 처리
	List<PlaceDTO> readByUid(int contentId);
	
	// 특정 uid 글 내용 읽기
	List<PlaceDTO> selectByUid(int contentId);

	// 특정 uid 글 조회수 증가
	int incViewCnt(int uid);
}
