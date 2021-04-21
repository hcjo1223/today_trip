<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style type="text/css">
.erroArticle {
	width: 1200px;
	margin: 0 auto;
	border: solid 1px black;
}
.errorCon1 {
	width: 320px;
 	margin: 0 auto;
	border: solid 1px black;
	font-size: 100px;
	color: rgb(53, 197, 240);
}
.errorCon2 {
	width: 500px;
    margin: 0 auto;
    font-size: 30px;
    color: rgb(130, 130, 130);

	border: solid 1px black;
}
.errorCon3 {
	width: 700px;
    margin-left: auto;
    margin-right: auto;
    color: rgb(130, 130, 130);
	text-align: center;
	border: solid 1px black;
}
#errorButton {
	width: 80px;
	margin: 0 auto;
}
</style>
<title>오류 페이지</title>
</head>
<body>
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
				<button class="errorButton">이전 페이지로</button>
			</div>
		</div>
	
	
	</div>
</body>
</html>