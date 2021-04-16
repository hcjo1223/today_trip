package com.spring.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.app.domain.AjaxWriteList;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.service.PlaceService;


@RestController
@RequestMapping("/place")
public class PlaceRestController {
	@Autowired
	PlaceService placeService;
	
	
	// A. 글 목록(페이징)
	@GetMapping("/{page}/{pageRows}")
	public AjaxWriteList list(
			@PathVariable int page,
			@PathVariable int pageRows) {
		
		List<PlaceDTO> list = null;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		
		String status = "FAIL";		// 기본 FAIL
		
		// 페이징 관련 세팅 값들
		//page : 현재 페이지
		//pageRows : 한 '페이지'에 몇개의 글을 리스트 할것인가?
		int writePages = 10;    // 한 [페이징] 에 몇개의 '페이지'를 표현할 것인가?
		int totalPage = 0; // 총 몇 '페이지' 분량인가? 
		int totalCnt = 0;  // 글은 총 몇개인가?
		
		try {
			// 글 전체 개수 구하기
			totalCnt = placeService.count();
			
			// 총 몇페이지 분량인가?
			totalPage = (int)Math.ceil(totalCnt / (double)pageRows);
			
			// from : 몇번째 row 부터 ?
			int from = (page - 1) * pageRows + 1;  // ORACLE 은 1부터 시작
			//int from = (page - 1) * pageRows;  // MySQL 은 0부터 시작
			
			list = placeService.list(from, pageRows);
			
			if(list == null) {
				message.append("[리스트할 데이터가 없습니다]");
			} else {
				status = "OK";
			}
		} catch (Exception e) {
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}
		
		AjaxWriteList result = new AjaxWriteList();
		result.setStatus(status);
		result.setMessage(message.toString());
		
		if(list != null) {
			result.setCount(list.size());
			result.setList(list);
		}
		
		result.setPage(page);
		result.setTotalPage(totalPage);
		result.setWritePages(writePages);
		result.setPageRows(pageRows);
		result.setTotalCnt(totalCnt);
		
		return result;
	}
}