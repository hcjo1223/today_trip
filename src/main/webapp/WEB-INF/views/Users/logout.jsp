<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>logout</title>
</head>
<body>
<script>
	alert("로그아웃 되었습니다.");
	var preurl = document.referrer;
	self.location = preurl;
</script>
</body>
</html>