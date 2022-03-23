const ait-tracklist="ait-tracklist.csv";

var ait-tracklist-lines=array();

function shuffle(array){
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while(currentIndex != 0){
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}


$(document).ready(function(){
    $.ajax({
        url: ait-tracklist,
        success: function(data){
            //$('#rawdata').text(data);
	    ait-tracklist-lines=data.split("\n");
	    shuffle(ait-tracklist-lines);
            $('#rawdata').text(ait-tracklist-lines[0]);
        },
        error: function(){
            alert("There was an error opening the tracklist.");
        }
    });
})
