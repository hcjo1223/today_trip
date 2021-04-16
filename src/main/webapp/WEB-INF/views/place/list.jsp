<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>        
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>장소 리스트</title>
<!-- 스타일, js 라이브러리 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/CSS/common.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/CSS/place.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
<script src="${pageContext.request.contextPath }/resources/JS/placepage.js"></script>
<style>
body {
    font-size: 13px;
    color: #333;
    -webkit-text-size-adjust: none;
}
ul {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
ul,ol {list-style:none;}
a { text-decoration-line: none; }
</style>
</head>
<body>

<%--
참조 : https://www.w3schools.com/howto/howto_css_login_form.asp
 --%>
<%-- 글 목록 --%>
<div class="recommend_area">

	<div id="list">
		
		
		<%-- header --%>
		<div class="theme_tit_area clear">
		<h1>장소 게시판</h1>
		<div class="d01">
			<div class="left" id="pageinfo"></div>
			<div class="right" id="pageRows"></div>
		</div>
		</div>
		
		<%-- 목록 --%>
		<ul class="item_list type_thumb type_1 clear">
		</ul>
	</div>


	<div class="clear"></div>

	<%-- 페이징 --%>
	<div class="center">
		<ul class="pagination" id="pagination"></ul>
	</div>
</div>

</body>
</html>


















