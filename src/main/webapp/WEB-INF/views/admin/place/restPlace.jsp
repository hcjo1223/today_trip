<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>       
<!DOCTYPE html>
<html lang="ko">
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/easypiechart.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/easypiechart-data.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/JS/admin/custom.js"></script>
<script type="text/javascript" src="/today_trip/resources/JS/admin/place.js"></script>
<style type="text/css">

</style>
<title>REST PLACE</title>
<!-- ?????????, js ??????????????? -->
</head>
<body>

	<nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span></button>
				<a class="navbar-brand" href="../../admin"><span>TodayTrip</span>Admin</a>
				<ul class="nav navbar-top-links navbar-right">
					<a href="../../home" class="pull-right" style="padding: 20px 20px 0 0"><em class="fa fa-lg fa-close"></em></a>
				</ul>
			</div>
		</div><!-- /.container-fluid -->
	</nav>

<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
		<div class="profile-sidebar">
			<div class="profile-userpic">
				<img src="../../resources/IMG/man.png" class="img-responsive" alt="">
			</div>
			<div class="profile-usertitle">
				<div class="profile-usertitle-name">${login.userId }</div>
				<div class="profile-usertitle-status"><span class="indicator label-success"></span>Online</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="divider"></div>
		<ul class="nav menu">
			<li class="active"><a href="../../admin"><img style="width: 20px" src="../../resources/IMG/admin_home.png"> ???</a></li>
			<li><a href="../users"><img style="width: 20px" src="../../resources/IMG/admin_user.png"> ????????????</a></li>
			<li class="parent "><a data-toggle="collapse" href="#sub-item-1">
				<img style="width: 20px" src="../../resources/IMG/admin_board.png"> ??????????????? <span data-toggle="collapse" href="#sub-item-1" class="icon pull-right"><em class="fa fa-plus"></em></span>
				</a>
				<ul class="children collapse" id="sub-item-1">
					<li><a class="" href="../board/calender">
						<img style="width: 20px" src="../../resources/IMG/admin_plan.png"> ??????
					</a></li>
					<li><a class="" href="../board/cards">
						<img style="width: 20px" src="../../resources/IMG/admin_picture.png"> ??????
					</a></li>
				</ul>
			</li>
			<li class="parent "><a data-toggle="collapse" href="#sub-item-2">
				<img style="width: 20px" src="../../resources/IMG/admin_place.png"> ???????????? <span data-toggle="collapse" href="#sub-item-2" class="icon pull-right"><em class="fa fa-plus"></em></span>
				</a>
				<ul class="children collapse" id="sub-item-2">
					<li><a class="" href="../place/accommodation">
						<img style="width: 20px" src="../../resources/IMG/admin_hotel.png"> ??????
					</a></li>
					<li><a class="" href="../place/restarurant">
						<img style="width: 20px" src="../../resources/IMG/admin_restarurant.png"> ?????????
					</a></li>
					<li><a class="" href="../place/sights">
						<img style="width: 20px" src="../../resources/IMG/admin_sights.png"> ?????????
					</a></li>
				</ul>
			</li>
			<li><a href="../stats"><img style="width: 20px" src="../../resources/IMG/admin_chart.png"> ??????</a></li>
		</ul>
	</div><!--/.sidebar-->
<div class="adminWMI1">
	<div class="adminWMI2">
		<span>??????</span>
	</div>
</div>
<div class="adminSearchPlace1">
	<div class="adminSearchPlace2">
		<input type="search" onKeypress="javascript:if(event.keyCode==13) {SearchAdminPlace()}" class="form-control" id="adminPlaceKeyword" placeholder="?????? ??????" aria-label="Search" aria-describedby="search-addon" />
	</div>
		<div class="buttonPlace">
			<button class="btn btn-lg btn-info" onclick="location.href='../place/accommodation'">??????</button>
			<button class="btn btn-lg btn-info" onclick="location.href='../place/restarurant'">?????????</button>
			<button class="btn btn-lg btn-info" onclick="location.href='../place/sights'">?????????</button>
		</div>
</div>

<div id="list">
	<%-- header --%>
	<div class="d01">
		<div class="left" id="pageinfo"></div>
		<div class="right" id="pageRows"></div>
	</div>
	<div class="clear"></div>
	
	<%-- ?????? --%>
	<form id="frmList" name="frmList">
		<table class="tablePlace">
			<thead>
				<th>??????</th>
				<th>??????</th>
				<th>?????????ID</th>
				<th>??????</th>
				<th>??????</th>
				<th>??????</th>
				<th>?????????</th>
				<th>?????????</th>
			</thead>
			<tbody>
			
			</tbody>
		</table>
	</form>
	
</div>

<div class="clear"></div>

<%-- ????????? --%>
<div class="center">
	<ul class="pagination" id="pagination"></ul>
</div>
</body>
</html>


















