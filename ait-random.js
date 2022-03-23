const ait_tracklist="ait-tracklist.csv";
//29min 59secs in secs
const tracklist_length=1799;

const _global_debug=1;

function print_debug(instr){
	$('#rawdata').append(instr+"<br/>\n");
	console.log(instr+"\n");
}

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

function fill_array(){
    var output_a=[];
    $.ajax({
        url: ait_tracklist,
        success: function(data){
	    output_a.push(...data.split("\n"));
	    if(_global_debug)print_debug('length of output_a after pushing ajax data: '+output_a.length);
        },
        error: function(){
            alert("There was an error opening the tracklist.");
        },
	async: false
    });
    if(!output_a.length)output_a=["a1;a2;10:3", "b1;b2;11:3", "c1;c2;12:3", "d1;d2;13:3", "e1;e2;14:3", "f1;f2;15:3"];
    if(_global_debug)print_debug('first line fetched: ' + output_a[0]);
    return output_a;
}

function display_array(input_a, time_limit){
    let tracklist_actual_length=0;
    if(_global_debug)print_debug('display_array called length of input: ' + input_a.length);
    for(let i=0; i<input_a.length; i++){
	tl_line=input_a[i];
	print_debug('processing line: '+i+': '+tl_line);
	tl_line_columns=tl_line.split(";");
	tl_line_mins_secs=tl_line_columns[2].split(":");
	print_debug('tl_line_mins: '+tl_line_mins_secs[0]+' tl_line_secs: '+tl_line_mins_secs[1]);
	tl_line_time=Number(tl_line_mins_secs[0])*60+Number(tl_line_mins_secs[1]);
	tracklist_actual_length+=tl_line_time;
	$('#tracklist').append('\
        <div class="row">\
            <div class="col">' +
                tl_line_columns[0] + '\
            </div>\
            <div class="col">' +
                tl_line_columns[1] + '\
            </div>\
            <div class="col">' +
                tl_line_columns[2] + '\
            </div>\
        </div>\
	');
	print_debug('tracklist_actual_length: '+tracklist_actual_length+' tracklist_length: '+tracklist_length);
	if(tracklist_actual_length>tracklist_length)break;
    }
    $('#rawdata').append(input_a[0]);
}

function _main_(){
    var ait_tracklist_lines=[];

    ait_tracklist_lines=fill_array();
    if(_global_debug)print_debug('length of tracklist after fill_array(): ' + ait_tracklist_lines.length);
    shuffle(ait_tracklist_lines);
    display_array(ait_tracklist_lines, tracklist_length);
}

$(document).ready(function(){
    _main_();
})
