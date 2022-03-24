const ait_tracklist="ait-tracklist.csv";
//29min 59secs in secs
const tracklist_length=1799;
const tracklist_element_id='#tracklist';

const _global_debug=1;

function print_debug(instr){
	if(!_global_debug)return;
	$('#rawdata').append(instr+"<br/>\n");
	console.log(instr+"\n");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function secs2str(secs){
    let r_secs=Number(secs)%60;
    return ((Number(secs)-Number(r_secs))/60)+":"+r_secs;
}

function generate_and_display_tracklist(){
    $.ajax({
        url: ait_tracklist,
        success: function(data){
	    display_array(data.split("\n"));
        },
        error: function(){
            display_array(["a10;a2;1:3", "b10;b2;1:3", "c10;c2;1:3", "d10;d2;1:3", "e10;e2;1:3", "f10;f2;1:3",
                           "a11;a2;1:3", "b11;b2;1:3", "c11;c2;1:3", "d11;d2;1:3", "e11;e2;1:3", "f11;f2;1:3",
                           "a12;a2;1:3", "b12;b2;1:3", "c12;c2;1:3", "d12;d2;1:3", "e12;e2;1:3", "f12;f2;1:3",
                           "a13;a2;1:3", "b13;b2;1:3", "c13;c2;1:3", "d13;d2;1:3", "e13;e2;1:3", "f13;f2;1:3",
                           "a14;a2;1:3", "b14;b2;1:3", "c14;c2;1:3", "d14;d2;1:3", "e14;e2;1:3", "f14;f2;1:3",
                           "a15;a2;1:3", "b15;b2;1:3", "c15;c2;1:3", "d15;d2;1:3", "e15;e2;1:3", "f15;f2;1:3",
                           "a16;a2;1:3", "b16;b2;1:3", "c16;c2;1:3", "d16;d2;1:3", "e16;e2;1:3", "f16;f2;1:3",
                           "a17;a2;1:3", "b17;b2;1:3", "c17;c2;1:3", "d17;d2;1:3", "e17;e2;1:3", "f17;f2;1:3",
                           "a18;a2;1:3", "b18;b2;1:3", "c18;c2;1:3", "d18;d2;1:3", "e18;e2;1:3", "f18;f2;1:3",
                           "a19;a2;1:3", "b19;b2;1:3", "c19;c2;1:3", "d19;d2;1:3", "e19;e2;1:3", "f19;f2;1:3"]);
            alert("There was an error opening the tracklist.");
        },
    });
}

function display_array(input_a){
    let tracklist_actual_length=0;
    let tracklist_id=1;
    shuffle(input_a);
    print_debug('display_array called length of input: ' + input_a.length);
    $(tracklist_element_id).append(
	$('<div>', {class: 'row'}).append(
	    $('<div>', {class: 'col text-center', html: 'Start of tracklist #'+tracklist_id})
	)
    );
    for(let i=0; i<input_a.length; i++){
	tl_line=input_a[i];
	print_debug('processing line: '+i+': '+tl_line);
	tl_line_columns=tl_line.split(";");
	tl_line_mins_secs=tl_line_columns[2].split(":");
	//print_debug('tl_line_mins: '+tl_line_mins_secs[0]+' tl_line_secs: '+tl_line_mins_secs[1]);
	tl_line_time=Number(tl_line_mins_secs[0])*60+Number(tl_line_mins_secs[1]);
	tracklist_actual_length+=tl_line_time;
	$(tracklist_element_id).append(
	    $('<div>', {class: 'row'}).append(
	        $('<div>', {class: 'col', html: tl_line_columns[0]}),
	        $('<div>', {class: 'col', html: tl_line_columns[1]}),
	        $('<div>', {class: 'col', html: tl_line_columns[2]})
	    )
	);
	//print_debug('tracklist_actual_length: '+tracklist_actual_length+' tracklist_length: '+tracklist_length);
	if(tracklist_actual_length>tracklist_length){
	    $(tracklist_element_id).append(
		$('<div>', {class: 'row'}).append(
		    $('<div>', {class: 'col text-center', html: 'End of tracklist #'+tracklist_id+', total length: '+secs2str(tracklist_actual_length)})
		)
	    );
            tracklist_actual_length=0;
	    tracklist_id++;
	    $(tracklist_element_id).append(
		$('<div>', {class: 'row'}).append(
		    $('<div>', {class: 'col text-center', html: 'Start of tracklist #'+tracklist_id})
		)
	    );
	}
    }
    $(tracklist_element_id).append(
	$('<div>', {class: 'row'}).append(
	    $('<div>', {class: 'col text-center', html: 'End of tracklist #'+tracklist_id+', total length: '+secs2str(tracklist_actual_length)})
	)
    );
}

$(document).ready(function(){
    generate_and_display_tracklist();
})
