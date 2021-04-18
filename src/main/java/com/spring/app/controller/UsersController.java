package com.spring.app.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.spring.app.domain.LoginDTO;
import com.spring.app.domain.UsersDTO;
import com.spring.app.service.UserService;
import com.spring.app.service.UsersServiceImpl;

@Controller
@RequestMapping("/Users/*")
public class UsersController {
	
	private final Logger logger = LoggerFactory.getLogger(UsersController.class);
	
	
	UserService userService;
	
	@Inject
	public UsersController(UserService userService) {
		this.userService = userService;
	}
	//회원가입
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public void getRegister() throws Exception{
		logger.info("get register");
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String postRegister(UsersDTO usersDTO) throws Exception{
		logger.info("post register");
		
		userService.register(usersDTO);
		
		return "redirect:/Users/login";
	}
	
	//로그인 
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginGET(@ModelAttribute("loginDTO") LoginDTO loginDTO) {
		return "Users/login";
	}
	
	@RequestMapping(value = "/loginPost", method = RequestMethod.POST)
	public void loginPOST(LoginDTO loginDTO, HttpSession httpSession, Model model) throws Exception {
		UsersDTO usersDTO = userService.login(loginDTO);
		
		if(usersDTO == null) {
			return;
		}
		model.addAttribute("users", usersDTO);
	}
	
	//정보 수정
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpSession session) throws Exception{
		session.invalidate();
		return "redirect:/";
	}
	
	@RequestMapping(value="/updateView",method = RequestMethod.GET)
	public String updateGET() throws Exception{
		return "Users/updateView";
	}
	
	@RequestMapping(value="/update",method = RequestMethod.POST)
	public String update(UsersDTO usersDTO, HttpSession session) throws Exception{
		
		userService.update(usersDTO);
		session.invalidate();
		
		return "redirect:/";
	}
	
}
