<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css"
		href="${pageContext.request.contextPath }/resources/CSS/adminCSS.css">
<title>관리자 페이지(관광지)</title>

</head>
<body>
<div class="sidenav">
	<a href="../users">회원 관리</a>
	<div class="boardDrop">
		<a href="../board/calender">게시판 관리</a>
		<div class="board-content">
		    <a href="../board/calender">일정</a>
		    <a href="../board/cards">사진</a>
	 	</div>
	 </div>
	 <div  class="placeDrop">
		<a href="../place/accommodation">장소 관리</a>
		<div class="place-content">
		    <a href="../place/accommodation">숙소</a>
		    <a href="../place/restarurant">음식점</a>
		    <a href="../place/sights">관광지</a>
	 	</div>
	 </div>
	<a href="../stats">통계</a>
</div>
<div>

</div>
<div>
	<table>
		<tr>
			<th>번호</th>
			<th>이름</th>
			<th>콘텐츠ID</th>
			<th>경도</th>
			<th>위도</th>
			<th>주소</th>
			<th>연락처</th>
			<th>썸네일URL</th>
		</tr>

		<c:choose>
		<c:when test="${empty listAdminPlaceS || fn:length(listAdminPlaceS) == 0 }">
		</c:when>
		<c:otherwise>
			<c:forEach var="dto" items="${listAdminPlaceS }">
				<tr>
				 	<td>${dto.uid }</td>  <%-- dto.getUid() --%> 
					<td>${dto.title }</td>
					<td>${dto.contentId }</td>  <%-- dto.getName() --%>
					<td>${dto.mapx }</td>
					<td>${dto.mapy }</td> <%-- dto.getRegDateTime() --%>
					<td>${dto.addr1 }</td>  <%-- dto.getName() --%>
					<td>${dto.tel }</td>
					<td><img src="${dto.firstimage2 }"></td> <%-- dto.getRegDateTime() --%>
				</tr>			
			</c:forEach>
		</c:otherwise>
		</c:choose>

	</table>


</div>
</body>
</html>