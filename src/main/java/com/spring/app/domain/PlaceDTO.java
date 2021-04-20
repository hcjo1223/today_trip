package com.spring.app.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter 
@AllArgsConstructor
@RequiredArgsConstructor
public class PlaceDTO {

	int numOfRows;
	int pageNo;
	int place_uid;
	@JsonProperty("contentid")
	int contentId;
	@JsonProperty("contenttypeid")
	int contentTypeId;
	String title;
	double mapx;
	double mapy;
	@JsonProperty("areacode")
	int areaCode;
	@JsonProperty("sigungucode")
	int sigunguCode;
	String addr1;
	String tel;
	String firstimage2;
	@JsonProperty("viewcnt")
	int viewCnt;
	int reviewcnt;
	int reviewavg;
	
}
