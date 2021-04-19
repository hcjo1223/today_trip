package com.spring.app.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CardsDTO extends picLibDTO{
	private int uid;
	private int usuid;
	private String contents;
	private int hits;
	private int location;
	private int focus;
	private int withs;
	
	@JsonProperty("regdate")
	private LocalDateTime regDate;
	private int delCheck;
	
	static List<MultipartFile> files;
	
	public int getUsuid() {
		return usuid;
	}

	@JsonProperty("cards") // 제이슨 이름 변경
	List<picLibDTO> list; // 데이터 목록
	
	public List<picLibDTO> getList() {
		return list;
	}


	public void setList(List<picLibDTO> list) {
		this.list = list;
	}



	public void setUsuid(int usuid) {
		this.usuid = usuid;
	}

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
