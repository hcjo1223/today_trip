<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<script>
var page = 1;   //  현재 페이지
var pageRows = 6;  // 페이지당 글의 개수
var pl_uid = '${list[0].place_uid}'; //게시글 번호

// 로그인 정보 <세션>
var us_uid = '${login.us_uid}';
if(us_uid == '') us_uid = 0;
var us_authority = '${login.userAuthority}';
if(us_authority == '') us_authority = 1;


$('[name=commentInsertBtn]').click(function(){ //댓글 등록 버튼 클릭시 
	if(us_uid != null){
    var insertData = $('[name=commentInsertForm]').serialize(); //commentInsertForm의 내용을 가져옴
    commentInsert(insertData); //Insert 함수호출(아래)
	} else {
		alert("로그인 하세요");
	}
});

$(document).ready(function(){
    loadPage(page); //페이지 로딩시 댓글 목록 출력 
    
    $(".tit1").click(function(){
		$(".tit2").slideToggle("slow");
	});
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
        	
			users = userList(items[i].us_uid);

        	result += '<div class="commentArea">';
        	result += '<div class="commentInfo">'+'<span>작성자 ID: ' + users.us_id + '</span>/ <span>작성자 : ' + users.us_nickname + '</span>/ <span>작성날짜 : ' + items[i].write_date + '</sapn>';
        	if(items[i].rate > 4.1){
        		result += '<img src ="../resources/IMG/star5.png">';
        	} else if (items[i].rate > 3.1){
        		result += '<img src ="../resources/IMG/star4.png">';
        	} else if (items[i].rate > 2.1) {
        		result += '<img src ="../resources/IMG/star3.png">';
        	} else if (items[i].rate > 1.1) {
        		result += '<img src ="../resources/IMG/star2.png">';
        	} else {
        		result += '<img src ="../resources/IMG/star1-1.png">';
        	}

			if(us_uid == users.us_uid || us_authority == 0) {
        	result += '<a onclick="commentUpdate('+items[i].re_uid+',\''+items[i].content+'\');"> 수정 </a>';
        	result += '<a onclick="chkDelete('+items[i].re_uid+');"> 삭제 </a>';
			}
        	result += '</div><div class="commentContent'+items[i].re_uid+'"> <p> 내용 : '+items[i].content +'</p>';
        	result += '</div></div>';
        }
        
        
        $("#commentList").html(result);
        
        var pagination = buildPagination(jsonObj.writepages, jsonObj.totalpage, jsonObj.page, jsonObj.pagerows);
        $("#pagination").html(pagination);
        
        var totalcount = "(" + jsonObj.totalcnt + ")"
        
        $("#count").html(totalcount);
        
	}
}
	
function chkDelete(uid){
	// 삭제 여부, 다시 확인 하고 진행하기
	var r = confirm("삭제하시겠습니까?");
	
	if(r){
		commentDelete(uid);
	}
} 

function chkUpdate(uid){
	// 수정 여부, 다시 확인 하고 진행하기
	var r = confirm("수정하시겠습니까?");
	
	if(r){
		commentUpdateProc(uid);
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
    a += '<span class="input-group-btn"><button class="btn btn-default" type="button" onclick="chkUpdate('+re_uid+');">수정</button> </span>';
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
	            	loadPage(window.page, pl_uid); //댓글 삭제후 목록 출력 
	            }
        	}
        }
    });
}

// 댓글별 유저 정보
function userList(us_uid){
	var users = '';
	$.ajax({
        url : './comment/users',
        type : 'post',
		data : {'us_uid' : us_uid},
		cache : false,
		async : false,
        success : function(data, status){
        	if(status == "success"){
	            if(data.status == "OK") {
	            	users = data.Usersdata[0]
	            }
        	}
        }
    });
	return users;
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

var locked = 0;
function show(star) {
	if(locked)
		return;
	var i;
	var image;
	var el;
		
	for (i = 1; i <= star; i++){
		image = 'image' + i;
		el = document.getElementById(image);
		el.src = "../resources/IMG/star1.png"
	}
}

function noshow(star) {
	if(locked)
		return;
	var i;
	var image;
	var el;
	
	for (i = 1; i <= star; i++){
		image = 'image' + i;
		el = document.getElementById(image);
		el.src = "../resources/IMG/star0.png"
	}
}

function lock(star) {
	show(star);
	locked = 1;
}

function mark(star) {
	lock(star);
	alert("별점" + star + "점");
	document.commentInsertForm.rate.value=star;
}
 




</script>
