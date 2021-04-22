package com.spring.app.domain;

import lombok.Data;

@Data
public class MemoDTO {
	
	private int memo_uid; // 메모UID
	private int tu_uid; // 여행 게시글 UID (FK)
	private int tu_day; // 여행 DAY
	private String memo_contents; // 메모내용

}
