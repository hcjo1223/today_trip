<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<script>
var page = 1;   //  현재 페이지
var pageRows = 6;  // 페이지당 글의 개수
var pl_uid = '${list[0].place_uid}'; //게시글 번호
console.log(pl_uid);
$('[name=commentInsertBtn]').click(function(){ //댓글 등록 버튼 클릭시 
    var insertData = $('[name=commentInsertForm]').serialize(); //commentInsertForm의 내용을 가져옴
    commentInsert(insertData); //Insert 함수호출(아래)
});

$(document).ready(function(){
    loadPage(page); //페이지 로딩시 댓글 목록 출력 
    
});


 
 
 
//댓글 목록 
function loadPage(page){
    $.ajax({
        url : './comment/' + pl_uid + '/' + page + '/' + pageRows,
        type : 'GET',
        success : function(data, status){
        		if(status == "success") updateList(data);
   			} 
        
	}); // end $.ajax()
} // end loadPage()

function updateList(jsonObj){

	var result =''; 
	
	if(jsonObj.status == "OK"){
		var count = jsonObj.count;

        window.page = jsonObj.page;
        window.pageRows = jsonObj.pagerows; 
		
        var items = jsonObj.rdata; // 배열
		
        for(i = 0; i < count; i++){
        	
        	result += '<div class="commentArea">';
        	result += '<div class="commentInfo">'+'댓글번호 : '+items[i].re_uid+' / 작성자 : '+items[i].us_uid;
        	result += '<a onclick="commentUpdate('+items[i].re_uid+',\''+items[i].content+'\');"> 수정 </a>';
        	result += '<a onclick="commentDelete('+items[i].re_uid+');"> 삭제 </a> </div>';
        	result += '<div class="commentContent'+items[i].re_uid+'"> <p> 내용 : '+items[i].content +'</p>';
        	result += '</div></div>';
        }
        
        $("#commentList").html(result);
        
        var pagination = buildPagination(jsonObj.writepages, jsonObj.totalpage, jsonObj.page, jsonObj.pagerows);
        $("#pagination").html(pagination);
        
        var totalcount = "(" + jsonObj.totalcnt + ")"
        
        $("#count").html(totalcount);
        
	}
}
	



//댓글 등록
function commentInsert(insertData){
    $.ajax({
        url : './comment',
        type : 'post',
        data : insertData,
        success : function(data, status){
        	if(status == "success"){
	            if(data.status == "OK") {
	            	loadPage(1); //댓글 작성 후 댓글 목록 reload
	                $('[name=content]').val('');
	            }
        	}
        }
    });
    
    
}
 
//댓글 수정 - 댓글 내용 출력을 input 폼으로 변경 
function commentUpdate(re_uid, content){
    var a ='';
    
    a += '<div class="input-group">';
    a += '<input type="text" class="form-control" name="content_'+re_uid+'" value="'+content+'"/>';
    a += '<span class="input-group-btn"><button class="btn btn-default" type="button" onclick="commentUpdateProc('+re_uid+');">수정</button> </span>';
    a += '</div>';
    
    $('.commentContent'+re_uid).html(a);
    
}
 
//댓글 수정
function commentUpdateProc(re_uid){
    var updateContent = $('[name=content_'+re_uid+']').val();
    
    $.ajax({
        url : './comment/update',
        type : 'post',
        data : {'content' : updateContent, 're_uid' : re_uid},
        success : function(data, status){
        	if(status == "success"){
	            if(data.status == "OK") {
	            	alert("UPDATE 성공 " + data.count + "개: " + data.status);
	            	loadPage(window.page, pl_uid); //댓글 수정후 목록 출력 
	            }
        	}
        }
    });
}
 
//댓글 삭제 
function commentDelete(re_uid){
    $.ajax({
        url : './comment/delete/' + re_uid,
        type : 'post',
        success : function(data, status){
        	if(status == "success"){
	            if(data.status == "OK") {
	            	alert("DELETE성공: " +   data.count + "개");
	            	loadPage(window.page, pl_uid); //댓글 삭제후 목록 출력 
	            }
        	}
        }
    });
}
 
 
 

 
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
 
</script>
