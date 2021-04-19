package com.spring.app.domain;

import lombok.Data;

/*
{
	"count" : 10,
	"status" : "OK",
	"message" : ""
}
 */
@Data
public class AjaxWriteResult {
	int count;		// 데이터 개수
	String status;	// 처리 결과
	String message;	// 결과 메세지
	
}
