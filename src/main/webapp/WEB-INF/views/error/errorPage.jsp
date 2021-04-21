<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>
<% response.setStatus(200); %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style type="text/css">

@font-face {
    font-family: 'Jal_Onuel';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Onuel.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.erroArticle {
	width: 1200px;
	margin: 0 auto;
}
.errorCon1 {
	width: 320px;
 	margin: 0 auto;
	font-size: 100px;
	color: rgb(53, 197, 240);
}
.errorCon2 {
	
	width: 500px;
    margin: 20px auto;
    font-size: 30px;
    color: rgb(130, 130, 130);

}
.errorCon3 {
	width: 700px;
    margin-left: auto;
    margin-right: auto;
    color: rgb(130, 130, 130);
	text-align: center;
}
#errorButton ,#errorButton button{
	width: 150px;
	margin: 0 auto;
	padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
    color: #fff;
    border-color: #30a5ff;
}
#errorButton button{
    background-color: #30a5ff;
    
}
.Icon {
 	width: 135px;
 	margin: 20px auto;
 	
}
.Icon span{
	white-space: pre;
    text-anchor: start;
    font-family: Jal_Onuel;
    stroke-width: 0;
    stroke: rgb(0, 0, 0);
    fill: rgb(0, 0, 0);
    font-size: 30px;
}
.headLine{
		margin-bottom: 150px;
}
</style>
<title>오류 페이지</title>
</head>
<body>
	<div class="erroArticle">
		<header>
			<div class="Icon">
				<span>오늘의여행</span>
			</div>
		</header>
	</div>
	<div class="headLine">
				<hr>
	</div>
	<div class="erroArticle">
		
		<div>
			<div class="errorCon1">
				<span>ERROR</span>
			</div>
			<div class="errorCon2">
				<span>요청하신 페이지를 찾을수 없습니다!</span>
			</div>
			<div class="errorCon3">
				<span>방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수 없습니다.</span><br>
				<span>입력하신 주소가 정확한지 다시 한번 확인해 주세요.</span>
			</div>
			<div id="errorButton">
				<button onclick="history.back()" class="errorButton">이전 페이지로</button>
			</div>
		</div>
	
	
	</div>
</body>
</html>