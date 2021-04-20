package com.spring.app.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface ReviewDAO {

	
	// 댓글 개수
    public int reviewCount(
    		@Param("place_uid") int pl_uid) throws Exception;
 
    // 댓글 목록
    public List<ReviewDTO> reviewList(
    		@Param("place_uid") int pl_uid,
    		@Param("from") int from,
			@Param("pageRows") int pageRows) throws Exception;
 
    // 댓글 작성
    public int reviewInsert(ReviewDTO dto) throws Exception;
    
    // 댓글 수정
    public int reviewUpdate(ReviewDTO dto) throws Exception;
 
    // 댓글 삭제
    public int reviewDelete(
    		@Param("re_uid") int re_uid) throws Exception;

    // 댓글 평점 평균
	public float rateAVG(@Param("place_uid") int place_uid) throws Exception;

}
