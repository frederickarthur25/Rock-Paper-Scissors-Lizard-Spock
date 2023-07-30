// Define an enum for the possible choices
enum HandChoice {
  Rock = 'Group 8 Copy 2.svg',
  Paper = 'Group 8.svg',
  Scissors = 'Group 8 Copy.svg',
}

let computerScore = 0
let userScore = 0;
let userChoice: HandChoice 
let computerChoice: HandChoice 

// Function to randomly select computer's hand
function getComputerHand(): HandChoice {
  const choices: HandChoice[] = [HandChoice.Rock, HandChoice.Paper, HandChoice.Scissors];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to determine the winner and update scores
function determineWinner() {
  if (userChoice === computerChoice) {
    // It's a draw
    return 'draw';
  } else if (
    (userChoice === HandChoice.Rock && computerChoice === HandChoice.Scissors) ||
    (userChoice === HandChoice.Paper && computerChoice === HandChoice.Rock) ||
    (userChoice === HandChoice.Scissors && computerChoice === HandChoice.Paper)
  ) {
    // User wins
    userScore++;
    return 'user';
  } else {
    // Computer wins
    computerScore = 1 - userScore;
    return 'computer';
  }
}



// Function to update the game UI
function updateUI() {
  const userPickImage = document.getElementById('userPickImage') as HTMLImageElement;
  const computerPickImage = document.getElementById('computerPickImage') as HTMLImageElement;
  const userScoreElement = document.querySelector('.score h1') as HTMLHeadingElement;

  userPickImage.src = `images/${userChoice}`;
  computerPickImage.src = `images/${computerChoice}`;
  userScoreElement.textContent = userScore.toString();
}

// Function to handle user's hand selection
function pickUserHand(choice: HandChoice) {
  userChoice = choice;
  computerChoice = getComputerHand();
  const winner = determineWinner();

  // Display the results
  const referee = document.querySelector('.referee h1') as HTMLHeadingElement;
  referee.textContent = winner === 'draw' ? 'It\'s a draw' : `You ${winner === 'user' ? 'Win' : 'Lose'}`;

  // Show the gameboard
  const gameboard = document.querySelector('.gameboard') as HTMLElement;
  gameboard.style.display = 'none';

  // Show the contest section
  const contest = document.querySelector('.contest') as HTMLElement;
  contest.style.display = 'flex';

  // Update the UI
  updateUI();
}

// Function to restart the game
function restartGame() {
  // Hide the contest section
  const contest = document.querySelector('.contest') as HTMLElement;
  contest.style.display = 'none';

  // Show the gameboard
  
  gameboard.style.display = 'flex';
}

const gameboard = document.querySelector('.gameboard') as HTMLElement;
const advanceGameboard = document.querySelector('.advance-gameboard') as HTMLElement;
const rulesPopup = document.querySelector('.rules-popup') as HTMLElement;
const advanceRules = document.querySelector('.advance-rules') as HTMLElement;
const rulesButton = document.querySelector('.rules') as HTMLElement;
const closeButton = document.querySelector('.header img') as HTMLElement;
const closeRulesButton= document.querySelector('.heading img') as HTMLElement;
const advanceButton = document.querySelector('.advance') as HTMLElement;
const title = document.querySelector('.title img') as HTMLElement;
const bonus = document.querySelector('.title .bonus') as HTMLElement;
const advanceMod = document.querySelector('.advance-mod') as HTMLElement;

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


let change = true
// Function to show the Advance rules popup
function showAdvanceModePopup() {
 if(change){
    rulesPopup.style.display = 'none';
    rulesButton.style.display = 'none';
    advanceMod.style.display = 'flex'
    gameboard.style.display = 'none'
    advanceGameboard.style.display = 'flex'
    title.style.display = 'none'
    bonus.style.display = 'flex'
    rulesButton.style.pointerEvents = 'none';
    advanceButton.textContent = 'DEMO MODE'
    change = false;
 } else {
    rulesButton.style.display = 'flex';
    advanceMod.style.display = 'none'
    gameboard.style.display = 'flex'
    advanceGameboard.style.display = 'none'
    title.style.display = 'flex'
    bonus.style.display = 'none'
    rulesButton.style.pointerEvents = 'auto';
    advanceButton.style.pointerEvents = 'auto';
    change = true;
    advanceButton.textContent = 'ADVANCE MODE'
 }
}

function showAdvanceRulesPopup() {
  advanceRules.style.display = 'flex'
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
advanceMod.addEventListener('click', showAdvanceRulesPopup)
closeRulesButton.addEventListener('click', closeAdvanceRules);


// Event listener for the rules button
rulesButton.addEventListener('click', showRulesPopup);
closeButton.addEventListener('click', closeRulesPopup);

// Event listeners for hand selections
const rockBtn = document.querySelector('.rock img');
const paperBtn = document.querySelector('.paper img');
const scissorsBtn = document.querySelector('.scissors img');

rockBtn?.addEventListener('click', () => pickUserHand(HandChoice.Rock));
paperBtn?.addEventListener('click', () => pickUserHand(HandChoice.Paper));
scissorsBtn?.addEventListener('click', () => pickUserHand(HandChoice.Scissors));
