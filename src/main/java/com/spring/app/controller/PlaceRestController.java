package com.spring.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.app.domain.AjaxWriteList;
import com.spring.app.domain.AjaxWriteResult;
import com.spring.app.domain.PlaceCountDTO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.service.PlaceService;


@RestController
@RequestMapping("/place")
public class PlaceRestController {
	@Autowired
	PlaceService placeService;
	
	// 검색 글 목록(페이징)
	@GetMapping("/{page}/{pageRows}/{keyword}")
	public AjaxWriteList searchList(
			@PathVariable int page,
			@PathVariable int pageRows,
			@PathVariable String keyword) {
		
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
			totalCnt = placeService.serachCount(keyword);
			
			// 총 몇페이지 분량인가?
			totalPage = (int)Math.ceil(totalCnt / (double)pageRows);
			
			// from : 몇번째 row 부터 ?
			int from = (page - 1) * pageRows + 1;  // ORACLE 은 1부터 시작
			//int from = (page - 1) * pageRows;  // MySQL 은 0부터 시작
			
			list = placeService.searchList(from, pageRows,keyword);
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
	
	// 좋아요 생성
	@PostMapping("/like")
	public AjaxWriteResult wirteOk(
			@RequestParam int place_uid,
			@RequestParam int us_uid) {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL
		
		System.out.println(place_uid + " - " + us_uid + "생성");
		try {	

			count = placeService.createPlaceLike(place_uid, us_uid);
			
			if(count != 0) {
				message.append("좋아요 성공");
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
		
	// 좋아요 삭제
	@PostMapping("/like/delete")
	public AjaxWriteResult deleteOk(
			@RequestParam int place_uid,
			@RequestParam int us_uid) {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		System.out.println(place_uid + " - " + us_uid + "삭제");
		try {	

			count = placeService.deletePlaceLike(place_uid, us_uid);
			
			if(count == 0) {
				message.append("삭제 실패");
			} else {
				status = "OK";
			}

		} catch (Exception e) {
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		AjaxWriteResult result = new AjaxWriteResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
	
	
	
	// 좋아요 여부 체크
	@GetMapping("/like/check")
	public AjaxWriteResult likeCheck(
			@RequestParam int place_uid,
			@RequestParam int us_uid) {
		
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		try {	

			count = placeService.chkPlaceLike(place_uid, us_uid);
			status = "OK";
			
			if(count == 0) message.append(us_uid + "는 " + place_uid + "를 좋아요 한적 없음");
	

		} catch (Exception e) {
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		AjaxWriteResult result = new AjaxWriteResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
	
	// 좋아요 수 and 별점 평균
	@GetMapping("/rateCount")
	public PlaceCountDTO rateCount(@RequestParam int place_uid) {
		
		
		int likeCnt = 0;
		float rateAVG = 0;
		
		try {
			likeCnt = placeService.countPlaceLike(place_uid);
			rateAVG = placeService.rateAVG(place_uid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		PlaceCountDTO result = new PlaceCountDTO();
		result.setRateAVG(rateAVG);
		result.setLikeCnt(likeCnt);
		return result;
	}
	
	
	// 좋아요 카운트
	@GetMapping("/like/count")
	public AjaxWriteResult likeCount(@RequestParam int place_uid) {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		try {	

			count = placeService.countPlaceLike(place_uid);
			status = "OK";

		} catch (Exception e) {
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		AjaxWriteResult result = new AjaxWriteResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
	
	// 댓글 평점 평균
	@GetMapping("/review")
	public AjaxWriteResult rateAVG(
			@RequestParam int place_uid) {
		float rateAVG = 0;
		
		// response 에 필요한 값들
				StringBuffer message = new StringBuffer();
				String status = "FAIL";  // 기본 FAIL

				try {	

					rateAVG = placeService.rateAVG(place_uid);
					
					if(rateAVG < 0) {
						message.append("[트랜잭션 실패 : NO RATE]");
					} else {
						status = "OK";
					}

				} catch (Exception e) {
					message.append("[트랜잭션 에러:" + e.getMessage() + "]");
				}
				
				AjaxWriteResult result = new AjaxWriteResult();
				result.setStatus(status);
				result.setMessage(message.toString());
				result.setCount((int) Math.ceil(rateAVG));
				return result;		
	}
}
