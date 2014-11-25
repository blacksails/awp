/*global localStorage: false, console: false, $: false */
'use strict';

var difficulty;
if (localStorage.getItem("score") === null) {
	localStorage.setItem("score", 0);
}
if (localStorage.getItem("highscore") === null) {
	localStorage.setItem("highscore", 0);
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function calculateDifficulty(difficulty,diff) {
	var seconds = difficulty * 2 * diff; 	
	countdown(0,seconds);
}

function setHighscore(secondsLeft) {
	
	var score = 0;
	if (difficulty = 1) {
		score = secondsLeft * 5;
	}
	if (difficulty = 2) {
		score = secondsLeft * 3;
	}
	if (difficulty = 3) {
		score = secondsLeft * 1.5;
	}
	score = score * 13133;
	if(parseInt(localStorage.getItem("highscore"))<score) {
		localStorage.setItem("highscore",score);
		alert("You got a new high score!");
		document.getElementById('highscore').innerHTML = localStorage.getItem("highscore");
	}
}
function startGame() {
	difficulty = document.getElementById('difficulty').value;
	var diff = document.getElementById('select').value;
	calculateDifficulty(difficulty,diff);
	var board = document.getElementById('theBoard');
	while (board.firstChild) {
    	board.removeChild(board.firstChild);
	}
	var arr = [];
	for (var i = 1; i<=difficulty; i++) {
		arr.push(i);
	}
	arr = shuffle(arr);
	
	for (var j = 0; j<arr.length; j++) {
		addNumber(arr[j]);	
	}
	$("#theBoard").children().each(function () {
		$(this).hide().fadeIn("slow");
	});
			
}
		

// Adds a new number container
function addNumber(theNumber) {
	
	var container = document.createElement("div");
	container.className = "numberContainer";
	container.setAttribute("id", "nc"+theNumber);
	$(container).droppable({
		
		   drop: function(event, ui) {
				var newContainer = $(this);
				var oldNumber = $(this).children(":first");
				oldNumber.remove();
				
				var newNumber = ui.draggable;
				newNumber = newNumber[0];
				
				var oldContainer =ui.draggable.parent();
				
				oldContainer.empty();
				oldNumber.draggable({
					revert : function(event, ui) {
						return !event;
					}
				});
				oldNumber.css("background-color","#003366");
				oldContainer.append(oldNumber);
				
		
				
				newContainer.append(newNumber);	
				
				newContainer.children(":first").removeAttr("style");
				newContainer.children(":first").css("background-color","#572B30");
				newContainer.children(":first").css("position","relative");
			
				isWinner();
			
		
		
		   }
	
	});
	var number = document.createElement("div");
	number.className = "numberBox";
	number.setAttribute("id", "nb"+theNumber);
	$(number).draggable({
		revert : function(event, ui) {
			return !event;
		}
	});
	
    var text = document.createTextNode(" " + theNumber + " ");
    number.appendChild(text);
	container.appendChild(number);
    $("#theBoard").append(container);
	
}


function isWinner() {
	var board = document.getElementById('theBoard');
	var winnerString = ""
	var currentString = "";

	for (var i = 1; i<=difficulty; i++) {
		winnerString += "nb"+i+",";
	}
	for (var i = 0; i<board.childNodes.length; i++) {

			currentString += board.childNodes[i].childNodes[0].id + ",";
	
	}
	if (winnerString == currentString) {
		localStorage.setItem ("score", (parseInt (localStorage.getItem("score"))+1)+"");
		setHighscore(seconds);
		clearInterval(interval);
		alert("HURRAY! Your the winner of internet sorting game");	
		document.getElementById('timesPlayed').innerHTML = localStorage.getItem("score");
		startGame();
	}	
}

 var interval;
 var seconds = 100000;
function countdown(minutes, second) {
		seconds = second;
		clearInterval(interval);
        interval = setInterval(function() {
            var el = document.getElementById('countdown');
            if (seconds == 0) {
                if (minutes == 0) {
					alert("You losted!");     
					startGame();             
                    clearInterval(interval);
                    return;
                } else {
                    minutes--;
                    seconds = 60;
                }
            }
            if (minutes > 0) {
                var minute_text = minutes + (minutes > 1 ? ' minutes' : ' minute');
            } else {
                var minute_text = '';
            }
            var second_text = seconds > 1 ? 'seconds' : 'second';
            el.innerHTML = minute_text + ' ' + seconds + ' ' + second_text + ' remaining';
            seconds--;
        }, 1000);
    }


