package com.spring.app.domain;

import java.util.List;

public interface UsersProfileDAO {

	List<CalenderDTO> selectUserCalender();
	
	List<CardsDTO> selectUserCards();
	
	List<UsersDTO> selectUsersInfo();
	
	
	
	
	
}
