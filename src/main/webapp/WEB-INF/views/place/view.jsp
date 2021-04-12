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
.mainImg > img {
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
.sumImg > ul > li > a > span > img {
    max-width: 164px !important;
    width: 164px;
    height: 108px;
}
ul,ol {list-style:none;}
.fixed_img_col ul{
	border-bottom: 1px solid #aaa;
}
.fixed_img_col li{
	float: left;
	width: 200px;
	height: 200px;
	padding: 20px 15px;
	margin-bottom: -1px;
	border-bottom: 1px solid #aaa;
}
</style>
	</head>
	

	
	<body>	
		<h2>항목 보기</h2>
			<p>	콘텐츠Id : ${list[0].contentId } </p>	
			<p>	콘텐츠TypeId : ${list[0].contentTypeId } </p>	
			<div class="title">
			<h2 id="tltle"> ${list[0].title } </h2>
			</div>
			
			<script type="text/javascript">
			var contentId = "${list[0].contentId }";
			var contentTypeId = "${list[0].contentTypeId }";
			</script> 
			
	

			
			<div id="demoJSON1"></div><hr>
			
			
			<div id="demoJSON2">
				<div id="contentTypeId"></div>
			</div><hr>
			
			
			<div id="demoJSON3"></div><hr>
			
			
	</body>
	</html>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
	<script src="${pageContext.request.contextPath }/resources/JS/place.js" type="text/javascript"></script>
					
	</c:otherwise>
</c:choose>
