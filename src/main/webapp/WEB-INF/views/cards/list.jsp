<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!--  JSTL 버전으로 바뀌니, import 의 번잡함도 사라진다! JAVA 변수 선언도 사라진다. -->

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>목록</title>
<style>
table {width:100%;}
table, th, td {
	border: 1px solid black;
	border-collapse: collapse;
}
</style>
</head>
<body>

<hr>
<h2>리스트</h2>
<table>
	<tr>
		<th>UID</th>
		<th>내용</th>
		<th>조회수</th>
		<th>어디로</th>
		<th>누구와</th>
		<th>목적</th>
		<th>입력날짜</th>
	</tr>
	<c:choose>
	<c:when test="${empty list || fn:length(list) == 0 }">
	</c:when>
	<c:otherwise>
		<c:forEach var="dto" items="${list }">
		
			<tr>
				<td>${dto.uid }</td>
				<td><a href="view.do?uid=${dto.uid }">${dto.contents }</a></td>
				<td>${dto.hits }</td>
				<td>${dto.location }</td>
				<td>${dto.focus }</td>
				<td>${dto.withs }</td>
				<td>${dto.regDate }</td>
			</tr>
		
		</c:forEach>
	</c:otherwise>
	</c:choose>



</table>
<br>
<button onclick="location.href = 'new'">신규등록</button>

</body>
</html>
