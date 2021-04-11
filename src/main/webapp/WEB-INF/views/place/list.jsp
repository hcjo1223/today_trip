<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!-- JSTL 버젼으로 바뀌니, import 의 번잡함도 사라진다!  JAVA 변수 선언도 사라진다! -->

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>목록</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
<style>
body{width:100%;
	text-align: center; }
ul,ol {list-style:none;}
img {
	width:200px;
	height:120px;
	object-fit: cover;
}
.wrap {
	width: 800px;
	margin: 0 auto;
}
.wrap h1{
	padding 10px 0 4px;
	border-bottom: 1px solid #aaa;
}
.fixed_img_col ul{
	border-bottom: 1px solid #aaa;
}
.fixed_img_col li{
	float: left;
	width: 200px;
	height: 200px;
	padding: 20px 15px;
	margin-bottom: -1px;
	border-bottom: 1px solid #aaa;
}
</style>
</head>
<body>
<div class="wrap">
	<h1>장소 게시판</h1>
	<div class="fixed_img_col">
		<ul>
		<c:choose>
		<c:when test="${empty list || fn:length(list) == 0 }">
		</c:when>
		<c:otherwise>
			<c:forEach var="dto" items="${list}">
				
			<li>
			<span class="thumb">
				<a href="place/view?contentid=${dto.contentId }">
				<img src="${dto.firstimage2}" alt="">
				${dto.title}</a></span>

			<p>${dto.areaCode} > ${dto.sigunguCode}</p>
			<a class="like">좋아요</a>&nbsp<a class="review">리뷰</a>
			</li>
							
			</c:forEach>
		</c:otherwise>
		</c:choose>
		</ul>
	</div>
</div>
</body>
</html>