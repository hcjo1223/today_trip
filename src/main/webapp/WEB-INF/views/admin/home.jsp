<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css"
		href="${pageContext.request.contextPath }/resources/CSS/viewsCSS.css">
<!-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/viewsJS.js"></script> -->

<title>관리자 페이지</title>
</head>
<body>

<div class="sidenav">
	<a href="./admin/users">회원 관리</a>
	<a href="./admin/calender">게시판 관리</a>
	<a href="./admin/place/accommodation">장소 관리</a>
<!-- 
	<button class="board-btn">게시판 관리
		<i class="fa fa-caret-down"></i>
	</button>
	<div class="board-contatiner">
		<a href="./admin/calender">일정</a>
		<a href="./admin/cards">사진</a>
	</div>
	<button class="place-btn">장소 관리
		<i class="fa fa-caret-down"></i>
	</button>
	<div class="place-contatiner">
		<a href="./admin/place/accommodation">숙소</a>
		<a href="./admin/place/restarurant">식당</a>
		<a href="./admin/place/sights">관광지</a>
	</div>
 -->
	<a href="./admin/stats">통계</a>
</div>
</body>
</html>