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
	
	private PlaceService placeService;
	
	@Autowired
	public void setTestService(PlaceService placeService) {
		this.placeService = placeService;
	}
	
	@RequestMapping("")
	public String list(Model model) {
		model.addAttribute("list", placeService.list());
		return "place/list";
	}
	
	@GetMapping("/view")
	public String view(int contentid, Model model) {
		model.addAttribute("list", placeService.viewByUid(contentid));
		return "place/view";
	}
	
}
