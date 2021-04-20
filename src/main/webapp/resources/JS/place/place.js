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

	
	
	var count = "<di>좋아요 : " + likeCount(place_uid) + "</di>"
	$(".likecount").html(count)

    


});

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
	
	result += "<button id='tit3' onclick='toggle2();'>" + chkContentType[row.contenttypeid] + " 상세정보</button>";
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

function myFunction(imgs) {
	var expandImg = document.getElementById("expandedImg");
	expandImg.src = imgs.src;
	expandImg.parentElement.style.display = "block";
}

function likeCount(place_uid){
	var count = 0;
	$.ajax({
		url : "./like/count",
		type : "get",
		data : {'place_uid' : place_uid},
		cache : false,
		async : false,
		success : function(data, status){
			if(status == "success"){
				if(data.status == "OK"){
					count = data.count;		
				}
			}
		}
	});

	return count;
}

function likeup(place_uid){
	$.ajax({
		url : "./place/like",
		type : "post",
		data : {"place_uid" : place_uid},
		success : function(data, status){
			if(status == "success"){
	            if(data.status == "OK") {
					
					
				}
			}

		}
	});
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

	"39" : {
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

var chksigunguCode = {
	"1" : { 1:'강남구', 2:'강동구', 3:'강북구', 4:'강서구', 5:'관악구', 6:'광진구', 7:'구로구', 8:'금천구', 9:'노원구', 10:'도봉구', 11:'동대문구', 12:'동작구', 13:'마포구', 14:'서대문구', 15:'서초구', 16:'성동구', 17:'성북구', 18:'송파구', 19:'양천구', 20:'영등포구', 21:'용산구', 22:'은평구', 23:'종로구', 24:'중구', 25:'중랑구' },
	"2" : {
		1: "강화군",
		2: "계양구",
		3: "미추홀구",
		4: "남동구",
		5: "동구",
		6: "부평구",
		7: "서구",
		8: "연수구",
		9: "옹진군",
		10: "중구"
		},
	3 : {
		1: "대덕구",
		2: "동구",
		3: "서구",
		4: "유성구",
		5: "중구"
		},
	4 : {
		1: "남구",
		2: "달서구",
		3: "달성군",
		4: "동구",
		5: "북구",
		6: "서구",
		7: "수성구",
		8: "중구"
	},
	5 : {
		1: "광산구",
		2: "남구",
		3: "동구",
		4: "북구",
		5: "서구"
	},
	6 : {
		1: "강서구",
		2: "금정구",
		3: "기장군",
		4: "남구",
		5: "동구",
		6: "동래구",
		7: "부산진구",
		8: "북구",
		9: "사상구",
		10: "사하구",
		11: "서구",
		12: "수영구",
		13: "연제구",
		14: "영도구",
		15: "중구",
		16: "해운대구"
	},
	7 : {
		1: "중구",
		2: "남구",
		3: "동구",
		4: "북구",
		5: "울주군"
	},
	8 : {
		1: "세종특별자치시"
	},
	31 : {
		1: "가평군",
		2: "고양시",
		3: "과천시",
		4: "광명시",
		5: "광주시",
		6: "구리시",
		7: "군포시",
		8: "김포시",
		9: "남양주시",
		10: "동두천시",
		11: "부천시",
		12: "성남시",
		13: "수원시",
		14: "시흥시",
		15: "안산시",
		16: "안성시",
		17: "안양시",
		18: "양주시",
		19: "양평군",
		20: "여주시",
		21: "연천군",
		22: "오산시",
		23: "용인시",
		24: "의왕시",
		25: "의정부시",
		26: "이천시",
		27: "파주시",
		28: "평택시",
		29: "포천시",
		30: "하남시",
		31: "화성시"
	},
	32 : {
		1: "강릉시",
		2: "고성군",
		3: "동해시",
		4: "삼척시",
		5: "속초시",
		6: "양구군",
		7: "양양군",
		8: "영월군",
		9: "원주시",
		10: "인제군",
		11: "정선군",
		12: "철원군",
		13: "춘천시",
		14: "태백시",
		15: "평창군",
		16: "홍천군",
		17: "화천군",
		18: "횡성군"
	},
	39 : {

	}	
}