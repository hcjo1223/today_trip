<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,viewport-fit=cover" />
<title>오늘의여행</title>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
	rel="stylesheet">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/common.css" />
<link rel="shortcut icon" type="image/x-icon"
	href="${pageContext.request.contextPath }/resources/IMG/icon.ico">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready( function() {
    $( '#dropToggleBtn' ).click( function() {
      $( '#DropdownContents' ).toggle( 'slow' );
    });
  });
</script>
</head>
<style>
#DropdownContents {
	width: 150px;
	height: 180px;
	background-color: rgb(9, 173, 219, 0.8);
	position: absolute;
	border-radius: 4px;
	box-shadow: 2px 2px 4px 1px rgb(137, 137, 137, 0.8);
	display: none;
	right: 35px;
  	top: 70px;
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
</style>
<body>
	<header class="layout-navigation-bar">
		<div data-sticky-enabled="false" data-sticky-disabled="false"
			data-sticky-always="true" data-sticky-ignore="false"
			data-direction="top" data-offset="0"
			class="sticky-container layout-navigation-primary-wrap">
			<div class="sticky-child layout-navigation-primary"
				style="position: relative">
				<div class="layout-navigation-primary__content">
					<div class="layout-navigation-primary__leftmost">
						<button
							class="layout-navigation-bar-icon layout-navigation-bar-drawer-button"
							title="메뉴" aria-label="메뉴" type="button">
							<svg class="icon" width="24" height="24" viewBox="0 0 24 24"
								preserveAspectRatio="xMidYMid meet">
                            <path fill="currentColor"
									d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
                        </svg>
						</button>
					</div>
					<div class="layout-navigation-primary__left">
						<a class="layout-navigation-logo layout-navigation__bar__logo"
							aria-label="오늘의여행" href=""> <svg class="icon" width="135"
								height="38" viewBox="0 0 135 38"
								preserveAspectRatio="xMidYMid meet">
                            <g>
                                <text style="height: 40px;"
									xml:space="preserve" text-anchor="start"
									font-family="'Jal_Onuel'" font-size="30" id="svg_23" y="30"
									x="0" opacity="undefined" fill-opacity="null"
									stroke-opacity="null" stroke-dasharray="null" stroke-width="0"
									stroke="#000" fill="#000">오늘의여행</text>
                            </g>
                        </svg>
						</a>
					</div>
					<nav class="layout-navigation-primary__menu">
						<a
							class="layout-navigation-primary__menu__item layout-navigation-primary__menu__item--active layout-navigation-primary__menu__item--open"
							href="">커뮤니티</a> <a class="layout-navigation-primary__menu__item"
							href="">예약</a>
					</nav>
					<div class="layout-navigation-primary__right">
						<div class="layout-navigation-bar-search">
							<div class="layout-navigation-search" id="id-1">
								<div class="layout-navigation-search__header">
									<div id="id-1-combobox"
										class="layout-navigation-search__combobox" role="combobox"
										aria-haspopup="listbox" aria-expanded="false">
										<div class="layout-navigation-search__input">
											<div class="drop-down layout-navigation-search-image">
												<svg class="icon" width="1em" height="1em" fill="none"
													viewBox="-1 -1 24 24" preserveAspectRatio="xMidYMid meet"></svg>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="layout-navigation-bar-login">
						<c:if test="${empty login}">
							<a class="layout-navigation-bar-login__item" href="Users/login">로그인</a>
							<a class="layout-navigation-bar-login__item"
								href="Users/register">회원가입</a>
						</c:if>
						<c:if test="${not empty login}">
							<a class="layout-navigation-bar-login__item" href="Users/logout">로그아웃</a>
							<a class="layout-navigation-bar-login__item"
								href="Users/updateView">마이 페이지</a>
						</c:if>
					</div>
					<div class="drop-down layout-navigation-bar-upload-button">
						<button id="dropToggleBtn" class="layout-navigation-bar-upload-button__button"
							type="button">
							글쓰기
							<svg class="icon" width="1em" height="1em" viewBox="0 0 16 16"
								preserveAspectRatio="xMidYMid meet">
                            <path fill="currentColor"
									fill-rule="evenodd"
									d="M2.87 4L1.33 5.5 8 12l6.67-6.5L13.13 4 8 9z"></path>
                        </svg>
                    </button>
                    <div id="DropdownContents">
                    	<a href="./cards/new">사진</a>
                    	<a href="./calender/register">일정</a>
                    	<a href="#">노하우</a>
                    	<a href="#">질문과 답변</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div data-sticky-enabled="false" data-sticky-disabled="false" data-sticky-always="true" data-sticky-ignore="false" data-direction="top" data-offset="31" class="sticky-container layout-navigation-secondary-wrap">
    <div class="sticky-child layout-navigation-secondary" style="position:relative">
    </div>
    <div data-sticky-enabled="false" data-sticky-disabled="false" data-sticky-always="true" data-sticky-ignore="false" data-direction="top" data-offset="31" class="sticky-container layout-navigation-secondary-wrap">
        <div class="sticky-child layout-navigation-secondary" style="position: relative;">
            <div class="layout-navigation-secondary__content">
                <nav class="layout-navigation-secondary__menu">
                <a class="layout-navigation-secondary__menu__item layout-navigation-secondary__menu__item--active" href="">홈</a>
                <a class="layout-navigation-secondary__menu__item" href="./cards/list">사진</a>
                <a class="layout-navigation-secondary__menu__item" href="${pageContext.request.contextPath}/calender/list">일정</a>
                <a class="layout-navigation-secondary__menu__item" href="${pageContext.request.contextPath}/place/list">장소</a>
                <a class="layout-navigation-secondary__menu__item" href="#">노하우</a>
                <a class="layout-navigation-secondary__menu__item" href="#">질문과답변</a></nav>
                <c:choose>
                <c:when test="${login.userAuthority== 0}">
                	<a style="margin-right: 50px;" class="layout-navigation-secondary__menu__item" href="./admin">관리자페이지</a></nav>
                </c:when>
                </c:choose>
            </div>
        </div>
    </div>
