package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

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
		
		
		// 전체 글의 개수
		public int countAll();
		
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





}
