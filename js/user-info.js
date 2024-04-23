// import {yandexFpCanvas} from "./canvas-fp-yandex.js";
import {fpCanvas} from "./canvas-fp.js";

const container = document.querySelector('.container');

const obj = {
  userAgent: navigator.userAgent,
  userScreenWidth: window.screen.width,
  userScreenHeight: window.screen.height,
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  deviceScaleFactorNumber: window.devicePixelRatio,
  language: navigator.language,
  languages: navigator.languages,
  // yandexFpCanvas
  // fpCanvas
};

Object.keys(obj).forEach(key => {
  const h3 = document.createElement('h3');
  h3.textContent = key + ': ' + obj[key];
  container.appendChild(h3);
});
