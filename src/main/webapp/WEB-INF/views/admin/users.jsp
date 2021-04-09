<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css"
		href="${pageContext.request.contextPath }/resources/CSS/adminCSS.css">
<title>관리자 페이지(회원)</title>
</head>
<body>
<div class="sidenav">
	<a href="./users">회원 관리</a>
	<div class="boardDrop">
		<a href="./board/calender">게시판 관리</a>
		<div class="board-content">
		    <a href="./board/calender">일정</a>
		    <a href="./board/cards">사진</a>
	 	</div>
	 </div>
	 <div  class="placeDrop">
		<a href="./place/accommodation">장소 관리</a>
		<div class="place-content">
		    <a href="./place/accommodation">숙소</a>
		    <a href="./place/restarurant">음식점</a>
		    <a href="./place/sights">관광지</a>
	 	</div>
	 </div>
	<a href="./stats">통계</a>
</div>
</body>
</html>