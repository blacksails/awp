// Mouse click detection
// Keyboardspresses
// Scoreboards/Winner screen

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
    this.moves = 0;
    this.record = 0;
    this.moveBlock = function (direction, block) {
        if (direction == "right") {
            if (this.checkCollision((block.x + 1), block.y)) {
                this.updateBoard(block, (block.x + 1), block.y)
            }
        }
        if (direction == "left") {
            if (this.checkCollision((block.x - 1), block.y)) {
                this.updateBoard(block, (block.x - 1), block.y)
            }
        }
        if (direction == "down") {
            if (this.checkCollision(block.x, (block.y + 1))) {
                this.updateBoard(block, block.x, (block.y + 1))
            }
        }
        if (direction == "up") {
            if (this.checkCollision(block.x, (block.y - 1))) {
                this.updateBoard(block, block.x, (block.y - 1))
            }
        }

        this.draw();
    };
    this.checkCollision = function (block, x, y) {
        var granted = true;
        var newBlock = new Block(block.width, block.height, x, y, block.isWall, block.isWinner, block.isPlayer, block.color);
        for (var i = 0; i < this.board.length; i++) {
            var currentBlock = this.board[i];
            if (this.isTouching(newBlock, currentBlock)) {
                granted = false;
            }
        }
        if (block.isPlayer = true) {
            if (this.isWinning(block)) {
                this.updateScores();
            }
        }
        if (granted) {
            this.moves++;
        }
        return granted;
    };

    this.isTouching = function (newBlock, block) {
        var newX = newBlock.x + newBlock.width;
        var newY = newBlock.y + newBlock.height;
        if (newX <= block.x && newBlock.x >= block.x + block.width && newY <= block.y && newBlock.y >= block.x + block.height) {
            return true;
        } else {
            return false;
        }
    }

    this.isTouchingStrict = function (block) {
        var notTouchingAnythingElse = false;
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i].isWinner == true && this.isTouching(this.board[i], block)) {
                notTouchingAnythingElse = true
            }
            if (this.board[i].isWinner == false && this.isTouching(this.board[i], block)) {
                notTouchingAnythingElse = false
            }

        }
    }

    this.updateScores = function () {
        var record = document.getElementById("moves");
        record.innerHtml = "Record: " + moves;
        startGame();
        alert("Congratulations, you are the klotski champion of the internet");
    }

    this.isWinning = function (block) {
        var wonned = false;
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i].isWinning) {
                if (this.isTouchingStrict(this.board[i], block)) {
                    wonned = true;
                }
            }
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
            if (!(b.isWall || b.isWinner))
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
                blockdiv.className = blockdiv.className + " winner-block";
            if (b.isPlayer)
                blockdiv.className = blockdiv.className + " orange-block player-block";

            switch (b.width) {
                case 1:
                    blockdiv.className = blockdiv.className + " onewidth";
                    break;
                case 2:
                    blockdiv.className = blockdiv.className + " twowidth";
                    break;
            }

            switch (b.height) {
                case 1:
                    blockdiv.className = blockdiv.className + " oneheight";
                    break;
                case 2:
                    blockdiv.className = blockdiv.className + " twoheight";
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
            }
			console.log(blockdiv.className);
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

    var newGame = new Game(initBoard);
    newGame.draw();
}

