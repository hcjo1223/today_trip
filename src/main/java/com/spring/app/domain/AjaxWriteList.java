package com.spring.app.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class AjaxWriteList extends AjaxWriteResult {

	@JsonProperty("data")
	List<PlaceDTO> list;	// 데이터 목록
	
	@JsonProperty("rdata")
	List<ReviewDTO> reviewList;
	
	@JsonProperty("Usersdata")
	List<AdminDTO> UsersList;

	@JsonProperty("Cardsdata")
	List<CardsDTO> CardsList;
	
	int reviewcnt;
	int reviewavg;
	
	int page;	// 현재 페이지 #
	
	@JsonProperty("totalpage")
	int totalPage;	// 총 몇 '페이지' 분량인가?
	
	@JsonProperty("totalcnt")
	int totalCnt; 	// 글은 총 몇개인가?
	
	@JsonProperty("writepages")
	int writePages; // 한 [페이징] 에 몇개의 '페이지' 를 표현할 것인가?
	
	@JsonProperty("pagerows")
	int pageRows; 	// 한 '페이지' 에 몇개의 글을 리스트 할 것인가?

}
