$(function(){

    // url에서 추출해온 tu_uid
    var global_tu_uid = getParam('tu_uid');

    var maxDay=0;

	//[step 1] 장소 가지고 오기
	$.ajax({
		url: '/today_trip/calender/listTL',
		type: 'get',
		data: { tu_uid : global_tu_uid },
		success: function(list) {
			var dayArr=[0];

			$.each(list, function(index, item) {
				dayArr.push(item.tu_day);
			});

			maxDay = Math.max.apply(null, dayArr);
			
			// let startDate = new Date('2021-04-16 00:00:00.0');
			// var startMill = startDate.getTime(); 
			// console.log(maxDay);
			// var period = 3600*24*maxDay;
			// var endMill = startMill+period;
			
			// var endDate = Date(endMill);
			// console.log(endDate);
			
			// [step 1] maxDay만큼 부모 UI만들기
			for (var i=0; i < maxDay; i++) {
				var index = i+1;
				
				var html = '<div id="day-'+index+'" class="mb-5 day" data-day="'+index+'">'+
						     	'<div id="day-head-'+index+'" no="2" class="day-head border-bottom mb-3 d-flex justify-content-center">'+
						     		'<h5>DAY '+index+'</h5>'+
						     	'</div>'+
						     	'<div id="day-content-'+index+'" class="mt-5 mb-5 day-content" data-day="'+index+'">'+
											
						     	'</div>'+
						     	'<div id="day-memo-'+index+'" class="mt-5 mb-5 memo" data-day="'+index+'">'+
						     				
						     	'</div>'+
						    '</div>'
				
				$('#place-memo-list').append(html);
			}

			// [step2] 메모 가지고 오기
			insertmemo(global_tu_uid);
			
			// [step 2] 만들어진 부모에 장소 넣기
			$.each(list, function(index, item){
				console.log(item);
				
				var $day = item.tu_day;
				$('.day-content[data-day="'+$day+'"]').append('<div>' + item.title + '</div>');
			});
						
		},
		error: function(err) {
		
		}
	});
	
	// [step3] 태그가지고 오기 ajax 이용!
	// TODO
	
	// '수정하기' 버튼 클릭 이벤트
	$('#edit-btn').on('click',function() {
		var tu_uid = $(this).data('tu-uid');
		location.href = '/today_trip/calender/register/edit?tu_uid=' + tu_uid;
	});

	// '삭제하기' 버튼 클릭 이벤트
	$('#delete-btn').on('click', function() {
		var tu_uid = $(this).data('tu_uid');

		if (confirm("정말로 글올리기를 진행하시겠습니까?")) {
			$.ajax({
				url : '/today_trip/calender/register/delete',
				type: 'post',
				data: { 
					tu_uid: global_tu_uid
				},
				success: function(res) {
					if (res == 'OK') {
						alert('해당 글이 삭제되었습니다.');
						location.href = '/today_trip/calender/list';
					}
				},
				error: function(res) {
					console.log(res);
				}
			})
		}
	});

	// 좋아요 버튼 이벤트
	$('#like-btn').on('click',function() {
		var isActive = $(this).hasClass('active');
		if(isActive){
			// ajax -> 내가 한 좋아요 해제 / #like-btn-count -1 처리
			$('#like-btn').attr('class','far fa-heart inactive');
			$.ajax({
				url:'/today_trip/calender/delTourLike',
				type:'get',
				data:{
					tu_uid:global_tu_uid
				},
				success:function(res){
					alert(res);
				},
				error:function(err){
					
				}
			});
		}else {
			// ajax -> 내가 한 좋아요 추가 / #like-btn-count +1 처리
			$('#like-btn').attr('class','fas fa-heart active');
			$.ajax({
				url:'/today_trip/calender/addTourLike',
				type:'get',
				data:{
					tu_uid:global_tu_uid
				},
				success:function(res){
					alert(res);
				},
				error:function(err){
					
				}
			});
			
		}
	});

});

// [step2] 메모 가지고 오기
// insertmemo(global_tu_uid); place-memo-list ㅇㅏ래에
function insertmemo(global_tu_uid){
	$.ajax({
		url: '/today_trip/calender/listMemo',
		type: 'get',
		data: { tu_uid : global_tu_uid },
		success: function(list) {
		
			// [step 3] 만들어진 부모에 메모 넣기	
			$.each(list, function(index, item){
				var $day = item.tu_day;
				$('.memo[data-day="'+$day+'"]').append(item.memo_contents);
			});
		},
		error: function(err) {
		
		}
	});
}