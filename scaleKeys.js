import { keys } from "./game.js";

export function scaleKeys(e) {
  keys.forEach((key) => {
    if (key.dataset.key.toLowerCase() === e.key.toLowerCase())
      key.classList.add("scale");
  });
}
