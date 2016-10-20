function main(){
	setup();
}

function setup(){
	var i = 0;
	var j = 0;
	var z = $("#puzzlearea>div:first-child").position();
	var x = 0;
	var y = 0;
	$("#puzzlearea>div").each(function(){
		$(this).addClass("puzzlepiece");
		x = z.left+(98*i);
		y = z.top+(98*j);		
		$(this).css("top",+y);
		$(this).css("left",+x);
		if(i<3){
			i++;
		}else{
			i=0;
			j++;
		}

		$(this).css("background-position-x",+0-x);
		$(this).css("background-position-y",+0-y);
		
	});	
	
}

$(document).ready(main);