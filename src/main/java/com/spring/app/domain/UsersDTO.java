package com.spring.app.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
public class UsersDTO {
	private int us_uid;
	private String us_id;
	private String us_pw;
	private String us_email;
	private String us_nickName;
	private int us_gender;
	private LocalDateTime us_birth;
	private String us_memo;
	private LocalDateTime us_join_date;
	private String us_pic;
	private int us_exit_ck;
	private LocalDateTime us_exit_date;
}
