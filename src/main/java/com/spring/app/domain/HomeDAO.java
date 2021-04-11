package com.spring.app.domain;


import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface HomeDAO {

	// 로그 데이터 db에 저장
	void insertLog(String logContent);
	
}
