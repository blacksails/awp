var newGame;

function Block(width, height, x, y, isWall, isWinner, isPlayer, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.isWall = isWall;
    this.isWinner = isWinner;
    this.isPlayer = isPlayer;
    this.color = color;
}

function Game(initialBoard) {
    this.board = initialBoard
	this.selected = initialBoard[0];
    this.moves = 0;
	document.getElementById('moves').innerHTML = 'Moves: 0';
    this.record = 0;
    this.moveBlock = function (direction, block) {
        if (direction == "right") {
            if (this.checkCollision(block, (block.x + 1), block.y)) {
                this.updateBoard(block, (block.x + 1), block.y)
            }
        }
        if (direction == "left") {
            if (this.checkCollision(block, (block.x - 1), block.y)) {
                this.updateBoard(block, (block.x - 1), block.y)
            }
        }
        if (direction == "down") {
            if (this.checkCollision(block, block.x, (block.y + 1))) {
                this.updateBoard(block, block.x, (block.y + 1))
            }
        }
        if (direction == "up") {
            if (this.checkCollision(block, block.x, (block.y - 1))) {
                this.updateBoard(block, block.x, (block.y - 1))
            }
        }

        this.draw();
    };
    this.checkCollision = function (block, x, y) {
        var granted = true;
        var newBlock = new Block(block.width, block.height, x, y, block.isWall, block.isWinner, block.isPlayer, block.color);
		this.isWinning(newBlock);
        for (var i = 0; i < this.board.length; i++) {
            var currentBlock = this.board[i];
			if(currentBlock === block){
				
			}else{			
				
				if (this.isTouching(newBlock, currentBlock)) {
					granted = false;
				}
			}
			
        }
        
        if (granted) {
            this.moves++;
        }

        return granted;
		
    };

    this.isTouching = function (newBlock, block) { 		
		var granted = true;
		if(block.x + block.width <= newBlock.x){

			granted = false;	
		}
		if(block.y + block.height <= newBlock.y){
			granted = false;
		}
		if(block.x >= newBlock.x + newBlock.width){
			granted = false;
		}
		if(block.y >= newBlock.y + newBlock.height){
			granted = false;	
		}	
		return granted;		
    }

    this.isTouchingStrict = function (block) {
        var goal = false;
		var count = 0;
        for (var i = 0; i < this.board.length; i++) {
           	if (this.board[i].isWinner && this.isTouching(block,this.board[i])) {
				goal = true;	
			}
        }
		if(goal) {
			for (var i = 0; i < this.board.length; i++){	
				if(this.board[i].isWinner == false && this.isTouching(this.board[i], block)){
					goal = false
					count++;
				}
			}
			
		} 
		if(count == 1){
			goal = true;	
		}
		return goal;
    }

    this.updateScores = function () {
        var record = document.getElementById("record");
        record.innerHTML = "Record: " + this.moves;
        alert("Congratulations, you are the klotski champion of the internet");
		startGame();
    }

    this.isWinning = function (block) {
        var wonned = false;
        if (this.isTouchingStrict(block)) {
			wonned = true;
        }
		if(wonned && block.isPlayer){
			this.updateScores();
		}
        return wonned;
    }

    this.draw = function () {
        var moves = document.getElementById("moves");
        moves.innerHTML = "Moves: " + this.moves;
        var gameboard = document.getElementById("theBoard");
        while (gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }
        for (var i = 0; i<this.board.length; i++) {
			var b = this.board[i];
	
            var blockdiv = document.createElement("DIV");
            blockdiv.className = "block";

            if (b.color == "green"){
                blockdiv.className = blockdiv.className + " green-block";
			}
            if (b.color == "yellow")
                blockdiv.className = blockdiv.className + " yellow-block";
            if (b.color == "red")
                blockdiv.className = blockdiv.className + " red-block";
            if (b.color == "purple")
                blockdiv.className = blockdiv.className + " purple-block";

            if (b.isWinner)
                blockdiv.className = blockdiv.className + " winnerblock";
            if (b.isPlayer)
                blockdiv.className = blockdiv.className + " orange-block player-block";
            if (b.isWall && b.width == 1 && b.height == 1)
                blockdiv.className = blockdiv.className + " bottomwall";

            switch (b.width) {
                case 1:
                    blockdiv.className = blockdiv.className + " onewidth";
                    break;
                case 2:
                    blockdiv.className = blockdiv.className + " twowidth";
                    break;
                case 4:
                    blockdiv.className = blockdiv.className + " topwall";
            }

            switch (b.height) {
                case 1:
                    blockdiv.className = blockdiv.className + " oneheight";
                    break;
                case 2:
                    blockdiv.className = blockdiv.className + " twoheight";
                    break;
                case 7:
                    blockdiv.className = blockdiv.className + " sidewall";
                    break;
            }


            switch (b.x) {
                case 0:
                    blockdiv.className = blockdiv.className + " col1";
                    break;
                case 1:
                    blockdiv.className = blockdiv.className + " col2";
                    break;
                case 2:
                    blockdiv.className = blockdiv.className + " col3";
                    break;
                case 3:
                    blockdiv.className = blockdiv.className + " col4";
                    break;
                case 4:
                    blockdiv.className = blockdiv.className + " col5";
                    break;
                case 5:
                    blockdiv.className = blockdiv.className + " col6";
                    break;
            }

            switch (b.y) {
                case 0:
                    blockdiv.className = blockdiv.className + " row1";
                    break;
                case 1:
                    blockdiv.className = blockdiv.className + " row2";
                    break;
                case 2:
                    blockdiv.className = blockdiv.className + " row3";
                    break;
                case 3:
                    blockdiv.className = blockdiv.className + " row4";
                    break;
                case 4:
                    blockdiv.className = blockdiv.className + " row5";
                    break;
                case 5:
                    blockdiv.className = blockdiv.className + " row6";
                    break;
                case 6:
                    blockdiv.className = blockdiv.className + " row7";
                    break;
            }
			blockdiv.id = i;
			if (blockdiv.addEventListener) {  
			  blockdiv.addEventListener("click", selectTheBlock, false);
			} else {
			  if (blockdiv.attachEvent) {  
				blockdiv.attachEvent("click", selectTheBlock);
			  }
			}
            gameboard.appendChild(blockdiv);
        }
    };
    this.updateBoard = function (block, x, y) {
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i] === block) {
                block.x = x;
                block.y = y;
                this.board[i] = block

            }
        }
    }
	this.findBlockFromId = function (id){
		return this.board[id];
	}
}


