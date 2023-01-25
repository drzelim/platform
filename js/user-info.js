import {fpCanvas} from "./canvas-fp-yandex.js";

const container = document.querySelector('.container');

const obj = {
  userAgent: navigator.userAgent,
  userScreenWidth: window.screen.width,
  userScreenHeight: window.screen.height,
  deviceScaleFactorNumber: window.devicePixelRatio,
  fpCanvas
};

Object.keys(obj).forEach(key => {
  const h3 = document.createElement('h3');
  h3.textContent = key + ': ' + obj[key];
  container.appendChild(h3);
});
