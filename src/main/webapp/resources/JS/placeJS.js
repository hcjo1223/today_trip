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
				if (status == "success") parseJSON2(data);
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
			}
		});

	})();

});

function parseJSON1(jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	table += "<div class='mainImg'><img src='" + row.firstimage + "' alt=''></div><br>";
	table += row.overview;
	
	$("#demoJSON1").html(table);
}

function parseJSON2(jsonObj){
	 
	var table= "";

	var row = jsonObj.response.body.items.item;

	table += row.contentid + "<br>";
	table += row.contenttypeid;
	
	$("#demoJSON2").html(table);
}

function parseJSON3(jsonObj){
	 
	var table= chkContentTypeId();

	var row = jsonObj.response.body.items.item;

	table += "<div class='tourView'>";
    table += "<div class='imgGallery'>";
	table += "<p><img src='" + row[0].originimgurl + "'></p>"

	table += "<div id='sumImg'><ul>"
	for (i = 0; i < row.length; i++){
		table += "<li><a><span><img src='" + row[i].smallimageurl + "'></span></a></li>";
	}
	table += "</div></div>"
	$("#demoJSON3").html(table);
}
function chkContentTypeId(){
	
	switch(contentTypeId){
		case 12:
			"<h3>관광지</h3>"
			break;
		case 32:
			"<h3>숙박</h3>"
			break;
		case 39:
			"<h3>음식점</h3>"
			break;
	}
	
}