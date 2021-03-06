$(function(){

    // url에서 추출해온 tu_uid
	var global_tu_uid = getParam('tu_uid');
    var form = $("#tour-form");
    // period
	var maxDay=0;
    
	//[step 1] 장소 가지고 오기
	$.ajax({
		url: '/today_trip/calender/listTL',
		type: 'get',
		data: { tu_uid : global_tu_uid },
		success: function(list) {
		
			var dayArr = [0];
			$.each(list, function(index,item) {
				dayArr.push(item.tu_day);
			});
			maxDay = Math.max.apply(null, dayArr);
			
			/*let startDate = new Date('2021-04-16 00:00:00.0');
			var startMill = startDate.getTime(); 
			console.log(maxDay);
			var period = 3600*24*maxDay;
			var endMill = startMill+period;
			
			var endDate = Date(endMill);
			console.log(endDate);*/
			
			// [step 1] maxDay만큼 부모 UI만들기
			for (var i = 0;i < maxDay; i++) {
				var index=i+1;
				
				var html = '<div id="day-'+index+'" class="mb-5 day" data-day="'+index+'">'+
						     	'<div id="day-head-'+index+'" no="2" class="day-head border-bottom mb-3 d-flex justify-content-center">'+
						     		'<h5>DAY '+index+'</h5>'+
						     	'</div>'+
						     	'<div id="day-content-'+index+'" class="mt-5 mb-5 day-content" data-day="'+index+'">'+
											
						     	'</div>'+
						     	'<div id="day-memo-'+index+'" class="mt-5 mb-5 memo" data-day="'+index+'">'+	
						     		'<button id="btn-memo-cancel-'+index+'" type="button" class="btn btn-primary" style="background-color: #35c5f0;">메모지우기</button>'+
						     	'</div>'+
								'<div id="day-btn-box'+index+'" class="day-btn-box d-flex justify-content-center">'+
						     		'<button id="btn-place-'+index+'" type="button" day="'+index+'" class="btn btn-primary btn-place m-2 w-25" data-target="#placeModal" data-toggle="modal" style="background-color: #35c5f0;">장소 추가</button>'+
						     		'<button id="btn-memo-'+index+'" type="button" day="'+index+'" class="btn btn-primary btn-memo m-2 w-25" style="display: none; background-color: #35c5f0;">장소 추가</button>'+
						    	'</div>'+
						    '</div>'
				
				$('#place-memo-list').append(html);
			}
			
			// [step 2] 만들어진 부모에 장소 넣기	
			$.each(list, function(index, item) {
				console.log(item);
				var $day = item.tu_day;
				$('.day-content[data-day="'+$day+'"]').append(
					'<div class="one-place" data-no="'+$day+'" data-place-uid="'+item.place_uid+'">'+
		     			'<span class="mr-5">'+$day+'</span>'+
		     			'<span>'+item.title+'</span>'+
                        '<i class="fas fa-times-circle" style="color:#999;margin-left:6px;cursor:pointer;"></i>'+
		     			'<div class="mb-4"></div>'+
		     		'</div>'
				);
			});
			
		},
		error: function(err) {
			console.log(err);
		}
	});
	
	// [step2] 메모 가지고 오기
	$.ajax({
		url: '/today_trip/calender/listMemo',
		type: 'get',
		data: { tu_uid : global_tu_uid },
		success: function(list) {
			console.log(list);
			// [step 3] 만들어진 부모에 메모 넣기	
			$.each(list, function(index, item) {
				var $day = item.tu_day;
				$('.memo[data-day="'+$day+'"]').prepend(
					'<textarea rows="10" cols="100" name="memoText" class="w-100">'+item.memo_contents+'</textarea>'
				);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
	
	// [step3] 태그가지고 오기 ajax 이용!
    // TODO
	
	// '수정하기' 버튼 클릭 이벤트
	$('#edit-btn').on('click',function() {
		var tu_uid = $(this).data('tu-uid');
		location.href = '/today_trip/calender/register/edit?tu_uid=' + tu_uid;
	});

    // 장소 삭제 버튼 클릭 이벤트
    $(document).on('click','.one-place i',function() {
		$(this).closest('.one-place').remove();
	});

    // url에서 추출해온 tu_uid
	var global_tu_uid = getParam('tu_uid');
    var formData = new FormData($('#tour-form')[0]);
    var periodChangeFlag = 0; // 여행기간 변경여부
                                // 0 ==> 변경안됨
                                // 1 ==> 변경됨
    var clickedDay = 0; // 장소/메모 추가 시 현재 클릭한 날짜
    
    // '글 올리기' 버튼 클릭 이벤트
    $(".btnRegister").on("click", function() {
            
        if( confirm("정말로 글올리기를 진행하시겠습니까?") ){
            
            var firstClass =$( ".one-place" ).first();
            $('input#tu-img-url').val(firstClass.data('img-url'));
            
            console.log($("#tour-form").serialize());

            // 우선 저장된 메모와 장소를 모두 지우기
            $.ajax({
                   url: '/today_trip/calender/deleteAllMemoAndTL',
                type: 'post',
                data: { tu_uid : global_tu_uid },
                success: function(res) {
                    console.log(res);
                },
                error: function(err) {
                
                }
            });
            
            // 그리고 update 하기
            $.ajax({
                   url: '/today_trip/calender/update',
                   type: 'post',
                   data: $("#tour-form").serialize(),
                   success: function($tu_uid){
                        var promiseArr=[];	
                   
                       $('.day').each(function(index, item){ 
                           
                           var dc = $(item).find('.day-content');
                           var mm = $(item).find('.memo');

                        // var pro1 =new Promise((resolve,reject)=>{
                        var pro1 = new Promise(function(resolve, reject) {

                            $.ajax({
                                    url: '/today_trip/calender/insertMemo',
                                    type: 'post',
                                    data: {
                                        tu_uid : global_tu_uid,
                                        tu_day : mm.data('day'),
                                        memo_contents : mm.find('textarea').val()
                                    },
                                    success: function(res) {
                                        resolve();
                                    },
                                    error: function(err) {
                                        console.log(err);
                                        reject();
                                    }
                                });
                            });
                           
                        // 메모 promise push해주기
                        promiseArr.push(pro1);
                           
                        dc.each(function(index, item) {
                            var op = $(item).find('.one-place');

                                op.each(function(index, item) {
                                    var el = $(item);
                                  
                                    // var pro2 = new Promise((resolve, reject)=>{
                                    var pro2 = new Promise(function(resolve, reject) {
                                        var postData = {
                                            place_uid: el.data('place-uid'),
                                            tu_uid: global_tu_uid,
                                            tu_day: el.closest('.day-content').data('day')
                                        };

                                        console.log(postData);

                                        // 장소 추가하기
                                        $.ajax({
                                            url: '/today_trip/calender/insertTL',
                                            type: 'post',
                                            data: postData,
                                            success: function(res) {
                                                resolve();
                                            },
                                            error: function(err) {
                                                console.log(err);
                                                reject();
                                            }
                                        
                                        }); 						 					
                                    });
                                  
                                    // 장소 promise push 해주기
                                    promiseArr.push(pro2);
                                });
                            });
                        });
                       
                        // Promise.all(promiseArr).then(values => { .catch(err=>{
                        Promise.all(promiseArr).then(function(values) {
                            console.log('100% 완료!');
                            location.href='/today_trip/calender/list'
                        }).catch(function(err) {
                            console.log(err);
                        });
                    },
                    error: function(err) {
                          
                    }
            });
            
        } else {
            alert("취소하였습니다.");
        }
    
    });
    
    // 검색할때 엔터 사용하기 이벤트
    // TODO
    
    // '시작일자/종료일자' 버튼 변경 이벤트
    $("#startDate, #endDate").on("change", function() {
            
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        
        console.log(startDate + "~" + endDate);
        
        // 날짜를 '-' 기준으로 나누기
        var arrStart = startDate.split('-'); 
        var arrEnd = endDate.split('-');
        
        // 연,월,일 배열객체 생성해서 넣기
        var sDate = new Date(arrStart[0], arrStart[1], arrStart[2]);
        var eDate = new Date(arrEnd[0], arrEnd[1], arrEnd[2]);
        
        // period (기간)
        // 여행종료날짜 - 여행시작날짜 
        var diff = eDate - sDate;
        
        // (시작일자) > (종료일자)
        // 여행 종료날짜가 여행시작날짜보다 클 경우??
        // 입력 불가!
        if( diff < 0 ){
            alert("여행 종료일자를 시작일자 이후로 입력해주세요.");
            $("#endDate").val(startDate);
            diff = 0;
        }
        
        // 현재날짜 currday
        // ms 단위로 계산되므로 day 단위로 변경하기 위함
        var currDay = 24 * 60 * 60 * 1000;
        var currMonth = currDay * 30;
        var currYear = currMonth * 12;
        
        // 여행기간(period)에 당일도 포함해야 하므로 +1 하기
        var period = parseInt(diff/currDay) + 1;
            // alert("period : " + period);
        
        // 여행기간을 입력 후 변경하는 경우
        if (periodChangeFlag == 1 ) {
            if (confirm("여행기간을 변경하시면, \n입력하신 '장소/메모'가 초기화됩니다. 그래도 진행하시겠습니까?")) {
                                        
            } else {
                return;
            }
        }
        
        // 여행기간(period) 유효성 검사 하기
        if (!isNaN(period) && period != null && period != undefined) {
                                
            $(".tour-day-box").empty();
            periodChangeFlag = 1;
            
            // 여행기간(period)만큼 '장소추가', '메모추가' 버튼과 내용 생성하기
            for (var i = 1 ; i <= period ; i++) {
                var day_wrap = $("<div>", {id: "day-"+i, class: "mb-5 day"});
                var day_head = $("<div>", {id: "day-head-"+i, no: 0, class: "day-head border-bottom mb-3 d-flex justify-content-center"});
                var day_head_h5 = $("<h5>", {text: "DAY"+i});

                // kakaoMap
                /*var day_map = $("<div>", {id: "day-map-"+i, class:"day-map mb-5", style: "width: 100%; height: 400px"});*/
                
                var day_content = $("<div>", {id: "day-content-"+i, class: "mt-5 mb-5 day-content", 'data-day':i});
                var day_memo = $("<div>", {id: "day-memo-"+i, class: "mt-5 mb-5 memo", 'data-day':i});
                
                var day_btn_box = $("<div>", {id: "day-btn-box-"+i, class: "day-btn-box d-flex justify-content-center"});
                var btn_place = $("<button>", {text: "장소 추가", id: "btn-place-"+i, type: "button", "day":i, class: "btn btn-primary btn-place m-2 w-25", "data-target": "#placeModal", "data-toggle" : "modal"});
                var btn_memo = $("<button>", {text: "메모 추가", id: "btn-memo-"+i, type: "button", "day":i, class: "btn btn-primary btn-memo m-2 w-25"});
                
                $(".tour-day-box").append(day_wrap);
                $("#day-" + i).append(day_head);
                $("#day-head-" + i).append(day_head_h5);

                // kakaoMap
                /*$("#day-" + i).append(day_map);*/
                
                $("#day-" + i).append(day_content);
                $("#day-" + i).append(day_memo);
                
                $("#day-" + i).append(day_btn_box);
                $("#day-btn-box-" + i).append(btn_place);
                $("#day-btn-box-" + i).append(btn_memo);

                // kakaoMap
               /* var container = document.getElementById('day-map-'+i);
                var options = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3
                };
                var map = new kakao.maps.Map(container, options);*/
            }
            
            // '메모 추가' 버튼 클릭 이벤트
            $(".btn-memo").on("click", function() {
            var day = $(this).attr("day");
            
            var memoTextArea = $("<textarea>", {rows: 10, cols: 100, name: "memoText", class: "w-100"});
            var memoCancelBtn = $("<button>", {id: "btn-memo-cancel-"+day, type: "button", class: "btn btn-primary", text: "메모지우기"});
            
            $("#day-memo-" + day).append(memoTextArea);
            $("#day-memo-" + day).append(memoCancelBtn);
            
            $(this).hide();
            });
            
            // 모달창에서 '선택' 버튼 클릭 이벤트
            $("#btn-place-select").on("click", function() {
                var place_uid = $("#place-uid").val();
                // alert("place_uid : " + place_uid);
            });
            
        }
    });

    // '메모 지우기' 버튼 클릭 이벤트
    $(document).on('click','.day > .memo > button',function() {
        // alert('btn!');
        $(this).closest('.memo').find('textarea').val('');
    });

    // '검색' 버튼 클릭 이벤트
    $("#btnSearch").on("click", function() {
        var keyword = $("#keyword").val();
        
        $("#placeList1").empty();
        $("#placeList2").empty();
            
        // contenttypeid : 12 (관광지)
        $.ajax({
            url:  '/today_trip/calender/place/list',               // request 보낼 서버의 경로
            type: 'get',                        // 메소드(get, post, put 등)
            data:{ 'keyword'		:  keyword  //보낼 데이터
                    ,'contentType'	:  "12"
            },
            success: function(data) {
                // 서버로부터 정상적으로 응답이 왔을 때 실행
                $("#placeList1").append(data);
            },
            error: function(request, status, error) {
                // 서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                // alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
        
        // contenttypeid : 32,39 (맛집, 숙박)
        $.ajax({
            url:  '/today_trip/calender/place/list',               // request 보낼 서버의 경로
            type: 'get',                        // 메소드(get, post, put 등)
            data:{ 'keyword'		:  keyword  //보낼 데이터 
                    ,'contentType'	:  "32, 39"
            },
            success: function(data) {
                //서버로부터 정상적으로 응답이 왔을 때 실행
                $("#placeList2").append(data);
            },
            error: function(request, status, error) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                // alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
        
    });

    // '장소 추가' 버튼 클릭 이벤트
    $(document).on('click','.btn-place',function() {
        var day = $(this).attr("day");
        $(".modal-body").attr("day", day);
        // $("#placeModal").show();	
    });

});
    



























