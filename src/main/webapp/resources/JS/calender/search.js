

function Search() {
    var keyword = $("#keyword").val();

    $("#tourList").html('');

    $.ajax({
        url: '/today_trip/calender/list/search',
        type: 'get',
        data: { 'keyword': encodeURI(keyword) },
        success: function(data) {
            $("#tourList").append(data);
        },
        error: function(request, status, error) {

        }
    });
}