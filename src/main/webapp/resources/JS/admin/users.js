var page = 1;   //  현재 페이지
var pageRows = 10;  // 페이지당 글의 개수
var pageName = document.URL.substring(document.URL.lastIndexOf("/"));
var keyword = "";
// 페이지 최초 로딩되면 게시글 목록 첫페이지분 로딩
$(document).ready(function(){
    loadPage(page);   // 페이지 최초 로딩

    $("#btnGrt").click(function(){
        chkGrant();
    });

    $("#btnRvk").click(function(){
        chkRevoke();
    });
});

function SearchAdminUsers(){
    keyword = document.getElementById('adminUsersKeyword').value;
    
    
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
    var URL = "http://localhost:8099/today_trip/admin/users" + pageName + "/" + page + "/" + pageRows + "/" + keyword;
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

        var items = jsonObj.Usersdata; // 배열

        for(var i = 0; i < count; i++){
            result += "<tr>\n";
            result += '<td class="W30">' + items[i].us_uid + "</td>\n";
            result += "<td>" + items[i].us_id + "</td>\n"
            result += '<td class="W30">' + items[i].us_email + "</td>\n"  
            result += '<td class="W30">' + items[i].us_nickName + "</td>\n"
            if(items[i].us_gender == 0){
                result += '<td class="W30">비공개</td>\n'
            } else if(items[i].us_gender == 1){
                result += '<td class="W30">남자</td>\n'
            } else {
                result += '<td class="W30">여자</td>\n'
            }
            if(items[i].us_birth == 0 || items[i].us_birth == null){
                result += "<td> </td>\n"
            } else {
                result += "<td>" + dateFo(items[i].us_birth) + "</td>\n"
            }
            if(items[i].us_join_date == 0 || items[i].us_join_date == null){
                result += "<td> </td>\n"
            } else {
                result += "<td>" + dateFo(items[i].us_join_date) + "</td>\n"
            }
            if(items[i].us_authority == 1){
                result += '<td class="W30">일반</td>\n'
            } else {
                result += '<td class="W30">관리자</td>\n'
            }
            result += "<td><input type='checkbox' name='uid' value='" + items[i].us_uid + "'>" + "</td>\n";
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
		str += "<li><a onclick='loadPage(" + 1 + ")' class='tooltip-top' title='처음'><img style='transform: rotate(180deg)' src='../resources/IMG/admin_chevron_double.png'></a></li>\n";
	}
	
  	//■  < 표시 여부
    if (start_page > 1) 
    	str += "<li><a onclick='loadPage(" + (start_page - 1) + ")' class='tooltip-top' title='이전'><img src='../resources/IMG/admin_chevron_left.png'></a></li>\n";
    
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
    	str += "<li><a onclick='loadPage(" + (end_page + 1) + ")' class='tooltip-top' title='다음'><img src='../resources/IMG/admin_chevron_right.png'></a></li>\n";
    }

	//■ >> 표시
    if (curPage < totalPage) {
        str += "<li><a onclick='loadPage(" + totalPage + ")' class='tooltip-top' title='맨끝'><img src='../resources/IMG/admin_chevron_double.png'></a></li>\n";
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

// 권한 부여
function chkGrant(){
    var uids = [];  // check 된 uid  들을 담을 배열 준비

    $("#list tbody input[name=uid]").each(function(){
        if($(this).is(":checked")){   // jQuery에서 checked 여부 확인함수
            uids.push(parseInt($(this).val()));   // 배열에 uid 값 추가
        }
    });

    if(uids.length == 0){
        alert("회원을 선택해 주세요");
    } else {
        if(!confirm(uids.length + "명 에게 권한을 부여 하시겠습니까?")) return false;

        var data = $("#frmList").serialize();
        data += "&type=1"//calender 확인
        // alert(data);    // uid=10&uid=20  

        $.ajax({
            url : "./users/grant",    // URL : /board
            type : "PUT",
            data : data,
            cache : false,
            success : function(data, status){
                if(status == "success"){
                    if(data.status == "OK"){
                        alert("Grant성공: " +   data.count + "명");
                        loadPage(window.page);  // 현재 페이지 목록 다시 로딩
                    } else {
                        alert("Grant실패: " +  data.message);
                        return false;
                    }
                }
            }
        });
    } // end if

    return true;
} // end chkGrant()

// 권한 삭제
function chkRevoke(){
    var uids = [];  // check 된 uid  들을 담을 배열 준비

    $("#list tbody input[name=uid]").each(function(){
        if($(this).is(":checked")){   // jQuery에서 checked 여부 확인함수
            uids.push(parseInt($(this).val()));   // 배열에 uid 값 추가
        }
    });

    if(uids.length == 0){
        alert("회원을 선택해 주세요");
    } else {
        if(!confirm(uids.length + "명의 권한을 삭제 하시겠습니까?")) return false;

        var data = $("#frmList").serialize();
        data += "&type=1"//calender 확인
        // alert(data);    // uid=10&uid=20  

        $.ajax({
            url : "./users/revoke",    // URL : /board
            type : "PUT",
            data : data,
            cache : false,
            success : function(data, status){
                if(status == "success"){
                    if(data.status == "OK"){
                        alert("Revoke성공: " +   data.count + "명");
                        loadPage(window.page);  // 현재 페이지 목록 다시 로딩
                    } else {
                        alert("Revoke실패: " +  data.message);
                        return false;
                    }
                }
            }
        });
    } // end if

    return true;
} // end chkRevoke()
function dateFo(date){
    result = date[0] + "-" + date[1] + "-" +date[2] + " " + date[3] + ":" + date[4] + ":" + date[5];
     return result;
 }











