
var game;
var cells;
var boardSprite;
var output;
var currentPlayer = 1;

var BLANK = 0;
var X = 1;
var O = 2;
var winningCombos;

var playerName;
var cellRank;

function Cell() {
    tCell = new Sprite(game, "images/blank.png", 100, 100);
    tCell.setSpeed(0);
    tCell.state = BLANK;

    tCell.images = new Array("images/blank.png", "images/X.png", "images/O.png");

    tCell.checkClick = function () {
        if (this.isClicked()) {
            if (this.state == BLANK) {
                this.state = currentPlayer;
                this.setImage(this.images[currentPlayer]);

                //change the player
                if (currentPlayer == X) {
                    currentPlayer = O;
                } else {
                    currentPlayer = X;
                } // end if
            } // end if
        } // end if
    } // end checkClick

    return tCell;
} // end cell

function buildCells() {
    cells = new Array(9);
    xOffset = 100;
    yOffset = 100;
    for (i = 0; i < cells.length; i++) {
        cells[i] = new Cell();
        row = parseInt(i / 3);
        col = i % 3;
        xPos = (col * 100) + xOffset;
        yPos = (row * 100) + yOffset;
        cells[i].setPosition(xPos, yPos);
    } // end for loop
} // end buildCells

function updateCells() {
    for (i = 0; i < cells.length; i++) {
        cells[i].checkClick();
        cells[i].update();
    } // end for loop
} // end updateCells

function setupData() {
    winningCombos = new Array(
        new Array(0, 1, 2),
        new Array(3, 4, 5),
        new Array(6, 7, 8),
        new Array(0, 3, 6),
        new Array(1, 4, 7),
        new Array(2, 5, 8),
        new Array(0, 4, 8),
        new Array(2, 4, 6)
    );


    playerName = new Array("none", "X", "O");

} // end setupData();

function checkWins() {
    winner = 0
    for (combo = 0; combo < winningCombos.length; combo++) {
        a = winningCombos[combo][0];
        b = winningCombos[combo][1];
        c = winningCombos[combo][2];

        if (cells[a].state == cells[b].state) {
            if (cells[b].state == cells[c].state) {
                if (cells[a].state != BLANK) {
                    winner = cells[a].state;
                } // end if
            } // end if
        } // end if
    } // end for
    return winner;
} // end checkWins

function showBest() {
    // use a heuristic algorithm to determine the best play

    //initial rank based on number of winning combos
    //that go through the cell
    cellRank = new Array(3, 2, 3, 3, 4, 3, 3, 2, 3);

    //demote any cells already taken
    for (i = 0; i < cells.length; i++) {
        if (cells[i].state != BLANK) {
            cellRank[i] -= 99;
        } // end if
    } // end for

    //look for partially completed combos
    for (combo = 0; combo < winningCombos.length; combo++) {
        a = winningCombos[combo][0];
        b = winningCombos[combo][1];
        c = winningCombos[combo][2];

        //if any two cells in a combo are
        //non-blank and the same value,
        //promote the remaining cell

        if (cells[a].state == cells[b].state) {
            if (cells[a].state != BLANK) {
                if (cells[c].state == BLANK) {
                    cellRank[c] += 10;
                } // end if
            } // end if
        } // end if

        if (cells[a].state == cells[c].state) {
            if (cells[a].state != BLANK) {
                if (cells[b].state == BLANK) {
                    cellRank[b] += 10;
                } // end if
            } // end if
        } // end if

        if (cells[b].state == cells[c].state) {
            if (cells[b].state != BLANK) {
                if (cells[a].state == BLANK) {
                    cellRank[a] += 10;
                } // end if
            } // end if
        } // end if


    } // end for

    //print current cellRank
    hint = cellRank[0] + " " + cellRank[1] + " " + cellRank[2] + "<br />";
    hint += cellRank[3] + " " + cellRank[4] + " " + cellRank[5] + "<br />";
    hint += cellRank[6] + " " + cellRank[7] + " " + cellRank[8] + "<br />";

    //determine the best move to make
    bestCell = -1;
    highest = -999;

    //step through cellRank to find the best available score
    for (i = 0; i < cells.length; i++) {
        if (cellRank[i] > highest) {
            highest = cellRank[i];
            bestCell = i
        } // end if
    } // end for

    hint += "HINT: cell # " + bestCell;

    output.innerHTML = hint;


} // end showBest

function init() {
    game = new Scene();
    game.setBG("blue");
    game.setSize(400, 400);

    output = document.getElementById("output");

    boardSprite = new Sprite(game, "images/board.png", 300, 300);
    boardSprite.setSpeed(0);
    boardSprite.setPosition(200, 200);

    buildCells();
    setupData();

    game.start();
} // end init

function update() {
    game.clear();
    boardSprite.update();
    updateCells();
    showBest();
    winner = checkWins();
    if (winner != 0) {
        alert("Player " + playerName[winner] + " wins!");
        document.location.href = "";
    } // end if

} // end update

