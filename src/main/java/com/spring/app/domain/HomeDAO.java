package com.spring.app.domain;


import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface HomeDAO {

	// 로그 데이터 db에 저장
	void insertLog(@Param("logContent") String logContent,@Param("nowDate") String nowDate);
	
}
