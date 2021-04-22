// '장소 추가' 버튼 클릭 후 
// 장소 검색을 해서 장소를 선택했을때
// 선택한 장소가 추가되어야 한다.
// XX jsp에서 구현
$(function() {

   var contentType = '<c:out value="${contentType}" />';
   // alert("cotentType : " + cotentType);
    
   // 관광지 리스트에서 '관광지' 선택 버튼 클릭 이벤트
   $("." + contentType).on("click", function() {

      // console.log("123123123");
      var title = $(this).attr("title");
      var uid = $(this).attr("uid");
      
      console.log("title : " + title);
      console.log("uid : " + uid);
      
      var day = $(".modal-body").attr("day");
      var no = $("#day-head-"+day).attr("no");
      $("#day-head-"+day).attr("no", ++no);

      // var placeDiv = $("<div>", {class: "mb-4"});
      // var placeUid = $("<input>", {type: "hidden", name: "placeUid", value: uid});
      // var placeIndex = $("<span>", {class: "mr-5", text: no});
      // var placeTitle = $("<span>", {class: "", text: title});

      // $("#day-content-" + day).append(placeUid);
      // $("#day-content-" + day).append(placeIndex);
      // $("#day-content-" + day).append(placeTitle);
      // $("#day-content-" + day).append(placeDiv);
      
      var htmlPlace = '<div class="one-place" data-no="'+no+'" data-place-uid="'+uid+'">'+
                        '<input type="hidden" name="placeUid" value="0">'+
                        '<span class="mr-5">'+no+'</span>'+
                        '<span>'+title+'</span>'+
                        '<div class="mb-4"></div>'+
                     '</div>'

      $("#day-content-"+day).append(htmlPlace);
      $("#btnModalCancel").trigger("click");
      $(".modal-backdrop").removeClass("show");

   });
   
});