<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<c:if test="${empty view || fn:length(view) == 0 }">
		<script>
			alert("해당 정보가 삭제되거나 없습니다.")
			history.back();
		</script>
</c:if>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>읽기  </title>
<script>
function chkDelete(uid){
	var r = confirm("삭제하시겠습니까?");
	if(r){
		location.href = "deleteOk.do?uid=" + uid;
	}else{
		
	}
}
</script>
</head>



<body>
<h2> 읽기 </h2>
<br>
UID : ${view[0].uid }<br>
내용 : ${view[0].contents }<br>
조회수 : ${view[0].hits }<br>
어디로 : ${view[0].location }<br>
누구와 : ${view[0].withs }<br>
목적 : ${view[0].focus }<br>
입력날짜 : ${view[0].regDate }<br>



 <c:if test="${fn:length(fileList) > 0 }">
<div style="background-color: beige; padding: 2px 10px; margin-bottom: 5px; border: 1px solid black;">
	<h4>첨부파일</h4>	
		<%-- 이미지인 경우 보여주기 --%>
				<c:forEach var="i" begin="0" end="${ fn:length(fileList) - 1}">
				<div style="width:300px">
					이미지 : <img style="width:100%; height:auto"
						src="<c:url value="/upload/${fileList[i].name }"/>"/>
						<!-- 
						 src="<c:url value="file:///${fileList[i].path }"/>"
						 -->
						
				</div>
				</c:forEach>
</c:if>
				
		
</div>


<hr>
<br>
<button onclick="location.href = 'update.do?uid=${view[0].uid}'">수정하기</button>
<button onclick="location.href = 'list.do'">목록보기</button>
<button onclick="chkDelete(${view[0].uid})">삭제하기</button>
<button onclick="location.href = 'write.do'">신규등록</button>
</body>
</html>