function selectTheBlock(){
	var blocke = newGame.findBlockFromId(this.id);
	if(blocke.isWall == false){
		newGame.selected = blocke;
	}
}


function startGame() {
    var initBoard = [];
    initBoard.push(new Block(2, 2, 2, 1, false, false, true, "clown"))

    initBoard.push(new Block(1, 2, 1, 1, false, false, false, "red"));
    initBoard.push(new Block(1, 2, 1, 3, false, false, false, "red"));
    initBoard.push(new Block(1, 2, 4, 1, false, false, false, "red"));
    initBoard.push(new Block(1, 2, 4, 3, false, false, false, "red"));
    initBoard.push(new Block(2, 1, 2, 3, false, false, false, "yellow"));
    initBoard.push(new Block(1, 1, 2, 4, false, false, false, "green"));
    initBoard.push(new Block(1, 1, 2, 5, false, false, false, "green"));
    initBoard.push(new Block(1, 1, 3, 4, false, false, false, "green"));
    initBoard.push(new Block(1, 1, 4, 5, false, false, false, "green"));

    initBoard.push(new Block(1, 7, 0, 0, true, false, false, "purple"));
    initBoard.push(new Block(1, 7, 5, 0, true, false, false, "purple"));
    initBoard.push(new Block(4, 1, 1, 0, true, false, false, "purple"));
    initBoard.push(new Block(1, 1, 1, 6, true, false, false, "purple"));
    initBoard.push(new Block(1, 1, 4, 6, true, false, false, "purple"));

    initBoard.push(new Block(2, 1, 2, 6, true, true, false, "transparent"));

    newGame = new Game(initBoard);
    newGame.draw();
}


document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

	if (e.keyCode == '37') {
		newGame.moveBlock("left",newGame.selected);
    }
    if (e.keyCode == '38') {
        newGame.moveBlock("up",newGame.selected);
    }
    if (e.keyCode == '39') {
        newGame.moveBlock("right",newGame.selected);
    }
    else if (e.keyCode == '40') {
        newGame.moveBlock("down",newGame.selected);
    }
}
