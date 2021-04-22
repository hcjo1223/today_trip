<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>여행일정 쓰기</title>
	
	<!-- Bootstrap CSS -->
	<%-- <link rel="stylesheet" href="<c:url value="/resources/CSS/calender/calender.css" /> "> --%>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/CSS/common.css" />
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
			integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
	
	<link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/IMG/icon.ico" >
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&display=swap" >
	
	<!-- kakaoMap API -->	
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9ee4f208b51c14135f869526e5b078b5"></script>
	
	<style>
	#DropdownContents {
		width: 150px;
		height: 180px;
		background-color: rgb(9, 173, 219, 0.8);
		position: absolute;
		border-radius: 4px;
		box-shadow: 2px 2px 4px 1px rgb(137, 137, 137, 0.8);
		display: none;
	}
	#DropdownContents a {
	  color: black;
	  padding: 12px 16px;
	  text-decoration: none;
	  display: block;
	  text-align: center;
	  color: white;
	  
	}
	
	#DropdownContents a:hover {
		background-color: rgb(9, 173, 219);
		cursor: pointer;
	}
	
	.tour-wrap .tour-list-wrap .tour-info{
	text-align: center;
	}
	
	a {
		text-decoration-line: none;
	}
	
	a:hover {
		text-decoration: none;
	}
	
		
	.clear {clear: both;}		
		
	.tour-info a {
		position: relative;
		display: block;
	}
	
	.tour-wrap {
			width: 1000px;
			margin: 0 auto;
		}
	
	</style>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript">
	$(document).ready( function() {
	    $( '#dropToggleBtn' ).click( function() {
	      $( '#DropdownContents' ).toggle( 'slow' );
	    });
	  });
	</script>
</head>
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
					<a class="layout-navigation-logo layout-navigation__bar__logo" aria-label="오늘의여행" href="../home">
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
					<c:if test="${empty login}">
						<a class="layout-navigation-bar-login__item" href="../Users/login">로그인</a>
						<a class="layout-navigation-bar-login__item"
							href="/today_trip/Users/register">회원가입</a>
					</c:if>
					<c:if test="${not empty login}">
						<a class="layout-navigation-bar-login__item" href="../Users/logout">로그아웃</a>
						<a class="layout-navigation-bar-login__item"
							href="/today_trip/Users/updateView">마이 페이지</a>
					</c:if>
				</div>
                
				<div class="drop-down layout-navigation-bar-upload-button">
					<button class="layout-navigation-bar-upload-button__button" type="button">글쓰기
						<svg class="icon" width="1em" height="1em" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">
							<path fill="currentColor" fill-rule="evenodd" d="M2.87 4L1.33 5.5 8 12l6.67-6.5L13.13 4 8 9z"></path>
						</svg>
					</button>
					<div id="DropdownContents">
                    	<a href="/today_trip/cards/new">사진</a>
                    	<a href="/today_trip/calender/register">일정</a>
                    	<a href="#">노하우</a>
                    	<a href="#">질문과 답변</a>
                    </div>
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
						<a class="layout-navigation-secondary__menu__item" href="/today_trip/home">홈</a>
						<a class="layout-navigation-secondary__menu__item" href="/today_trip/cards/list.do">사진</a>
						<a class="layout-navigation-secondary__menu__item layout-navigation-secondary__menu__item--active" href="/today_trip/calender/list">일정</a>
						<a class="layout-navigation-secondary__menu__item" href="/today_trip/place/list">장소</a>
						<a class="layout-navigation-secondary__menu__item" href="#">노하우</a>
						<a class="layout-navigation-secondary__menu__item" href="#">질문과답변</a>
						
						<c:choose>
							<c:when test="${login.userAuthority== 0}">
								<a style="margin-right: 50px;" class="layout-navigation-secondary__menu__item" href="./admin">관리자페이지</a></nav>
							</c:when>
						</c:choose>
					</nav>
				</div>
			</div>
		</div>
	</div>
	</header>

	<div class="clear"></div>


	<!-- modal -->
	<div class="modal fade" id="placeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				
				<!-- 장소 검색 & 나가기 버튼 -->
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">장소 검색</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				
				<!-- 장소 검색하기 -->
				<div class="modal-body">
					<div class="input-group rounded">
						<!-- 검색창 -->
						<input type="search" id="keyword" class="form-control rounded" placeholder="관광지/맛집/숙소 검색" aria-label="Search"
								aria-describedby="search-addon" />
						<!-- 검색버튼 -->
						<button type="button" class="input-group-text border-0" id="btnSearch">
							<i class="fas fa-search"></i>
						</button>
					</div>
					<!-- 인기 관광지 -->
					<div class="form-group">
						<label for="recipient-name" class="col-form-label">인기 관광지</label>
						<div id="placeList1">
               
						</div>
					</div>
					<!-- 숙박 & 식당  -->
					<div class="form-group">
						<label for="message-text" class="col-form-label">숙박 & 식당</label>
						<div id="placeList2">
               
						</div>
					</div>
				</div>
				
				<!-- 모달창 취소버튼 -->
				<div class="modal-footer">
					<button type="button" id="btnModalCancel" class="btn btn-secondary" data-dismiss="modal">취소</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- wrap -->
	<div class="tour-wrap mb-5">
	
