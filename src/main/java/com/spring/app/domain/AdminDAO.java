package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface AdminDAO {

		// 관리자 페이지 장소 select (숙소)
		List<PlaceDTO> selectAdminPlaceA();
		// 관리자 페이지 장소 select (식당)
		List<PlaceDTO> selectAdminPlaceR();
		// 관리자 페이지 장소 select (관광지)
		List<PlaceDTO> selectAdminPlaceS();
		
		
		
		// 관리자 페이지 log select (통계)
		List<LogDTO> selectLogCount(@Param("startDate") String startDate,@Param("endDate") String endDate);
	
		
		List<PlaceDTO> selectHomePlace();

		List<CalendarDTO> selectHomeCalender();

		List<UsersDTO> selectHomeUsers();
		
		
}
