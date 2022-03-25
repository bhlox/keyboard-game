import { openModal } from "./modalActions.js";
import { leaderboardData } from "./leaderBoard.js";
import { playerStats } from "./game.js";

const overlayHighScore = document.querySelector(".overlay-new-high-score");
const newHighScoreModal = document.querySelector(".new-high-score-modal");
const inputName = newHighScoreModal.querySelector("#player-name");
const newHighScoreForm = document.querySelector(".new-high-score-modal form");

export function logNewHighScore() {
  [overlayHighScore, newHighScoreModal].forEach((item) =>
    item.classList.remove("hidden")
  );
  inputName.focus();
  inputName.value = "";
}

newHighScoreForm.addEventListener("submit", (e) => {
  // console.log("submitted name");
  e.preventDefault();
  playerStats.name = inputName.value;
  leaderboardData.push(playerStats);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
  [overlayHighScore, newHighScoreModal].forEach((item) =>
    item.classList.add("hidden")
  );
  openModal();
});
