var blankPos = [3,3];
var spaces = [];
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
			"left": x
		});
		if(i<3){
			i++;
		}else{
			i=0;	
			j++;
		}
		$(this).css({
			"background-position-x":0-x,
			"background-position-y":+0-y
		});
		//$(this).css();	
		//console.log(getSpace($(this)));
	});	
	defSpaces();	
	$("#shufflebutton").on("click",shuffle);	
	setMovable();
}

function defSpaces(){
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			spaces.push([i,j]);
		}
	}
}

function randSwap(){
	var a=[];
	$(".movablepiece").each(function(){
		a.push($(this));
	});
	var i = Math.floor(Math.random()*a.length);
	var newPos = blankPos;
	blankPos = getSpace(a[i]);
	move(a[i],newPos);		
}

function shuffle(){
	var x = Math.floor(Math.random()*128);
	for(var i=16;i<x;i++){
		randSwap();
	}
	//randSwap();
}

function setMovable(){
	$(".puzzlepiece").each(function(){
		$(this).off();
		if($(this).hasClass("movablepiece")){
			$(this).removeClass("movablepiece");		
		}
		if(isBeside(getSpace($(this)),blankPos)){
			$(this).addClass("movablepiece");
			$(this).on("click",movePiece);
		}		
	})
}

function getSpace(el){
	var p = el.position();
	var x = Math.ceil((p.left-base.left)/98);
	var y = Math.ceil((p.top-base.top)/98);	
	return [x,y];
}

function isBeside(a,b){
	if(a[0]===b[0]){
		return a[1]+1===b[1] || a[1]-1===b[1];
	}else if(a[1]===b[1]){
		return a[0]+1===b[0] || a[0]-1===b[0];
	}else{
		return false;
	}
}

function movePiece(){
	var newPos = blankPos;
	blankPos = getSpace($(this));
	move($(this),newPos);
	//setMovable();
}

function move(a,space){
	if(a.hasClass("movablepiece")){
		var x = base.left+(98*space[0]);
		var y = base.top+(98*space[1]);		
		a.animate({
			top: y,
			left: x
		},"slow");
		/* a.css({
			"top": y,
			"left": x
		}); */
		setMovable();
	}	
}

$(document).ready(main);