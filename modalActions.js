import { overlay } from "./app.js";

import { loadRanking } from "./loadRanking.js";

import { leaderboardData } from "./leaderBoard.js";

const highScoreModal = document.querySelector(".modal-high-score");

const sortscoreBtn = highScoreModal.querySelector(".sort-score");

sortscoreBtn.addEventListener("click", () => loadRanking("score"));

export function openModal() {
  overlay.classList.remove("hidden");
  highScoreModal.classList.remove("hidden");
  loadRanking("grade");
}

export function closeModal() {
  overlay.classList.add("hidden");
  highScoreModal.classList.add("hidden");
  loadRanking("grade");
}
