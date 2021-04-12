package com.spring.app.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class LogDTO {
	
	private int log_uid;
	private String log_contents;
	private LocalDateTime log_date;
	private int log_count;
}
