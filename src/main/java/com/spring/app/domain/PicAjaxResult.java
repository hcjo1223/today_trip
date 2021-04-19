package com.spring.app.domain;

import java.util.List;

public class PicAjaxResult {
	int count; // 데이터 개수
	String status; // 처리 결과
	String message; // 결과 메세지 
	
	List<picLibDTO> list;
	
	
	public List<picLibDTO> getList() {
		return list;
	}
	public void setList(List<picLibDTO> list) {
		this.list = list;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}

