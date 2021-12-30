const highScoreModal = document.querySelector(".modal-high-score");

export const leaderboardData = localStorage.getItem("leaderboard")
  ? JSON.parse(localStorage.getItem("leaderboard"))
  : [];

const headline = highScoreModal.querySelector(".headline");
if (!leaderboardData.length)
  headline.insertAdjacentText("beforeend", "BE THE FIRST TO LOG A HIGH SCORE!");
