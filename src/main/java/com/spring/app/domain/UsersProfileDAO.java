package com.spring.app.domain;

import java.util.List;

public interface UsersProfileDAO {

	List<CalendarDTO> selectUserCalender();
	
	List<CardsDTO> selectUserCards();
	
	List<UsersDTO> selectUsersInfo();
	
	
	
	
	
}
