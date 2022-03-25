const easyBtn = document.querySelector("#easy-btn");
const normalBtn = document.querySelector("#normal-btn");
const hardBtn = document.querySelector("#hard-btn");
const rankBtn = document.querySelector("#rank-btn");

export const difficultyContainer = document.querySelector(
  ".difficulty-container"
);

export let difficulty = "normal";

[easyBtn, normalBtn, hardBtn, rankBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    difficulty = e.target.value;
    // console.log(difficulty);
  });
});
