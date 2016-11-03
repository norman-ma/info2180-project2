/**
* Michael-Anthony Norman 620078776
* Extra Features added: Animations & Transitions
*/
var blankPos = [3,3];
var base;


function main(){
	var i = 0;
	var j = 0;
	var x = 0;
	var y = 0;
	$("#puzzlearea>div").each(function(){
		$(this).addClass("puzzlepiece");
		base = $("#puzzlearea>div:first-child").position();
		x = base.left+(98*i);
		y = base.top+(98*j);
		
		$(this).css({
			"top": y,
			"left": x,
			"background-position-x":-x,
			"background-position-y":-y
		});
		
		if(i<3){
			i++;
		}else{
			i=0;	
			j++;
		}	
	});
	
	$("#shufflebutton").on("click",shuffle);	
	setMovable();
}

function randSwap(){
	var a=[];
	$(".movablepiece").each(function(){
		a.push($(this));
	});
	var i = Math.floor(Math.random()*a.length);
	var shift = [blankPos[0]-getSpace(a[i])[0],blankPos[1]-getSpace(a[i])[1]];
	blankPos = getSpace(a[i]);	
	move(a[i],blankPos,shift);	
	setMovable();
}

function shuffle(){
	var x = Math.floor(Math.random()*96);
	for(var i=1;i<x;i++){
		randSwap();
	}
	return x;
}

function setMovable(){
	$(".movablepiece").each(function(){
		$(this).removeClass("movablepiece");
	});
	$(".puzzlepiece").each(function(){		
		$(this).off();
		if(isAdjacent(getSpace($(this)),blankPos)){
			$(this).addClass("movablepiece");
			$(this).on("click",movePiece);
		}		
	});
}

function getSpace(el){
	var p = el.position();
	var x = Math.ceil((p.left-base.left)/98);
	var y = Math.ceil((p.top-base.top)/98);	
	return [x,y];
}

function isAdjacent(a,b){
	if(a[0]===b[0]){
		return a[1]+1===b[1] || a[1]-1===b[1];
	}else if(a[1]===b[1]){
		return a[0]+1===b[0] || a[0]-1===b[0];
	}else{
		return false;
	}
}

function movePiece(){
	var shift = [blankPos[0]-getSpace($(this))[0],blankPos[1]-getSpace($(this))[1]];	
	if(shift.toString()==="0,1" || shift.toString()==="0,-1" || shift.toString()==="1,0" || shift.toString()==="-1,0"){
		blankPos = getSpace($(this));
		move($(this),blankPos,shift);
	}else{
		setMovable();
	}
}

function move(a,current,shift){
	var x = base.left+(98*(current[0]+shift[0]));
	var y = base.top+(98*(current[1]+shift[1]));
	
	a.animate({
		"top": y,
		"left": x
	},400); 
	a.css({
		"top": y,
		"left": x
	});
	a.promise().always(setMovable);
}

$(document).ready(main);