<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<title>회원 가입</title>
<link rel="preconnect" href="https://fonts.gstatic.com">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
	font-family: Arial, Helvetica, sans-serif;
	background-color: black;
}

* {
	box-sizing: border-box;
}

/* Add padding to containers */
.container {
	padding: 16px;
	background-color: white;
}

/* Full-width input fields */
input[type=text], input[type=password] {
	width: 100%;
	padding: 15px;
	margin: 5px 0 22px 0;
	display: inline-block;
	border: none;
	background: #f1f1f1;
}

input[type=button] {

	background-color: #35c5f0;
	color: white;
	padding: 16px 20px;
	margin: 8px 0;
	border: none;
	cursor: pointer;
	width: 100%;
	opacity: 0.9;
	font-size: 20px;
}

input[type=text]:focus, input[type=password]:focus {
	background-color: #ddd;
	outline: none;
}

/* Overwrite default styles of hr */
hr {
	border: 1px solid #f1f1f1;
	margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
	background-color: #35c5f0;
	color: white;
	padding: 16px 20px;
	margin: 8px 0;
	border: none;
	cursor: pointer;
	width: 100%;
	opacity: 0.9;
	font-size: 20px;
}

.registerbtn:hover {
	opacity: 1;
}
.checkId:hover{
	opacity: 1;
}


/* Add a blue text color to links */
a {
	color: dodgerblue;
}

.check {
	display: block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 12px;
	cursor: pointer;
	font-size: 14px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.check input {
	position: abolute;
	opacity: 0;
}

.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 15px;
	width: 15px;
	background-color: #eee;
	border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.check:hover input ~ .checkmark {
	background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.check input:checked ~ .checkmark {
	background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}

/* Show the indicator (dot/circle) when checked */
.check input:checked ~ .checkmark:after {
	display: block;
}

/* Style the indicator (dot/circle) */
.check .checkmark:after {
	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}

</style>
<script
	src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<title>회원가입</title>
</head>
<script type="text/javascript">
	$(document).ready(function() {

		$("#submit").on("click", function() {
			if ($("#userId").val() == "") {
				alert("아이디를 입력해주세요.");
				$("#userId").focus();
				return false;
			}
			if ($("#userPw").val() == "") {
				alert("비밀번호를 입력해주세요.");
				$("#userPw").focus();
				return false;
			}
			if ($("#userNickname").val() == "") {
				alert("성명을 입력해주세요.");
				$("#userNickname").focus();
				return false;
			}

			if ($("#userEmail").val() == "") {
				alert("이메일을 입력해주세요.");
				$("#userEmail").focus();
				return false;
			}
		});

		$('#checkId').click(function() {

			var chk = $('[name="userId"]').val();

			$.ajax({
				url : "./chk/" + chk,
				type : "GET",
				cache : false,
				success : function(data, status) {
					if (status == "success") {
						if (data.count == 0) {
							alert("이 아이디는 사용 할 수 있습니다.")
							$('#registerbtn').show();

						} else {
							console.log(data.count);
							alert("이 아이디는 사용 중 있니다.")
							$('#registerbtn').hide();

						}
					}
				}
			});

		})

	});
</script>
<body>
<body>

	<form action="register" method="post">
		<div class="container">
			<h1>Create account</h1>
			<p>오늘의 여행은 당신을 환영합니다</p>
			<hr>
			<label for="userId"><b>아이디</b></label> 
				<input type="text"
					placeholder="아이디" name="userId" id="userId" required> 
				<input
					type="button" value="중복확인" id="checkId"> <label for="userPw"><b>비밀번호</b></label>
				<input type="password" placeholder="비밀번호" name="userPw" id="userPw"
					required>
			<label for="userNickname"><b>닉네임</b></label> <input
				type="text" placeholder="닉네임" name="userNickname" id="userNickname" required>
					
					 
			<label for="userEmail"><b>이메일</b></label> <input
				type="text" placeholder="이메일" name="userEmail" id="userEmail"
				required> <label for="userMemo"><b>메모</b></label> <input
				type="text" placeholder="메모" name="userMemo" id="userMemo" required>

			<label class="check">남자 <input type="radio" checked="checked"
				name="gender" id="gender" value=1> <span class="checkmark"></span>
			</label> <label class="check">여자 <input type="radio" name="gender"
				id="gender" value=2> <span class="checkmark"></span>
			</label>

			<hr>

			<button type="submit" class="registerbtn" id="registerbtn"
				submit="${path}/Usrs/login">회원 가입</button>
		</div>

	</form>

</body>
</html>