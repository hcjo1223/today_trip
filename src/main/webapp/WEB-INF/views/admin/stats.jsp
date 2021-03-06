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
<script type="text/javascript">
var userAuthority = "${login.userAuthority}";
if (userAuthority != "0") {
	location.href="./error";
}
</script>		

<title>관리자 페이지(통계)</title>
</head>
<body>
	<nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span></button>
				<a class="navbar-brand" href="../admin"><span>TodayTrip</span>Admin</a>
				<ul class="nav navbar-top-links navbar-right">
					<a href="../home" class="pull-right" style="padding: 20px 20px 0 0"><em class="fa fa-lg fa-close"></em></a>
				
				
				</ul>
			</div>
		</div><!-- /.container-fluid -->
	</nav>

<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
		<div class="profile-sidebar">
			<div class="profile-userpic">
				<img src="../resources/IMG/man.png" class="img-responsive" alt="">
			</div>
			<div class="profile-usertitle">
				<div class="profile-usertitle-name">${login.userId }</div>
				<div class="profile-usertitle-status"><span class="indicator label-success"></span>Online</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="divider"></div>
		<ul class="nav menu">
			<li class="active"><a href="../admin"><img style="width: 20px" src="../resources/IMG/admin_home.png"> 홈</a></li>
			<li><a href="../admin/users"><img style="width: 20px" src="../resources/IMG/admin_user.png"> 회원관리</a></li>
			<li class="parent "><a data-toggle="collapse" href="#sub-item-1">
				<img style="width: 20px" src="../resources/IMG/admin_board.png"> 게시판관리 <span data-toggle="collapse" href="#sub-item-1" class="icon pull-right"><em class="fa fa-plus"></em></span>
				</a>
				<ul class="children collapse" id="sub-item-1">
					<li><a class="" href="../admin/board/calender">
						<img style="width: 20px" src="../resources/IMG/admin_plan.png"> 일정
					</a></li>
					<li><a class="" href="../admin/board/cards">
						<img style="width: 20px" src="../resources/IMG/admin_picture.png"> 사진
					</a></li>
				</ul>
			</li>
			<li class="parent "><a data-toggle="collapse" href="#sub-item-2">
				<img style="width: 20px" src="../resources/IMG/admin_place.png"> 장소관리 <span data-toggle="collapse" href="#sub-item-2" class="icon pull-right"><em class="fa fa-plus"></em></span>
				</a>
				<ul class="children collapse" id="sub-item-2">
					<li><a class="" href="../admin/place/accommodation">
						<img style="width: 20px" src="../resources/IMG/admin_hotel.png"> 숙소
					</a></li>
					<li><a class="" href="../admin/place/restarurant">
						<img style="width: 20px" src="../resources/IMG/admin_restarurant.png"> 음식점
					</a></li>
					<li><a class="" href="../admin/place/sights">
						<img style="width: 20px" src="../resources/IMG/admin_sights.png"> 관광지
					</a></li>
				</ul>
			</li>
			<li><a href="../admin/stats"><img style="width: 20px" src="../resources/IMG/admin_chart.png"> 통계</a></li>
		</ul>
	</div><!--/.sidebar-->
<div class="adminWMI1">
	<div class="adminWMI2">
		<span>통계</span>
	</div>
</div>
	
	<div class="row" style="width: 82%">
			<div class="col-lg-12">
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