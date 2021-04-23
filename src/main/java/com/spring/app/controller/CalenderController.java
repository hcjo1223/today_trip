package com.spring.app.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.app.domain.CalenderDTO;
import com.spring.app.domain.MemoDTO;
import com.spring.app.domain.PlaceDTO;
import com.spring.app.domain.TourLikeDTO;
import com.spring.app.domain.TourLocationDTO;
import com.spring.app.domain.UsersDTO;
import com.spring.app.service.CalenderService;

@Controller
@RequestMapping("/calender")
public class CalenderController {
	
	 
	@Autowired
	private CalenderService calenderService;
	
	// 여행게시판 글 쓰기
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String registerForm(Model model, CalenderDTO dto) throws Exception {
		return "calender/register";
	}
	
	// 여행게시판 글 쓰기 OK
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public @ResponseBody String register(Model model, CalenderDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용

		
		// 일정 추가 요청하기
		calenderService.insert(dto);
		
//		System.out.println(result + "");
		
		return dto.getTu_uid() + "";
	}
	
	// 여행게시판 장소 검색하기
	@RequestMapping(value = "/place/list", method = RequestMethod.GET)
	public String placeSearch(Model model, String keyword, String contentType) throws Exception {
//		 logger.info("keyword : " + keyword);
//		 logger.info("contenttype : " + contentType);
		
		List<PlaceDTO> placeList = calenderService.placeSearch(keyword, contentType);
		
		for (PlaceDTO place: placeList) {
			System.out.println(place);
		}
		
		if (contentType.equals("12")) {
			model.addAttribute("contentType", "tour");
		} else {
			model.addAttribute("contentType", "stay");
		}
		
		model.addAttribute("list", placeList);
		
		return "calender/placeSearch";
	}
	
	// 여행게시판 메모 추가하기
	@RequestMapping(value = "/insertMemo", method = RequestMethod.POST)
	public @ResponseBody String insertMemo(Model model, MemoDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용
		
		// 메모 추가 요청
		calenderService.insertMemo(dto);
		
//		System.out.println(result);
		
		return "OK";
	}
	
	// 여행게시판 장소 추가하기 
	@RequestMapping(value = "/insertTL", method = RequestMethod.POST)
	public @ResponseBody String insertTL(Model model, TourLocationDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용
		
		// 메모 추가 요청
		calenderService.insertTL(dto);
		
//		System.out.println(result);
		
		return "OK";
	}
	
	// 여행게시판 글 하나 읽기
	@RequestMapping(value = "/read", method = RequestMethod.GET)
	public String read(Model model, CalenderDTO dto, HttpSession session) throws Exception {
		
//		UsersDTO usersDto = (UsersDTO) session.getAttribute("login");
		
		// 로그인 세션 가져오기 
		
		// 조회수 업데이트
		calenderService.TourHits(dto);
		CalenderDTO res = calenderService.selectOne(dto);
//		int likeCount = calenderService.TourLikeCount(dto);
		
		// 해당 게시글의 좋아요 가져오기
//		TourLikeDTO tourLikeDto = new TourLikeDTO();
//		tourLikeDto.setTu_uid(dto.getTu_uid());
//		tourLikeDto.setUs_uid(usersDto.getUs_uid());
		
//		TourLikeDTO res2 = calenderService.TourLike(tourLikeDto);
		
		model.addAttribute("tour", res);
//		model.addAttribute("likeCount", likeCount);
//		model.addAttribute("tourLike", res2);
		
		return "calender/read";
	}
	
//	@RequestMapping(value = "/addTourLike", method = RequestMethod.GET)
//	public @ResponseBody String addTourLike(TourLikeDTO dto, HttpSession session) throws Exception {
//		UsersDTO usersDto = (UsersDTO) session.getAttribute("login");
//		dto.setUs_uid(usersDto.getUs_uid());
//		calenderService.addTourLike(dto);
//		
//		return "ok";
//	}
//	
//	@RequestMapping(value = "/delTourLike", method = RequestMethod.GET)
//	public @ResponseBody String delTourLike(TourLikeDTO dto, HttpSession session) throws Exception {
//		UsersDTO usersDto = (UsersDTO) session.getAttribute("login");
//		dto.setUs_uid(usersDto.getUs_uid());
//		calenderService.delTourLike(dto);
//		
//		return "ok";
//	}
	
