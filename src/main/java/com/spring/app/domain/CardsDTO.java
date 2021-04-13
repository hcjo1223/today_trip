package com.spring.app.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class CardsDTO {
	private int uid;
	private String contents;
	private int hits;
	private int location;
	private int focus;
	private int withs;
	private LocalDateTime regDate;
	private int delCheck;
	
	static List<MultipartFile> files;
	

	
	
	public static List<MultipartFile> getFiles() {
		return files;
	}


	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}


	public CardsDTO() {
		super();
	}


	public CardsDTO(int uid, String contents, int hits, int location, int focus, int withs, LocalDateTime regDate,
			int delCheck) {
		super();
		this.uid = uid;
		this.contents = contents;
		this.hits = hits;
		this.location = location;
		this.focus = focus;
		this.withs = withs;
		this.regDate = regDate;
		this.delCheck = delCheck;
	}


	public int getUid() {
		return uid;
	}


	public void setUid(int uid) {
		this.uid = uid;
	}


	public String getContents() {
		return contents;
	}


	public void setContents(String contents) {
		this.contents = contents;
	}


	public int getHits() {
		return hits;
	}


	public void setHits(int hits) {
		this.hits = hits;
	}


	public int getLocation() {
		return location;
	}


	public void setLocation(int location) {
		this.location = location;
	}


	public int getFocus() {
		return focus;
	}


	public void setFocus(int focus) {
		this.focus = focus;
	}


	public int getWiths() {
		return withs;
	}


	public void setWiths(int withs) {
		this.withs = withs;
	}


	public LocalDateTime getRegDate() {
		return regDate;
	}


	public void setRegDate(LocalDateTime regDate) {
		this.regDate = regDate;
	}


	public int getDelCheck() {
		return delCheck;
	}


	public void setDelCheck(int delCheck) {
		this.delCheck = delCheck;
	}


	public String getRegDateTime() {
		if(this.regDate == null) return "";
		return this.regDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"));
		
	}
}
