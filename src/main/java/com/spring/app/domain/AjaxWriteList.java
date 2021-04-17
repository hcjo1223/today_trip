package com.spring.app.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class AjaxWriteList extends AjaxWriteResult{

	@JsonProperty("data")
	List<PlaceDTO> listPlace;
	
	int page;
	
	@JsonProperty("totalpage")
	int totalPage;
	
	@JsonProperty("totalcnt")
	int totalCnt;   // 글은 총 몇개인가?
	
	@JsonProperty("writepages")
	int writePages;   // 한 [페이징] 에 몇개의 '페이지' 를 표현할 것인가?
	
	@JsonProperty("pagerows")
	int pageRows;   // 한 '페이지' 에 몇개의 글을 리스트 할 것입인가?
	
	
}
