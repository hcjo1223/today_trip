package com.spring.app.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ReviewDTO {
	int us_uid;
	int place_uid;
	int re_uid;
	String content;
	int rate;
	String write_date;
	float rateAVG;
}
