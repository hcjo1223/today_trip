$(document).ready(function(){
	var cnt=30;
	
	console.log(startPage);	

	$('#pagination-demo').twbsPagination({
        totalPages: totalCount/30,
        visiblePages: 10,
		startPage:parseInt(startPage),
		initiateStartPageClick: false,
        onPageClick: function (event, page) {
		 
			var start = ((page-1)*cnt)+1;
		   	location.href="/today_trip/calender/list?start=" + startPage; 	  
           
        }
    });
})