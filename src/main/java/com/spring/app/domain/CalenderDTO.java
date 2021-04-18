package com.spring.app.domain;

import java.time.LocalDateTime;


public class CalenderDTO {
	private int tu_uid;
	private int us_uid;
	private String tu_title;
	private int tu_hits;
	private int tu_period;
	private int tu_location;
	private int tu_with;
	private int tu_focus;
	private int tu_del_ck;
	private LocalDateTime tu_write_date;
	private LocalDateTime tu_start_tour;
	public int getTu_uid() {
		return tu_uid;
	}
	public void setTu_uid(int tu_uid) {
		this.tu_uid = tu_uid;
	}
	public int getUs_uid() {
		return us_uid;
	}
	public void setUs_uid(int us_uid) {
		this.us_uid = us_uid;
	}
	public String getTu_title() {
		return tu_title;
	}
	public void setTu_title(String tu_title) {
		this.tu_title = tu_title;
	}
	public int getTu_hits() {
		return tu_hits;
	}
	public void setTu_hits(int tu_hits) {
		this.tu_hits = tu_hits;
	}
	public int getTu_period() {
		return tu_period;
	}
	public void setTu_period(int tu_period) {
		this.tu_period = tu_period;
	}
	public int getTu_location() {
		return tu_location;
	}
	public void setTu_location(int tu_location) {
		this.tu_location = tu_location;
	}
	public int getTu_with() {
		return tu_with;
	}
	public void setTu_with(int tu_with) {
		this.tu_with = tu_with;
	}
	public int getTu_focus() {
		return tu_focus;
	}
	public void setTu_focus(int tu_focus) {
		this.tu_focus = tu_focus;
	}
	public int getTu_del_ck() {
		return tu_del_ck;
	}
	public void setTu_del_ck(int tu_del_ck) {
		this.tu_del_ck = tu_del_ck;
	}
	public LocalDateTime getTu_write_date() {
		return tu_write_date;
	}
	public void setTu_write_date(LocalDateTime tu_write_date) {
		this.tu_write_date = tu_write_date;
	}
	public LocalDateTime getTu_start_tour() {
		return tu_start_tour;
	}
	public void setTu_start_tour(LocalDateTime tu_start_tour) {
		this.tu_start_tour = tu_start_tour;
	}
	
	
}
