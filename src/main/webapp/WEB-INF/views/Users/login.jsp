<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html>
<title>로그인</title>
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
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

</style>
</head>
<body>

<form action="loginPost" method="post">
  <div class="container">
    <h1>Log in</h1>
    <p>아이디 비밀번호 입력</p>
    <hr>

    <label for="userId"><b>아이디</b></label>
    <input type="text" placeholder="아이디" name="userId" id="userId" required>

    <label for="userPw"><b>비밀번호</b></label>
    <input type="password" placeholder="비밀번호" name="userPw" id="userPw" required>

	<hr>
    <p>아이디가 없으세요? <a href="${pageContext.request.contextPath}/Users/register">회원가입 하기</a>.</p>

    <button type="submit" class="registerbtn">로그인</button>
  </div>
  
</form>

</body>
</html>
