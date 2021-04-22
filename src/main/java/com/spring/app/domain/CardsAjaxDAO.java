package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

import com.spring.app.domain.CardsDTO;
import com.spring.app.domain.CardsLikeDTO;

@MapperScan
public interface CardsAjaxDAO {

		/*
		 * 페이징용 SELECT
		 * @param from 몇번째 row 부터
		 * @param pageRows 몇개의 데이터(게시글)
		 * @return
		 */
		
	public List<CardsDTO> selectFromRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows
			);
	
	
	public List<CardsDTO> selectLocationFromRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("search") int search
			);
	
	public List<CardsDTO> selectWithsFromRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("search") int search
			);
	
	public List<CardsDTO> selectFocusFromRow(
			@Param("from") int from,
			@Param("pageRows") int pageRows,
			@Param("search") int search
			);
	// 전체 글의 개수
	public int countAll();
	public int countLocation(@Param("search") int search);
	public int countWiths(@Param("search") int search);
	public int countFocus(@Param("search") int search);
		
		// 글 읽기
		public List<CardsDTO> selectByUid(int uid);
		public List<picLibDTO> selectFileByUid(int uid);
		public picLibDTO selectFile1ByUid(int uid);
		// 조회수 증가
		public int incHits(int uid);
		
		// 글작성
		public int insert(CardsDTO dto);
		public int insertLib(picLibDTO dto);
		
		// 글수정
		public int update(CardsDTO dto);
		
		// 특정 uid 글(들) 삭제하기
		public int deleteByUid(int uid);
		public int deleteFileByUid(int uid);
		/*
		 * DELETE FROM test_write 
		 * WHERE uid in (10, 20, 30)
		 * 
		 * WHERE uid in (1, 2)
		 * 
		 * WHERE uid in (11)
		 * 
		 */


		public List<UsersDTO> selectUserName(int uid);

		public int insertLike(int usuid, int uid);


		public CardsLikeDTO updateLike1(int usuid, int uid);
		public CardsLikeDTO updateLike0(int usuid, int uid);

		public int selectLike(int usuid, int uid);



}
