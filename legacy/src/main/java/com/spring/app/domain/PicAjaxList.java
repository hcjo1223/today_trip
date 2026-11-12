package com.spring.app.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PicAjaxList  {
	
	@JsonProperty("cards") // 제이슨 이름 변경
	List<picLibDTO> lst; // 데이터 목록
	
	
	
	
	public List<picLibDTO> getLst() {
		return lst;
	}

	public void setLst(List<picLibDTO> lst) {
		this.lst = lst;
	}


	

}
