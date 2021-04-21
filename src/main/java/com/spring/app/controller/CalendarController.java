package com.spring.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.app.domain.CalendarDTO;
import com.spring.app.domain.MemoDTO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.domain.TourLocationDTO;
import com.spring.app.service.CalendarService;

@Controller
@RequestMapping("/calendar")
public class CalendarController {
	
	@Autowired
	private CalendarService calendarService;
	
	// 여행게시판 글 쓰기
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String registerForm(Model model, CalendarDTO dto) throws Exception {
		return "calendar/register";
	}
	
	// 여행게시판 글 쓰기 OK
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public @ResponseBody String register(Model model, CalendarDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용

		
		// 일정 추가 요청하기
		calendarService.insert(dto);
		
//		System.out.println(result + "");
		
		return dto.getTu_uid() + "";
	}
	
	// 여행게시판 장소 검색하기
	@RequestMapping(value = "/place/list", method = RequestMethod.GET)
	public String placeSearch(Model model, String keyword, String contentType) throws Exception {
//		 logger.info("keyword : " + keyword);
//		 logger.info("contenttype : " + contentType);
		
		List<PlaceDTO> placeList = calendarService.placeSearch(keyword, contentType);
		
		for (PlaceDTO place: placeList) {
//			System.out.println(place);
		}
		
		if (contentType.equals("12")) {
			model.addAttribute("contentType", "tour");
		} else {
			model.addAttribute("contentType", "stay");
		}
		
		model.addAttribute("list", placeList);
		
		return "calendar/placeSearch";
	}
	
	// 여행게시판 메모 추가하기
	@RequestMapping(value = "/insertMemo", method = RequestMethod.POST)
	public @ResponseBody String insertMemo(Model model, MemoDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용
		
		// 메모 추가 요청
		calendarService.insertMemo(dto);
		
//		System.out.println(result);
		
		return "OK";
	}
	
	// 여행게시판 장소 추가하기 
	@RequestMapping(value = "/insertTL", method = RequestMethod.POST)
	public @ResponseBody String insertTL(Model model, TourLocationDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용
		
		// 메모 추가 요청
		calendarService.insertTL(dto);
		
//		System.out.println(result);
		
		return "OK";
	}
	
	// 여행게시판 글 하나 읽기
	@RequestMapping(value = "/read", method = RequestMethod.GET)
	public String read(Model model, CalendarDTO dto) throws Exception {
		
		// 조회수 업데이트
		calendarService.TourHits(dto);
		int likeCount = calendarService.TourLikeCount(dto);
		model.addAttribute("likeCount", likeCount);
		
		// 일정 조회 요청
		CalendarDTO res = calendarService.selectOne(dto);
		model.addAttribute("tour", res);
		
		return "calendar/read";
	}
	
	// 여행게시판 글 하나의 메모 읽기
	@RequestMapping(value = "/listMemo", method = RequestMethod.GET)
	public @ResponseBody List<MemoDTO> listMemo(Model model, CalendarDTO dto) throws Exception {

		System.out.println(dto.toString());
		
		List<MemoDTO> list = calendarService.listMemo(dto);
		
		return list;
	}
	
	// 여행게시판 글 하나의 장소 읽기
	@RequestMapping(value = "/listTL", method = RequestMethod.GET)
	public @ResponseBody List<TourLocationDTO> listTL(Model model, CalendarDTO dto) throws Exception {

		List<TourLocationDTO> list = calendarService.listTL(dto);
		
		return list;
	}
	
	// 여행게시판 글 전체 읽기
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Model model, CalendarDTO dto) throws Exception {
		
		// 페이징
		int start = dto.getStart();
		dto.setEnd(start + 29);
		
		// 목록 조회 요청
		List<CalendarDTO> list = calendarService.selectList(dto);
		
//		for (CalendarDTO place : list) {
//			System.out.println(place.getTu_title());
//		}
		
		// 전체 리스트 갯수 가지고 오기
		int count = calendarService.CountOfTour();
		int startPage = (start / 30 + 1);
		
		model.addAttribute("list", list);
		model.addAttribute("count", count);
		model.addAttribute("startPage", startPage);
		
		return "calendar/list";
	}
	
	// 여행게시판 글 하나의 메모 및 장소 모두 삭제하기
	@RequestMapping(value = "/deleteAllMemoAndTL", method = RequestMethod.POST)
	public @ResponseBody String deleteAllMemoAndTL(Model model, CalendarDTO dto) throws Exception {
		
		// 정보 삭제 요청
		calendarService.deleteMemo(dto);
		calendarService.deleteTL(dto);
		
		return "OK";
	}

	// 여행게시판 글 수정하기
	@RequestMapping(value = "/register/edit", method = RequestMethod.GET)
	public String updateForm(Model model, CalendarDTO dto) throws Exception {
		
		// 일정 조회 요청
		CalendarDTO c = calendarService.selectOne(dto);
		
		model.addAttribute("tour", c);
		
		return "calendar/update";
	}
	
	// 여행게시판 글 수정하기 OK
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody String update(Model model, CalendarDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용
		
		// 일정 수정 요청
		calendarService.update(dto);
		
		return "OK";
	}
	
	// 여행게시판 글 하나의 메모 추가하기
	
	// 여행게시판 글 하나의 장소 추가하기
	
	// 여행게시판 글 삭제하기
	@RequestMapping(value = "/register/delete", method = RequestMethod.POST)
	public @ResponseBody String delete(Model model, CalendarDTO dto) throws Exception {
		
		
		
		System.out.println(dto.getTu_uid());
		// 일정 삭제 요청
		calendarService.delete(dto);
		
		return "OK";
	}

}
