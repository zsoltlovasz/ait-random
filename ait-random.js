$(document).ready(function(){
    $.ajax({
        url: "ait-tracklist.csv",
        success: function(data){
            $('#rawdata').text(data);
        },
        error: function(){
            alert("There was an error.");
        }
    });
})
