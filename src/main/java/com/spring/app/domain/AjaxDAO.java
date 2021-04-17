package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface AjaxDAO {

	
	public List<PlaceDTO> selectPlaceRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("contentTypeId") int contentTypeId
			);
	
	public List<LogDTO> selectLogCount(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("startDate") String startDate,
			@Param("endDate") String endDate
			);
	
	public int countAll();
	
}
