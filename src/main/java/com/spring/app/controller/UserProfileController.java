package com.spring.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.app.service.UserProfileService;

@Controller
@RequestMapping("/Users")
public class UserProfileController {
	
	@Autowired
	private UserProfileService userprofileservice;
	
	@RequestMapping("Profile")
	public String listInfo(Model model) {
		model.addAttribute("selectUserCalender",userprofileservice.selectUserCalender());
		model.addAttribute("selectUserCards",userprofileservice.selectUserCards());
		model.addAttribute("selectUserInfo",userprofileservice.selectUserInfo());
	
		return "Users/Profile";
	}
	
}
