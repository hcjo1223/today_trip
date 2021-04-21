package com.spring.app.domain;

import lombok.Data;

@Data
public class CalendarDTO {
	
	private int tu_uid; // 여행 게시글 UID
	private int us_uid; // 회원 UID
	private String tu_title; // 제목
	private int tu_hits; // 조회수
	private long tu_period; // 기간
	private int tu_location; // 어디로
	private int tu_with; // 누구와
	private int tu_focus; // 여행스타일
	private int tu_del_ck; // 게시글 삭제 여부
	
	private String tu_tag; // 태그
	
	private String tu_start_tour; // 여행시작날짜
	private String tu_end_tour; // 여행종료날짜
	private String tu_write_date; // 게시글 작성날짜
	
	private String tu_img_url; // 썸네일 이미지
	
	private int start = 0; // 페이징
	private int end = 0; // 페이징

}
