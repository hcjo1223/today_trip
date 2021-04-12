var ServiceKey = "pJTimjFQ8JAUDC5tNBIN6Pq%2Fv%2Bn2Ttf4vF84sqbJCPzRtR3Sqc3EDbm9CwScgDxnHDZNYh3xlwVDwNvS1mdZag%3D%3D"; // 자신의 키값 입력하기!
var detailCommon_url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&overviewYN=Y&transGuideYN=Y&_type=json";
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

	

});

function parseJSON1(jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	table += "<div class='mainImg'><img src='" + row.firstimage + "' alt='메인이미지'></div><br>";
	table += "<h3>개요</h3>";
	table += "<div class='content'>" + row.overview + "</div>";
	
	$("#demoJSON1").html(table);
}

function parseJSON2(contentTypeId, jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	var result = "";
	
	result += "<strong>" + chkContentType[row.contenttypeid] + "</strong>";

	for(key in row) {
		if(row[key] == 0 || row[key] == null ){}
		else if(key == "contenttypeid" || key == "contentid"){} 
		else {
		result += "<li>" + chkContent[contentTypeId][key] + " : " + row[key] + "</li>";
		}
	}
	table += result;
	


	$("#demoJSON2").html(table);
}

function parseJSON3(jsonObj){
	 
	var table = "";

	var row = jsonObj.response.body.items.item;

	table += "<div class='tourView'>";
    table += "<div class='imgGallery'>";
	table += "<p><img src='" + row[0].originimgurl + "'></p>"

	table += "<div class='sumImg'><ul>"
	for (i = 0; i < row.length; i++){
		table += "<li><a><span><img src='" + row[i].smallimageurl + "'></span></a></li>";
	}
	table += "</div></div>"
	$("#demoJSON3").html(table);
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
/*
var chksigunguCode = {
	"1" : {
		1:강남구,
		2:강동구,
		3:강북구,
		4:강서구,
		5:관악구,
		6:광진구,
		7:구로구,
		8:금천구,
		9:노원구,
		10:도봉구,
		11:동대문구,
		12:동작구,
		13:마포구,
		14:서대문구,
		15:서초구,
		16:성동구,
		17:성북구,
		18:송파구,
		19:양천구,
		20:영등포구,
		21:용산구,
		22:은평구,
		23:종로구,
		24:중구,
		25:중랑구
	}
}
*/