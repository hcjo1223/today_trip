package com.spring.app.domain;

import lombok.Data;

@Data
public class TourLikeDTO {
	
	// 1 = >좋아요ON 0 => 좋아요 X
	private int tour_like_ck; 
	
	private int tu_uid; // 여행게시글 UID (FK)
	private int us_uid; // 회원 UID (FK)

}
