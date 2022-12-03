/* The Constants & Global Variables */

// All tiles
const tiles = Array.from(document.querySelectorAll('.tile'));

// Span to show the current player letter
const currentPlayerSpan = document.querySelector('.current-player');

// Div to display the winner
const announceDiv = document.querySelector('.announce');

// Reset button
const resetButton = document.querySelector('#reset');

// Indexes of winning situations
const winningSituations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// The board, current player, and the game situation
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;


/* ------------------------------------------------------------------- */


/* The Game Functions */

// check if the current tile is empty or not
const isValidClick = (tile) => {
    return !(tile.innerText === 'X' || tile.innerText === 'O');
};


// change the current player to alternate between X & O
const changeplayer = () => {
    currentPlayerSpan.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerSpan.innerText = currentPlayer;
    currentPlayerSpan.classList.add(`player${currentPlayer}`);
};


/* Announce the winner or a tie by changing that div text,
then display it to the players */
const announce = (type) => {
    switch(type){
        case 'X':
            announceDiv.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case 'O':
            announceDiv.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case 'TIE':
            announceDiv.innerText = 'Tie';
    }

    announceDiv.classList.remove('hide');
}


// Check if the current situation is a winning situation or a tie
const checkWinningSituation = () => {
    let roundWon = false;

    /* Loop over all winning situations to check if the current is one 
    of them, get the current values of these indexes in the board to check
    if they are the same player or one of them is empty */
    for(let i = 0; i <= 7; i++) {
        let winSituation = winningSituations[i];
        let a = board[winSituation[0]];
        let b = board[winSituation[1]];
        let c = board[winSituation[2]];

        if(a === '' || b === '' || c === '') {
            continue;
        }

        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // If a player win, annonce he is the winner and deactive the game
    if(roundWon) {
        announce(currentPlayer);
        isGameActive = false;
        return;
    }

    // If all board tiles are filled and no one wins announce a tie
    if(!board.includes('')) {
        announce('TIE');
    }
};


/* When the user click a tie check if it is empty & the game
is currently active to put X or O in it, update the board, check
the current situation, then alternate the player*/
const userClicked = (tile, index) => {
    if(isValidClick(tile) && isGameActive){
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        board[index] = currentPlayer;
        checkWinningSituation();
        changeplayer();
    }
};


/* Reset the board, activate the game, hide the announcement,
make the current player is X by default, then remove everything
from the ties*/
const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announceDiv.classList.add('hide');

    if(currentPlayer === 'O'){
        changeplayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
};


// Add a click listener for the ties
tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userClicked(tile, index));
});


// Add a click listener for the reset button
resetButton.addEventListener('click', resetBoard);