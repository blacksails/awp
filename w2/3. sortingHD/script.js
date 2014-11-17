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
	diff = document.getElementById('select').value;
	var score = 0;
	if (diff = 1) {
		score = secondsLeft * 5;
	}
	if (diff = 2) {
		score = secondsLeft * 3;
	}
	if (diff = 1) {
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
}

// Adds a new number container
function addNumber(theNumber) {
	var container = document.createElement("div");
	container.className = "numberContainer";
	container.setAttribute("ondrop", "drop(event)");
	container.setAttribute("id", "nc"+theNumber);
	container.setAttribute("ondragover", "allowDrop(event)");
	var number = document.createElement("div");
	number.className = "numberBox";
	number.setAttribute("draggable", "true");
	number.setAttribute("id", "nb"+theNumber);
	number.setAttribute("ondragstart", "drag(event)");

    var text = document.createTextNode(" " + theNumber + " ");
    number.appendChild(text);
	container.appendChild(number);
    document.getElementById("theBoard").appendChild(container);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function isWinner() {
	var board = document.getElementById('theBoard');
	var winnerString = ""
	var currentString = "";

	for (var i = 1; i<=difficulty; i++) {
		winnerString += "nb"+i+",";
	}
	for (var i = 0; i<board.childNodes.length; i++) {
		
		if (board.childNodes[i].className == "numberContainer") {
			currentString += board.childNodes[i].childNodes[0].id + ",";
		}
	}
	console.log(difficulty + " qqq " + winnerString + " ss " + currentString);
	if (winnerString == currentString) {
		localStorage.setItem ("score", (parseInt (localStorage.getItem("score"))+1)+"");
		setHighscore(seconds);
		clearInterval(interval);
		alert("HURRAY! Your the winner of internet sorting game");	
		document.getElementById('timesPlayed').innerHTML = localStorage.getItem("score");
		startGame();
	}	
}

function drop(ev) {
	var droppedOn = ev.toElement;
	if(droppedOn.className == "numberBox") {
		droppedOn = droppedOn.parentNode;	
	}
	var droppedOnsFather = droppedOn.parentNode;
	var oldNumber = droppedOn.firstChild;
	
	droppedOn.removeChild(droppedOn.firstChild);
	
	
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
	if(document.getElementById(data)!=null) {
		if(ev.target.className == "numberBox") {
			droppedOn.appendChild(document.getElementById(data));		
		} else {
			ev.target.appendChild(document.getElementById(data));
		}
	}
	
	
	var oldContainer = findEmptyContainer();
	oldContainer.appendChild(oldNumber);
	
	isWinner();
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

function findEmptyContainer() {
	var board = document.getElementById("theBoard");
	var i = 0;
	var found = false;
	
	while (i<board.childNodes.length && !found) {
		
		if (board.childNodes[i].childNodes.length == 0 && board.childNodes[i].className == "numberContainer"){
			
			found = true;	
		} else {
			i++;
		}
	}
	if (found){
		return board.childNodes[i];	
	} else {
		return null;
	}
}
