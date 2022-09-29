const canvas = document.createElement("canvas");
const ctx = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("moz-webgl");
const renderer = ctx.getExtension('WEBGL_debug_renderer_info');
let GPUInfo = null;
renderer ? GPUInfo = ctx.getParameter(renderer.UNMASKED_RENDERER_WEBGL) : '';

const h1 = document.querySelector('h1');
const platformH2 = document.querySelector('#platform');
const vendorH2 = document.querySelector('#vendor');
const productSubH2 = document.querySelector('#productSub');
const jsMemoryH2 = document.querySelector('#jsMemory');
const oscpuH2 = document.querySelector('#oscpu');
const pluginsH2 = document.querySelector('#plugins');
const errorH2 = document.querySelector('#error');
const batteryH2 = document.querySelector('#battery');
const hiddenH2 = document.querySelector('#hidden');
const coresH2 = document.querySelector('#cores');

const platform = navigator.platform;
const vendor = navigator.vendor;
const productSub = navigator.productSub;
const oscpu = navigator.oscpu;
const plugins = navigator.plugins;
const battery = navigator.getBattery;
let jsMemory = '';

function getHiddenFunc(d) {
  try {
    if (d.webkitHidden != undefined)
      return "webkitHidden";
    if (d.msHidden != undefined)
      return "msHidden";
    if (d.mozHidden != undefined)
      return "mozHidden";
    else
      return "n/a";
  } catch (_a) {
    return "n/a";
  }
}

try {
  jsMemory = window.performance.memory.jsHeapSizeLimit;
} catch {}

h1.textContent = 'Platform: ' + platform;
platformH2.textContent = 'GPU info: ' + GPUInfo;
vendorH2.textContent = 'Vendor: ' + vendor;
productSubH2.textContent = 'ProductSub: ' + productSub;
jsMemoryH2.textContent = 'jsMemory: ' + jsMemory;
oscpuH2.textContent = 'oscpu: ' + oscpu;
pluginsH2.textContent = 'oscpu: ' + plugins;
batteryH2.textContent = 'battery: ' + battery;
hiddenH2.textContent = 'hiddenFunc: ' + getHiddenFunc(document);
coresH2.textContent = 'Cores: ' + navigator.hardwareConcurrency;


const originalFunction = HTMLElement.offsetWidth;
const span = document.createElement('span')

HTMLElement.offsetWidth = function() {
  console.log(this);
  originalFunction.apply(this);
}

Object.defineProperty(HTMLElement, 'offsetWidth', {get: () => 11111});
console.log(span.offsetWidth);
console.log(span);

["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3", ]
