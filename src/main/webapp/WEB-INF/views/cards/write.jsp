<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>글작성</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/CSS/cards/cards.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<script>
function chkwrite(){
	frm = document.forms['frm'];
	
	var file = frm['files'].value;
	if(file == null){
		alert("파일 첨부는 하나 이상 하시기 바랍니다.")
		return false;
	}
	return true;
};
</script>

<body>
<h2>사진 올리기</h2>
<br>
<form class="form-group" name="frm" action="writeOk.do" method="post" enctype="multipart/form-data" onsubmit="return chkwrite()">

 <input type="hidden" name="usuid" value="${login.us_uid }" />

<select class="form-control" id="sel1"  name="location">
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

<select class="form-control" id="sel2"name="withs">
	<option value="1">나혼자</option>
	<option value="2">친구와</option>
	<option value="3">연인과</option>
	<option value="4">가족과</option>
	<option value="5">아이들과</option>
	<option value="6">부모님과</option>
	<option value="7">애완동물과</option>
</select>


<select class="form-control" id="sel2" name="focus">
	<option value="1">힐링</option>
	<option value="2">먹방</option>
	<option value="3">관광</option>
	<option value="4">핫플레이스</option>
	<option value="5">액티비티</option>
	<option value="6">문화예슬</option>
	<option value="7">자연</option>
</select>
<br>
<br>
<br>
<label for="comment">내용:</label>
  <textarea class="form-control" rows="5" id="comment" name="contents"></textarea>    

<div>

사진 첨부: <input type="file" id="file" name="files" path="profileImage" multiple="multiple"  onchange="setThumbnail(event);"/><br>
</div>
<div id="image_container"></div> 

<br><br>

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
<input class="btn btn-success" type="submit" value="등록">
<button class="btn btn-secondary" type="button" onclick="location.href = 'rest'">목록으로</button>
</form>


<script> 
function setThumbnail(event) { 
	for (var image of event.target.files) { 
		var reader = new FileReader(); 
		reader.onload = function(event) { 
			var img = document.createElement("img"); 
			img.setAttribute("src", event.target.result); 
			document.querySelector("div#image_container").appendChild(img);

			}; 
			console.log(image);
			reader.readAsDataURL(image); 
			} 
	}


</script>
<br>

</body>
</html>