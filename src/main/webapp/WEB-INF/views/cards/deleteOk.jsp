<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:choose> 
	<c:when test="${delete == 0 }">
		<script>
			alert("삭제 실패");
			history.back();
		</script>
	</c:when>
	<c:otherwise>
		<script>
			swal({
				title:"삭제 성공!!",
				text:"리스트를 출력합니다.",
				icon: "success",
			})
			location.href = "list.do";
		</script>
	</c:otherwise>
</c:choose>





