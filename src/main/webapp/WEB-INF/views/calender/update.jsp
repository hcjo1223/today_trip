<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>여행일정 수정</title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
			integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
			
	<link rel="stylesheet" href="<c:url value="/resources/CSS/calender/calender.css" /> ">

	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&display=swap" >
	
	<link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/img/icon.ico" >
	
	<style>
		.tour-wrap {
			width: 1000px;
			margin: 0 auto;
		}
	</style>
</head>
<body>

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
	
		<div class="tour-write_head row mt-5 mb-5 p-3 border-bottom">
			<!-- 로고 및 홈페이지로 가는 링크 -->
			<!-- <div class="col-md-10">
				<a href="#"><img src="" alt="logo" /></a>
			</div> -->
			<!-- 글 올리기 버튼 -->
			<!-- <div class="col-md-2">
				<button type="button" class="btn btn-primary btnRegister">글 올리기</button>
			</div> -->
		</div>
   
		<div class="tour-edit">
			<form id="tour-form" action="register" method="post">
				<input id="tu-img-url" type="hidden" name="tu_img_url" />
		
				<!-- 제목 & 날짜 * 카테고리 입력 박스 -->
				<div class="input-box">
					
					<!-- 여행 제목 입력하기 -->
					<div class="input-title row mb-3">
						<input type="text" name="tu_title" value="${tour.tu_title}" class="form-control"/>
					</div>
					
					<!-- 여행 시작날짜 및 종료날짜 입력하기 -->
					<div class="input-date row mb-3">
						<div class="col-md-8 row">
							<input type="date" name="tu_start_tour" id="startDate" value="${fn:split(tour.tu_start_tour, ' ')[0]}" class="form-control col-md-4 mr-3"/>
							<input type="date" name="tu_end_tour" id="endDate" value="${fn:split(tour.tu_end_tour, ' ')[0]}" class="form-control col-md-4 mr-3"/>
						</div>
						<div class="col-md-4">
						
						</div>
					</div>
					
					<!-- 여행 카테고리 입력하기-->
					<div class="input-category row mb-3">
						<select name="tu_location" class="form-control col-md-2 mr-4">
							<!-- <option value="-1" selected hidden disabled>어디로</option> -->
							<option <c:if test="${tour.tu_location eq 1}">selected</c:if> value="1">서울</option>
							<option <c:if test="${tour.tu_location eq 2}">selected</c:if> value="2">인천</option>
							<option <c:if test="${tour.tu_location eq 3}">selected</c:if> value="3">대전</option>
							<option <c:if test="${tour.tu_location eq 4}">selected</c:if> value="4">대구</option>
							<option <c:if test="${tour.tu_location eq 5}">selected</c:if> value="5">광주</option>
							<option <c:if test="${tour.tu_location eq 6}">selected</c:if> value="6">부산</option>
							<option <c:if test="${tour.tu_location eq 7}">selected</c:if> value="7">울산</option>
							<option <c:if test="${tour.tu_location eq 8}">selected</c:if> value="8">세종</option>
							<option <c:if test="${tour.tu_location eq 9}">selected</c:if> value="9">경기도</option>
							<option <c:if test="${tour.tu_location eq 10}">selected</c:if> value="10">강원도</option>
							<option <c:if test="${tour.tu_location eq 11}">selected</c:if> value="11">충청북도</option>
							<option <c:if test="${tour.tu_location eq 12}">selected</c:if> value="12">충청남도</option>
							<option <c:if test="${tour.tu_location eq 13}">selected</c:if> value="13">경상북도</option>
							<option <c:if test="${tour.tu_location eq 14}">selected</c:if> value="14">경상남도</option>
							<option <c:if test="${tour.tu_location eq 15}">selected</c:if> value="15">전라북도</option>
							<option <c:if test="${tour.tu_location eq 16}">selected</c:if> value="16">전라남도</option>
							<option <c:if test="${tour.tu_location eq 17}">selected</c:if> value="17">제주도</option>
						</select>
						<select name="tu_with" class="form-control col-md-2 mr-4">
							<!-- <option value="-1" selected hidden disabled>누구와</option> -->
				   			<option <c:if test="${tour.tu_with eq 1}">selected</c:if> value="1">혼자</option>
				       	  	<option <c:if test="${tour.tu_with eq 2}">selected</c:if> value="2">친구</option>
				       	  	<option <c:if test="${tour.tu_with eq 3}">selected</c:if> value="3">연인</option>
				       	  	<option <c:if test="${tour.tu_with eq 4}">selected</c:if> value="4">배우자</option>
				       	  	<option <c:if test="${tour.tu_with eq 5}">selected</c:if> value="5">아이</option>
				       	  	<option <c:if test="${tour.tu_with eq 6}">selected</c:if> value="6">기타</option>
						</select>
						<select name="tu_focus" class="form-control col-md-3 mr-4">
							<!-- <option value="-1" selected hidden disabled>여행스타일</option> -->
		             	  	<option <c:if test="${tour.tu_focus eq 1}">selected</c:if> value="1">유명관광지는 필수</option>
		             	  	<option <c:if test="${tour.tu_focus eq 2}">selected</c:if> value="2">SNS 핫플레이스</option>
		             	  	<option <c:if test="${tour.tu_focus eq 3}">selected</c:if> value="3">여유롭게 힐링</option>
		             	  	<option <c:if test="${tour.tu_focus eq 4}">selected</c:if> value="4">체험/액티비티</option>
		             	  	<option <c:if test="${tour.tu_focus eq 5}">selected</c:if> value="5">문화/예술/역사 탐방</option>
		             	  	<option <c:if test="${tour.tu_focus eq 6}">selected</c:if> value="6">자연과 함께</option>
		             	  	<option <c:if test="${tour.tu_focus eq 7}">selected</c:if> value="7">관광보다 먹방</option>
						</select>
					</div>
				</div>
				
	         	<!-- 여행 계획 -->
				<!-- 일정을 script로 '시작일자 ~ 종료일자'를 계산해서 동적추가 -->
				<div class="tour-day-box mt-5 mb-5">
					<div id="place-memo-list" style="margin-top:60px;">
					
					</div>
				
					<div id="tag-list" style="margin-top:10px;">
					
					</div>
		 		</div>
				
				<!-- 여행 태그 입력하기 -->
			<!-- 	<div class="tour-tag row mt-5 mb-5">
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
	
	<!-- kakaoMap API -->	
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9ee4f208b51c14135f869526e5b078b5"></script>
	
	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	
	<script src="<c:url value="/resources/JS/calender/config.js" />"></script>
	<script src="<c:url value="/resources/JS/calender/update.js" />"></script>
	<%-- <script src="${pageContext.request.contextPath}/resources/JS/calender/update.js"></script> <!-- update.js --> --%>
</body>
</html>