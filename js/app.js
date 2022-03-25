export const correctScore = document.querySelector(".correct");
export const livesRemaining = document.querySelector(".lives");
export const highScore = document.querySelector(".high-score-value");
export const startBtn = document.querySelector(".start-btn");

export const headline = document.querySelector("#headline");
export const themeToggler = document.querySelector(".theme-toggle");
export const audioToggler = document.querySelector(".audio-toggle");

export const secondText = document.querySelector(".second");
export const millisecondText = document.querySelector(".millisecond");
export const roundsLeftText = document.querySelector(".rounds-left");
export const accuracyText = document.querySelector(".accuracy");

// SET INITIAL ITEMS

headline.innerHTML = "start game when you're ready";

// THEME TOGGLE

import { darkMode, lightMode, dark } from "./themeToggle.js";

darkMode();

themeToggler.addEventListener("click", (e) => {
  dark ? lightMode() : darkMode();
});

// AUDIO TOGGLE

import { onSounds, muteSounds, isMute } from "./audioToggle.js";

audioToggler.addEventListener("click", () => {
  isMute ? onSounds() : muteSounds();
});

// START GAME

import { setStartingItems, startGame, start } from "./game.js";

startBtn.addEventListener("click", () => {
  setStartingItems();
});

document.addEventListener("keydown", (e) => {
  if (start) startGame(e);
  // if (e.key.toLowerCase() === "enter") setStartingItems();
});

// OVERLAY AND MODALS BELOW

import { openModal, closeModal } from "./modalActions.js";

export const overlay = document.querySelector(".overlay");
export const highScoreModal = document.querySelector(".modal-high-score");
export const rankingContainer = highScoreModal.querySelector(
  ".ranking-container tbody"
);

const modalBtn = document.querySelector(".modal-btn");

modalBtn.addEventListener("click", openModal);

overlay.addEventListener("click", closeModal);
