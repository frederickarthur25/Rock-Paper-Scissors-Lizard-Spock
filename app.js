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
var usersScoreElement = document.getElementById('usersScore');
var userScoreElement = document.getElementById('userScore');
var score = {
    userScore: 0,
};
var choices = ["rock", "paper", "scissors"];
var getRandomChoice = function () {
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};
var determineResult = function (userChoice, computerChoice) {
    if (userChoice === computerChoice)
        return "draw";
    if ((userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")) {
        return "win";
    }
    return "lose";
};
var updateScore = function (result) {
    if (result === "win") {
        score.userScore += 1;
        applyWinStyles();
    }
    else if (result === "lose") {
        score.userScore -= 1;
        applyHouseWinStyles();
    }
    var gameData = {
        userScore: score.userScore,
        usersScore: outcome.usersScore,
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
};
//save the game to local storage
window.addEventListener('load', function () {
    var savedGame = localStorage.getItem('gameData');
    if (savedGame !== null) {
        var parsedGameData = JSON.parse(savedGame);
        score.userScore = parsedGameData.userScore;
        outcome.usersScore = parsedGameData.usersScore;
        userScoreElement.textContent = score.userScore.toString();
        usersScoreElement.textContent = outcome.usersScore.toString();
    }
});
var playGame = function (userChoice) {
    var computerChoice = getRandomChoice();
    var result = determineResult(userChoice, computerChoice);
    updateScore(result);
    return {
        userChoice: userChoice,
        computerChoice: computerChoice,
        result: result,
    };
};
var toggleGameMode = function (mode) {
    var basicGameboard = document.querySelector(".gameboard");
    var advanceGameboard = document.querySelector(".advance-gameboard");
    if (mode === "basic") {
        basicGameboard.style.display = "flex";
        advanceGameboard.style.display = "none";
    }
    else {
        basicGameboard.style.display = "none";
        advanceGameboard.style.display = "flex";
    }
};
var advanceModeButton = document.querySelector(".advance");
advanceModeButton.addEventListener("click", function () {
    var currentMode = advanceModeButton.textContent.trim().toLowerCase();
    if (currentMode === "advance") {
        toggleGameMode("basic");
        advanceModeButton.textContent = "Basic";
        gameboard.style.display = 'none';
        advanceGameboard.style.display = 'flex';
        title.style.display = 'none';
        bonus.style.display = 'flex';
        advanceMod.style.display = 'flex';
        rulesPopup.style.display = 'none';
        var rulesButton_1 = document.querySelector('.rules');
        rulesButton_1.style.display = 'none';
        rulesButton_1.style.pointerEvents = 'none';
        contest.style.display = 'none';
        usersScoreElement.style.display = 'flex';
        userScoreElement.style.display = 'none';
    }
    else {
        toggleGameMode("advance");
        advanceModeButton.textContent = "Advance";
        gameboard.style.display = 'flex';
        advanceGameboard.style.display = 'none';
        title.style.display = 'flex';
        bonus.style.display = 'none';
        advanceMod.style.display = 'none';
        var rulesButton_2 = document.querySelector('.rules');
        rulesButton_2.style.display = 'flex';
        rulesButton_2.style.pointerEvents = 'auto';
        advanceButton.style.pointerEvents = 'auto';
        contest.style.display = 'none';
        usersScoreElement.style.display = 'none';
        userScoreElement.style.display = 'flex';
    }
    clearWinStyles();
});
// Function to pick user hand
var pickUserHand = function (userChoice) {
    var gameState = playGame(userChoice);
    // Update user hand image
    var userPickImage = document.getElementById('userPickImage');
    userPickImage.src = "images/icon-".concat(gameState.userChoice, ".svg");
    // Update computer hand image
    var computerPickImage = document.getElementById('computerPickImage');
    computerPickImage.src = "images/icon-".concat(gameState.computerChoice, ".svg");
    // Update result text
    var decision = document.querySelector('.referee p');
    if (gameState.result === 'win') {
        decision.textContent = 'YOU WIN';
    }
    else if (gameState.result === 'lose') {
        decision.textContent = 'YOU LOSE';
    }
    else {
        decision.textContent = 'DRAW';
    }
    // Hide the gameboard
    var gameboard = document.querySelector('.gameboard');
    gameboard.style.display = 'none';
    var advanceGameboard = document.querySelector('.advance-gameboard');
    advanceGameboard.style.display = 'none';
    // Display contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'flex';
    //Display the current score
    userScoreElement.textContent = score.userScore.toString();
};
function restartGame() {
    // Hide the contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'none';
    // Show the appropriate game mode section
    var basicGameboard = document.querySelector('.gameboard');
    var advanceGameboard = document.querySelector('.advance-gameboard');
    // Check the current game mode
    var advanceButton = document.querySelector('.advance');
    var isAdvanceMode = advanceButton.textContent === 'Basic';
    if (isAdvanceMode) {
        advanceGameboard.style.display = 'flex';
    }
    else {
        basicGameboard.style.display = 'flex';
    }
    ;
    clearWinStyles();
}
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
var outcome = {
    usersScore: 0,
};
var handOptions = ["rocks", "papers", "scissor", "lizard", "spock"];
var randomChoice = function () {
    var randomIndex = Math.floor(Math.random() * handOptions.length);
    return handOptions[randomIndex];
};
var determineWinner = function (usersChoice, computersChoice) {
    if (usersChoice === computersChoice)
        return "draw";
    if ((usersChoice === "rocks" && (computersChoice === "scissor" || computersChoice === "lizard")) ||
        (usersChoice === "papers" && (computersChoice === "rocks" || computersChoice === "spock")) ||
        (usersChoice === "scissor" && (computersChoice === "papers" || computersChoice === "lizard")) ||
        (usersChoice === "lizard" && (computersChoice === "spock" || computersChoice === "papers")) ||
        (usersChoice === "spock" && (computersChoice === "scissor" || computersChoice === "rocks"))) {
        return "win";
    }
    return "lose";
};
var updateResult = function (result) {
    if (result === "win") {
        outcome.usersScore += 1;
        applyWinStyles();
    }
    else if (result === "lose") {
        outcome.usersScore -= 1;
        applyHouseWinStyles();
    }
    var gameData = {
        userScore: score.userScore,
        usersScore: outcome.usersScore,
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
};
var play = function (usersChoice) {
    var computersChoice = randomChoice();
    var results = determineWinner(usersChoice, computersChoice);
    updateResult(results);
    return {
        usersChoice: usersChoice,
        computersChoice: computersChoice,
        results: results,
    };
};
// Function to pick user hand
var pickUserHands = function (usersChoice) {
    var gameType = play(usersChoice);
    // Update user hand image
    var userPickImage = document.getElementById('userPickImage');
    userPickImage.src = "images/icon-".concat(gameType.usersChoice, ".svg");
    // Update computer hand image
    var computerPickImage = document.getElementById('computerPickImage');
    computerPickImage.src = "images/icon-".concat(gameType.computersChoice, ".svg");
    // Update result text
    var decision = document.querySelector('.referee p');
    if (gameType.results === 'win') {
        decision.textContent = 'YOU WIN';
    }
    else if (gameType.results === 'lose') {
        decision.textContent = 'YOU LOSE';
    }
    else {
        decision.textContent = 'DRAW';
    }
    // Hide the gameboard
    var gameboard = document.querySelector('.gameboard');
    gameboard.style.display = 'none';
    var advanceGameboard = document.querySelector('.advance-gameboard');
    advanceGameboard.style.display = 'none';
    // Display contest section
    var contest = document.querySelector('.contest');
    contest.style.display = 'flex';
    // Update user score display
    usersScoreElement.textContent = outcome.usersScore.toString();
};
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
// Event listener for the rules button in advance game mode
advanceMod === null || advanceMod === void 0 ? void 0 : advanceMod.addEventListener('click', showAdvanceRulesPopup);
// Event listener for the close button in advance rules popup
var closeRulesButton = document.querySelector('.heading img');
closeRulesButton === null || closeRulesButton === void 0 ? void 0 : closeRulesButton.addEventListener('click', closeAdvanceRules);
