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

    let tl_line='';
    let tl_line_columns=[];
    let tl_line_mins_secs=[];
    let tl_line_time=0;

    let just_a_single_genre_left=0;
    let last_genre='';
    let temp_storage_for_same_genre=[];

    shuffle(input_a);
    print_debug('display_array called length of input: ' + input_a.length);

    $(tracklist_element_id).append(
	$('<div>', {class: 'row'}).append(
	    $('<div>', {class: 'col text-center', html: 'Start of tracklist #'+tracklist_id})
	)
    );

    while(input_a.length){
	if(just_a_single_genre_left)tl_line=input_a.shift();
	while(input_a.length && !just_a_single_genre_left){
	    tl_line=input_a.shift();
	    print_debug('processing line: '+tl_line);

	    tl_line_columns=tl_line.split(";");
	    if(tl_line_columns.length!=3){
	        print_debug('error chopping up line into three parts: '+tl_line);
	        continue;
	    }
	
	    tl_line_mins_secs=tl_line_columns[2].split(":");
	    if(tl_line_mins_secs.length!=2){
	        print_debug('error chopping up the time part of the line into two parts: '+tl_line);
	        continue;
	    }
	
	    print_debug('testing if '+tl_line_columns[1]+' is equals to '+last_genre);
	    if(tl_line_columns[1]===last_genre){
		temp_storage_for_same_genre.push(tl_line);
		if(!input_a.length)just_a_single_genre_left=1;
		print_debug('putting '+tl_line+' to the back of the list as its genre matches previous: '+last_genre+' just_a_single_genre_left: '+just_a_single_genre_left+' temp_storage_for_same_genre: '+temp_storage_for_same_genre)
		continue;
	    }
	
	    last_genre=tl_line_columns[1];	
	    break;
	}
	input_a.push(...temp_storage_for_same_genre);
	temp_storage_for_same_genre=[];
	
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
	if(tracklist_actual_length>tracklist_length && tracklist_id<21){
	    $(tracklist_element_id).append(
		$('<div>', {class: 'row'}).append(
		    $('<div>', {class: 'col text-center', html: 'End of tracklist #'+tracklist_id+', total length: '+secs2str(tracklist_actual_length)})
		)
	    );
            tracklist_actual_length=0;
	    tracklist_id++;
	    let div_html='Start of tracklist #'+tracklist_id;
	    if(tracklist_id>20)div_html='Leftover tracks'
	    $(tracklist_element_id).append(
		$('<div>', {class: 'row'}).append(
		    $('<div>', {class: 'col text-center', html: div_html})
		)
	    );
	}
    }
    let div_html='End of tracklist #'+tracklist_id+', total length: '+secs2str(tracklist_actual_length);
    if(tracklist_id>20)div_html='End of leftover tracks';
    $(tracklist_element_id).append(
	$('<div>', {class: 'row'}).append(
	    $('<div>', {class: 'col text-center', html: div_html})
	)
    );
}

$(document).ready(function(){
    generate_and_display_tracklist();
})
