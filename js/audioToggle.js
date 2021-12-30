import { audioToggler } from "./app.js";

export const outOfTimeSound = new Audio(`./audio/out-of-time.wav`);

export let isMute;

export function onSounds() {
  isMute = false;
  audioToggler.innerHTML = "<i class='las la-volume-up'></i>";
  generateSound = function (action) {
    isMute = false;
    audioToggler.innerHTML = "<i class='las la-volume-up'></i>";
    const sound = new Audio(`./audio/${action}.wav`);
    sound.play();
    // console.log(sound);
    outOfTimeSound.muted = false;
  };
}

export function muteSounds() {
  isMute = true;
  audioToggler.innerHTML = "<i class='las la-volume-mute'></i>";
  generateSound = (e) => {
    outOfTimeSound.muted = true;
    return e;
  };
}

export let generateSound = function (action) {
  const sound = new Audio(`./audio/${action}.wav`);
  sound.play();
};
