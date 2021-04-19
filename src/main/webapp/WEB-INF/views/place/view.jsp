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
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/CSS/common.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
<script src="${pageContext.request.contextPath }/resources/JS/place.js" type="text/javascript"></script>
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
.review {
	margin: 0 auto;
    padding: 0 20px;
    width: 1200px;
}    

.review .container{
	padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
}

.review .container label{
    font-size: 24px;
    font-weight: 800;
    color: #1b1b1b;
    line-height: 24px;
}

.review .container #count{
	font-size: 24px;
    font-weight: 800;
    color: #f38f1e;
    line-height: 24px;
    margin-left: 0;
}


.review .container .commentArea{
    position: relative;
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
}

.review .container .form-control{
	height: 43px;
}

.commentList .commentArea .commentInfo a{
	color: blue;
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
			조회수 : ${list[0].viewCnt }
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
<!--  댓글  -->
<div class="review">	
    <div class="container">
        <label for="content">장소 리뷰</label><span id="count"></span>
        <form name="commentInsertForm">
            <div class="input-group">
               <input type="hidden" name="place_uid" value="${list[0].uid}"/>
               <input type="hidden" name="us_uid" value="${list[0].uid}"/>
               <input type="text" class="form-control" id="content" name="content" placeholder="내용을 입력하세요.">
               <span class="input-group-btn">
                    <button class="btn default" type="button" name="commentInsertBtn">등록</button>
               </span>
              </div>
        </form>
    </div>
    
    <div class="container">
        <div id="commentList"></div>
    <%-- 페이징 --%>
	<div class="center">
		<ul class="pagination" id="pagination"></ul>
	</div>
    </div>
</div>
 
<!--                     추가                         -->
<%@ include file="commentS.jsp" %>
		
</body>
</html>
	
		
</c:otherwise>
</c:choose>
