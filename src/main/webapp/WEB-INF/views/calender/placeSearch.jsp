<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	
	<!-- bootstrap -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
			integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>

	<table class="table align-middle">
	
		<thead>
			<tr>
				<th scope="col">사진</th>
				<th scope="col">장소</th>
				<th scope="col">전화번호</th>
				<th scope="col">선택</th>
			</tr>
		</thead>
		
		<tbody>
			<c:forEach var="place" items="${list}" varStatus="status">
				<tr>
					<!-- 위도 경도 받아오기 -->
					<input type="hidden" name="p-mapx" value="<c:out value='${place.mapx}' />" />
            		<input type="hidden" name="p-mapy" value="<c:out value='${place.mapy}' />" />
				
					<th scope="row">
						<a href="<c:out value="${place.firstimage2}" />">
							<img src="<c:out value="${place.firstimage2}" />" alt="" width="80" height="80" />
						</a>
					</th>
					
					<td>
						<div><p class="h6"><b><c:out value="${place.title}" /></b></p></div>
						<div><p style="font-size: 0.8rem;"><c:out value="${place.addr1}" /></p></div>
					</td>
					<td>
						<c:out value="${place.tel}" />
					</td>
					<td>
						<div>
							<button type="button" class="btn btn-primary btnSelect btn-sm px-3 <c:out value='${contentType}' />" 
									uid="<c:out value='${place.place_uid}'/>" mapx="<c:out value='${place.mapx}'/>" mapy="<c:out value='${place.mapy}'/>"  title="<c:out value='${place.title}' />" data-dismiss="modal">
							선택
							</button>
						</div>
					</td>
					
				</tr>
			</c:forEach>
		</tbody>
		
	</table>
	
	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	
	<%-- <script src="${pageContext.request.contextPath}/resources/js/placeSearch.js"></script> <!-- placeSearch.js --> --%>
	<script>
		// '장소 추가' 버튼 클릭 후 
		// 장소 검색을 해서 장소를 선택했을때
		// 선택한 장소가 추가되어야 한다.
		$(function() {
		        
		   var contentType = '<c:out value="${contentType}" />';
		   // alert("cotentType : " + cotentType);
		    
		   // 관광지 리스트에서 '관광지' 선택 버튼 클릭 이벤트
		   $("." + contentType).on("click", function() {
		
		      // console.log("123123123");
		      var title = $(this).attr("title");
		      var uid = $(this).attr("uid");
		      var img_url = $(this).closest('tr').find('th > a').attr('href');
		      
		      console.log("title : " + title);
		      console.log("uid : " + uid);
		      console.log("img_url : " + img_url);
		      
		      var day = $(".modal-body").attr("day");
		      var no = $("#day-head-"+day).attr("no");
		      $("#day-head-"+day).attr("no", ++no);
		      
		      var mapx = $("input[name='p-mapx']").val();
		      var mapy = $("input[name='p-mapy']").val();
		      console.log(mapx);
		      console.log(mapy);
		      
		      // var placeMaxX = $("<input>", {type: "hidden", name: "placeMaxX-"+day, value: mapx});
		      // var placeMaxY = $("<input>", {type: "hidden", name: "placeMaxY-"+day, value: mapy});
		
		      // var placeDiv = $("<div>", {class: "mb-4"});
		      // var placeUid = $("<input>", {type: "hidden", name: "placeUid", value: uid});
		      // var placeIndex = $("<span>", {class: "mr-5", text: no});
		      // var placeTitle = $("<span>", {class: "", text: title});
		
		      // $("#day-content-" + day).append(placeUid);
		      // $("#day-content-" + day).append(placeIndex);
		      // $("#day-content-" + day).append(placeTitle);
		      // $("#day-content-" + day).append(placeDiv);
		      
		      var htmlPlace = '<div class="one-place" data-no="'+no+'" data-place-uid="'+uid+'" data-img-url="'+img_url+'">'+
								'<input type="hidden" name="placeUid" value="0">'+
		                        '<span class="mr-5">'+no+'</span>'+
		                        '<span>'+title+'</span>'+
		                        '<i class="fas fa-times-circle" style="color:#999;margin-left:6px;cursor:pointer;"></i>'+
		                        '<input type="hidden" name="placeMapX-'+no+'" value="'+mapx+'">'+
		                        '<input type="hidden" name="placeMapY-'+no+'" value="'+mapy+'">'+
		                        '<div class="mb-4"></div>'+
							'</div>'
		
		      $("#day-content-"+day).append(htmlPlace);
		      $("#btnModalCancel").trigger("click");
		      $(".modal-backdrop").removeClass("show");
		
		   });
		   
		});
		
	</script>


</body>
</html>