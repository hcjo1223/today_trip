<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>


<c:if test="${empty select || fn:length(select) == 0 }">
	<script>
		alert("해당 정보가 삭제되거나 없습니다.")
		history.back();
	</script>
</c:if>




<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>수정 ${select[0].contents }</title>
</head>
<script>
	function chkSubmit() {
		frm = document.forms['frm'];

		var subject = frm['subject'].value.trim();

		if (subject == "") {
			alert("제목은 반드시 작성해야 합니다.");
			frm['subject'].focus();
			return false;
		}

		return true;
	}
</script>
<body>
	<h2>수정</h2>
	<form name="frm" action="updateOk.do" method="POST"
		enctype="multipart/form-data">
		<input type="hidden" name="uid" value="${select[0].uid }" /> 작성자 : 유저<br>
		<%-- 작성자 이름은 변경불가 --%>
		<select name="location">
			<option value="1">서울</option>
			<option value="2">인천</option>
			<option value="3">대전</option>
			<option value="4">광주</option>
			<option value="5">대구</option>
			<option value="6">울산</option>
			<option value="7">부산</option>
			<option value="8">경기</option>
			<option value="9">충청</option>
			<option value="10">강원</option>
			<option value="11">전라</option>
			<option value="12">경상</option>
			<option value="13">제주</option>
		</select>

		<select name="withs">
			<option value="1">나혼자</option>
			<option value="2">친구와</option>
			<option value="3">연인과</option>
			<option value="4">가족과</option>
			<option value="5">아이들과</option>
			<option value="6">부모님과</option>
			<option value="7">애완동물과</option>
		</select>


		<select name="focus">
			<option value="1">힐링</option>
			<option value="2">먹방</option>
			<option value="3">관광</option>
			<option value="4">핫플레이스</option>
			<option value="5">액티비티</option>
			<option value="6">문화예슬</option>
			<option value="7">자연</option>
		</select>
		
		내용 :<br>
		<textarea name="contents">${select[0].contents }</textarea>
		<hr>
		<br>
		<br> <input type="submit" value="수정">
		 
		 <!-- 이미지 삭제 -->
		 <c:if test="${fn:length(fileList) > 0 }">
		<div
			style="background-color: beige; padding: 2px 10px; margin-bottom: 5px; border: 1px solid black;">
			<h4>첨부파일</h4>
			<%-- 이미지인 경우 보여주기 --%>
			<div id="delFiles"></div>  <%-- 삭제할 file 의 bf_uid 값(들)을 담기위한 div --%>
			<c:forEach var="i" begin="0" end="${ fn:length(fileList) - 1}">
				<div style="width: 300px">
					이미지 : <img style="width: 100%; height: auto"
						src="<c:url value="/upload/${fileList[i].name }"/>" />
					<button type="button" onclick="deleteFiles(${fileList[i].plUid}); $(this).parent().remove();">삭제가안됨</button>
				</div>
			</c:forEach>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
			<script>
				function deleteFiles(fileUid) {
					// 삭제할 file 의 bf_uid 값(들)을 #delFiles 에 담아 submit 한다
					$("#delFiles")
							.append(
									"<input type='hidden' name='delfile' value='" + fileUid + "'>");
				}
			</script>
		</div>
		</c:if>
		
		<!-- 파일 추가 -->
		파일1: <input type="file" name="files" multiple="multiple"><br>
	</form>
	<button onclick="history.back()">이전으로</button>
	<button onclick="location.href = 'list.do'">목록보기</button>

</body>

</html>