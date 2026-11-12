package com.spring.app.interceptor;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.WebUtils;

import com.spring.app.domain.UsersDTO;
import com.spring.app.service.UserService;

public class RememberMeInterceptor extends HandlerInterceptorAdapter{

	private static final Logger logger = LoggerFactory.getLogger(RememberMeInterceptor.class);
	
	@Inject
	private UserService userService;
	
	@Override 
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
		
		HttpSession httpSession = request.getSession();
		Cookie loginCookie = WebUtils.getCookie(request, "loginCookie");
		if(loginCookie != null) {
			UsersDTO usersDTO = userService.checkLoginBefore(loginCookie.getValue());
			if(usersDTO !=null)
				httpSession.setAttribute("login", usersDTO);
		}
		
		return true;
	}
	
	
}
