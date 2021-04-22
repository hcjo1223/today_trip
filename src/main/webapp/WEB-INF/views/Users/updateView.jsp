<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<script	src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

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

img {
	display: block;
	margin-left: auto;
	margin-right: auto;
}

</style>
<title>${login.userNickname}님의 정보 수정</title>
</head>
<body>			
<form action="updateView" method="post">
  <div class="container">
    <h1>회원 정보 수정</h1>
    <p>회원 정보 입력</p>
    <hr>
    <c:if test="${login.gender eq 1}">
		<img style="width: 300px; height:300px; border: 1px 1px 1px 1px;" src="../resources/IMG/Profile/man.jpg" alt="프로필" />
	</c:if>
	<c:if test="${login.gender  eq 2}">
		<img style="width: 300px; height: 300px; border: 1px 1px 1px 1px;"src="../resources/IMG/Profile/woman.jpg" alt="프로필" />
	</c:if>
    <label for="userId"><b>아이디</b></label>
    <input type="text" value="${login.userId}" name="userId" id="userId" readonly="readonly">

    <label for="userPw"><b>비밀번호</b></label>
    <input type="password" placeholder="비밀번호" name="userPw" id="userPw">

    <label for="userNickname"><b>닉네임</b></label>
    <input type="text" value="${login.userId}" name="userNickname" id="userNickname">
	
	<label for="userEmal"><b>이메일</b></label>
    <input type="text" value="${login.userEmail}" name="userEmail" id="userEmail">
   
    <button type="submit" class="registerbtn">변경 하기</button>
  </div>
  
</form>
		</form>
		
		
	</section>

</body>

</html>