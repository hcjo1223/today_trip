package com.spring.app.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.app.domain.CardsDTO;
import com.spring.app.domain.UsersDTO;
import com.spring.app.service.CardsService;

@Controller
@RequestMapping("/cards")
public class CardsController {
	
	private CardsService cardsService;
	

	@Autowired
	public void setCardsService(CardsService cardsService) {
		this.cardsService = cardsService;
	}
	
	
	
	public CardsController() {
		System.out.println("CardsController() 생성");
	}
	
	@RequestMapping("/list.do")
	public String list(Model model) {
		model.addAttribute("list", cardsService.list());
		return "cards/list";
	}
	
	@RequestMapping("/new")
	public String write(Model model) {
		return "cards/write";
	}
	
	
	
//	@RequestMapping("/writeOk.do")
//	public String writeOk(picDTO dto, Model model) throws IllegalStateException, IOException {
//		
//		model.addAttribute("result", CardsService.write(dto));
//		return "card_collections/writeOk";
//	}
	
	@RequestMapping("/writeOk.do")
	public String writeOk(@Param("b")int usuid, CardsDTO dto, Model model) throws IllegalStateException, IOException {
		
		
		
		model.addAttribute("result", cardsService.write(usuid, dto));
		return "cards/writeOk";
	}
	
	@RequestMapping("/view.do")
	public String view(int uid, Model model) throws IOException {
		if(cardsService.selectFileByUid(uid) != null) {
			model.addAttribute("fileList", cardsService.selectFileByUid(uid));
		}
		model.addAttribute("view", cardsService.viewByUid(uid));
		return "cards/view";
	}
	
	@RequestMapping("/update.do")
	public String update(int uid, Model model) {
		model.addAttribute("select", cardsService.selectByUid(uid));
		model.addAttribute("fileList", cardsService.selectFileByUid(uid));
		return "cards/update";
	}
	
	@RequestMapping("/updateOk.do")
	public String updateOk(CardsDTO dto, HttpServletRequest req, Model model) throws IllegalStateException, IOException {
		
			model.addAttribute("update", cardsService.update(dto, req));
		return "cards/updateOk";
	}
	
	@RequestMapping("/deleteOk.do")
	public String delete(int uid, Model model) {
		model.addAttribute("delete", cardsService.deleteByUid(uid));
		return "cards/deleteOk";
	}
	
	
	// REST 게시판 작성
		@RequestMapping(value = "/list")
		public String rest() {
			return "cards/rest";
		}
	
	
	
}
