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
const userScoreElement = document.querySelector('.score h1') as HTMLHeadingElement;
const usersScoreElement = document.querySelector('.score h1') as HTMLHeadingElement;
const winStyle1 = document.querySelector('.win-style-1') as HTMLHeadingElement;
const winStyle2 = document.querySelector('.win-style-2') as HTMLHeadingElement;
const winStyle3 = document.querySelector('.win-style-3') as HTMLHeadingElement;
const winStyle11 = document.querySelector('.winstyle-1') as HTMLHeadingElement;
const winStyle22 = document.querySelector('.winstyle-2') as HTMLHeadingElement;
const winStyle33 = document.querySelector('.winstyle-3') as HTMLHeadingElement;
const userPickImage = document.getElementById('userPickImage') as HTMLImageElement;
const computerPickImage = document.getElementById('computerPickImage') as HTMLImageElement;


// Define an enum for the possible choices
enum HandChoice {
  Rock = 'Group 8 Copy 2.svg',
  Paper = 'Group 8.svg',
  Scissors = 'Group 8 Copy.svg',
}
enum HandChoices {
  Rocks = 'icon-rock.svg',
  Papers = 'icon-paper.svg',
  Scissor = 'icon-scissors.svg',
  Lizard = 'icon-lizard.svg',
  Spock = 'icon-spock.svg',
}

let userScore: number = parseInt(localStorage.getItem('userScore') || '0');
let usersScore: number = parseInt(localStorage.getItem('userScore') || '0');
let userChoice: HandChoice;
let computerChoice: HandChoice;
let userChoices: HandChoices;
let computerChoices: HandChoices;

// Function to randomly select computer's hand in Basic Mode
function getComputerHand(): HandChoice {
  const choices: HandChoice[] = [
    HandChoice.Rock,
    HandChoice.Paper,
    HandChoice.Scissors,
  ];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}


// Function to determine the winner and update scores in Basic Mode
function determineWinner() {
  if (userChoice === computerChoice) {
    // It's a draw
    clearWinStyles();
    return 'draw';
  } else if (
    (userChoice === HandChoice.Rock && computerChoice === HandChoice.Scissors) ||
    (userChoice === HandChoice.Paper && computerChoice === HandChoice.Rock) ||
    (userChoice === HandChoice.Scissors && computerChoice === HandChoice.Paper)
  ) {
    // User wins
    userScore++;
    localStorage.setItem('userScore', userScore.toString());
    applyWinStyles();
    return 'hand';
  } else {
    // Computer wins
    applyHouseWinStyles();
    return 'house';
  }
}


// Function to handle user's hand selection for Basic Mode
function pickUserHand(choices: HandChoice) {
  userChoice = choices;
  computerChoice = getComputerHand();
  const winner = determineWinner();

  // Display the results
  const referee = document.querySelector('.referee h1') as HTMLHeadingElement;
  referee.textContent = winner === 'draw' ? "It's a draw" : `You ${winner === 'hand' ? 'Win' : 'Lose'}`;
  
  // Hide the gameboard
  const gameboard = document.querySelector('.gameboard') as HTMLElement;
  gameboard.style.display = 'none';
  advanceGameboard.style.display = 'none'

  // Show the contest section
  const contest = document.querySelector('.contest') as HTMLElement;
  contest.style.display = 'flex';

 

  // Update the UI
  

  // Display the results in the referee section
  referee.style.display = 'flex';
  referee.textContent =
    winner === 'draw' ? "It's a draw" : `You ${winner === 'hand' ? 'Win' : 'Lose'}`;

    updateUI();

}


// Function to update the game UI Basic Mode
function updateUI() {
  userPickImage.src = `images/${userChoice}`;
  computerPickImage.src = `images/${computerChoice}`;
  userScoreElement.textContent = userScore.toString();
}


// Event listener for hand selections in basic game mode
const rockBtn = document.querySelector('.rock img');
const paperBtn = document.querySelector('.paper img');
const scissorsBtn = document.querySelector('.scissors img');

rockBtn?.addEventListener('click', () => pickUserHand(HandChoice.Rock));
paperBtn?.addEventListener('click', () => pickUserHand(HandChoice.Paper));
scissorsBtn?.addEventListener('click', () => pickUserHand(HandChoice.Scissors));

// Event listener for the "Play Again" button in basic game mode
const newGameBtn = document.querySelector('.newGame');
newGameBtn?.addEventListener('click', restartGame);

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

