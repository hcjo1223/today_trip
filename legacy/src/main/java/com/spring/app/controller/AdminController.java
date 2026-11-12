package com.spring.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.app.service.AdminService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping("")
	public String listHome(Model model) {
		model.addAttribute("listLogCount", adminService.listLogCount());
		model.addAttribute("listHomePlace", adminService.listHomePlace());
		model.addAttribute("listHomeCalender", adminService.listHomeCalender());
		model.addAttribute("listHomeUsers", adminService.listHomeUsers());
		return "admin/home";
	}
	
	//장소 - 숙박 
//	@RequestMapping("/place/accommodation")
//	public String listAdminPlaceA(Model model) {
//		model.addAttribute("listAdminPlaceA", adminService.listAdminPlaceA());
//		return "admin/place/accommodation";
//	}
//	
	//장소 - 식당
//	@RequestMapping("/place/restarurant")
//	public String listAdminPlaceR(Model model) {
//		model.addAttribute("listAdminPlaceR", adminService.listAdminPlaceR());
//		return "admin/place/restarurant";
//	}
//	
//	//장소 - 관광지
//	@RequestMapping("/place/sights")
//	public String listAdminPlaceS(Model model) {
//		model.addAttribute("listAdminPlaceS", adminService.listAdminPlaceS());
//		return "admin/place/sights";
//	}
//	@RequestMapping("/board/calender")	
//	public String listCalender(Model model) {
//		return "admin/calender";
//	}
	@RequestMapping("/board/cards")
	public String listCards(Model model) {
		return "admin/cards";
	}
	@RequestMapping("/stats")
	public String listStats(Model model) {
		model.addAttribute("listLogCount", adminService.listLogCount());
		return "admin/stats";
	}
//	@RequestMapping("/users")
//	public String listUsers(Model model) {
//		return "admin/users";
//	}

	@RequestMapping("/users")
	public String restUsers() {
		return "admin/users";
	}
	
	@RequestMapping("place/accommodation")
	public String restAccommodation() {
		return "admin/place/restPlace";
	}
	
	@RequestMapping("place/restarurant")
	public String restRestarurant() {
		return "admin/place/restPlace";
	}
	
	@RequestMapping("place/sights")
	public String restSights() {
		return "admin/place/restPlace";
	}
	
	@RequestMapping("board/calender")
	public String restCalender() {
		return "admin/calender";
	}
}