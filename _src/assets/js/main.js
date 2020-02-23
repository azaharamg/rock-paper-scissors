"use strict";

const choices = document.querySelectorAll(".main__choices-img");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const scoreboard = {
  player: 0,
  computer: 0
};

//Get computers choice
const getComputerChoice = () => {
  const random = Math.random();
  if (random < 0.34) {
    return "rock";
  } else if (random < 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
};

// Get game winner
const getWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return "draw";
  } else if (playerChoice === "rock") {
    if (computerChoice === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
};

// Show winner
const showWinner = (winner, computerChoice) => {
  if (winner === "player") {
    //Inc player score
    scoreboard.player++;
    //Show modal result
    result.innerHTML = `
    <h1 class="modal__content-title win">You Win</h1>
    <img
      class="main__choices-img"
      id=${computerChoice}
      src="./assets/images/icon-${computerChoice}.svg"
      alt=${computerChoice}
    />
    <p class="modal__content-paragraph">Computer Chose <strong>
    ${computerChoice.charAt(0).toUpperCase() +
      computerChoice.slice(1)}<strong></p>`;
  } else if (winner === "computer") {
    //Inc computer score
    scoreboard.computer++;
    //Show modal result
    result.innerHTML = `
     <h1 class="modal__content-title lose">You Lose</h1>
     <img
       class="main__choices-img"
       id=${computerChoice}
       src="./assets/images/icon-${computerChoice}.svg"
       alt=${computerChoice}
     />
     <p class="modal__content-paragraph">Computer Chose <strong>
     ${computerChoice.charAt(0).toUpperCase() +
       computerChoice.slice(1)}<strong></p>
     `;
  } else {
    result.innerHTML = `
     <h1 class="modal__content-title">It's A Draw</h1>
     <img
       class="main__choices-img"
       id=${computerChoice}
       src="./assets/images/icon-${computerChoice}.svg"
       alt=${computerChoice}
     />
     <p class="modal__content-paragraph">Computer Chose <strong>
     ${computerChoice.charAt(0).toUpperCase() +
       computerChoice.slice(1)}<strong></p>
     `;
  }
  // Show score
  score.innerHTML = `
  <p>Player: ${scoreboard.player}</p>
  <p>Computer: ${scoreboard.computer}</p>
  `;

  modal.style.display = "block";
};

// Play game
const play = e => {
  restart.style.display = "inline-block";
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  showWinner(winner, computerChoice);
};

//Clear modal
const clearModal = e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

//Restart game
const restartGame = () => {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
};

// Event listeners
choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);