</header>

<!-- center main -->
<div class="home-page">
	<div class="container home-header">
		<div class="row">
			<div class="col-12 col-md-9 home-header__story">
				<article class="story-entry home-header__story__image">
					<!-- 1 -->
                    <div style="width: 100%; border-bottom: 1px solid #ededed;">
                    	<div class="HomePopImgSpace">
                    		<div class="HomePopHSpace"><span>월간 인기 사진</span></div>
                    		<img class="story-entry__image" src="http://localhost:8099/pic/0ebb7de3578044989f318c905f7ec173.jpg" style="border-radius: 4px; display: block; margin: 0 auto; margin-bottom: 20px">
                    		<div class="goToImgDiv">
                    			<button class="goToImg" onclick="location.href='./cards/view.do?uid=${listPopularPic[0].pcUid}'">보러가기</button>
                    		</div>
                    	</div>
                    	
                    </div>
                    <!-- 2 -->
                    <div class="HomeDiv2" style="border-bottom: 1px solid #ededed;">
                    	<div style="display: block; margin: 0 auto; width: 550px; padding-right: 470px; color: rgb(130, 130, 130);">
                    			<h1 style="margin-left: 0">오늘의 여행 일정</h1>
                    	</div>
                    	<div class = "imgcon">
		                    	<ul>
		                    	<c:choose>
								<c:when test="${empty listHomeCalender || fn:length(listHomeCalender) == 0 }"></c:when>
								<c:otherwise>
									<c:forEach var="dto" items="${listHomeCalender }">
										<li>
										<!--  
										 	<span>${ dto.tu_uid}</span>
										 	<span>${ dto.tu_title}</span>
										 	<span>${ dto.tu_hits}</span>
										 	<span>${ dto.place_uid}</span>
										 -->
										 	<div class="imgDivOverflow">
											 <a href="./calender/read?tu_uid=${dto.tu_uid}"><img src="${ dto.firstimage2}"></a>
											 </div>
											 <div class="HomeConSpace"><span>${ dto.tu_title}</span></div>
										 </li>
									</c:forEach>
								</c:otherwise>
								</c:choose>
								</ul>
                    	</div>
                    
                    
                    
                    </div>
                    <!-- 3 -->
                    <div style="border-bottom: 1px solid #ededed; height: 350px;">
                    	<div style="display: block; margin: 0 auto; width: 550px; padding-right: 470px; color: rgb(130, 130, 130);">
                    			<h1 style="margin-left: 0">오늘의 인기 사진</h1>
                    	</div>
                    	<div class = "imgcon">
		                    	<ul>
		                    	<c:choose>
								<c:when test="${empty listHomePic || fn:length(listHomePic) == 0 }"> </c:when>
								<c:otherwise>
									<c:forEach var="dto" items="${listHomePic }">
										<li>
										<!--  
										 	<span>${ dto.tu_uid}</span>
										 	<span>${ dto.tu_title}</span>
										 	<span>${ dto.tu_hits}</span>
										 	<span>${ dto.place_uid}</span>
										 -->
										 	 <div class="imgDivOverflow">
												 <a href="./cards/view.do?uid=${ dto.pc_uid}"><img src= "http://localhost:8099/pic/${ dto.pl_name}"></a>
											 </div>
											 <c:choose>
												 <c:when test="${dto.pc_focus == 0}">
												  <div class="HomeConSpace"><span>유명 관광지는 필수</span></div>
												 </c:when>
												 <c:when test="${dto.pc_focus == 1}">
												  <div class="HomeConSpace"><span>SNS 핫플레이스</span></div>
												 </c:when>
												 <c:when test="${dto.pc_focus == 2}">
												  <div class="HomeConSpace"><span>여유롭게 힐링</span></div>
												 </c:when>
												 <c:when test="${dto.pc_focus == 3}">
												  <div class="HomeConSpace"><span>체험·액티비티</span></div>
												 </c:when>
												 <c:when test="${dto.pc_focus == 4}">
												  <div class="HomeConSpace"><span>문화·예술·역사</span></div>
												 </c:when>
												 <c:when test="${dto.pc_focus == 5}">
												  <div class="HomeConSpace"><span>자연과 함께</span></div>
												 </c:when>
												 <c:when test="${dto.pc_focus == 6}">
												  <div class="HomeConSpace"><span>관광보다 먹방</span></div>
												 </c:when>
											 </c:choose>
											
											 	 	
										
										 </li>
									</c:forEach>
								</c:otherwise>
								</c:choose>
								</ul>
                    	</div>
                    
                    
                    
                    </div>
                    
                </article>
            </div>
        </div>
    </div>
    
