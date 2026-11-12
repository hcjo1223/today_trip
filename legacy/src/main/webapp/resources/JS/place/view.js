var ServiceKey = "pJTimjFQ8JAUDC5tNBIN6Pq%2Fv%2Bn2Ttf4vF84sqbJCPzRtR3Sqc3EDbm9CwScgDxnHDZNYh3xlwVDwNvS1mdZag%3D%3D";
var detailCommon_url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y&_type=json";
var detailIntro_url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?MobileOS=ETC&MobileApp=TourAPI3.0_Guide&introYN=Y&_type=json";
var detailImage_url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage?MobileOS=ETC&MobileApp=TourAPI3.0_Guide&imageYN=Y&_type=json";
 
$(document).ready(function () {

	(function () {
				
		var url = detailCommon_url 
			+ "&ServiceKey=" + ServiceKey
		 	+ "&contentId=" + contentId;

		$.ajax({
			url: url,
			type: "GET",
			cache: false,
			success: function (data, status) {
				if (status == "success") parseJSON1(data);
			}
		});

	})();

	(function () {
				
		var url = detailIntro_url 
			+ "&ServiceKey=" + ServiceKey
			+ "&contentTypeId=" + contentTypeId
		 	+ "&contentId=" + contentId;
			

		$.ajax({
			url: url,
			type: "GET",
			cache: false,
			success: function (data, status) {
				if (status == "success") parseJSON2(contentTypeId, data);
			}
		});

	})();

	(function () {
				
		var url = detailImage_url
			+ "&ServiceKey=" + ServiceKey
			+ "&contentTypeId=" + contentTypeId
		 	+ "&contentId=" + contentId;
			

		$.ajax({
			url: url,
			type: "GET",
			cache: false,
			success: function (data, status) {
				if (status == "success") parseJSON3(data);
				
		}});

	})();

	
	insertLC(place_uid);


	
});

function insert(place_uid){
	
	var check = $('input[name="check"]').val();
	if(loginCheck() == 1){

		
		if(check > 0){
			$('#like').addClass('like_ico1');
			$('#like').removeClass('like_ico2');
			deleteLike(place_uid);
		} else {
			$('#like').removeClass('like_ico1');
			$('#like').addClass('like_ico2');
			insertLike(place_uid);
		}

	}
}

function likeCountUp(){
	var likecnt = likeCount(place_uid);
	$('.likeCountAll').html('');
	$('.likeCountAll').html(likecnt);
}

function toggleLike(){

}


function toggle1(){
	$("#tit2").slideToggle("slow");
}

function toggle2(){
	$("#tit4").slideToggle("slow");
}

function toggle3(){
	$("#imgGallery").slideToggle("slow");
}

function parseJSON1(jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	table += "<p class='mainImg'><img src='" + row.firstimage + "' alt='대표이미지'></p>";
	table += "<div class='summary'>";
	table += "<button id='tit1' type='button' onclick='toggle1();'>개요 ";
	table += '<svg class="icon" width="1em" height="1em" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">';
	table += '<path fill="currentColor" fill-rule="evenodd" d="M2.87 4L1.33 5.5 8 12l6.67-6.5L13.13 4 8 9z"></path></svg></button>';
	table += "<div id='tit2'>" + row.overview + "</div></div>";


		

	$("#commonData").html(table);
}

function parseJSON2(contentTypeId, jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	var result = "";
	
	result += "<button id='tit3' onclick='toggle2();'>" + chkContentType[row.contenttypeid] + " 상세정보";
	result += '<svg class="icon" width="1em" height="1em" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">';
	result += '<path fill="currentColor" fill-rule="evenodd" d="M2.87 4L1.33 5.5 8 12l6.67-6.5L13.13 4 8 9z"></path></svg></button>';
	result += "<div id='tit4'>"
	for(key in row) {
		if(row[key] == 0 || row[key] == null ){}
		else if(key == "contenttypeid" || key == "contentid"){} 
		else {
		result += "<li>" + chkContent[contentTypeId][key] + " : " + row[key] + "</li>";
		}
	}
	table += result + "</div>";
	


	$("#txtData").html(table);
}

function parseJSON3(jsonObj){
	 
	var table = "";
	var result = "";
	var row = jsonObj.response.body.items.item;



    table += "<div class='containerA'>"; 	
	if(jsonObj.response.body.items == "" || jsonObj.response.body.totalCount == 0){
		table += "<div class='noImg' style='height: 200px'><div>";
	} else if (Object.prototype.toString.call(row) == "[object Object]"){
		table += "<img id='expandedImg' src='" + row.originimgurl+ "'>"
		table += "</div>";
		result += "<div class='box' id='tab'><ul>";
		result += "<li class='column'><img src='" + row.originimgurl + "' onclick='myFunction(this);' alt=''></li>";		
		result += "</ul></div>";

	} else {

		table += "<img id='expandedImg' src='" + row[0].originimgurl+ "'>"
		table += "</div>";
		result += "<div class='box' id='tab'><ul>";
		for (i = 0; i < row.length; i++){
			result += "<li class='column'><img src='" + row[i].originimgurl + "' onclick='myFunction(this);' alt=''></li>";		
		}
		result += "</ul></div>";

	}
	


	$("#containerImg").html(table)
	$("#containerGallery").html(result);
}

