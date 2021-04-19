package com.spring.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.app.domain.AjaxWriteList;
import com.spring.app.domain.AjaxWriteResult;
import com.spring.app.domain.ReviewDTO;
import com.spring.app.service.PlaceService;

@RestController
@RequestMapping("/place/comment")
public class ReviewController {
	
	@Autowired
	PlaceService placeService;
	
	// A. 글 목록(페이징)
	@GetMapping("/{place_uid}/{page}/{pageRows}")
	public AjaxWriteList list(
			@PathVariable int place_uid,
			@PathVariable int page,
			@PathVariable int pageRows) {
		
		List<ReviewDTO> reviewList = null;
		
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
			totalCnt = placeService.reviewCount(place_uid);
			
			// 총 몇페이지 분량인가?
			totalPage = (int)Math.ceil(totalCnt / (double)pageRows);
			
			// from : 몇번째 row 부터 ?
			int from = (page - 1) * pageRows + 1;
			
			if (totalCnt <= pageRows * (page - 1)) {
				message.append("[param 값이 없거나 잘못 요청되었습니다.]");
				from = 1; page = 1;
				reviewList = placeService.reviewList(place_uid, from, pageRows);
			} else {
				reviewList = placeService.reviewList(place_uid, from, pageRows);
			}
			
			
			if(reviewList == null) {
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
		
		if(reviewList != null) {
			result.setCount(reviewList.size());
			result.setReviewList(reviewList);
		}
		
		result.setPage(page);
		result.setTotalPage(totalPage);
		result.setWritePages(writePages);
		result.setPageRows(pageRows);
		result.setTotalCnt(totalCnt);
		
		return result;
	}
		
	// ------------- ↓ DML -------------
	
	// C. 글 작성
	@PostMapping("")
	public AjaxWriteResult wirteOk(ReviewDTO dto) {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		try {	
			count = placeService.reviewInsert(dto);
			
			if(count == 0) {
				message.append("[트랜잭션 실패 : 0 insert]");
			} else {
				status = "OK";
			}

		} catch (Exception e) {
			//e.printStackTrace();				
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		AjaxWriteResult result = new AjaxWriteResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
	
	
	
	// D. 글 수정
	@PostMapping("/update")
	public AjaxWriteResult updateOk(ReviewDTO dto) {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		try {	
			count = placeService.reviewUpdate(dto);
			status = "OK";
			
			if(count == 0) {
				message.append("[트랜잭션 실패 : 0 update]");
			}

		} catch (Exception e) {
			//e.printStackTrace();				
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		AjaxWriteResult result = new AjaxWriteResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
	
	
	
	// F. 글 삭제
	@PostMapping("delete/{re_uid}")
	public AjaxWriteResult deleteOk(@PathVariable int re_uid) {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		try {	
			count = placeService.reviewDelete(re_uid);
			status = "OK";
			
			if(count == 0) {
				message.append("[트랜잭션 실패 : 0 update]");
			}

		} catch (Exception e) {
			//e.printStackTrace();				
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		AjaxWriteResult result = new AjaxWriteResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
	
}