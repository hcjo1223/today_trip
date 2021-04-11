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
	<title>읽기</title>
<style>

img {
    vertical-align: middle;
    border: 0px;
}
.mainImg {
    width: 400px;
    height: 274px;
}
.imgGallery {
    position: relative;
    overflow: hidden;
    width: 866px;
    margin: 0 auto;
}
.imgGallery > p > img {
    width: 700px;
    height: 467px;
}


</style>
	</head>
	

	
	<body>	
		<h2>항목 보기</h2>
			<br>	
			콘텐츠id : ${list[0].contentId } <br>	
			
			<c:if test="${list[0].contentTypeId == '12'}" var="관광지" scope="session"></c:if>
			<c:if test="${list[0].contentTypeId == '32'}" var="숙박" scope="session"></c:if>
			<c:if test="${list[0].contentTypeId == '39'}" var="식당" scope="session"></c:if>
			
			<h2 id="tltle"> ${list[0].title } </h2>
			<script type="text/javascript">
			var contentId = "${list[0].contentId }";
			var contentTypeId = "${list[0].contentTypeId }";
			</script> 
			<div id="demoJSON1"></div>
			<hr>
			<h3>개요</h3><br>
			<div id="demoJSON2"></div>
			<hr>
			<div id="demoJSON3"></div>
			<br>
			
	</body>
	</html>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
	<script src="${pageContext.request.contextPath }/resources/JS/placeJS.js" type="text/javascript"></script>
					
	</c:otherwise>
</c:choose>
