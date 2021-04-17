<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

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
<title> ${list[0].title } </title>
<style>
img {
    vertical-align: middle;
    border: 0px;
}
body {
    margin: 0px;
    padding: 0px;
    font: normal 13px/1.5 "나눔고딕", NanumGothic, NGNormal, "돋움", Dotum, Arial, Tahoma , Geneva, Verdana;
    color: #666;
}
</style>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/CSS/place.css"/>
			<script type="text/javascript">
			var contentId = "${list[0].contentId }";
			var contentTypeId = "${list[0].contentTypeId }";
			</script> 
</head>



<body>	
	
	<div class="recommend_area" id="content">
		<div class="tourView">
			<div class="title">
			<h2 id="tltle"> ${list[0].title } </h2>
			</div>
			
			<script type="text/javascript">
			var contentId = "${list[0].contentId }";
			var contentTypeId = "${list[0].contentTypeId }";
			</script> 
			
			<div id="commonData"></div><hr>
			<div id="txtData"></div><hr>
			<div id="imgGallery"></div><hr>
		</div>
	</div>		
</body>
</html>
	
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
<script src="${pageContext.request.contextPath }/resources/JS/place.js" type="text/javascript"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		
</c:otherwise>
</c:choose>
