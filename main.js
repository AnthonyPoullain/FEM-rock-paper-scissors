// ELEMENTS
const gameboardEl = document.querySelector(".gameboard");
const scoreEl = document.querySelector(".score__number");

// GLOBAL VARIABLES
let USER_CHOICE = null;
let COMPUTER_CHOICE = null;
let SCORE = 0;
const choices = ["paper", "scissors", "rock"];

// FUNCTIONS
function setClass(screen) {
  gameboardEl.classList.remove("gameboard--home");
  gameboardEl.classList.remove("gameboard--play");
  gameboardEl.classList.remove("gameboard--results");

  gameboardEl.classList.add(`gameboard--${screen}`);
}

function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function getResult() {
  if (USER_CHOICE === COMPUTER_CHOICE) {
    return "Draw";
  } else if (USER_CHOICE === "paper" && COMPUTER_CHOICE === "rock") {
    SCORE += 1;
    return "You win";
  } else if (USER_CHOICE === "rock" && COMPUTER_CHOICE === "scissors") {
    SCORE += 1;
    return "You win";
  } else if (USER_CHOICE === "scissors" && COMPUTER_CHOICE === "paper") {
    SCORE += 1;
    return "You win";
  } else {
    SCORE -= 1;
    return "You lose";
  }
}

// Loads the homescreen, where player chooses his hand
function loadHome() {
  setClass("home");
  const choicesHtml = choices.map((choice) => {
    return `
		<button class="circle circle--${choice}" id="${choice}">
			<img src="./images/icon-${choice}.svg" />`;
  });
  gameboardEl.innerHTML =
    `<img class="gameboard__triangle" src="./images/bg-triangle.svg" />
		` + choicesHtml.join("");

  const circleEl = document.querySelectorAll(".circle");
  circleEl.forEach((circle) => {
    circle.addEventListener("click", () => {
      USER_CHOICE = circle.id;
      COMPUTER_CHOICE = getComputerChoice();
      loadPlay();
    });
  });
}

// Loads the play screen, where the fight happens
function loadPlay() {
  setClass("play");
  gameboardEl.innerHTML = `
		<div class="gameboard__user-side">
      <p class="gameboard__label">You picked</p>
      <button class="circle circle--${USER_CHOICE}" id="${USER_CHOICE}">
			<img src="./images/icon-${USER_CHOICE}.svg" />
      </button>
		</div>
		<div class="gameboard__result">
		</div>
		<div class="gameboard__computer-side">
      <p class="gameboard__label">The House picked</p>
      <button class="circle circle--${COMPUTER_CHOICE}" id="${COMPUTER_CHOICE}">
			<img src="./images/icon-${COMPUTER_CHOICE}.svg" />
      </button>
		</div>
	`;
  setTimeout(() => {
    loadResult();
  }, 3000);
}

// Loads the result screen
function loadResult() {
  setClass("result");
  let result = getResult();
  const resultEl = document.querySelector(".gameboard__result");
  scoreEl.textContent = SCORE.toString();
  resultEl.innerHTML = `
			<p gameboard__result-text>${result}</p>
			<button class="gameboard__replay-btn">Play again</button>
	`;
  const replayBtn = document.querySelector(".gameboard__replay-btn");
  replayBtn.addEventListener("click", () => {
    loadHome();
  });
}

loadHome();
