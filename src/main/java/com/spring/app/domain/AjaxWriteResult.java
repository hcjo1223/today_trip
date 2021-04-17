package com.spring.app.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
@Getter @Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class AjaxWriteResult {
	int count;	//데이터 개수
	String status;	//처리 결과
	String message;	//결과 메세지
}