</div>

	<footer class="layout-footer">
		<div class="layout-footer__content">
			<div class="layout-footer__top">
				<address class="layout-footer__cs">
					<div class="layout-footer__cs__row">
						<a class="layout-footer__cs__link" href="/customer_center">고객센터<svg
								class="icon" aria-hidden="true" width="1em" height="1em"
								viewbox="0 0 24 24" preserveaspectratio="xMidYMid meet">
								<path fill="currentColor" fill-rule="nonzero"
									d="M6 19.692L8.25 22 18 12 8.25 2 6 4.308 13.5 12z"></path></svg></a>
					</div>
					<div class="layout-footer__cs__row">
						<a class="layout-footer__cs__tel" href="tel:1670-0876">1670-0876</a>
					</div>
					<span class="layout-footer__cs__time">평일 09:00 ~ 18:00 (주말
						&amp; 공휴일 제외)</span>
				</address>
				<div class="layout-footer__outbound">
					<a class="layout-footer__outbound__item"
						href="https://itunes.apple.com/kr/app/oneul-uijib-intelieo-gong/id1008236892"
						target="_blank" rel="noreferrer noopener" title="앱스토어"
						aria-label="앱스토어"><svg class="icon" width="30" height="30"
							viewbox="0 0 30 30" preserveaspectratio="xMidYMid meet">
							<path fill-rule="evenodd"
								d="M22.34 15.57a5.6 5.6 0 0 0 3.42 5.15c-.02.1-.53 1.84-1.78 3.62-1.05 1.57-2.15 3.1-3.9 3.13-1.69.04-2.26-1-4.2-1-1.96 0-2.57.97-4.2 1.04-1.65.06-2.92-1.67-4-3.23-2.18-3.17-3.87-8.93-1.6-12.85a6.23 6.23 0 0 1 5.24-3.2c1.66-.03 3.2 1.12 4.22 1.12 1 0 2.91-1.38 4.88-1.17.82.02 3.17.32 4.68 2.52-.13.08-2.8 1.64-2.76 4.87zm-3.2-9.48a4.8 4.8 0 0 1-3.8 1.8c-.18-1.46.54-3 1.34-3.95A5.81 5.81 0 0 1 20.44 2c.17 1.5-.43 3-1.3 4.09z"></path></svg></a><a
						class="layout-footer__outbound__item"
						href="https://play.google.com/store/apps/details?id=net.bucketplace"
						target="_blank" rel="noreferrer noopener" title="플레이스토어"
						aria-label="플레이스토어"><svg class="icon" width="30" height="30"
							viewbox="0 0 30 30" preserveaspectratio="xMidYMid meet">
							<path fill-rule="evenodd"
								d="M4.22 26.95A2.35 2.35 0 0 1 4 25.9V3.8c0-.42.08-.77.22-1.05l12.1 12.1-12.1 12.1zm.74.68l12.07-12.07 3.7 3.7-14.2 8.1c-.6.34-1.14.42-1.57.27zm15.78-17.2l-3.71 3.71L4.96 2.07c.14-.04.3-.07.45-.07.34 0 .72.1 1.12.34l14.2 8.1zm.9.52l4.32 2.46c1.39.8 1.39 2.09 0 2.88l-4.32 2.46-3.9-3.9 3.9-3.9z"></path></svg></a><a
						class="layout-footer__outbound__item"
						href="https://story.kakao.com/ch/bucketplace" target="_blank"
						rel="noreferrer noopener" title="카카오스토리" aria-label="카카오스토리"><svg
							class="icon" width="30" height="30" viewbox="0 0 30 30"
							preserveaspectratio="xMidYMid meet">
							<path fill="#757575" fill-rule="evenodd"
								d="M19.02 6h-8.04a.96.96 0 0 0-.98.93v8.16c0 .51.44.93.98.93h3.7c-.02.9-.4 1.9-.99 2.77a10.3 10.3 0 0 1-2 2.06l-.03.03c-.11.1-.2.22-.2.38 0 .12.07.21.14.31l.02.02 2.57 2.76s.13.12.23.15c.12.02.25.03.34-.04A12.25 12.25 0 0 0 20 14.79V6.93a.96.96 0 0 0-.98-.93"></path></svg></a><a
						class="layout-footer__outbound__item"
						href="https://www.facebook.com/interiortoday" target="_blank"
						rel="noreferrer noopener" title="페이스북" aria-label="페이스북"><svg
							class="icon" width="30" height="30" viewbox="0 0 30 30"
							preserveaspectratio="xMidYMid meet">
							<path fill="#757575" fill-rule="evenodd"
								d="M16.67 26V15H20v-3.38h-3.33V9.07c-.02-.76.08-1.29 1.66-1.7H20V4h-3.33c-3.2 0-4.46 1.84-4.17 5.08v2.53H10V15h2.5v11h4.17z"></path></svg></a><a
						class="layout-footer__outbound__item"
						href="https://www.instagram.com/todayhouse" target="_blank"
						rel="noreferrer noopener" title="인스타그램" aria-label="인스타그램"><svg
							class="icon" width="30" height="30" viewbox="0 0 30 30"
							preserveaspectratio="xMidYMid meet">
							<path fill="#757575" fill-rule="evenodd"
								d="M15 3c3.26 0 3.67.02 4.95.08 1.27.05 2.14.26 2.9.55a5.88 5.88 0 0 1 2.13 1.39 5.88 5.88 0 0 1 1.39 2.12c.3.77.5 1.64.55 2.91.06 1.28.08 1.7.08 4.95s-.02 3.67-.08 4.95a8.78 8.78 0 0 1-.55 2.9 5.88 5.88 0 0 1-1.39 2.13 5.88 5.88 0 0 1-2.12 1.39c-.77.3-1.64.5-2.91.55-1.28.06-1.7.08-4.95.08s-3.67-.02-4.95-.08a8.78 8.78 0 0 1-2.9-.55 5.88 5.88 0 0 1-2.13-1.39 5.88 5.88 0 0 1-1.39-2.12c-.3-.77-.5-1.64-.55-2.91C3.02 18.67 3 18.25 3 15s.02-3.67.08-4.95c.05-1.27.26-2.15.55-2.9a5.88 5.88 0 0 1 1.39-2.13 5.88 5.88 0 0 1 2.12-1.39c.76-.3 1.64-.5 2.91-.55C11.33 3.02 11.75 3 15 3zm0 2.17c-3.2 0-3.58 0-4.85.07-1.17.05-1.8.24-2.22.4-.56.23-.96.49-1.38.9a3.7 3.7 0 0 0-.9 1.39 6.64 6.64 0 0 0-.41 2.22A82.92 82.92 0 0 0 5.17 15c0 3.2 0 3.58.07 4.85.05 1.17.24 1.8.4 2.22.23.56.49.96.9 1.38.43.42.83.68 1.39.9.42.17 1.05.36 2.22.41 1.27.06 1.65.07 4.85.07 3.2 0 3.58 0 4.85-.07a6.67 6.67 0 0 0 2.23-.4c.56-.23.96-.49 1.38-.9.42-.43.68-.83.9-1.39.16-.42.35-1.05.4-2.22.06-1.27.07-1.65.07-4.85 0-3.2 0-3.58-.06-4.85a6.66 6.66 0 0 0-.42-2.23 3.72 3.72 0 0 0-.9-1.38 3.7 3.7 0 0 0-1.37-.9 6.64 6.64 0 0 0-2.23-.4A82.92 82.92 0 0 0 15 5.15zm0 3.67a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32zM15 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7.84-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"></path></svg></a><a
						class="layout-footer__outbound__item"
						href="http://naver.me/51ckkDZh" target="_blank"
						rel="noreferrer noopener" title="네이버 포스트" aria-label="네이버 포스트"><svg
							class="icon" width="30" height="30" viewbox="0 0 30 30"
							preserveaspectratio="xMidYMid meet">
							<path fill="#757575" fill-rule="evenodd"
								d="M8.5 5h13v13h-13V5zm7.45 4v2.52L14.05 9H12v5h2.05v-2.52l1.9 2.52H18V9h-2.05zm3.11 13h-8.12L8.5 19h13l-2.44 3zm-.81 1L15 27l-3.25-4h6.5z"></path></svg></a>
				</div>
			</div>
			<ul class="layout-footer__shortcut">
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="http://bucketplace.co.kr/brand-story" target="_blank">브랜드
						스토리</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="http://bucketplace.co.kr/" target="_blank">회사소개</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="http://bucketplace.co.kr/recruit" target="_blank">채용정보</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="/usepolicy" target="_blank">이용약관</a></li>
				<li><a
					class="layout-footer__shortcut__item layout-footer__shortcut__item--bold"
					rel="noopener" href="/privacy" target="_blank">개인정보처리방침</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="/customer_notices" target="_blank">공지사항</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="/customer_center" target="_blank">고객센터</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="/contacts/new" target="_blank">고객의 소리</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="https://pro.ohou.se/?utm_source=ohouse&amp;utm_medium=web&amp;utm_campaign=prosignup&amp;utm_content=footer"
					target="_blank">전문가 등록</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="/contacts/b2b" target="_blank">사업자 구매회원</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="/contacts/new?type=request" target="_blank">제휴/광고 문의</a></li>
				<li><a class="layout-footer__shortcut__item" rel="noopener"
					href="/partner/applications/new" target="_blank">입점신청 문의</a></li>
			</ul>
			<address class="layout-footer__info-wrap">
				<dl class="layout-footer__info">
					<a class="layout-footer__info__item"
						href="http://bucketplace.co.kr/" target="_blank">
						<dt>상호명</dt>
						<dd>(주)버킷플레이스</dd>
					</a>
					<span class="layout-footer__info__item">
						<dt>이메일</dt>
						<dd>
							(고객문의)<a href="mailto:cs@bucketplace.net"> cs@bucketplace.net
							</a>(제휴문의)<a href="mailto:contact@bucketplace.net">
								contact@bucketplace.net</a>
						</dd>
					</span>
					<span class="layout-footer__info__item">
						<dt>대표이사</dt>
						<dd>이승재</dd>
					</span>
					<span class="layout-footer__info__item">
						<dt>사업자등록번호</dt>
						<dd>119-86-91245</dd>
					</span>
					<span class="layout-footer__info__item">
						<dt>통신판매업신고번호</dt>
						<dd>제2018-서울서초-0580호</dd>
					</span>
					<span class="layout-footer__info__item">
						<dt>주소</dt>
						<dd>서울 서초구 서초대로74길 4 삼성생명서초타워 27층</dd>
					</span>
				</dl>
				<dl class="layout-footer__info">
					<span class="layout-footer__info__item">
						<dt>우리은행 채무지급보증안내</dt>
						<dd>
							(주)버킷플레이스는 고객님이 현금결제한&nbsp; 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를
							보장하고 있습니다.&nbsp;<a class="layout-footer__info__item__link"
								href="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/161646429944190689.jpg?gif=1&amp;w=1440"
								target="_blank" rel="noopener noreferrer">서비스가입사실 확인</a>
						</dd>
					</span>
				</dl>
				<span class="layout-footer__info"><span
					class="layout-footer__info__item">(주)버킷플레이스는 통신판매중개자로서 통신판매의
						당사자가 아니며, 입점업체가 등록한 상품, 상품정보 및 거래에 대하여 (주)버킷플레이스는 일체 책임을 지지 않습니다.</span></span>
			</address>
			<p class="layout-footer__copyright">Copyright 2014. bucketplace,
				Co., Ltd. All rights reserved</p>
		</div>
	</footer>

</body>
</html>