package com.spring.app.domain;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface PlaceDAO {

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
