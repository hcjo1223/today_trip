package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface CardsDAO {
	// 전체 select
	public abstract List<CardsDTO> select();
	
	// 새글작성
	public abstract int insert(int usuid, CardsDTO dto);
	public abstract int insertLib(picLibDTO dto);
	
	// 특정 uid 글 내용 읽기 조회수 증가
	public abstract List<CardsDTO> selectByUid(int uid);
	public abstract List<picLibDTO> selectFileByUid(int uid);
	public abstract int incHits(int uid);
	// 특정 uid 글 수정
	public abstract int update(int uid, @Param("a")CardsDTO dto);
	
	
	// 특정 uid 글 삭제하기
	public abstract int deleteByUid(int uid);
	
	public abstract int deleteFileByUid(int uid);
	
	
}