// Function to update the game UI for Advance Mode
function updateUIs() {
  userPickImage.src = `images/${userChoices}`;
  computerPickImage.src = `images/${computerChoices}`;
  userScoreElement.textContent = usersScore.toString();
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
  const isAdvanceMode = advanceButton.textContent === 'BASIC MODE';

  if (isAdvanceMode) {
    advanceGameboard.style.display = 'flex';
  } else {
    basicGameboard.style.display = 'flex';
  }
  clearWinStyles();
}


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




// Function to randomly select computer's hand in Advance Mode
function getComputersHand(): HandChoices {
  const choice: HandChoices[] = [
    HandChoices.Rocks,
    HandChoices.Papers,
    HandChoices.Scissor,
  ];
  const randomIndex = Math.floor(Math.random() * choice.length);
  return choice[randomIndex];
}

// Function to determine the winner and update scores of Advance Mode
function determineWinners() {
  if (userChoices === computerChoices) {
    // It's a draw
    clearWinStyles();
    return 'draw';
  }if (
    (userChoices === HandChoices.Rocks &&
      (computerChoices === HandChoices.Scissor || computerChoices === HandChoices.Lizard)) ||
    (userChoices === HandChoices.Papers &&
      (computerChoices === HandChoices.Rocks || computerChoices === HandChoices.Spock)) ||
    (userChoices === HandChoices.Scissor &&
      (computerChoices === HandChoices.Papers || computerChoices === HandChoices.Lizard)) ||
    (userChoices === HandChoices.Lizard &&
      (computerChoices === HandChoices.Papers || computerChoices === HandChoices.Spock)) ||
    (userChoices === HandChoices.Spock &&
      (computerChoices === HandChoices.Rocks || computerChoices === HandChoices.Scissor))
  ) {
    // User wins
    usersScore++;
    localStorage.setItem('userScore', userScore.toString());
    applyWinStyles();
    return 'user';
  } else {
    // Computer wins
    applyHouseWinStyles();
   
    return 'house';
  }
}

// Function to handle user's hand selection for Advance Mode
function pickUserHands(choice: HandChoices) {
  userChoices = choice;
  computerChoices = getComputersHand();
  const winners = determineWinners();

  // Display the results
  const referee = document.querySelector('.referee h1') as HTMLHeadingElement;
  referee.textContent =
  winners === 'draw' ? "It's a draw" : `You ${winners === 'user' ? 'Win' : 'Lose'}`;
    // Show the win style for the winner, and hide it for the loser
  
  // Show the gameboard
  const gameboard = document.querySelector('.gameboard') as HTMLElement;
  gameboard.style.display = 'none';
  advanceGameboard.style.display = 'none'

  // Show the contest section
  const contest = document.querySelector('.contest') as HTMLElement;
  contest.style.display = 'flex';

  // Update the UI
  updateUIs();
}


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
advanceButton?.addEventListener('click', () => {
  if (advanceButton.textContent === 'BASIC MODE') {
    // Exit Advance Mode
    gameboard.style.display = 'flex';
    advanceGameboard.style.display = 'none';
    title.style.display = 'flex';
    bonus.style.display = 'none';
    advanceMod.style.display = 'none';
    advanceButton.textContent = 'ADVANCE MODE'; // Update the text content of the button
    const rulesButton = document.querySelector('.rules') as HTMLElement;
    rulesButton.style.display = 'flex';
    rulesButton.style.pointerEvents = 'auto';
    advanceButton.style.pointerEvents = 'auto';
    contest.style.display = 'none';
  } else {
    // Enter Advance Mode
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
    advanceButton.textContent = 'BASIC MODE'; // Update the text content of the button
  }
  clearWinStyles();
});


// Event listener for the rules button in advance game mode
advanceMod?.addEventListener('click', showAdvanceRulesPopup);

// Event listener for the close button in advance rules popup
const closeRulesButton = document.querySelector('.heading img');
closeRulesButton?.addEventListener('click', closeAdvanceRules);

// Event listeners for hand selections in advance game mode
const lizardBtn = document.querySelector('.lizard img');
const spockBtn = document.querySelector('.spock img');
const rocksBtn = document.querySelector('.rocks img');
const papersBtn = document.querySelector('.papers img');
const scissorBtn = document.querySelector('.scissor img');



lizardBtn?.addEventListener('click', () => pickUserHands(HandChoices.Lizard));
spockBtn?.addEventListener('click', () => pickUserHands(HandChoices.Spock));
rocksBtn?.addEventListener('click', () => pickUserHands(HandChoices.Rocks));
papersBtn?.addEventListener('click', () => pickUserHands(HandChoices.Papers));
scissorBtn?.addEventListener('click', () => pickUserHands(HandChoices.Scissor));
