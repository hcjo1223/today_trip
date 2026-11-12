package com.spring.app.domain;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface PlaceLikeDAO {

	int createPlaceLike(
			@Param("place_uid") int place_uid,
			@Param("us_uid") int us_uid) throws Exception;
	
	int deletePlaceLike(
			@Param("place_uid") int place_uid,
			@Param("us_uid") int us_uid);
	
	int countPlaceLike(int place_uid);

	int chkPlaceLike(
			@Param("place_uid") int place_uid,
			@Param("us_uid") int us_uid) throws Exception;
}
