<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
		

<title>관리자 페이지</title>
</head>
<body>
	<nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span></button>
				<a class="navbar-brand" href="#"><span>TodayTrip</span>Admin</a>
				<ul class="nav navbar-top-links navbar-right">
					<a href="home" class="pull-right" style="padding: 20px 20px 0 0"><em class="fa fa-lg fa-close"></em></a>
				</ul>
			</div>
		</div><!-- /.container-fluid -->
	</nav>

<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
		<div class="profile-sidebar">
			<div class="profile-userpic">
				<img src="http://placehold.it/50/30a5ff/fff" class="img-responsive" alt="">
			</div>
			<div class="profile-usertitle">
				<div class="profile-usertitle-name">Username</div>
				<div class="profile-usertitle-status"><span class="indicator label-success"></span>Online</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="divider"></div>
		<ul class="nav menu">
			<li class="active"><a href="./admin"><img style="width: 20px" src="./resources/IMG/admin_home.png"> 홈</a></li>
			<li><a href="./admin/users"><img style="width: 20px" src="./resources/IMG/admin_user.png"> 회원관리</a></li>
			<li class="parent "><a data-toggle="collapse" href="#sub-item-1">
				<img style="width: 20px" src="./resources/IMG/admin_board.png"> 게시판관리 <span data-toggle="collapse" href="#sub-item-1" class="icon pull-right"><em class="fa fa-plus"></em></span>
				</a>
				<ul class="children collapse" id="sub-item-1">
					<li><a class="" href="./admin/board/calender">
						<img style="width: 20px" src="./resources/IMG/admin_plan.png"> 일정
					</a></li>
					<li><a class="" href="./admin/board/cards">
						<img style="width: 20px" src="./resources/IMG/admin_picture.png"> 사진
					</a></li>
				</ul>
			</li>
			<li class="parent "><a data-toggle="collapse" href="#sub-item-2">
				<img style="width: 20px" src="./resources/IMG/admin_place.png"> 장소관리 <span data-toggle="collapse" href="#sub-item-2" class="icon pull-right"><em class="fa fa-plus"></em></span>
				</a>
				<ul class="children collapse" id="sub-item-2">
					<li><a class="" href="./admin/place/accommodation">
						<img style="width: 20px" src="./resources/IMG/admin_hotel.png"> 숙소
					</a></li>
					<li><a class="" href="./admin/place/restarurant">
						<img style="width: 20px" src="./resources/IMG/admin_restarurant.png"> 음식점
					</a></li>
					<li><a class="" href="./admin/place/sights">
						<img style="width: 20px" src="./resources/IMG/admin_sights.png"> 관광지
					</a></li>
				</ul>
			</li>
			<li><a href="./admin/stats"><img style="width: 20px" src="./resources/IMG/admin_chart.png"> 통계</a></li>
		</ul>
	</div><!--/.sidebar-->
<div class="mainPlace">
	<div class="home_user" >
		<div class="element_title">
			<span>회원</span>
			<a href="./admin/users" class="icon pull-right" style="padding-right: 80px"><em class="fa fa-plus"></em></a>
			<div>
			<table style="float: left; width: 80%" class="tablePlace">
				<tr>
					<th>회원번호</th>
					<th>ID</th>
					<th>이메일</th>
					<th>가입날짜</th>
				</tr>
		
				<c:choose>
				<c:when test="${empty listHomeUsers || fn:length(listHomeUsers) == 0 }">
				</c:when>
				<c:otherwise>
					<c:forEach var="dto" items="${listHomeUsers }">
						<tr>
						 	<td class="W30">${dto.us_uid }</td>  <%-- dto.getUid() --%> 
							<td>${dto.userId }</td>
							<td>${dto.userEmail }</td>  <%-- dto.getName() --%>
							<td>${dto.reg_date }</td>
						</tr>			
					</c:forEach>
				</c:otherwise>
				</c:choose>
		
			</table>
		</div>
		</div>
		</div>
	<div class="home_board">
		<div class="element_title">
			<span>게시판</span><span class="subSpan">일정</span>
			<a href="./admin/board/calender" class="icon pull-right" style="padding-right: 80px"><em class="fa fa-plus"></em></a>
			<div>
			<table style="float: left; width: 80%" class="tablePlace">
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>조회수</th>
					<th>작성날짜</th>
				</tr>
		
				<c:choose>
				<c:when test="${empty listHomeCalender || fn:length(listHomeCalender) == 0 }">
				</c:when>
				<c:otherwise>
					<c:forEach var="dto" items="${listHomeCalender }">
						<tr>
						 	<td class="W30">${dto.tu_uid }</td>  <%-- dto.getUid() --%> 
							<td>${dto.tu_title }</td>
							<td>${dto.tu_hits }</td>  <%-- dto.getName() --%>
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
			<span>장소</span><span class="subSpan">숙소</span>
			<a href="./admin/place/accommodation" class="icon pull-right" style="padding-right: 80px"><em class="fa fa-plus"></em></a>
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
				<c:when test="${empty listHomePlace || fn:length(listHomePlace) == 0 }">
				</c:when>
				<c:otherwise>
					<c:forEach var="dto" items="${listHomePlace }">
						<tr>
						 	<td class="W30">${dto.uid }</td>  <%-- dto.getUid() --%> 
							<td>${dto.title }</td>
							<td>${dto.addr1 }</td>  <%-- dto.getName() --%>
							<td>${dto.tel }</td>
						</tr>			
					</c:forEach>
				</c:otherwise>
				</c:choose>
		
			</table>
		</div>
	</div>
	<div class="home_stats">
		<div class="element_title">
			<span>통계</span><span class="subSpan">방문자 수</span>
			<a href="./admin/stats" class="icon pull-right" style="padding-right: 80px"><em class="fa fa-plus"></em></a>
		</div>
		<div class="row" style="width: 100%; float: left;">
			<div class="col-lg-12" style="width: 100%">
				<div class="panel panel-default">
					<div class="panel-heading">
						방문자 수
						<span class="pull-right clickable panel-toggle panel-button-tab-left"><em class="fa fa-toggle-up"></em></span></div>
					<div class="panel-body">
						<div class="canvas-wrapper">
							<canvas class="main-chart" id="bar-chart" height="200" width="600"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div><!--/.row-->	
		

		
		<script type="text/javascript">
			var log_date ="";
			var log_count = "";
		</script>
		<c:choose>
		<c:when test="${empty listLogCount || fn:length(listLogCount) == 0 }">
		</c:when>
		<c:otherwise>
			<c:forEach var="dto" items="${listLogCount }">
				<script type="text/javascript">log_date += "${dto.log_date}" + ";";</script>
				<script type="text/javascript">log_count += "${dto.log_count}" + ";";</script>
			</c:forEach>
		</c:otherwise>
		</c:choose>
	</div>
</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/chart.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/chart-data.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/easypiechart.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/easypiechart-data.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/custom.js"></script>
<script>
	window.onload = function () {
		var chart2 = document.getElementById("bar-chart").getContext("2d");
		window.myBar = new Chart(chart2).Bar(barChartData, {
		responsive: true,
		scaleLineColor: "rgba(0,0,0,.2)",
		scaleGridLineColor: "rgba(0,0,0,.05)",
		scaleFontColor: "#c5c7cc"
		});
};
	</script>
</html>


		