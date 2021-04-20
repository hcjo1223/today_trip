package com.spring.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.app.service.HomeService;

@Controller
@RequestMapping("/home")
public class HomeController {
	
	@Autowired
	private HomeService homeService;
	
	@RequestMapping("")
	public String Home(Model model) {
		homeService.saveLog();
		model.addAttribute("listPopularPic", homeService.listPopularPic());
		model.addAttribute("listHomeCalender", homeService.listHomeCalender());
		model.addAttribute("listHomePic", homeService.listHomePic());
		return "home/homePage";
	}
}
