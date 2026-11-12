package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface AdminAjaxDAO {

	
	public List<PlaceDTO> selectPlaceRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("contentTypeId") int contentTypeId
			);

	public List<PlaceDTO> selectSearchPlaceRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("contentTypeId") int contentTypeId,
			@Param("keyword") String keyword
			);
	
	public List<LogDTO> selectLogCount(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("startDate") String startDate,
			@Param("endDate") String endDate
			);
	
	public List<PlaceDTO> selectCalenderRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows
			);

	public List<PlaceDTO> selectSearchCalenderRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("keyword") String keyword
			);

	public List<CardsDTO> selectCardsRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows
			);

	public List<CardsDTO> selectSearchCardsRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("keyword") int keyword
			);

	public List<AdminDTO> selectUsersRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows
			);

	public List<AdminDTO> selectSearchUsersRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("keyword") String keyword
			);
	
	public int placeCountAll(
			@Param("contentTypeId") int contentTypeId
			);
	public int placeSearchCountAll(
			@Param("contentTypeId") int contentTypeId,
			@Param("keyword") String keyword
			);
	public int calenderCountAll();

	public int calenderSearchCountAll(
			@Param("keyword") String keyword
			);
	
	public int CardsCountAll();
	
	public int UsersCountAll();

	public int UsersSearchCountAll(
			@Param("keyword") String keyword
			);
	
	public int deleteCalenderByUid(int [] uids);
	
	public int restoreCalenderByUid(int [] uids);

	public int deleteCardsByUid(int [] uids);
	
	public int restoreCardsByUid(int [] uids);

	public int grantUsersByUid(int [] uids);
	
	public int revokeUsersByUid(int [] uids);
	
}
