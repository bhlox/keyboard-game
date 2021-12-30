import { overlay } from "./app.js";

import { leaderboardData } from "./leaderBoard.js";

const highScoreModal = document.querySelector(".modal-high-score");
const rankingContainer = highScoreModal.querySelector(
  ".ranking-container tbody"
);
const sortAlert = highScoreModal.querySelector(".sort-alert");

const sortscoreBtn = highScoreModal.querySelector(".sort-score");

let sortedByGrade = false;

sortscoreBtn.addEventListener("click", () =>
  loadRanking("score", !sortedByGrade)
);

export function openModal() {
  overlay.classList.remove("hidden");
  highScoreModal.classList.remove("hidden");
  loadRanking();
}

export function closeModal() {
  overlay.classList.add("hidden");
  highScoreModal.classList.add("hidden");
  loadRanking();
}

function loadRanking() {
  // console.log("sorting and loading rank");
  rankingContainer.innerHTML = "";
  if (!sortedByGrade) {
    leaderboardData
      .sort((a, b) => b.grade - a.grade)
      .map((item, i) => {
        rankingContainer.insertAdjacentHTML(
          "beforeend",
          `
          <td>${i + 1}</td>
          <td>${item.name}</td>
          <td>${item.score}</td>
          <td>${item.accuracy}</td>
          <td>${item.grade}</td>
      `
        );
      });
    sortAlert.classList.remove("hidden");
    sortAlert.textContent = "sorted by grade";
    sortscoreBtn.textContent = "sort by score";
  }
  if (sortedByGrade) {
    leaderboardData
      .sort((a, b) => b.score - a.score)
      .map((item, i) => {
        rankingContainer.insertAdjacentHTML(
          "beforeend",
          `
          <td>${i + 1}</td>
          <td>${item.name}</td>
          <td>${item.score}</td>
          <td>${item.accuracy}</td>
          <td>${item.grade}</td>
      `
        );
      });
    sortAlert.classList.remove("hidden");
    sortAlert.textContent = "sorted by score";
    sortscoreBtn.textContent = "sort by grade";
  }
  setTimeout(function () {
    sortAlert.classList.add("hidden");
  }, 1000);

  sortedByGrade = !sortedByGrade;
  // console.log(sortedByGrade);
}
