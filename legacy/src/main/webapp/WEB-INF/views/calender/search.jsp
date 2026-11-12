<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>오늘의 여행 검색</title>
	
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,viewport-fit=cover"/>
	
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
			integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
			
	<link rel="stylesheet" href="<c:url value="/resources/CSS/calender/calender.css" />" >
	<link rel="stylesheet" href="<c:url value="/resources/CSS/calender/list.css" />" >

	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&display=swap" >
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/CSS/calender/common.css"/>
	<link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/IMG/icon.ico" >
</head>
<style>
.d-flex { 
  position: absolute; 
  width: 300px; 
  background-color: #EEEFF1;
  border-radius: 5px; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  /* padding-top: 300px; */
}
.navbar {
	padding: 3.0rem 1.0rem;
}
</style>
<body>
	<!-- header & nav -->
	<header class="layout-navigation-bar">
	<div data-sticky-enabled="false" data-sticky-disabled="false" data-sticky-always="true" data-sticky-ignore="false" data-direction="top" data-offset="0" class="sticky-container layout-navigation-primary-wrap">
		<div class="sticky-child layout-navigation-primary" style="position:relative">
			<div class="layout-navigation-primary__content">
				
				<div class="layout-navigation-primary__leftmost">
					<button class="layout-navigation-bar-icon layout-navigation-bar-drawer-button" title="메뉴" aria-label="메뉴" type="button">
						<svg class="icon" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
							<path fill="currentColor" d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
						</svg>
					</button>
				</div>
				
				<div class="layout-navigation-primary__left">
					<a class="layout-navigation-logo layout-navigation__bar__logo" aria-label="오늘의여행" href="">
						<svg class="icon" width="135" height="38" viewBox="0 0 135 38" preserveAspectRatio="xMidYMid meet">
							<g>
								<text style="height: 40px;" xml:space="preserve" text-anchor="start" font-family="'Jal_Onuel'" font-size="30" id="svg_23" y="30" x="0" opacity="undefined" fill-opacity="null" stroke-opacity="null" stroke-dasharray="null" stroke-width="0" stroke="#000" fill="#000" >오늘의여행</text>
							</g>
						</svg>
					</a>
				</div>
				
				<nav class="layout-navigation-primary__menu">
					<a class="layout-navigation-primary__menu__item layout-navigation-primary__menu__item--active layout-navigation-primary__menu__item--open" href="">커뮤니티</a>
					<a class="layout-navigation-primary__menu__item" href="">예약</a>
				</nav>
				
				<div class="layout-navigation-primary__right">
					<div class="layout-navigation-bar-search">
						<div class="layout-navigation-search" id="id-1">
							<div class="layout-navigation-search__header">
								<div id="id-1-combobox" class="layout-navigation-search__combobox" role="combobox" aria-haspopup="listbox" aria-expanded="false">
									<div class="layout-navigation-search__input">
										<div class="drop-down layout-navigation-search-image">
											<svg class="icon" width="1em" height="1em" fill="none" viewBox="-1 -1 24 24" preserveAspectRatio="xMidYMid meet"></svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
                
                <div class="layout-navigation-bar-login">
					<a class="layout-navigation-bar-login__item" href="">로그인</a>
					<a class="layout-navigation-bar-login__item" href="">회원가입</a>
				</div>
                
				<div class="drop-down layout-navigation-bar-upload-button">
					<button class="layout-navigation-bar-upload-button__button" type="button">글쓰기
						<svg class="icon" width="1em" height="1em" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">
							<path fill="currentColor" fill-rule="evenodd" d="M2.87 4L1.33 5.5 8 12l6.67-6.5L13.13 4 8 9z"></path>
						</svg>
					</button>
				</div>
				
			</div>
		</div>
	</div>

	<div data-sticky-enabled="false" data-sticky-disabled="false" data-sticky-always="true" data-sticky-ignore="false" data-direction="top" data-offset="31" class="sticky-container layout-navigation-secondary-wrap">
		<div class="sticky-child layout-navigation-secondary" style="position:relative"></div>
		<div data-sticky-enabled="false" data-sticky-disabled="false" data-sticky-always="true" data-sticky-ignore="false" data-direction="top" data-offset="31" class="sticky-container layout-navigation-secondary-wrap">
			<div class="sticky-child layout-navigation-secondary" style="position: relative;">
				<div class="layout-navigation-secondary__content">
					<nav class="layout-navigation-secondary__menu">
						<a class="layout-navigation-secondary__menu__item" href="">홈</a>
						<a class="layout-navigation-secondary__menu__item" href="./cards/list.do">사진</a>
						<a class="layout-navigation-secondary__menu__item layout-navigation-secondary__menu__item--active" href="./list">일정</a>
						<a class="layout-navigation-secondary__menu__item" href="./place/list">장소</a>
						<a class="layout-navigation-secondary__menu__item" href="./advices">노하우</a>
						<a class="layout-navigation-secondary__menu__item" href="./questions">질문과답변</a>
					</nav>
				</div>
			</div>
		</div>
	</div>
	</header>

	<div class="clear"></div>
	
	<!-- contents -->
	<!-- 장소 검색하기 -->
	<div class="input-group rounded" style="padding: 30px 0; width: 50%; margin: 0 auto;">
		<!-- 검색창 -->
		<input type="search" id="keyword" onkeypress="javascript:if(event.keyCode==13){Search();}" class="form-control rounded" placeholder="여행 게시글 검색" aria-label="Search"
				aria-describedby="search-addon" />
		<!-- 검색버튼 -->
		<button type="button" class="input-group-text border-0" id="btnSearch">
			<i class="fas fa-search"></i>
		</button>
	</div>
	
	<!-- 여행게시글 리스트 -->
<!-- 	<div id="tourList">
	
	</div> -->
	
	<table id="tourList" class="table align-middle">
	
		<thead>
			<tr>
				<th scope="col">사진</th>
				<th scope="col">제목</th>
			</tr>
		</thead>
		
		<tbody>
			<c:forEach var="tour" items="${list}" varStatus="status">
				<tr>
					<th scope="row">
						<!-- 썸네일 -->
						<a href="<c:out value="${tour.tu_img_url}" />">
							<img src="<c:out value="${tour.tu_img_url}" />" alt="" width="80" height="80" />
						</a>
					</th>
					
					<td>
						<!-- 여행제목 -->
						<div><p class="h6"><b><c:out value="${tour.tu_title}" /></b></p></div>
					</td>
				</tr>
			</c:forEach>
		</tbody>
		
	</table>
	
	
	
</body>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	
<script src="${pageContext.request.contextPath}/resources/JS/calender/search.js"></script> <!-- search.js -->
</html>