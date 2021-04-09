<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css"
		href="${pageContext.request.contextPath }/resources/CSS/adminCSS.css">
<!-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/viewsJS.js"></script> -->

<title>관리자 페이지</title>
</head>
<body>

<div class="sidenav">
	<a href="admin/users">회원 관리</a>
	<div class="boardDrop">
		<a href="admin/board/calender">게시판 관리</a>
		<div class="board-content">
		    <a href="admin/board/calender">일정</a>
		    <a href="admin/board/cards">사진</a>
	 	</div>
	 </div>
	 <div  class="placeDrop">
		<a href="admin/place/accommodation">장소 관리</a>
		<div class="place-content">
		    <a href="admin/place/accommodation">숙소</a>
		    <a href="admin/place/restarurant">음식점</a>
		    <a href="admin/place/sights">관광지</a>
	 	</div>
	 </div>
	<a href="admin/stats">통계</a>
</div>
</body>
</html>