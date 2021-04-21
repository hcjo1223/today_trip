package com.spring.app.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.WebUtils;

import com.spring.app.domain.LoginDTO;
import com.spring.app.domain.UsersDTO;
import com.spring.app.service.CardsService;
import com.spring.app.service.UserService;
import com.spring.app.util.UploadFileUtils;

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
		
		if(loginDTO.isUseCookie()) {
			int amount = 60*60*24*7;
			Date sessionLimit = new Date(System.currentTimeMillis() + (1000 * amount));
			userService.keepLogin(usersDTO.getUserId(), httpSession.getId(), sessionLimit);
		}
	}
	
	
	//로그아웃 처리
	/*@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws Exception{
		Object object = httpSession.getAttribute("login");
		if(object !=null) {
			UsersDTO usersDTO = (UsersDTO) object;
			httpSession.removeAttribute("login");
			
		}
		
	}*/
	
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws Exception{
		
		Object object = httpSession.getAttribute("login");
		if(object != null) {
			UsersDTO usersDTO = (UsersDTO) object;
			httpSession.removeAttribute("login");
			httpSession.invalidate();
			Cookie loginCookie = WebUtils.getCookie(request, "loginCookie");
			if(loginCookie !=null) {
				loginCookie.setPath("/");
				loginCookie.setMaxAge(0);
				response.addCookie(loginCookie);
				userService.keepLogin(usersDTO.getUserId(), "none", new Date());
			}
		}
		
		return "/Users/logout";
	}
	
	
	//정보 수정
	@RequestMapping(value="/updateView",method = RequestMethod.GET)
	public String updateGET() throws Exception{
		logger.info("get updateView");
		return "Users/updateView";
	}
	
	@RequestMapping(value="/updateView",method = RequestMethod.POST)
	public String update(UsersDTO usersDTO, HttpSession session) throws Exception{
		
		
		logger.info("post updateView");
		userService.update(usersDTO);
		
		return "redirect:today_trip/home";
	}
	
	//회훤 프로필 수정(일단 작동 안됨)
	@Resource(name = "uimagePath")
	private String uimagePath;
	@RequestMapping(value = "updateView/updateImage", method = RequestMethod.POST)
	public String updatePicture(String userId, MultipartFile file, HttpSession session, RedirectAttributes redirectAttributes) throws Exception
	{
	
		if(file == null) {
			logger.info("FAILED");
			redirectAttributes.addFlashAttribute("msg","FAIL");
			return "redirect:/Users/updateView";
		}
		
		String uploadFile = UploadFileUtils.uploadFile(uimagePath, file.getOriginalFilename(), file.getBytes());
		String front = uploadFile.substring(0,12);
		String end = uploadFile.substring(14);
		String userPic = front + end;
		
		userService.updateImage(userId, userPic);
		Object usersObj = session.getAttribute("login");
		UsersDTO usersDTO = (UsersDTO) usersObj;
		usersDTO.setUserPic(userPic);
		session.setAttribute("login", usersDTO);
		redirectAttributes.addFlashAttribute("msg","SUCCESS");
		return "redirect:/today_trip/home";
	}
	
	@Inject CardsService cardsService;
	
	
	
}
