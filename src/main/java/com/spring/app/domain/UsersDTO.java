package com.spring.app.domain;

import java.util.Date;

public class UsersDTO {
	private int us_uid;
	private String userId;
	private String userPw;
	private String userNickname;
	private String userEmail;
	private String userBirthday;
	private Date reg_date;
	private Date log_date;
	private String userMemo;
	private String gender;
	private String userPic;
	private int userAuthority; // 회원 권한
	
	

	public int getUserAuthority() {
		return userAuthority;
	}
	public void setUserAuthority(int userAuthority) {
		this.userAuthority = userAuthority;
	}
	private boolean useCookie;

	public boolean isUseCookie() {
		return useCookie;
	}
	public void setUseCookie(boolean useCookie) {
		this.useCookie = useCookie;
	}
	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}
	public int getUs_uid() {
		return us_uid;
	}
	public void setUs_uid(int us_uid) {
		this.us_uid = us_uid;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPw() {
		return userPw;
	}
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	public String getUserNickname() {
		return userNickname;
	}
	public void setUserNickName(String userNickname) {
		this.userNickname = userNickname;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public Date getLog_date() {
		return log_date;
	}
	public void setLog_date(Date log_date) {
		this.log_date = log_date;
	}
	public String getUserMemo() {
		return userMemo;
	}
	public void setUserMemo(String userMemo) {
		this.userMemo = userMemo;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getUserBirthday() {
		return userBirthday;
	}
	public void setUserBirthday(String userBirthday) {
		this.userBirthday = userBirthday;
	}
	public String getUserPic() {
		return userPic;
	}
	public void setUserPic(String userPic) {
		this.userPic = userPic;
	}	
	
	
}