<!-- 		<div class="tour-write_head row mt-5 mb-5 p-3 border-bottom">
			로고 및 홈페이지로 가는 링크
			<div class="col-md-10">
				<div class="layout-navigation-primary__left">
					<a class="layout-navigation-logo layout-navigation__bar__logo" aria-label="오늘의여행" href="">
						<svg class="icon" width="135" height="38" viewBox="0 0 135 38" preserveAspectRatio="xMidYMid meet">
							<g>
								<text style="height: 40px;" xml:space="preserve" text-anchor="start" font-family="'Jal_Onuel'" font-size="30" id="svg_23" y="30" x="0" opacity="undefined" fill-opacity="null" stroke-opacity="null" stroke-dasharray="null" stroke-width="0" stroke="#000" fill="#000" >오늘의여행</text>
							</g>
						</svg>
					</a>
				</div>
			</div>
			글 올리기 버튼
			<div class="col-md-2">
				<button type="button" class="btn btn-primary btnRegister" style="background-color: #35c5f0">글 올리기</button>
			</div>
		</div> -->
   
		<div class="tour-edit" style="padding-top: 50px;">
			<form id="tour-form" action="register" method="post">
				<input id="tu-img-url" type="hidden" name="tu_img_url" />
		
				<!-- 제목 & 날짜 * 카테고리 입력 박스 -->
				<div class="input-box">
					
					<!-- 여행 제목 입력하기 -->
					<div class="input-title row mb-3">
						<input type="text" name="tu_title" id="tuTitle" placeholder="제목을 입력하세요" class="form-control"/>
					</div>
					
					<!-- 여행 시작날짜 및 종료날짜 입력하기 -->
					<div class="input-date row mb-3">
						<div class="col-md-8 row">
							<input type="date" name="tu_start_tour" id="startDate" class="form-control col-md-4 mr-3"/>
							<input type="date" name="tu_end_tour" id="endDate" class="form-control col-md-4 mr-3"/>
						</div>
						<div class="col-md-4">
						
						</div>
					</div>
					
					<!-- 여행 카테고리 입력하기-->
					<div class="input-category row mb-3">
						<select name="tu_location" class="form-control col-md-2 mr-4">
							<option value="-1" selected hidden disabled>어디로</option>
							<option value="1">서울</option>
							<option value="2">인천</option>
							<option value="3">대전</option>
							<option value="4">대구</option>
							<option value="5">광주</option>
							<option value="6">부산</option>
							<option value="7">울산</option>
							<option value="8">세종</option>
							<option value="9">경기도</option>
							<option value="10">강원도</option>
							<option value="11">충청북도</option>
							<option value="12">충청남도</option>
							<option value="13">경상북도</option>
							<option value="14">경상남도</option>
							<option value="15">전라북도</option>
							<option value="16">전라남도</option>
							<option value="17">제주도</option>
						</select>
						<select name="tu_with" class="form-control col-md-2 mr-4">
							<option value="-1" selected hidden disabled>누구와</option>
							<option value="1">혼자</option>
							<option value="2">친구</option>
							<option value="3">연인</option>
							<option value="4">배우자</option>
							<option value="5">아이</option>
							<option value="6">기타</option>
						</select>
						<select name="tu_focus" class="form-control col-md-3 mr-4">
							<option value="-1" selected hidden disabled>여행스타일</option>
							<option value="1">유명관광지는 필수</option>
							<option value="2">SNS 핫플레이스</option>
							<option value="3">여유롭게 힐링</option>
							<option value="4">체험/액티비티</option>
							<option value="5">문화/예술/역사 탐방</option>
							<option value="6">자연과 함께</option>
							<option value="7">관광보다 먹방</option>
						</select>
					</div>
				</div>
				
	         	<!-- 여행 계획 -->
				<!-- 일정을 script로 '시작일자 ~ 종료일자'를 계산해서 동적추가 -->
				<div class="tour-day-box mt-5 mb-5">
					<!-- <div class="day-head border-bottom mb-3 d-flex justify-content-center">
						<h5>DAY 1</h5>
					</div>
					<div class="day-btn-box d-flex justify-content-center">
						<button type="button" class="btn btn-primary m-2 w-25">장소 추가</button>
						<button type="button" class="btn btn-primary m-2 w-25">메모 추가</button>
					</div> -->
				</div>
				
				<!-- 여행 태그 입력하기 -->
				<!-- <div class="tour-tag row mt-5 mb-5">
					<input type="text" name="tu_tag" placeholder=" ','를 구분으로 입력해주세요." class="form-control" />
				</div> -->
				
				<!-- 취소하기 & 등록하기 버튼 -->
				<div class="tour-btn-box row">
					<div class="col-md-2">
						<button type="button" class="btn btn-secondary">취소하기</button>
					</div>
					<div class="col-md-8">
					
					</div>
					<div class="col-md-2">
						<button type="button" class="btn btn-primary btnRegister" style="background-color: #35c5f0">글 올리기</button>
					</div>
				</div>
				
			</form>
		</div>
      
	</div>

	
	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	
	<script src="${pageContext.request.contextPath}/resources/JS/calender/register.js"></script> <!-- register.js -->
	
</body>
</html>