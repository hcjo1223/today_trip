package com.spring.app.domain;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface AdminDAO {

		// 관리자 페이지 장소 select (숙소)
		List<PlaceDTO> selectAdminPlaceA();
		// 관리자 페이지 장소 select (식당)
		List<PlaceDTO> selectAdminPlaceR();
		// 관리자 페이지 장소 select (관광지)
		List<PlaceDTO> selectAdminPlaceS();
	
}