	// 여행게시판 글 하나의 메모 읽기
	@RequestMapping(value = "/listMemo", method = RequestMethod.GET)
	public @ResponseBody List<MemoDTO> listMemo(Model model, CalenderDTO dto) throws Exception {

		System.out.println(dto.toString());
		
		List<MemoDTO> list = calenderService.listMemo(dto);
		
		return list;
	}
	
	// 여행게시판 글 하나의 장소 읽기
	@RequestMapping(value = "/listTL", method = RequestMethod.GET)
	public @ResponseBody List<TourLocationDTO> listTL(Model model, CalenderDTO dto) throws Exception {

		List<TourLocationDTO> list = calenderService.listTL(dto);
		
		return list;
	}
	
	// 여행게시판 글 전체 읽기
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Model model, CalenderDTO dto) throws Exception {
		
		// 페이징
		int start = dto.getStart();
		dto.setEnd(start + 29);
		
		// 목록 조회 요청
		List<CalenderDTO> list = calenderService.selectList(dto);
		
//		for (CalenderDTO place : list) {
//			System.out.println(place.getTu_title());
//		}
		
		// 전체 리스트 갯수 가지고 오기
		int count = calenderService.CountOfTour();
		int startPage = (start / 30 + 1);
		
		model.addAttribute("list", list);
		model.addAttribute("count", count);
		model.addAttribute("startPage", startPage);
		
		
		return "calender/list";
	}
	
	// 여행게시판 글 검색하기
	@RequestMapping(value = "/list/search", method = RequestMethod.GET)
	public String tourSearch(Model model, @Param("keyword") String keyword) throws Exception {
		List<CalenderDTO> tourList = calenderService.tourSearch(keyword);
		
//		System.out.println(keyword);
		
		for (CalenderDTO tour : tourList) {
			System.out.println(tour);
		}
//		System.out.println(tourList);
		model.addAttribute("list", tourList);
		
		return "calender/search";
	}
	
	// 여행게시판 글 하나의 메모 및 장소 모두 삭제하기
	@RequestMapping(value = "/deleteAllMemoAndTL", method = RequestMethod.POST)
	public @ResponseBody String deleteAllMemoAndTL(Model model, CalenderDTO dto) throws Exception {
		
		// 정보 삭제 요청
		calenderService.deleteMemo(dto);
		calenderService.deleteTL(dto);
		
		return "OK";
	}

	// 여행게시판 글 수정하기
	@RequestMapping(value = "/register/edit", method = RequestMethod.GET)
	public String updateForm(Model model, CalenderDTO dto) throws Exception {
		
		// 일정 조회 요청
		CalenderDTO c = calenderService.selectOne(dto);
		
		model.addAttribute("tour", c);
		
		return "calender/update";
	}
	
	// 여행게시판 글 수정하기 OK
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody String update(Model model, CalenderDTO dto) throws Exception {
		
		System.out.println(dto.toString()); // 확인용
		
		// 일정 수정 요청
		calenderService.update(dto);
		
		return "OK";
	}
	
	// 여행게시판 글 하나의 메모 추가하기
	
	// 여행게시판 글 하나의 장소 추가하기
	
	// 여행게시판 글 삭제하기
	@RequestMapping(value = "/register/delete", method = RequestMethod.POST)
	public @ResponseBody String delete(Model model, CalenderDTO dto) throws Exception {
		
		
		
		System.out.println(dto.getTu_uid());
		// 일정 삭제 요청
		calenderService.delete(dto);
		
		return "OK";
	}

}