function insertLC(place_uid){
	$.ajax({
		url : "./like/check",
		type : "get",
		data : {'place_uid' : place_uid, 'us_uid' : us_uid},
		cache : false,
		async : false,
		success : function(data, status){
			if(status == "success"){
				if(data.status == "OK"){
					var check = data.count;
					var likeText = "";
					likeText += "<a href='javascript:insert(" + place_uid + ")'>";
					if(data.count > 0){
						likeText += "<p class='like_icon like_ico2' id='like'>";
					} else {
						likeText += "<p class='like_icon like_ico1' id='like'>";
					}
					likeText += "<span class='likeCountAll'></span></p></a>";
					likeText += '<input type="hidden" name="check" value="' + check + '"/>';
					likeCount(place_uid)
					$("#likecount").html(likeText);
				}
			}
		}
	}); // end $.ajax()
} 

 


function myFunction(imgs) {
	var expandImg = document.getElementById("expandedImg");
	expandImg.src = imgs.src;
	expandImg.parentElement.style.display = "block";
}

function likeCount(place_uid){
	$.ajax({
		url : "./like/count",
		type : "get",
		data : {'place_uid' : place_uid},
		cache : false,
		success : function(data, status){
			if(status == "success"){
				if(data.status == "OK"){
					$('.likeCountAll').html(data.count);		
				}
			}
		}
	});
}



// 좋아요 등록
function insertLike(place_uid){
	$.ajax({
		url : "./like",
		type : "post",
		data : {'place_uid' : place_uid, 'us_uid' : us_uid},
		cache : false,
		success : function(data, status){
			if(status == "success"){
				if(data.status == "OK"){
					console.log("좋아요등록");
					likeCountUp();
					$('input[name="check"]').val(1);
				}
			}
		}
	});  // end $.ajax()
}

// 좋아요 삭제
function deleteLike(place_uid){
	$.ajax({
		url : "./like/delete",
		type : "post",
		data : {'place_uid' : place_uid, 'us_uid' : us_uid},
		cache : false,
		success : function(data, status){
		if(status == "success"){
			if(data.status == "OK"){
				console.log("좋아요취소");
				likeCountUp();
				$('input[name="check"]').val(0);
				}
			}
		}
	});  // end $.ajax()
}

// 로그인 체크
function loginCheck(){
	if(us_uid == ''){
		alert("로그인하세요")
		return 0;
	} else {
		console.log("로그인 상태");
		return 1;
	}
}




var chkContentType = {
	12 : "관광지",
	32 : "숙박",
	39 : "음식점"
}
var chkContent = {
	"12" : { 
		"accomcount" : "수용인원",
		"chkbabycarriage" : "유모차대여 정보",
		"chkcreditcard" : "신용카드가능 정보",
		"chkpet" : "애완동물동반가능 정보",
		"expagerange" : "체험가능 연령",
		"expguide" : "체험안내",
		"heritage1" : "세계 문화유산 유무",
		"heritage2" : "세계 자연유산 유무",
		"heritage3" : "세계 기록유산 유무",
		"infocenter" : "문의 및 안내",
		"opendate" : "개장일",
		"parking" : "주차시설",
		"restdate" : "쉬는날",
		"useseason" : "이용시기",
		"usetime" : "이용시간"
	},

	"32" : {
		"accomcountlodging"	: "수용 가능인원",
		"benikia" :	"베니키아 여부",
		"checkintime" :	"입실 시간",
		"checkouttime" : "퇴실 시간",
		"chkcooking" :	"객실내 취사 여부",
		"foodplace" :	"식음료장",
		"goodstay"	: "굿스테이 여부",
		"hanok" :	"한옥 여부",
		"infocenterlodging" :	"문의 및 안내",
		"parkinglodging" : "주차시설",
		"pickup" : "픽업 서비스",
		"roomcount" : "객실수",
		"reservationlodging" :	"예약안내",
		"reservationurl" :	"예약안내 홈페이지",
		"roomtype"	: "객실유형",
		"scalelodging"	: "규모",
		"subfacility" :	"부대시설 (기타)",
		"barbecue" :	"바비큐장 여부",
		"beauty" :	"뷰티시설 정보",
		"beverage"	: "식음료장 여부",
		"bicycle" : "자전거 대여 여부",
		"campfire" : "프파이어 여부",
		"fitness" :	"휘트니스 센터 여부",
		"karaoke" :	"노래방 여부",
		"publicbath" :	"공용 샤워실 여부",
		"publicpc"	: "공용 PC실 여부",
		"sauna" :	"사우나실 여부",
		"seminar" :	"세미나실 여부",
		"sports" :	"스포츠 시설 여부",
		"refundregulation" : "환불규정"
	},

	39 : {
		"chkcreditcardfood"	: "신용카드가능 정보",
		"discountinfofood" : "할인정보",
		"firstmenu" : "대표 메뉴",
		"infocenterfood" :	"문의 및 안내",
		"kidsfacility"	: "어린이 놀이방 여부",
		"opendatefood" :	"개업일",
		"opentimefood"	: "영업시간",
		"packing" :	"포장 가능",
		"parkingfood" :	"주차시설",
		"reservationfood" :	"예약안내",
		"restdatefood" : "쉬는날",
		"scalefood" : "규모",
		"seat"	: "좌석수",
		"smoking" :	"금연/흡연 여부",
		"treatmenu" : "취급 메뉴",
		"lcnsno" : "인허가번호"
	}

}

var chkareaCode = {
	"1" : "서울",
	"2" : "인천",
	"3" : "대전",
	"4" : "대구",
	"5" : "광주",
	"6" : "부산",
	"7" : "울산",
	"8" : "세종특별자치시",
	"31" : "경기도",
	"32" : "강원도",
	33 : '충청북도',
	34 : '충청남도',
	35 : '경상북도',
	36 : '경상남도',
	37 : '전라북도',
	38 : '전라남도',
	39 : '제주도'
}
