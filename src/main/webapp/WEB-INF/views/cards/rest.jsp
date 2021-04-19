<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>REST+AJAX게시판</title>
<!-- 스타일, js 라이브러리 -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/CSS/cards.css"/>
<script src="https://kit.fontawesome.com/bb29575d31.js"></script>
<script src="${pageContext.request.contextPath }/resources/JS/cards.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</head>
<body>

<%--
참조 : https://www.w3schools.com/howto/howto_css_login_form.asp
 --%>




<%--글 목록 --%>
<div id="main">
	<h2>사진 게시판</h2>
	
	<%-- 헤더 --%>
	<div class="d01">
		<div class="left" id="pageinfo"></div>
		<div class="right" id="pageRows"></div>
	</div>
	<div class="clear"></div>
	
	<select name="location">
		<option value="1">서울</option>
		<option value="2">인천</option>
		<option value="3">대전</option>
		<option value="4">광주</option>
		<option value="5">대구</option>
		<option value="6">울산</option>
		<option value="7">부산</option>
		<option value="8">경기</option>
		<option value="9">충청</option>
		<option value="10">강원</option>
		<option value="11">전라</option>
		<option value="12">경상</option>
		<option value="13">제주</option>
	</select>

	<select name="withs">
		<option value="1">나혼자</option>
		<option value="2">친구와</option>
		<option value="3">연인과</option>
		<option value="4">가족과</option>
		<option value="5">아이들과</option>
		<option value="6">부모님과</option>
		<option value="7">애완동물과</option>
	</select>
	
	
	<select name="focus">
		<option value="1">힐링</option>
		<option value="2">먹방</option>
		<option value="3">관광</option>
		<option value="4">핫플레이스</option>
		<option value="5">액티비티</option>
		<option value="6">문화예술</option>
		<option value="7">자연</option>
	</select>
	<hr>
	
	<%-- 목록 --%>
	<div class="row">
			<div id="list_box">
				<ul class="item_list type_thumb type_1 clear">
					
				</ul>
			</div>
	</div>
			
	



	<%-- bottom --%>
		<div class="d01">
			<div class="right">
				<button type="button" onclick="location.href = 'new'" id="btnWrite" class="btn success">글작성</button>
			</div>
		</div>
	

	<div class="clear"></div>

	<%--페이징 --%>
	<div class="center">
		<ul class="pagination" id="pagination"></ul>
	</div>

	
	


 <%--글 작성 / 보기 /수정 대화상자 --%>
<div id="dlg_write" class="modal">
	<form class="modal-content animate" id="frmWrite" name="frmWrite" method="post" multiple="true"  enctype="multipart/form-data">
		<div class="container">
			<h3 class="title">새글 작성</h3>
			
			<span class="close" title="Close Modal">&times;</span>
			
			<input type="hidden" id="uid" name="uid" value="0"> 
			
			<div class="d01 btn_group_header">
				<div class="left">
					<p id="viewcnt"></p>
				</div>
				<div class="right">
					<p id="regdate"></p>
				</div>
				<br>
			<div class="select-box">
				<select name="location">
					<option value="0">지역</option>
					<option value="1">서울</option>
					<option value="2">인천</option>
					<option value="3">대전</option>
					<option value="4">광주</option>
					<option value="5">대구</option>
					<option value="6">울산</option>
					<option value="7">부산</option>
					<option value="8">경기</option>
					<option value="9">충청</option>
					<option value="10">강원</option>
					<option value="11">전라</option>
					<option value="12">경상</option>
					<option value="13">제주</option>
				</select>
				
				<select name="withs">
					<option value="0">누구와</option>
					<option value="1">나혼자</option>
					<option value="2">친구와</option>
					<option value="3">연인과</option>
					<option value="4">가족과</option>
					<option value="5">아이들과</option>
					<option value="6">부모님과</option>
					<option value="7">애완동물과</option>
				</select>
				
				
				<select name="focus">
					<option value="0">목적</option>
					<option value="1">힐링</option>
					<option value="2">먹방</option>
					<option value="3">관광</option>
					<option value="4">핫플레이스</option>
					<option value="5">액티비티</option>
					<option value="6">문화예술</option>
					<option value="7">자연</option>
				</select>
			</div>
				<div class="clear"></div>
				
				

			</div>
			
			사진
			<div id="delFiles"></div>
			<div class="piclist">

			</div>
			<div class="clear"></div>
			<br>
		      
			<label for="contents"><b>내용</b></label>
			<textarea placeholder="글내용" name="contents"></textarea>
			
			<div class="d01 btn_group_write">
				<button type="submit" class="btn success fullbtn">작성</button>
			</div>
			
			<div class="d01 btn_group_view">  			  
				<div class="left">
					<button type="button" onclick="location.href = 'update.do'" class="btn danger" id="viewDelete">삭제</button>
				</div>
				<div class="right">
					<button type="button" class="btn info" id="viewUpdate">수정</button>
				</div>
				<div class="clear"></div>
			</div>	
			
			<div class="d01 btn_group_update">  		
				 
				<input type="file" name="files" path="profileImage" multiple="multiple" onchange="setThumbnail(event);"/>
				<div id="image_container"></div> 
				<div>
					<button type="button" class="btn info fullbtn" id="updateOk">수정완료</button>
				</div>
				<div class="clear"></div>
			</div>	


			
			

			
			
		</div>
	
	
	</form>
</div>


</body>
</html>