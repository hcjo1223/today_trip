package com.spring.app.domain;

import lombok.Data;

@Data
public class TourLocationDTO {

	private int lc_uid; // 여행장소 UID
	private int place_uid; // 장소 UID (FK)
	private int tu_uid; // 여행 게시글 UID (FK)
	private int tu_day; // 장소 DAY
	
	// JOIN
	private String title;
	
}
