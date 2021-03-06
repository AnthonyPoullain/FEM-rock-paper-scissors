// ELEMENTS
const gameboardEl = document.querySelector(".gameboard");
const scoreEl = document.querySelector(".score__number");
const rulesEl = document.querySelector(".rules");
const rulesBtn = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".rules__close");

// GLOBAL VARIABLES
let USER_CHOICE = null;
let COMPUTER_CHOICE = null;
let SCORE = 0;
const choices = ["paper", "scissors", "rock"];

// FUNCTIONS
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
  const choicesHtml = choices.map((choice) => {
    return `
			<div hand-btn>
				<button class="circle circle--${choice}" id="${choice}">
				<img src="./images/icon-${choice}.svg" />
			</button>
			</div>`;
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
  gameboardEl.innerHTML = `
		<div class="gameboard__side">
      <p class="gameboard__label">You picked</p>
      <button class="circle circle--${USER_CHOICE}" id="${USER_CHOICE}">
			<img src="./images/icon-${USER_CHOICE}.svg" />
      </button>
		</div>
		<div class="gameboard__result">
		</div>
		<div class="gameboard__side">
      <p class="gameboard__label">The House picked</p>
      <button class="circle circle--${COMPUTER_CHOICE}" id="${COMPUTER_CHOICE}">
			<img src="./images/icon-${COMPUTER_CHOICE}.svg" />
      </button>
		</div>
	`;
  setTimeout(() => {
    loadResult();
  }, 2000);
}

// Loads the result screen
function loadResult() {
  let result = getResult();
  gameboardEl.style.maxWidth = "1200px";
  const resultEl = document.querySelector(".gameboard__result");
  scoreEl.textContent = SCORE.toString();
  resultEl.innerHTML = `
			<p class="gameboard__result-text">${result}</p>
			<button class="btn gameboard__replay-btn">Play again</button>
	`;
  const replayBtn = document.querySelector(".gameboard__replay-btn");
  replayBtn.addEventListener("click", () => {
    gameboardEl.style.maxWidth = null;
    // If run into problems, use this instead:
    // element.style.removeProperty("maxWidth");
    loadHome();
  });
}

loadHome();

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 27) {
    closeBtn.click();
  }
});

rulesBtn.addEventListener("click", () => {
  rulesEl.classList.remove("rules--hidden");
});

closeBtn.addEventListener("click", () => {
  rulesEl.classList.add("rules--hidden");
});
