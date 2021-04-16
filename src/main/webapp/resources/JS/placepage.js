var page = 1;   //  현재 페이지
var pageRows = 9;  // 페이지당 글의 개수
var viewItem = undefined;   // 가장 최근에 view 한 글의 데이터

$(document).ready(function(){
    loadPage(page);   // 페이지 최초 로딩

});

//page번째 페이지 목록 읽어오기
function loadPage(page){
    $.ajax({
        url : "./" + page + "/" + pageRows,
        type : "GET",
        cache : false,
        success : function(data, status){
            if(status == "success"){
                //alert("성공했쮸?");

                if(updateList(data)){   // application/json 이면 이미 parse 되어 있다.

                    // 업데이트된 list 에 view 동작 이벤트 가동
                    addViewEvent();
                    // ★ 만약 위 코드를 $(document).ready() 에 두면 동작 안할것이다!
                }
            }
        }
    });  // end $.ajax()
} // end loadPage()

function updateList(jsonObj){

    var result = "";  // 최종 결과

    if(jsonObj.status == "OK"){
        var count = jsonObj.count;

        window.page = jsonObj.page;
        window.pageRows = jsonObj.pagerows; 
		
        var items = jsonObj.data; // 배열

		

		for(var i = 0; i < count; i++){
			var sigunguArr = items[i].addr1.split(" ")

			result += "<li>\n"
					+ "<dl class='item_section'>\n"
					+ "<dt class='item_top'>\n"
					+ "<a href='./view?contentid=" + items[i].contentid + "'>\n"
					+ "<span class='s_day'>" + chkContentType[items[i].contenttypeid] + "</span>\n"
					+ "<img src='" + items[i].firstimage2 + "' alt='" + items[i].title + "'>\n"
					+ "<div class='score_area'><p class='score_count' style='width: 100%;'>별점(5점만점에 5점)</p></div>\n"
					+ "<p class='s_tit'>" + items[i].title + "</p>"
                    + "<p class='s_theme'>" + chkareaCode[items[i].areacode] + "&gt;" + sigunguArr[1] + "</p>"
					+ "</a></dt>\n"
					+ "<dd class='item_count_area clear'><a href='javascript:void(0);'>\n"
					+ "<p class='ico_type like'><span>좋아요</span><span class='count'>128</span></p></a>"
					+ "<a href='javascript:void(0);'><p class='ico_type zzim '><span>찜하기</span><span class='count'>736</span></p></a>"
					+ "<p class='ico_type review'><span>리뷰</span><span class='count'>591</span></p>"
					+ "</p></dd></dl></li>"
		}

		"<a href='javascript:void(0);'><p class='ico_type zzim '><span>찜하기</span><span class='count'>736</span></p></a>"
        
        $(".item_list").html(result);  // 업데이트

        // 페이지 정보 업데이트
        $("#pageinfo").text(jsonObj.page + "/" + jsonObj.totalpage + "페이지, " + jsonObj.totalcnt + "개의 글");

        // pageRows
        var txt = "<select class='custom-select' id='rows' style='width:100px;' onchange='changePageRows()'>\n";
        txt += "<option " + ((window.pageRows == 9) ? "selected" : "") + " value='9'>" + "3줄</option>\n";
        txt += "<option " + ((window.pageRows == 15) ? "selected" : "") + " value='15'>" + "5줄</option>\n";
        txt += "<option " + ((window.pageRows == 24) ? "selected" : "") + " value='24'>" + "8줄</option>\n";
        txt += "<option " + ((window.pageRows == 48) ? "selected" : "") + " value='48'>" + "16줄</option>\n";
        txt += "</select>\n";
        $("#pageRows").html(txt);

        // [페이징 정보 업데이트]
        var pagination = buildPagination(jsonObj.writepages, jsonObj.totalpage, jsonObj.page, jsonObj.pagerows);
        $("#pagination").html(pagination);

        return true;  // 목록 업데이트 성공하면 true 리턴
    } else {
        alert("내용이 없습니다.");
        return false;
    }


} // end updateList()


// 페이징 생성
// 한페이징에 표시될 페이지수 --> writePages
// 총 페이지수 --> totalPage
// 현재 페이지 --> curPage

function buildPagination(writePages, totalPage, curPage, pageRows){
	var str = "";   // 최종적으로 페이징에 나타날 HTML 문자열 <li> 태그로 구성
	
	// 페이징에 보여질 숫자들 (시작숫자 start_page ~ 끝숫자 end_page)
    var start_page = ( (parseInt( (curPage - 1 ) / writePages ) ) * writePages ) + 1;
    var end_page = start_page + writePages - 1;

    if (end_page >= totalPage){
    	end_page = totalPage;
    }
    
    // ■ << 표시 여부
	if(curPage > 1){
		str += "<li><a onclick='loadPage(" + 1 + ")' class='tooltip-top' title='처음'><i class='fas fa-angle-double-left'></i></a></li>\n";
	}
	
  	// ■  < 표시 여부
    if (start_page > 1) 
    	str += "<li><a onclick='loadPage(" + (start_page - 1) + ")' class='tooltip-top' title='이전'><i class='fas fa-angle-left'></i></a></li>\n";
    
    // ■  페이징 안의 '숫자' 표시	
	if (totalPage > 1) {
	    for (var k = start_page; k <= end_page; k++) {
	        if (curPage != k)
	            str += "<li><a onclick='loadPage(" + k + ")'>" + k + "</a></li>\n";
	        else
	            str += "<li><a class='active tooltip-top' title='현재페이지'>" + k + "</a></li>\n";
	    }
	}
	
	// ■ > 표시
    if (totalPage > end_page){
    	str += "<li><a onclick='loadPage(" + (end_page + 1) + ")' class='tooltip-top' title='다음'><i class='fas fa-angle-right'></i></a></li>\n";
    }

	// ■ >> 표시
    if (curPage < totalPage) {
        str += "<li><a onclick='loadPage(" + totalPage + ")' class='tooltip-top' title='맨끝'><i class='fas fa-angle-double-right'></i></a></li>\n";
    }

    return str;
} // end buildPagination();

//<select> 에서 pageRows 값 변경할때마다
function changePageRows(){
    window.pageRows = $("#rows").val();
    loadPage(window.page);
}

function addViewEvent(){
    $("#list .subject").click(function(){
        // 읽어오기
        $.ajax({
            url : "./" + $(this).attr("data-uid"),      // url :  /board/{uid}
            type : "GET",
            cache : false,
            success : function(data, status){
                if(status == "success"){
                    if(data.status == "OK"){
                        // 글 읽어오기 성공하면, 내부 데이터 세팅하고 팝업 대화상자 보여주기
                        window.viewItem = data.data[0];

                        setPopup("view");  // 글읽기 팝업 띄우기
                        $("#dlg_write").show();

                        // 리스트상의 조회수도 증가시켜야 한다.
                        $("#list [data-viewcnt='" + viewItem.uid + "']").text(viewItem.viewcnt);
                    } else {
                        alert("VIEW 실패 : " + data.message);
                    }
                }
            }
        });
    });
} // end addViewEvent()

var chkContentType = {
	12 : "관광지",
	32 : "숙박",
	39 : "음식점"
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