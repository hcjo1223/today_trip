var ServiceKey = "pJTimjFQ8JAUDC5tNBIN6Pq%2Fv%2Bn2Ttf4vF84sqbJCPzRtR3Sqc3EDbm9CwScgDxnHDZNYh3xlwVDwNvS1mdZag%3D%3D"; // 자신의 키값 입력하기!
var detailCommon_url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?"
		+ "&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&overviewYN=Y&transGuideYN=Y&_type=json";
var detailIntro_url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?MobileOS=ETC&MobileApp=TourAPI3.0_Guide&introYN=Y&_type=json";

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
				if (status == "success") parseJSON2(data);
			}
		});

	})();

});

function parseJSON1(jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	table += "<img src='" + row.firstimage + "' alt=''><br>";
	table += row.overview;
	
	$("#demoJSON1").html(table);
}

function parseJSON2(jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	table += detailIntro() + "<img src='" + row[i] + "' alt=''>";
	table += row.overview;
	
	$("#demoJSON2").html(table);
}

function detailIntro(){
	contentId = "콘텐츠ID";
}