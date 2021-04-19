var page = 1;   //  현재 페이지
var pageRows = 10;  // 페이지당 글의 개수
var pageName = document.URL.substring(document.URL.lastIndexOf("/"));
console.log(pageName);
// 페이지 최초 로딩되면 게시글 목록 첫페이지분 로딩
$(document).ready(function(){
    loadPage(page);   // 페이지 최초 로딩

    $("#btnDel").click(function(){
        chkDelete();
    });

    $("#btnRes").click(function(){
        chkrestore();
    });
    
});

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

function updateList(jsonObj){

    var result = "";  // 최종 결과

    if(jsonObj.status == "OK"){
        var count = jsonObj.count;

        window.page = jsonObj.page;
        window.pageRows = jsonObj.pagerows; 

        var items = jsonObj.data; // 배열

        for(var i = 0; i < count; i++){
            result += "<tr>\n";
            result += '<td class="W30">' + items[i].tu_uid + "</td>\n";
            result += '<td class="W30">' + items[i].us_uid + "</td>\n";
            result += "<td>" + items[i].tu_title + "</td>\n"
            result += '<td class="W30">' + items[i].tu_hits + "</td>\n"  
            result += '<td class="W30">' + items[i].tu_period + "일</td>\n"
            result += '<td class="W30">' + dateFo(items[i].tu_write_date) + "</td>\n"
            result += '<td class="W30">' + dateFo(items[i].tu_start_tour).slice(0,10) + "</td>\n"
            if(items[i].tu_del_ck == 1){
                result += '<td class="W30"> </td>\n'
            } else {
                result += '<td class="W30">O</td>\n'
            }
            // result += '<td class="W30">' + items[i].tu_del_ck + "</td>\n"
            result += "<td><input type='checkbox' name='uid' value='" + items[i].tu_uid + "'>" + "</td>\n";
        }
        $("#list tbody").html(result);  // 업데이트

        // 페이지 정보 업데이트
        $("#pageinfo").text(jsonObj.page + "/" + jsonObj.totalpage + "페이지, " + jsonObj.totalcnt + "개의 글");

        // pageRows
        var txt = "<select id='rows' class='form-control' onchange='changePageRows()'>\n";
        txt += "<option " + ((window.pageRows == 10) ? "selected" : "") + " value='10'>" + "10개씩</option>\n";
        txt += "<option " + ((window.pageRows == 20) ? "selected" : "") + " value='20'>" + "20개씩</option>\n";
        txt += "<option " + ((window.pageRows == 50) ? "selected" : "") + " value='50'>" + "50개씩</option>\n";
        txt += "<option " + ((window.pageRows == 100) ? "selected" : "") + " value='100'>" + "100개씩</option>\n";
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

//<select> 에서 pageRows 값 변경할때마다
function changePageRows(){
    window.pageRows = $("#rows").val();
    loadPage(window.page);
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

function chkDelete(){
    var uids = [];  // check 된 uid  들을 담을 배열 준비

    $("#list tbody input[name=uid]").each(function(){
        if($(this).is(":checked")){   // jQuery에서 checked 여부 확인함수
            uids.push(parseInt($(this).val()));   // 배열에 uid 값 추가
        }
    });

    if(uids.length == 0){
        alert("삭제할 글을 체크해주세요");
    } else {
        if(!confirm(uids.length + "개의 글을 삭제하시겠습니까?")) return false;

        var data = $("#frmList").serialize();
        data += "&type=1"//calender 확인
        // alert(data);    // uid=10&uid=20  

        $.ajax({
            url : "./delete",    // URL : /board
            type : "PUT",
            data : data,
            cache : false,
            success : function(data, status){
                if(status == "success"){
                    if(data.status == "OK"){
                        alert("DELETE성공: " +   data.count + "개");
                        loadPage(window.page);  // 현재 페이지 목록 다시 로딩
                    } else {
                        alert("DELETE실패: " +  data.message);
                        return false;
                    }
                }
            }
        });
    } // end if

    return true;
} // end chkDelete()

function chkrestore(){
    var uids = [];  // check 된 uid  들을 담을 배열 준비

    $("#list tbody input[name=uid]").each(function(){
        if($(this).is(":checked")){   // jQuery에서 checked 여부 확인함수
            uids.push(parseInt($(this).val()));   // 배열에 uid 값 추가
        }
    });

    if(uids.length == 0){
        alert("복구할 글을 체크해주세요");
    } else {
        if(!confirm(uids.length + "개의 글을 복구하시겠습니까?")) return false;

        var data = $("#frmList").serialize();
        data += "&type=1"//calender 확인
        // alert(data);    // uid=10&uid=20  

        $.ajax({
            url : "./restore",    // URL : /board
            type : "PUT",
            data : data,
            cache : false,
            success : function(data, status){
                if(status == "success"){
                    if(data.status == "OK"){
                        alert("RESTORE성공: " +   data.count + "개");
                        loadPage(window.page);  // 현재 페이지 목록 다시 로딩
                    } else {
                        alert("RESTORE실패: " +  data.message);
                        return false;
                    }
                }
            }
        });
    } // end if

    return true;
} // end chkDelete()

function dateFo(date){
   result = date[0] + "-" + date[1] + "-" +date[2] + " " + date[3] + ":" + date[4] + ":" + date[5];
    return result;
}







