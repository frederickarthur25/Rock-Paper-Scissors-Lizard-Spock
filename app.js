// Define an enum for the possible choices
var HandChoice;
(function (HandChoice) {
    HandChoice["Rock"] = "Group 8 Copy 2.svg";
    HandChoice["Paper"] = "Group 8.svg";
    HandChoice["Scissors"] = "Group 8 Copy.svg";
})(HandChoice || (HandChoice = {}));
var computerScore = 0;
var userScore = 0;
var userChoice;
var computerChoice;
// Function to randomly select computer's hand
function getComputerHand() {
    var choices = [HandChoice.Rock, HandChoice.Paper, HandChoice.Scissors];
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
// Function to determine the winner and update scores
function determineWinner() {
    if (userChoice === computerChoice) {
        // It's a draw
        return 'draw';
    }
    else if ((userChoice === HandChoice.Rock && computerChoice === HandChoice.Scissors) ||
        (userChoice === HandChoice.Paper && computerChoice === HandChoice.Rock) ||
        (userChoice === HandChoice.Scissors && computerChoice === HandChoice.Paper)) {
        // User wins
        userScore++;
        return 'user';
    }
    else {
        // Computer wins
        computerScore = 1 - userScore;
        return 'computer';
    }
}
// Function to update the game UI
function updateUI() {
    var userPickImage = document.getElementById('userPickImage');
    var computerPickImage = document.getElementById('computerPickImage');
    var userScoreElement = document.querySelector('.score h1');
    userPickImage.src = "images/".concat(userChoice);
    computerPickImage.src = "images/".concat(computerChoice);
    userScoreElement.textContent = userScore.toString();
}
// Function to handle user's hand selection
function pickUserHand(choice) {
    userChoice = choice;
    computerChoice = getComputerHand();
    var winner = determineWinner();
    // Display the results
    var referee = document.querySelector('.referee h1');
    referee.textContent = winner === 'draw' ? 'It\'s a draw' : "You ".concat(winner === 'user' ? 'Win' : 'Lose');
    // Show the gameboard
    var gameboard = document.querySelector('.gameboard');
    gameboard.style.display = 'none';
    // Show the contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'flex';
    // Update the UI
    updateUI();
}
// Function to restart the game
function restartGame() {
    // Hide the contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'none';
    // Show the gameboard
    gameboard.style.display = 'flex';
}
var gameboard = document.querySelector('.gameboard');
var advanceGameboard = document.querySelector('.advance-gameboard');
var rulesPopup = document.querySelector('.rules-popup');
var advanceRules = document.querySelector('.advance-rules');
var rulesButton = document.querySelector('.rules');
var closeButton = document.querySelector('.header img');
var closeRulesButton = document.querySelector('.heading img');
var advanceButton = document.querySelector('.advance');
var title = document.querySelector('.title img');
var bonus = document.querySelector('.title .bonus');
var advanceMod = document.querySelector('.advance-mod');
// Function to show the rules popup
function showRulesPopup() {
    rulesPopup.style.display = 'flex';
    gameboard.style.pointerEvents = 'none';
    rulesButton.style.pointerEvents = 'none';
    advanceButton.style.pointerEvents = 'none';
}
// Function to close the rules popup
function closeRulesPopup() {
    rulesPopup.style.display = 'none';
    gameboard.style.pointerEvents = 'auto';
    rulesButton.style.pointerEvents = 'auto';
    advanceButton.style.pointerEvents = 'auto';
}
var change = true;
// Function to show the Advance rules popup
function showAdvanceModePopup() {
    if (change) {
        rulesPopup.style.display = 'none';
        rulesButton.style.display = 'none';
        advanceMod.style.display = 'flex';
        gameboard.style.display = 'none';
        advanceGameboard.style.display = 'flex';
        title.style.display = 'none';
        bonus.style.display = 'flex';
        rulesButton.style.pointerEvents = 'none';
        advanceButton.textContent = 'DEMO MODE';
        change = false;
    }
    else {
        rulesButton.style.display = 'flex';
        advanceMod.style.display = 'none';
        gameboard.style.display = 'flex';
        advanceGameboard.style.display = 'none';
        title.style.display = 'flex';
        bonus.style.display = 'none';
        rulesButton.style.pointerEvents = 'auto';
        advanceButton.style.pointerEvents = 'auto';
        change = true;
        advanceButton.textContent = 'ADVANCE MODE';
    }
}
function showAdvanceRulesPopup() {
    advanceRules.style.display = 'flex';
    gameboard.style.pointerEvents = 'none';
    advanceButton.style.pointerEvents = 'none';
    advanceMod.style.pointerEvents = 'none';
}
function closeAdvanceRules() {
    advanceRules.style.display = 'none';
    gameboard.style.pointerEvents = 'auto';
    advanceMod.style.pointerEvents = 'auto';
    advanceButton.style.pointerEvents = 'auto';
}
// Event listener for the Advance Mode button
advanceButton.addEventListener('click', showAdvanceModePopup);
advanceMod.addEventListener('click', showAdvanceRulesPopup);
closeRulesButton.addEventListener('click', closeAdvanceRules);
// Event listener for the rules button
rulesButton.addEventListener('click', showRulesPopup);
closeButton.addEventListener('click', closeRulesPopup);
// Event listeners for hand selections
var rockBtn = document.querySelector('.rock img');
var paperBtn = document.querySelector('.paper img');
var scissorsBtn = document.querySelector('.scissors img');
rockBtn === null || rockBtn === void 0 ? void 0 : rockBtn.addEventListener('click', function () { return pickUserHand(HandChoice.Rock); });
paperBtn === null || paperBtn === void 0 ? void 0 : paperBtn.addEventListener('click', function () { return pickUserHand(HandChoice.Paper); });
scissorsBtn === null || scissorsBtn === void 0 ? void 0 : scissorsBtn.addEventListener('click', function () { return pickUserHand(HandChoice.Scissors); });
