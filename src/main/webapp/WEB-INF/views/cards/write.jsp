<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>글작성</title>


<body>
<h2>사진 올리기</h2>
<form name="frm" action="writeOk.do" method="post" enctype="multipart/form-data" >
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

<hr>	

파일1: <input type="file" name="files"  multiple="multiple"><br>






내용:
  <textarea name="contents"></textarea>    


<br><br>
<hr>
<!-- 태그 입력창
<div class="content">
		<input type="hidden" value="" name="tag" id="rdTag" />

	<ul id="tag-list">
	</ul>

	<div>
		<input type="text" id="tag" size="7" placeholder="태그입력" />
	</div>

</div>
-->



<hr>
<input type="submit" value="등록">
</form>
<br>
<button type="button" onclick="location.href = 'list.do'">목록으로</button>
</body>
</html>