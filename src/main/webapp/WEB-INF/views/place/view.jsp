<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:choose>
	<c:when test="${empty list || fn:length(list) == 0 }">
		<script>
			alert("해당 정보가 삭제되거나 없습니다");
			history.back();
		</script>
	</c:when>

	<c:otherwise>

		<!DOCTYPE html>
		<html lang="ko">
<head>
<meta charset="UTF-8">
<title>${list[0].title }</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/common.css" />
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
<script
	src="${pageContext.request.contextPath }/resources/JS/place/place.js"
	type="text/javascript"></script>
<style>
img {
	vertical-align: middle;
	border: 0px;
}

body {
	margin: 0px;
	padding: 0px;
	font: normal 13px/1.5 "나눔고딕", NanumGothic, NGNormal, "돋움", Dotum, Arial,
		Tahoma, Geneva, Verdana;
	color: #666;
}

* {
	margin: 0;
	padding: 0;
}

ul {
	list-style: none;
}

a {
	text-decoration: none;
	color: inherit;
}

.box {
	max-width: 800px;
	width: 100%;
	border: 1px solid #ccc;
	margin: 0 auto;
}

.box ul {
	white-space: nowrap;
	overflow-x: auto;
	text-align: center;
}

#tab ul li {
	display: inline-block;
}

::-webkit-scrollbar {
	/* 스크롤바 전체 영역 */
	width: 10px;
}

::-webkit-scrollbar-track {
	background-color: #f9f9f9;
	/* 스크롤이 움직이는 영역  */
}

::-webkit-scrollbar-thumb {
	/*  스크롤  */
	background-color: gold;
	border-radius: 30px;
}

::-webkit-scrollbar-button:start:decrement, ::-webkit-scrollbar-button:end:increment
	{
	/*  스크롤의 화살표가 포함된 영역   */
	display: block;
	height: 8px;
	background-color: #000;
}

::-webkit-scrollbar-corner {
	/*  상하+좌우 스크롤이 만나는 공간   */
	background-color: red;
}
</style>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/CSS/place.css" />
<script type="text/javascript">
	var contentId = "${list[0].contentId }";
	var contentTypeId = "${list[0].contentTypeId }";
	var mapx = "${list[0].mapx }";
	var mapy = "${list[0].mapy }";
</script>
</head>



<body>

	<div class="recommend_view" id="content">
		<div class="tourView">
			<div class="title">
				<h2 id="tltle">${list[0].title }</h2>
				조회수 : ${list[0].viewCnt }
			</div>

			<div id="commonData"></div>
			<hr>
			<div id="txtData"></div>
			<div id="imgGallery">
				<div id="containerImg">
					<div class="container"></div>
				</div>
				<div id="containerGallery"></div>
			</div>
		</div>


		<!--  댓글  -->
		<div class="review">
			<div class="container">
				<label for="content">장소 리뷰</label><span id="count"></span>
				<c:if test="${not empty login }">
					<form name="commentInsertForm">
						<div class="input-group">
							<input type="hidden" name="place_uid"
								value="${list[0].place_uid}" /> <input type="hidden"
								name="us_uid" value="${login.us_uid}" /> <input type="text"
								class="form-control" id="content" name="content"
								placeholder="내용을 입력하세요."> <span class="input-group-btn">
								<button class="btn default" type="button"
									name="commentInsertBtn">등록</button>
							</span>
						</div>
					</form>
				</c:if>
				<c:if test="${empty login}">
				<a href="/today_trip/Users/login" class=input-group" role="button">
					<i class ="notloginreview"></i>로그인 한 사용자만 댓글 등록이 가능합니다
				</a>
				</c:if>
			</div>

			<div class="container">
				<div id="commentList"></div>
				<%-- 페이징 --%>
				<div class="center">
					<ul class="pagination" id="pagination"></ul>
				</div>
			</div>

			<!--                     추가                         -->
			<%@ include file="commentS.jsp"%>

		</div>
	</div>


</body>
		</html>



	</c:otherwise>
</c:choose>
