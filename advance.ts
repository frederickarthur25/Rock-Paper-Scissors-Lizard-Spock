//Pulling Elements from the DOM
const advanceRules = document.querySelector('.advance-rules') as HTMLElement;
const gameboard = document.querySelector('.gameboard') as HTMLElement;
const advanceButton = document.querySelector('.advance') as HTMLElement;
const advanceMod = document.querySelector('.advance-mod') as HTMLElement;
const bonus = document.querySelector('.title .bonus') as HTMLElement;
const title = document.querySelector('.title img') as HTMLElement;
const advanceGameboard = document.querySelector('.advance-gameboard') as HTMLElement;
const rulesPopup = document.querySelector('.rules-popup') as HTMLElement;
const contest = document.querySelector('.contest') as HTMLElement;
const usersScoreElement = document.getElementById('usersScore') as HTMLHeadingElement;
const userScoreElement = document.getElementById('userScore') as HTMLHeadingElement;

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

type Score = {
  userScore: number;
};

type GameState = {
  userChoice: Choice | null;
  computerChoice: Choice | null;
  result: Result | null;
};

const score: Score = {
  userScore: 0,
};

const choices: Choice[] = ["rock", "paper", "scissors"];

const getRandomChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const determineResult = (userChoice: Choice, computerChoice: Choice): Result => {
  if (userChoice === computerChoice) 
    return "draw";
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return "win";
  }
  return "lose";
};

const updateScore = (result: Result): void => {
  if (result === "win") {
    score.userScore += 1;
    applyWinStyles()
  } else if (result === "lose") {
    score.userScore -= 1;
    applyHouseWinStyles()
  }
};




const playGame = (userChoice: Choice): GameState => {
  const computerChoice = getRandomChoice();
  const result = determineResult(userChoice, computerChoice);
  updateScore(result);

  return {
    userChoice,
    computerChoice,
    result,
  };
};

const toggleGameMode = (mode: "basic" | "advance"): void => {
  const basicGameboard = document.querySelector(".gameboard") as HTMLElement;
  const advanceGameboard = document.querySelector(".advance-gameboard") as HTMLElement;

  if (mode === "basic") {
    basicGameboard.style.display = "flex";
    advanceGameboard.style.display = "none";
  } else {
    basicGameboard.style.display = "none";
    advanceGameboard.style.display = "flex";
  }
};

const advanceModeButton = document.querySelector(".advance") as HTMLButtonElement;

advanceModeButton.addEventListener("click", () => {
  const currentMode = advanceModeButton.textContent!.trim().toLowerCase();
  if (currentMode === "advance") {
    toggleGameMode("basic");
    advanceModeButton.textContent = "Basic";
    gameboard.style.display = 'none';
    advanceGameboard.style.display = 'flex';
    title.style.display = 'none';
    bonus.style.display = 'flex';
    advanceMod.style.display = 'flex';
    rulesPopup.style.display = 'none';
    const rulesButton = document.querySelector('.rules') as HTMLElement;
    rulesButton.style.display = 'none';
    rulesButton.style.pointerEvents = 'none';
    contest.style.display = 'none';
    usersScoreElement.style.display = 'flex'
    userScoreElement.style.display = 'none'
  } else {
    toggleGameMode("advance");
    advanceModeButton.textContent = "Advance";
    gameboard.style.display = 'flex';
    advanceGameboard.style.display = 'none';
    title.style.display = 'flex';
    bonus.style.display = 'none';
    advanceMod.style.display = 'none';
    const rulesButton = document.querySelector('.rules') as HTMLElement;
    rulesButton.style.display = 'flex';
    rulesButton.style.pointerEvents = 'auto';
    advanceButton.style.pointerEvents = 'auto';
    contest.style.display = 'none';
    usersScoreElement.style.display = 'none'
    userScoreElement.style.display = 'flex'
  }
  clearWinStyles();
});


// Function to pick user hand
const pickUserHand = (userChoice: Choice) => {
  const gameState = playGame(userChoice);
  
  // Update user hand image
const userPickImage = document.getElementById('userPickImage') as HTMLImageElement;
userPickImage.src = `images/icon-${gameState.userChoice}.svg`;

// Update computer hand image
const computerPickImage = document.getElementById('computerPickImage') as HTMLImageElement;
computerPickImage.src = `images/icon-${gameState.computerChoice}.svg`;


  // Update result text
  const decision = document.querySelector('.decision p') as HTMLElement;
  if (gameState.result === 'win') {
    decision.textContent = 'YOU WIN';
  } else if (gameState.result === 'lose') {
    decision.textContent = 'YOU LOSE';
  } else {
    decision.textContent = 'DRAW';
  }

   // Hide the gameboard
   const gameboard = document.querySelector('.gameboard') as HTMLElement;
   gameboard.style.display = 'none';
   const advanceGameboard = document.querySelector('.advance-gameboard') as HTMLElement;
   advanceGameboard.style.display = 'none'
 

  // Display contest section
  const contest = document.querySelector('.contest') as HTMLElement;
  contest.style.display = 'flex';

  updateUI()
};


function updateUI() {
  // Update user score display
  const userScoreElement = document.getElementById('userScore') as HTMLHeadingElement;
  userScoreElement.textContent = score.userScore.toString();
}

