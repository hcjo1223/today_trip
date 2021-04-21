<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html> 
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- todo -->
<!-- header file include -->
<body class="hold-transition login-page">
	<!-- /.login-logo -->
	<div class="card">
		<div class="card-body login-card-body">
			<p class="login-box-msg">로그인</p>
			<form action="loginPost " method="post">
				<div class="input-group mb-3">
					<input type="text" name="userId" class="form-control"
						placeholder="아아디">
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-exclamation"></span>
						</div>
					</div>
				</div>
				<div class="input-group mb-3">
					<input type="password" name="userPw" class="form-control"
						placeholder="비밀번호">
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-lock"></span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-8">
						<div class="icheck-primary">
							<input type="checkbox" id="remember"> <label
								for="remember"> Remember Me </label>
						</div>
					</div>
					<!-- /.col -->
					<div class="col-4">
						<button type="submit" class="btn btn-primary btn-block">Sign
							In</button>
					</div>
					<!-- /.col -->
				</div>
			</form>
			<p class="mb-1">
				<a href="#">I forgot my password</a>
			</p>
			<p class="mb-0"></p>
		</div>
		<!-- /.login-card-body -->
	</div>
	<!-- /.login-box-body -->
	</div>
	<!-- /.login-box  -->

	<script> 
	var msg = "${msg}"; 
	if (msg == "REGISTERED") { 
		alert("회원가입이 완료되었습니다. 로그인해주세요!"); 
	} else if (msg == "FAILURE") { 
		alert("아이디와 비밀번호를 확인해주세요.");
	} 
	$(document).ready(function () { 
		if($('#remember').is(":checked") == true) ({ 
			checkboxClass: 'icheckbox_square-blue', 
			radioClass: 'iradio_square-blue', 
			increaseArea: '20%' // optional 
			}); 
	}); </script>
</body>
</html>
