package com.spring.app.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ReviewDTO {
	int place_uid;
	int re_uid;
	String content;
	int rate;
	Date write_date;
	float rateAVG;
}
