package com.spring.app.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.app.domain.LoginDTO;
import com.spring.app.domain.UsersDTO;
import com.spring.app.service.UserProfileService;

@Controller
@RequestMapping("/Users/*")
public class UserProfileController {
	
	@Autowired
	private UserProfileService userprofileservice;
	
	
	@RequestMapping("Profile")
	public String listInfo(HttpSession session, Model model) {
		UsersDTO userDTO = (UsersDTO) session.getAttribute("login");
		Integer userUid = userDTO.getUs_uid();
		System.out.println("userUid " + userUid);
		model.addAttribute("selectUserCalender",userprofileservice.selectUserCalender(userUid));
		model.addAttribute("selectUserCards",userprofileservice.selectUserCards(userUid));
		model.addAttribute("selectUserInfo",userprofileservice.selectUserInfo(userUid));
	
		return "Users/Profile";
	}
	
}
