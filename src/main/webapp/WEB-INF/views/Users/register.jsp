<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<!-- 부가적인 테마 -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

<script
	src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<title>회원가입</title>
</head>
<script type="text/javascript">
	$(document).ready(function() {
		// 취소
		$(".cencle").on("click", function() {

			location.href = "Users/login";

		})

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

	})
</script>
<body>
	<section id="container">
		<form action="register" method="post">
			<div class="form-group has-feedback">
				<label class="control-label" for="userId">아이디</label> <input
					class="form-control" type="text" id="userId" name="userId" />
			</div>
			<div class="form-group has-feedback">
				<label class="control-label" for="userPw">패스워드</label> <input
					class="form-control" type="password" id="userPw" name="userPw" />
			</div>
			<div class="form-group has-feedback">
				<label class="control-label" for="userNickname">성명</label> <input
					class="form-control" type="text" id="userNickname" name="userNickname" />
			</div>
			<div class="form-group has-feedback">
				<label class="control-label" for="userEmail">이메일</label> <input
					class="form-control" type="text" id="userEmail" name="userEmail" />
			</div>
			
			<div class="form-group has-feedback">
				<label class="control-label" for="userMemo">메모</label> <input
					class="form-control" type="text" id="userMemo" name="userMemo" />
			</div>
			<div class="form-group has-feedback">
				<input type="radio" name="gender" value=1>남자
				<input type="radio" name="gender" value=1>여자
			</div>
			<div class="form-group has-feedback">
				<button class="btn btn-success" type="submit" id="submit" submit = "${path}/Users/login">회원가입</button>
				<button class="cencle btn btn-danger" type="button">취소</button>
			</div>
			
		</form>
	</section>
	</body>
	</html>