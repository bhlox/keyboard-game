import { leaderboardData } from "./leaderBoard.js";

const highScoreModal = document.querySelector(".modal-high-score");
const rankingContainer = highScoreModal.querySelector(
  ".ranking-container tbody"
);

export function loadRanking(category) {
  // console.log("sorting and loading rank");
  rankingContainer.innerHTML = "";
  leaderboardData
    .sort((a, b) => b[category] - a[category])
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
}
