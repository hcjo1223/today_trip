package com.spring.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.app.domain.AjaxWriteResult;
import com.spring.app.service.UsersServiceImpl;

@RestController
@RequestMapping("/Users")
public class idChkController {

	@Autowired
	private	UsersServiceImpl usersServiceImpl;
	
	@GetMapping("/chk/{chkId}")
	public AjaxWriteResult chkId(
			@PathVariable String chkId){
		int count = 0;
		
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL
		try {
			count = usersServiceImpl.registerCheckId(chkId);
			status = "OK";
		} catch (Exception e) {
			message.append("[트랜잭션 에러:" + e.getMessage());
		}
		AjaxWriteResult result = new AjaxWriteResult();
		
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
	
	
}
