<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/admin/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/admin/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/admin/font-awesome.min.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/admin/datepicker3.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/admin/styles.css">
<!--Custom Font-->
<link
	href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i"
	rel="stylesheet">

<title>${login.userId} 페이지</title>
</head>
<body>
	<nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#sidebar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="${context_path}/home"><span>TodayTrip</span>${login.userNickname}
					님의 마이페이지</a>
				<ul class="nav navbar-top-links navbar-right">
					<a href="home" class="pull-right" style="padding: 20px 20px 0 0"><em
						class="fa fa-lg fa-close"></em></a>
				</ul>
			</div>
		</div>
		<!-- /.container-fluid -->
	</nav>
	
	<div class = "home_board">
	<div class = "element_title">
		<span>${login.userNickname}님의 회원 정보</span>
		
				<div class="home_board">
				<div class="element_title">
					<span>게시판</span><span class="subSpan">일정</span> <a
						href="./admin/board/calender" class="icon pull-right"
						style="padding-right: 80px"><em class="fa fa-plus"></em></a>
					<div>
						<table style="float: left; width: 80%" class="tablePlace">
							<tr>
								<th>번호</th>
								<th>제목</th>
								<th>조회수</th>
								<th>작성날짜</th>
							</tr>

							<c:choose>
								<c:when
									test="${empty listHomeCalender || fn:length(listHomeCalender) == 0 }">
								</c:when>
								<c:otherwise>
									<c:forEach var="dto" items="${listHomeCalender }">
										<tr>
											<td class="W30">${dto.tu_uid }</td>
											<%-- dto.getUid() --%>
											<td>${dto.tu_title }</td>
											<td>${dto.tu_hits }</td>
											<%-- dto.getName() --%>
											<td>${dto.tu_write_date }</td>
										</tr>
									</c:forEach>
								</c:otherwise>
							</c:choose>

						</table>
					</div>
				</div>
			</div>
			<div class="home_place">
				<div class="element_title">
					<span>장소</span><span class="subSpan">숙소</span> <a
						href="./admin/place/accommodation" class="icon pull-right"
						style="padding-right: 80px"><em class="fa fa-plus"></em></a>
				</div>
				<div>
					<table style="float: left; width: 80%" class="tablePlace">
						<tr>
							<th>번호</th>
							<th>이름</th>
							<th>주소</th>
							<th>연락처</th>
						</tr>

						<c:choose>
							<c:when
								test="${empty listHomePlace || fn:length(listHomePlace) == 0 }">
							</c:when>
							<c:otherwise>
								<c:forEach var="dto" items="${listHomePlace }">
									<tr>
										<td class="W30">${dto.place_uid }</td>
										<%-- dto.getUid() --%>
										<td>${dto.title }</td>
										<td>${dto.addr }</td>
										<%-- dto.getName() --%>
										<td>${dto.tel }</td>
									</tr>
								</c:forEach>
							</c:otherwise>
						</c:choose>

					</table>
				</div>
			</div>

</body>
</html>


