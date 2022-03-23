const ait_tracklist="ait-tracklist.csv";
//29min 59secs in secs
const tracklist_length=1799;

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

function fill_array(output_a){
    $.ajax({
        url: ait_tracklist,
        success: function(data){
	    output_a=data.split("\n");
        },
        error: function(){
            alert("There was an error opening the tracklist.");
        }
    });
}

function display_array(input_a, time_limit){
    let tracklist_actual_length=0;
    for(const tl_line of input_a){
	tl_line_columns=tl_line.split(";");
	tl_line_mins_secs=tl_line_columns[2].split(":");
	tl_line_time=tl_line_mins_secs[0]*60+tl_line_mins_secs[1];
	tracklist_actual_length+=tl_line_time;
	$('#tracklist').append(tl_line_columns[0] + "<br>\n");
        //<div class="row">
        //    <div class="col">' +
        //        tl_line_columns[0] + '
        //    </div>
        //    <div class="col">' +
        //        tl_line_columns[1] + '
        //    </div>
        //    <div class="col">' +
        //        tl_line_columns[2] + '
        //    </div>
        //</div>
	//');
    }
    $('#rawdata').text(input_a[0]);
}

function _main_(){
    var ait_tracklist_lines=[];

    fill_array(ait_tracklist_lines);
    shuffle(ait_tracklist_lines);
    display_array(ait_tracklist_lines, tracklist_length);
}

$(document).ready(function(){
    _main_();
})
