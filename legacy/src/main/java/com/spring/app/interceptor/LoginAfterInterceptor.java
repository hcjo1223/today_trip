package com.spring.app.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginAfterInterceptor extends HandlerInterceptorAdapter{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws  Exception {
		HttpSession session = request.getSession();
		if (session.getAttribute("login") !=null) {
			response.sendRedirect(request.getContextPath() + "/Users/profile");
			return false;
		}
		return true;
	}
	
}
