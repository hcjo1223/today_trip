<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    
<c:choose> 
	<c:when test="${result == 0 }">
		<script>
			alert("등록 실패!!!!!!");
			history.back();
		</script>
	</c:when>
	<c:otherwise>
		<script>
		swal({
				title: "등록 성공!!",
				text: "리스트를 출력합니다.",
		});
			location.href = "list";
		</script>
	</c:otherwise>
</c:choose>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>



