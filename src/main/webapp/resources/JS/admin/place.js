var page = 1;   //  현재 페이지
var pageRows = 10;  // 페이지당 글의 개수
var pageName = document.URL.substring(document.URL.lastIndexOf("/"));
var keyword = "";
// console.log(pageName);
// 페이지 최초 로딩되면 게시글 목록 첫페이지분 로딩
$(document).ready(function(){
    loadPage(page);   // 페이지 최초 로딩
});

function SearchAdminPlace(){
    keyword = document.getElementById('adminPlaceKeyword').value;
    
    
    $("#list tbody").html(" ");
    loadSearchPage(page);
}

//page번째 페이지 목록 읽어오기
function loadPage(page){
    $.ajax({
        url : "." + pageName + "/" + page + "/" + pageRows,
        type : "GET",
        cache : false,
        success : function(data, status){
            if(status == "success"){
                //alert("성공했쮸?");

                if(updateList(data)){   // application/json 이면 이미 parse 되어 있다.
                }
            }
        }
    });  // end $.ajax()
} // end loadPage()

function loadSearchPage(page){
    console.log(keyword);
    console.log(pageName);
    var URL = "http://localhost:8099/today_trip/admin/place" + pageName + "/" + page + "/" + pageRows + "/" + keyword;
    $.ajax({
        url : encodeURI(URL),
        type : "GET",
        cache : false,
        success : function(data, status){
            if(status == "success"){
                //alert("성공했쮸?");

                if(updateList(data)){   // application/json 이면 이미 parse 되어 있다.
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
            result += "<tr>\n";
            result += '<td class="W30">' + items[i].place_uid + "</td>\n";
            result += "<td>" + items[i].title + "</td>\n"
            result += '<td class="W30">' + items[i].contentid + "</td>\n"  
            result += '<td class="W30">' + items[i].mapx + "</td>\n"
            result += '<td class="W30">' + items[i].mapy + "</td>\n"
            result += "<td>" + items[i].addr1 + "</td>\n"
            if (items[i].tel == null) {
                result += "<td> </td>\n"  
            } else {
                result += "<td>" + items[i].tel + "</td>\n" 
            }
            result += '<td><img src="' + items[i].firstimage2 + '"></td>\n'        
            result += "</tr>\n";
        }
        $("#list tbody").html(result);  // 업데이트

        // 페이지 정보 업데이트
        $("#pageinfo").text(jsonObj.page + "/" + jsonObj.totalpage + "페이지, " + jsonObj.totalcnt + "개의 글");

        // pageRows 
        if(keyword == ""){
            var txt = "<select id='rows' class='form-control' onchange='changePageRows()'>\n";
        } else {
            var txt = "<select id='rows' class='form-control' onchange='changeSearchPageRows()'>\n";
        }
       
        txt += "<option " + ((window.pageRows == 10) ? "selected" : "") + " value='10'>" + "10개씩</option>\n";
        txt += "<option " + ((window.pageRows == 20) ? "selected" : "") + " value='20'>" + "20개씩</option>\n";
        txt += "<option " + ((window.pageRows == 50) ? "selected" : "") + " value='50'>" + "50개씩</option>\n";
        txt += "<option " + ((window.pageRows == 100) ? "selected" : "") + " value='100'>" + "100개씩</option>\n";
        txt += "</select>\n";
        $("#pageRows").html(txt);

        // [페이징 정보 업데이트]
        if(keyword == ""){
            var pagination = buildPagination(jsonObj.writepages, jsonObj.totalpage, jsonObj.page, jsonObj.pagerows);
        } else {
            var pagination = buildSearchPagination(jsonObj.writepages, jsonObj.totalpage, jsonObj.page, jsonObj.pagerows);
        }
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
    
  //■ << 표시 여부
	if(curPage > 1){
		str += "<li><a onclick='loadPage(" + 1 + ")' class='tooltip-top' title='처음'><img style='transform: rotate(180deg)' src='../../resources/IMG/admin_chevron_double.png'></a></li>\n";
	}
	
  	//■  < 표시 여부
    if (start_page > 1) 
    	str += "<li><a onclick='loadPage(" + (start_page - 1) + ")' class='tooltip-top' title='이전'><img src='../../resources/IMG/admin_chevron_left.png'></a></li>\n";
    
    //■  페이징 안의 '숫자' 표시	
	if (totalPage > 1) {
	    for (var k = start_page; k <= end_page; k++) {
	        if (curPage != k)
	            str += "<li><a onclick='loadPage(" + k + ")'>" + k + "</a></li>\n";
	        else
	            str += "<li><a class='active tooltip-top' title='현재페이지'>" + k + "</a></li>\n";
	    }
	}
	
	//■ > 표시
    if (totalPage > end_page){
    	str += "<li><a onclick='loadPage(" + (end_page + 1) + ")' class='tooltip-top' title='다음'><img src='../../resources/IMG/admin_chevron_right.png'></a></li>\n";
    }

	//■ >> 표시
    if (curPage < totalPage) {
        str += "<li><a onclick='loadPage(" + totalPage + ")' class='tooltip-top' title='맨끝'><img src='../../resources/IMG/admin_chevron_double.png'></a></li>\n";
    }

    return str;
} // end buildPagination();

function buildSearchPagination(writePages, totalPage, curPage, pageRows){
	var str = "";   // 최종적으로 페이징에 나타날 HTML 문자열 <li> 태그로 구성
	
	// 페이징에 보여질 숫자들 (시작숫자 start_page ~ 끝숫자 end_page)
    var start_page = ( (parseInt( (curPage - 1 ) / writePages ) ) * writePages ) + 1;
    var end_page = start_page + writePages - 1;

    if (end_page >= totalPage){
    	end_page = totalPage;
    }
    
  //■ << 표시 여부
	if(curPage > 1){
		str += "<li><a onclick='loadSearchPage(" + 1 + ")' class='tooltip-top' title='처음'><img style='transform: rotate(180deg)' src='../../resources/IMG/admin_chevron_double.png'></a></li>\n";
	}
	
  	//■  < 표시 여부
    if (start_page > 1) 
    	str += "<li><a onclick='loadSearchPage(" + (start_page - 1) + ")' class='tooltip-top' title='이전'><img src='../../resources/IMG/admin_chevron_left.png'></a></li>\n";
    
    //■  페이징 안의 '숫자' 표시	
	if (totalPage > 1) {
	    for (var k = start_page; k <= end_page; k++) {
	        if (curPage != k)
	            str += "<li><a onclick='loadSearchPage(" + k + ")'>" + k + "</a></li>\n";
	        else
	            str += "<li><a class='active tooltip-top' title='현재페이지'>" + k + "</a></li>\n";
	    }
	}
	
	//■ > 표시
    if (totalPage > end_page){
    	str += "<li><a onclick='loadSearchPage(" + (end_page + 1) + ")' class='tooltip-top' title='다음'><img src='../../resources/IMG/admin_chevron_right.png'></a></li>\n";
    }

	//■ >> 표시
    if (curPage < totalPage) {
        str += "<li><a onclick='loadSearchPage(" + totalPage + ")' class='tooltip-top' title='맨끝'><img src='../../resources/IMG/admin_chevron_double.png'></a></li>\n";
    }

    return str;
} // end buildPagination();

//<select> 에서 pageRows 값 변경할때마다
function changePageRows(){
    window.pageRows = $("#rows").val();
    loadPage(window.page);
}

function changeSearchPageRows(){
    window.pageRows = $("#rows").val();
    loadSearchPage(window.page);
}
// 글 수정 처리
function chkUpdate(){

    var data = $("#frmWrite").serialize();

    $.ajax({
        url : ".",   // URL : /board
        type : "PUT",
        cache : false,
        data : data,
        success : function(data, status){
            if(status == "success"){
                if(data.status == "OK"){
                    alert("UPDATE 성공 " + data.count + "개:" +  data.status);
                    loadPage(window.page);  // 현재페이지 리로딩
                } else {
                    alert("UPDATE 실패 " + data.status + " : " + data.message);
                }

                // 현재 팝업 닫기
                $("#dlg_write").hide();
            }
        }
    });


} // end chkUpdate();













