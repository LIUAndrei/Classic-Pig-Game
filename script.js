'use strict';

var dicePic = document.querySelector('.dice');
var currentScoreDisplay0 = document.getElementById('current--0');
var currentScoreDisplay1 = document.getElementById('current--1');
var totalScoreDisplay0 = document.getElementById('score--0');
var totalScoreDisplay1 = document.getElementById('score--1');

var newGameButton = document.getElementById('new-game-button');
var rollButton = document.getElementById('roll-dice-button');
var holdButton = document.getElementById('hold-score-button');

var playerZero = document.querySelector('.player--0');
var playerOne = document.querySelector('.player--1');

var maxScore = 0;
var totalScore = [0,0];
var currentScore = 0;
var diceScore = 0;
var activePlayer;

function scoreSetUp(score) {
    currentScoreDisplay0.textContent = score;
    currentScoreDisplay1.textContent = score;
    totalScoreDisplay0.textContent = score;
    totalScoreDisplay1.textContent = score;
    totalScore = [0,0];
    currentScore = 0;
}

function noPlayersActive() {
    playerZero.classList.remove('player--active');
    playerOne.classList.remove('player--active');
    playerZero.classList.remove('player--winner');
    playerOne.classList.remove('player--winner');
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
}

function playerActivation() {
    document.querySelector('.player--' + activePlayer).classList.add('player--active');
}

function playerChange() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    noPlayersActive();
    playerActivation();
}

function buttonHider() {
    rollButton.classList.add('visibility-hidden');
    holdButton.classList.add('visibility-hidden');
    dicePic.classList.add('visibility-hidden');
}


// game starts and rolls to no active player , no scores, no dice displayed, no roll and hold buttons displayed

noPlayersActive();
buttonHider();
scoreSetUp('');


// you press new game

newGameButton.addEventListener('click', function() {
    maxScore = prompt('Enter max score:');
    maxScore = Number(maxScore);
    scoreSetUp('0');
    activePlayer = Math.round(Math.random());
    noPlayersActive();
    playerActivation();
    rollButton.classList.remove('visibility-hidden');
    holdButton.classList.remove('visibility-hidden');
    dicePic.classList.remove('visibility-hidden');
})





// you press roll dice
rollButton.addEventListener('click', function() {
    diceScore = Math.ceil(Math.random() * 6);
    dicePic.src = 'dice-' + diceScore + '.png';
    if (diceScore === 1) {
        currentScore = 0;
        document.getElementById('current--' + activePlayer).textContent = currentScore;
        playerChange();
    } else {
        currentScore = currentScore + diceScore;
        document.getElementById('current--' + activePlayer).textContent = currentScore;
    }
})


    // -- random 1-6 number comes up
    // -- dice picture changes
    // -- if 2-6
        // -- # added to current score of the player 
    // -- if 1
            // -- current score zeroes out
            // -- active player changed

// you press hold

holdButton.addEventListener('click', function() {
    totalScore[activePlayer] = totalScore[activePlayer] + currentScore;
    currentScore = 0;
    document.getElementById('current--' + activePlayer).textContent = currentScore;
    document.getElementById('score--' + activePlayer).textContent = totalScore[activePlayer];
    if (totalScore[activePlayer] < maxScore) {
        playerChange();
    } else {
        buttonHider();
        noPlayersActive();
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.getElementById('name--' + activePlayer).textContent = 'WINNER!';
    }
        
})


    // -- current score added to total score
    // -- active player changed
    // -- if total score is more than max score - the player won the game
        // -- winner gets winner class, roll and hold buttons disabled