function restartGame() {
  // Hide the contest section
  const contest = document.querySelector('.contest') as HTMLElement;
  contest.style.display = 'none';

  // Show the appropriate game mode section
  const basicGameboard = document.querySelector('.gameboard') as HTMLElement;
  const advanceGameboard = document.querySelector('.advance-gameboard') as HTMLElement;

  // Check the current game mode
  const advanceButton = document.querySelector('.advance') as HTMLElement;
  const isAdvanceMode = advanceButton.textContent === 'Basic';

  if (isAdvanceMode) {
    advanceGameboard.style.display = 'flex';
  } else {
    basicGameboard.style.display = 'flex';
  };
  clearWinStyles()
}


const winStyle1 = document.querySelector('.win-style-1') as HTMLHeadingElement;
const winStyle2 = document.querySelector('.win-style-2') as HTMLHeadingElement;
const winStyle3 = document.querySelector('.win-style-3') as HTMLHeadingElement;
const winStyle11 = document.querySelector('.winstyle-1') as HTMLHeadingElement;
const winStyle22 = document.querySelector('.winstyle-2') as HTMLHeadingElement;
const winStyle33 = document.querySelector('.winstyle-3') as HTMLHeadingElement;
const userPickImage = document.getElementById('userPickImage') as HTMLImageElement;
const computerPickImage = document.getElementById('computerPickImage') as HTMLImageElement;

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
  const rulesButton = document.querySelector('.rules') as HTMLElement;
  rulesButton.style.pointerEvents = 'none';
  advanceButton.style.pointerEvents = 'none';
}

// Function to close the rules popup
function closeRulesPopup() {
  rulesPopup.style.display = 'none';
  gameboard.style.pointerEvents = 'auto';
  const rulesButton = document.querySelector('.rules') as HTMLElement;
  rulesButton.style.pointerEvents = 'auto';
  advanceButton.style.pointerEvents = 'auto';
}

// Event listener for the rules button in basic game mode
const rulesButton = document.querySelector('.rules');
rulesButton?.addEventListener('click', showRulesPopup);

// Event listener for the close button in rules popup
const closeButton = document.querySelector('.header img');
closeButton?.addEventListener('click', closeRulesPopup);






type handChoice = "rocks" | "papers" | "scissor" | "lizard" | "spock";
type Results = "win" | "lose" | "draw";

type Outcome = {
  usersScore: number;
};

type GameOutcome = {
  usersChoice: handChoice | null;
  computersChoice: handChoice | null;
  results: Results | null;
};

const outcome: Outcome = {
  usersScore: 0,
};

const handOptions: handChoice[] = ["rocks", "papers", "scissor", "lizard", "spock"];

const randomChoice = (): handChoice => {
  const randomIndex = Math.floor(Math.random() * handOptions.length);
  return handOptions[randomIndex];
};

const determineWinner = (usersChoice: handChoice, computersChoice: handChoice): Results => {
  if (usersChoice === computersChoice) return "draw";
  if (
    (usersChoice === "rocks" && (computersChoice === "scissor" || computersChoice === "lizard")) ||
    (usersChoice === "papers" && (computersChoice === "rocks" || computersChoice === "spock")) ||
    (usersChoice === "scissor" && (computersChoice === "papers" || computersChoice === "lizard")) ||
    (usersChoice === "lizard" && (computersChoice === "spock" || computersChoice === "papers")) ||
    (usersChoice === "spock" && (computersChoice === "scissor" || computersChoice === "rocks"))
  ) {
    return "win";
  }
  return "lose";
};


const updateResult = (result: Results): void => {
  if (result === "win") {
    outcome.usersScore += 1;
    applyWinStyles()
  } else if (result === "lose") {
    outcome.usersScore -= 1;
    applyHouseWinStyles()
  }
};


const play = (usersChoice: handChoice): GameOutcome => {
  const computersChoice = randomChoice();
  const results = determineWinner(usersChoice, computersChoice);
  updateResult(results);

  return {
    usersChoice,
    computersChoice,
    results,
  };
};

// Function to pick user hand
const pickUserHands = (usersChoice: handChoice) => {
  const gameType = play(usersChoice);
  
  // Update user hand image
const userPickImage = document.getElementById('userPickImage') as HTMLImageElement;
userPickImage.src = `images/icon-${gameType.usersChoice}.svg`;

// Update computer hand image
const computerPickImage = document.getElementById('computerPickImage') as HTMLImageElement;
computerPickImage.src = `images/icon-${gameType.computersChoice}.svg`;


  // Update result text
  const decision = document.querySelector('.decision p') as HTMLElement;
  if (gameType.results === 'win') {
    decision.textContent = 'YOU WIN';
  } else if (gameType.results === 'lose') {
    decision.textContent = 'YOU LOSE';
  } else {
    decision.textContent = 'DRAW';
  }

   // Hide the gameboard
   const gameboard = document.querySelector('.gameboard') as HTMLElement;
   gameboard.style.display = 'none';
   const advanceGameboard = document.querySelector('.advance-gameboard') as HTMLElement;
   advanceGameboard.style.display = 'none'
 

  // Display contest section
  const contest = document.querySelector('.contest') as HTMLElement;
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
advanceMod?.addEventListener('click', showAdvanceRulesPopup);

// Event listener for the close button in advance rules popup
const closeRulesButton = document.querySelector('.heading img');
closeRulesButton?.addEventListener('click', closeAdvanceRules);
