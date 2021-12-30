import { keys } from "./game.js";

let allKeys = [];

export let randomKey;

export function generateRandomJiggle() {
  keys.forEach((item) => allKeys.push(item.dataset.key));

  const randomNum = Math.floor(Math.random() * allKeys.length);

  randomKey = allKeys[randomNum];

  keys.forEach((key) => {
    key.classList.remove("wrong");
    key.classList.remove("scale");
    key.classList.remove("jiggle");
    if (key.dataset.key === randomKey) {
      key.classList.add("jiggle");
    }
  });
}
