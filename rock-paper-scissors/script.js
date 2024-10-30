let computerScore = 0;
let playerScore = 0;

function getComputerChoice () {
// Select a move (Rock, Paper or Scissors) randomly from the computer

    // Return a random int between 0 and 2
    let randInt = Math.floor(Math.random() * (2 - 0 + 1) + 0);

    // Assign random number to a move and display in the UI
    switch (randInt) {
        case 1:
            return "paper";
            break;
        
        case 2:
            return "scissors"; 
            break;
    
        default:
            return "rock";
            break;
    }
}


function displayComputerChoice(computerChoice) {
// Display the computer choice in the UI

let computerChoiceIcon = document.getElementById("computer-choice-icon");

    switch (computerChoice) {
        case "paper":
            computerChoiceIcon.textContent = "📄";
            break;
        
        case "scissors":
            computerChoiceIcon.textContent = "✂️";
            break;
    
        default:
            computerChoiceIcon.textContent = "🪨";
            break;
    }
}


function playRound(computerSelection, playerSelection) {
// Return the winner of a specific round by comparing the move of the player and the computer.

    if (computerSelection == playerSelection) {
       return "It's a tie";
    }
    else if (computerSelection == "rock") {
        if (playerSelection == "paper") {
            return "You Win! Paper beats Rock";
        }
        else {
            return "You Lose! Rock beats Scissors";
        }
    }
    else if (computerSelection == "paper") {
        if (playerSelection == "scissors") {
            return "You Win! Scissors beats Paper";
        }
        else {
            return "You Lose! Paper beats Rock";
        }
    }
    else {
        if (playerSelection == "rock") {
            return "You Win! Rock beats Scissors";
        }
        else {
            return "You Lose! Scissors beats Paper";
        }
    }
}


function playGame(playerChoice) {
// Initiate a round of Rock Paper Scissors when the user clicks on an incon and display the winner. 

    // Get computer choice randomly
    const computerChoice = getComputerChoice();
    displayComputerChoice(computerChoice);

    // Play a round and display results 
    let results = playRound(computerChoice, playerChoice);
    let resultsDisplay = document.querySelector("#results h3");
    resultsDisplay.textContent = results;
    
    // Keep track and display the score
    updateScore(results);
    displayScore();

    if (computerScore == 5 || playerScore == 5) {
        displayWinner();
    }
}


function updateScore(results) {
// Keep track of the score of each player

    if (results.startsWith("Win", 4)) {
        playerScore++;
    }
    else if (results.startsWith("Lose", 4)){
        computerScore++;
    }
    else {
        return;
    } 
}


function displayScore() {
// Update scores in the UI

    let playerScoreDisplay = document.getElementById("player-score");
    let computerScoreDisplay = document.getElementById("computer-score");

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore; 
}


function displayWinner() {
// Display the winner of the game based on who has the highest score

    let sectionToDisplay = document.getElementById("endgame");
    let sectionToHide = document.getElementById("results");
    let winnerDisplay = document.querySelector("#endgame h2");

    // Disable click on buttons
    rock.setAttribute("disabled", "");
    paper.setAttribute("disabled", "");
    scissors.setAttribute("disabled", "");

    // Hide section with the scores and replace it with the section with the winner
    sectionToHide.style.display = "none";
    sectionToDisplay.style.display = "flex";
    
    if (computerScore === 5) {
        winnerDisplay.textContent = "Computer Wins! " + computerScore + "/" + playerScore;
    }
    else {
        winnerDisplay.textContent = "You Win! " + playerScore + "/" + computerScore; 
    }
}

function resetGame() {
// Reset scores and start a new game
    playerScore = 0;
    computerScore = 0;

    // Refresh scores, if this is ommited, the page will keep displaying old scores. 
    displayScore();
    document.querySelector("#results h3").textContent = "";

    // Enable click on buttons
    rock.removeAttribute("disabled", "");
    paper.removeAttribute("disabled", "");
    scissors.removeAttribute("disabled", "");

    // Hide section with the winner and replace it with the section with the scores
    let sectionToDisplay = document.getElementById("results");
    let sectionToHide = document.getElementById("endgame");

    sectionToHide.style.display = "none";
    sectionToDisplay.style.display = "block";
}


// Project variables
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const playAgain = document.getElementById("play-again");

// Event listeners
rock.addEventListener("click", (event) => {
    const playerSelection = "rock";
    playGame(playerSelection);
});

paper.addEventListener("click", (event) => {
    const playerSelection = "paper";
    playGame(playerSelection);
});

scissors.addEventListener("click", (event) => {
    const playerSelection = "scissors";
    playGame(playerSelection);
});

playAgain.addEventListener("click", resetGame);
