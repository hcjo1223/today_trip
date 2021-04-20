package com.spring.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.app.service.PlaceService;



@Controller
@RequestMapping("/place")
public class PlaceController {
	
	@Autowired
	private PlaceService placeService;

	@RequestMapping("/list")
	public String list() {
		return "place/list";
	}
	
	@RequestMapping("/imgS")
	public String img() {
		return "place/imgS";
	}
	
	
	@GetMapping("/view")
	public String view(int contentid, Model model) {
		model.addAttribute("list", placeService.viewByUid(contentid));
		return "place/view";
	}
	
	
}
