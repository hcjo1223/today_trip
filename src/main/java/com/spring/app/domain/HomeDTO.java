package com.spring.app.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class HomeDTO {
	private int tu_uid;
	private String tu_title;
	private int tu_hits;
	private int place_uid;
	private String firstimage2;
	
	private int pc_uid;
	private String pl_path;
	private int pc_focus;
	String pl_name;
}
