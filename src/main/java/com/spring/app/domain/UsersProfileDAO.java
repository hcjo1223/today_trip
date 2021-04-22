package com.spring.app.domain;

import java.util.List;

public interface UsersProfileDAO {

	List<CalenderDTO> selectUserCalender(int userUid);
	
	List<CardsDTO> selectUserCards(int userUid);
	
	List<UsersDTO> selectUsersInfo(int userUid);
	
	
	
	
	
}
