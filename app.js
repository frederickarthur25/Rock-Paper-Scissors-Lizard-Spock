// Define an enum for the possible choices
var HandChoice;
(function (HandChoice) {
    HandChoice["Rock"] = "Group 8 Copy 2.svg";
    HandChoice["Paper"] = "Group 8.svg";
    HandChoice["Scissors"] = "Group 8 Copy.svg";
})(HandChoice || (HandChoice = {}));
var HandChoices;
(function (HandChoices) {
    HandChoices["Rocks"] = "icon-rock.svg";
    HandChoices["Papers"] = "icon-paper.svg";
    HandChoices["Scissor"] = "icon-scissors.svg";
    HandChoices["Lizard"] = "icon-lizard.svg";
    HandChoices["Spock"] = "icon-spock.svg";
})(HandChoices || (HandChoices = {}));
var userScore = 0;
var usersScore = 0;
var userChoice;
var computerChoice;
var userChoices;
var computerChoices;
// Function to randomly select computer's hand in Basic Mode
function getComputerHand() {
    var choices = [
        HandChoice.Rock,
        HandChoice.Paper,
        HandChoice.Scissors,
    ];
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
// Function to randomly select computer's hand in Advance Mode
function getComputersHand() {
    var choice = [
        HandChoices.Rocks,
        HandChoices.Papers,
        HandChoices.Scissor,
    ];
    var randomIndex = Math.floor(Math.random() * choice.length);
    return choice[randomIndex];
}
// Function to determine the winner and update scores in Basic Mode
function determineWinner() {
    if (userChoice === computerChoice) {
        // It's a draw
        clearWinStyles();
        return 'draw';
    }
    if ((userChoice === HandChoice.Rock && computerChoice === HandChoice.Scissors) ||
        (userChoice === HandChoice.Paper && computerChoice === HandChoice.Rock) ||
        (userChoice === HandChoice.Scissors && computerChoice === HandChoice.Paper)) {
        // User wins
        userScore++;
        applyWinStyles();
        return 'user';
    }
    else {
        // Computer wins
        applyHouseWinStyles();
        return 'house';
    }
}
// Function to determine the winner and update scores of Advance Mode
function determineWinners() {
    if (userChoices === computerChoices) {
        // It's a draw
        clearWinStyles();
        return 'draw';
    }
    if ((userChoices === HandChoices.Rocks &&
        (computerChoices === HandChoices.Scissor || computerChoices === HandChoices.Lizard)) ||
        (userChoices === HandChoices.Papers &&
            (computerChoices === HandChoices.Rocks || computerChoices === HandChoices.Spock)) ||
        (userChoices === HandChoices.Scissor &&
            (computerChoices === HandChoices.Papers || computerChoices === HandChoices.Lizard)) ||
        (userChoices === HandChoices.Lizard &&
            (computerChoices === HandChoices.Papers || computerChoices === HandChoices.Spock)) ||
        (userChoices === HandChoices.Spock &&
            (computerChoices === HandChoices.Rocks || computerChoices === HandChoices.Scissor))) {
        // User wins
        usersScore++;
        applyWinStyles();
        return 'user';
    }
    else {
        // Computer wins
        applyHouseWinStyles();
        return 'house';
    }
}
//Pulling Elements from the DOM
var advanceRules = document.querySelector('.advance-rules');
var gameboard = document.querySelector('.gameboard');
var advanceButton = document.querySelector('.advance');
var advanceMod = document.querySelector('.advance-mod');
var bonus = document.querySelector('.title .bonus');
var title = document.querySelector('.title img');
var advanceGameboard = document.querySelector('.advance-gameboard');
var rulesPopup = document.querySelector('.rules-popup');
var contest = document.querySelector('.contest');
var userScoreElement = document.querySelector('.score h1');
var usersScoreElement = document.querySelector('.score h1');
var winStyle1 = document.querySelector('.win-style-1');
var winStyle2 = document.querySelector('.win-style-2');
var winStyle3 = document.querySelector('.win-style-3');
var winStyle11 = document.querySelector('.winstyle-1');
var winStyle22 = document.querySelector('.winstyle-2');
var winStyle33 = document.querySelector('.winstyle-3');
var userPickImage = document.getElementById('userPickImage');
var computerPickImage = document.getElementById('computerPickImage');
// Function to apply win styles
function applyWinStyles() {
    // Apply win styles for user hand win
    winStyle1.style.display = 'none';
    winStyle2.style.display = 'none';
    winStyle3.style.display = 'none';
    // Hide win styles for house hand win
    winStyle11.style.display = 'block';
    winStyle22.style.display = 'block';
    winStyle33.style.display = 'block';
}
// Function to apply win styles for house hand win
function applyHouseWinStyles() {
    // Apply win styles for house hand win
    winStyle11.style.display = 'none';
    winStyle22.style.display = 'none';
    winStyle33.style.display = 'none';
    // Hide win styles for user hand win
    winStyle1.style.display = 'block';
    winStyle2.style.display = 'block';
    winStyle3.style.display = 'block';
}
// Function to clear all win styles
function clearWinStyles() {
    winStyle1.style.display = 'none';
    winStyle2.style.display = 'none';
    winStyle3.style.display = 'none';
    winStyle11.style.display = 'none';
    winStyle22.style.display = 'none';
    winStyle33.style.display = 'none';
}
// Function to update the game UI Basic Mode
function updateUI() {
    userPickImage.src = "images/".concat(userChoice);
    computerPickImage.src = "images/".concat(computerChoice);
    userScoreElement.textContent = userScore.toString();
}
// Function to update the game UI for Advance Mode
function updateUIs() {
    userPickImage.src = "images/".concat(userChoices);
    computerPickImage.src = "images/".concat(computerChoices);
    userScoreElement.textContent = usersScore.toString();
}
// Function to handle user's hand selection for Basic Mode
function pickUserHand(choices) {
    userChoice = choices;
    computerChoice = getComputerHand();
    var winner = determineWinner();
    // Display the results
    var referee = document.querySelector('.referee h1');
    referee.textContent =
        winner === 'draw' ? "It's a draw" : "You ".concat(winner === 'user' ? 'Win' : 'Lose');
    // Show the gameboard
    var gameboard = document.querySelector('.gameboard');
    gameboard.style.display = 'none';
    advanceGameboard.style.display = 'none';
    // Show the contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'flex';
    // Update the UI
    updateUI();
}
// Function to handle user's hand selection for Advance Mode
function pickUserHands(choice) {
    userChoices = choice;
    computerChoices = getComputersHand();
    var winners = determineWinners();
    // Display the results
    var referee = document.querySelector('.referee h1');
    referee.textContent =
        winners === 'draw' ? "It's a draw" : "You ".concat(winners === 'user' ? 'Win' : 'Lose');
    // Show the win style for the winner, and hide it for the loser
    // Show the gameboard
    var gameboard = document.querySelector('.gameboard');
    gameboard.style.display = 'none';
    advanceGameboard.style.display = 'none';
    // Show the contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'flex';
    // Update the UI
    updateUIs();
}
function restartGame() {
    // Hide the contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'none';
    // Show the appropriate game mode section
    var basicGameboard = document.querySelector('.gameboard');
    var advanceGameboard = document.querySelector('.advance-gameboard');
    // Check the current game mode
    var advanceButton = document.querySelector('.advance');
    var isAdvanceMode = advanceButton.textContent === 'BASIC MODE';
    if (isAdvanceMode) {
        advanceGameboard.style.display = 'flex';
    }
    else {
        basicGameboard.style.display = 'flex';
    }
    clearWinStyles();
}
// Event listener for hand selections in basic game mode
var rockBtn = document.querySelector('.rock img');
var paperBtn = document.querySelector('.paper img');
var scissorsBtn = document.querySelector('.scissors img');
rockBtn === null || rockBtn === void 0 ? void 0 : rockBtn.addEventListener('click', function () { return pickUserHand(HandChoice.Rock); });
paperBtn === null || paperBtn === void 0 ? void 0 : paperBtn.addEventListener('click', function () { return pickUserHand(HandChoice.Paper); });
scissorsBtn === null || scissorsBtn === void 0 ? void 0 : scissorsBtn.addEventListener('click', function () { return pickUserHand(HandChoice.Scissors); });
// Event listener for the "Play Again" button in basic game mode
var newGameBtn = document.querySelector('.newGame');
newGameBtn === null || newGameBtn === void 0 ? void 0 : newGameBtn.addEventListener('click', restartGame);
// Function to show the rules popup
function showRulesPopup() {
    rulesPopup.style.display = 'flex';
    gameboard.style.pointerEvents = 'none';
    var rulesButton = document.querySelector('.rules');
    rulesButton.style.pointerEvents = 'none';
    advanceButton.style.pointerEvents = 'none';
}
// Function to close the rules popup
function closeRulesPopup() {
    rulesPopup.style.display = 'none';
    gameboard.style.pointerEvents = 'auto';
    var rulesButton = document.querySelector('.rules');
    rulesButton.style.pointerEvents = 'auto';
    advanceButton.style.pointerEvents = 'auto';
}
// Event listener for the rules button in basic game mode
var rulesButton = document.querySelector('.rules');
rulesButton === null || rulesButton === void 0 ? void 0 : rulesButton.addEventListener('click', showRulesPopup);
// Event listener for the close button in rules popup
var closeButton = document.querySelector('.header img');
closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', closeRulesPopup);
// Function to show the advance rules popup
function showAdvanceRulesPopup() {
    advanceRules.style.display = 'flex';
    gameboard.style.pointerEvents = 'none';
    advanceButton.style.pointerEvents = 'none';
    advanceMod.style.pointerEvents = 'none';
}
// Function to close the advance rules popup
function closeAdvanceRules() {
    advanceRules.style.display = 'none';
    gameboard.style.pointerEvents = 'auto';
    advanceButton.style.pointerEvents = 'auto';
    advanceMod.style.pointerEvents = 'auto';
}
// Event listener for the "Advance Mode" button
advanceButton === null || advanceButton === void 0 ? void 0 : advanceButton.addEventListener('click', function () {
    if (advanceButton.textContent === 'BASIC MODE') {
        // Exit Advance Mode
        gameboard.style.display = 'flex';
        advanceGameboard.style.display = 'none';
        title.style.display = 'flex';
        bonus.style.display = 'none';
        advanceMod.style.display = 'none';
        advanceButton.textContent = 'ADVANCE MODE'; // Update the text content of the button
        var rulesButton_1 = document.querySelector('.rules');
        rulesButton_1.style.display = 'flex';
        rulesButton_1.style.pointerEvents = 'auto';
        advanceButton.style.pointerEvents = 'auto';
        contest.style.display = 'none';
    }
    else {
        // Enter Advance Mode
        gameboard.style.display = 'none';
        advanceGameboard.style.display = 'flex';
        title.style.display = 'none';
        bonus.style.display = 'flex';
        advanceMod.style.display = 'flex';
        rulesPopup.style.display = 'none';
        var rulesButton_2 = document.querySelector('.rules');
        rulesButton_2.style.display = 'none';
        rulesButton_2.style.pointerEvents = 'none';
        contest.style.display = 'none';
        advanceButton.textContent = 'BASIC MODE'; // Update the text content of the button
    }
});
// Event listener for the rules button in advance game mode
advanceMod === null || advanceMod === void 0 ? void 0 : advanceMod.addEventListener('click', showAdvanceRulesPopup);
// Event listener for the close button in advance rules popup
var closeRulesButton = document.querySelector('.heading img');
closeRulesButton === null || closeRulesButton === void 0 ? void 0 : closeRulesButton.addEventListener('click', closeAdvanceRules);
// Event listeners for hand selections in advance game mode
var lizardBtn = document.querySelector('.lizard img');
var spockBtn = document.querySelector('.spock img');
var rocksBtn = document.querySelector('.rocks img');
var papersBtn = document.querySelector('.papers img');
var scissorBtn = document.querySelector('.scissor img');
lizardBtn === null || lizardBtn === void 0 ? void 0 : lizardBtn.addEventListener('click', function () { return pickUserHands(HandChoices.Lizard); });
spockBtn === null || spockBtn === void 0 ? void 0 : spockBtn.addEventListener('click', function () { return pickUserHands(HandChoices.Spock); });
rocksBtn === null || rocksBtn === void 0 ? void 0 : rocksBtn.addEventListener('click', function () { return pickUserHands(HandChoices.Rocks); });
papersBtn === null || papersBtn === void 0 ? void 0 : papersBtn.addEventListener('click', function () { return pickUserHands(HandChoices.Papers); });
scissorBtn === null || scissorBtn === void 0 ? void 0 : scissorBtn.addEventListener('click', function () { return pickUserHands(HandChoices.Scissor); });
