import {
  headline,
  correctScore,
  livesRemaining,
  secondText,
  millisecondText,
  roundsLeftText,
  accuracyText,
  startBtn,
} from "./app.js";

import { difficultyContainer, difficulty } from "./setDifficulty.js";

import { generateSound, outOfTimeSound } from "./audioToggle.js";

import { scaleKeys } from "./scaleKeys.js";

import { generateRandomJiggle, randomKey } from "./randomKey.js";

import { leaderboardData } from "./leaderBoard.js";

import { logNewHighScore } from "./newHighScore.js";

export const keys = document.querySelectorAll("[data-key]:not(.utility)");

const rounds = document.querySelector(".rounds");
const score2 = document.querySelector(".score2");

export let total,
  roundsLeft,
  lives,
  second,
  millisecond,
  mistakes,
  correct,
  start,
  isTimeStarting,
  tick,
  wrong,
  accuracy,
  playerStats;

export function setStartingItems() {
  if (!start) {
    if (difficulty === "easy") {
      total = 20;
      roundsLeft = 20;
      lives = 15;
      [second, millisecond] = [45, 0];
    }
    if (difficulty === "normal") {
      total = 30;
      roundsLeft = 30;
      lives = 7;
      [second, millisecond] = [30, 0];
    }
    if (difficulty === "hard") {
      total = 42;
      roundsLeft = 42;
      lives = 5;
      [second, millisecond] = [25, 0];
    }
    if (difficulty === "rank") {
      total = 0;
      roundsLeft = Infinity;
      lives = Infinity;
      [second, millisecond] = [120, 0];

      [rounds, score2].forEach((el) => (el.style.visibility = "hidden"));
    }

    mistakes = 0;
    correct = 0;
    start = true;

    headline.innerHTML = "press key to start timer";
    correctScore.textContent = correct;
    livesRemaining.textContent = lives;
    secondText.textContent = String(second).padStart(2, "0");
    millisecondText.textContent = String(millisecond).padStart(2, "0");
    roundsLeftText.textContent = roundsLeft;
    difficultyContainer.classList.add("hidden");

    generateRandomJiggle();

    keys.forEach((letter) => {
      if (letter.classList.contains("jiggle")) {
        letter.focus();
        letter.addEventListener(
          "keydown",
          () => {
            // console.log("yes");
            tick = setInterval(startTime, 10);
          },
          { once: true }
        );
      }
    });
  }
}

// START TIME FUNCTION

function startTime() {
  isTimeStarting = true;
  millisecond--;
  if (millisecond === -1) {
    millisecond = 99;
    second--;
    if (second === 8) {
      outOfTimeSound.play();
    }
    if (second === -1 && millisecond === 99) {
      second = 0;
      millisecond = 0;
      clearInterval(tick);
      endGame();
    }
  }

  secondText.textContent = String(second).padStart(2, "0");
  millisecondText.textContent = String(millisecond).padStart(2, "0");
}

export function startGame(e) {
  headline.innerHTML = "focus";
  scaleKeys(e);
  e.key.toLowerCase() !== randomKey.toLowerCase()
    ? pressedWrong(e)
    : pressedCorrect(e);
}

function pressedWrong(e) {
  lives--;
  mistakes++;
  wrong = e.key.toLowerCase();

  generateSound("wrong");
  keys.forEach((key) => {
    if (key.dataset.key.toLowerCase() === wrong) {
      key.classList.add("wrong");
    }
  });
  if (lives === -1) {
    clearInterval(tick);
    endGame();
  }
  updateScore();
}

function pressedCorrect() {
  correct++;
  roundsLeft--;

  generateSound("correct");
  generateRandomJiggle();
  updateScore();
  if (roundsLeft === 0) noMoreRounds();
}

function updateScore() {
  accuracy = (correct / (correct + mistakes)) * 100;

  accuracyText.textContent = Math.floor(accuracy);
  correctScore.textContent = correct;
  roundsLeftText.textContent = roundsLeft;
  livesRemaining.textContent = lives;

  if (lives === -1) livesRemaining.textContent = "0";
}

function endGame(e) {
  if (isTimeStarting) {
    outOfTimeSound.pause();
    outOfTimeSound.currentTime = 0;

    isTimeStarting = false;
    generateSound("end");
    start = false;

    if (difficulty === "rank") {
      total = mistakes + correct;
      playerStats = {
        name: "player",
        score: correct,
        accuracy: accuracy.toFixed(2) + "%",
        grade: (correct * 0.7 + accuracy * 0.3).toFixed(2),
      };

      if (!leaderboardData.length || leaderboardData.length < 10) {
        logNewHighScore();
      }

      if (
        leaderboardData.length === 10 &&
        leaderboardData.some((item) => item.grade < playerStats.grade)
      ) {
        // console.log("yes there is");

        leaderboardData.pop();

        logNewHighScore();
      }
      [rounds, score2].forEach((el) => (el.style.visibility = "initial"));
    }

    headline.innerHTML = `game over! your score: ${correct} / ${total} with an accuracy of ${Math.floor(
      accuracy
    )}% <br> try again?`;
    startBtn.focus();
    difficultyContainer.classList.remove("hidden");
  }
}

// ROUNDS LEFT

function noMoreRounds() {
  endGame();
  clearInterval(tick);
  headline.innerHTML = `you've cleared the round! your score: ${correct} with an accuracy of ${accuracy}% <br> try again? press ENTER or start button`;
}
