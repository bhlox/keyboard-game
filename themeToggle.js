import { themeToggler } from "./app.js";

const [...allKeyboardKeys] = document.querySelectorAll(".key");
const container = document.querySelector(".container");
const keyboard = document.querySelector(".keyboard");
const timer = document.querySelector(".timer");

export let dark;

export function darkMode() {
  dark = true;
  themeToggler.innerHTML = "<i class='las la-moon'></i>";
  [container, timer, keyboard, ...allKeyboardKeys].forEach((item) => {
    item.classList.add("night");
  });
}

export function lightMode() {
  dark = false;
  themeToggler.innerHTML = "<i class='las la-sun'></i>";
  [container, timer, keyboard, ...allKeyboardKeys].forEach((item) => {
    item.classList.remove("night");
  });
}
