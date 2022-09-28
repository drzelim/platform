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

const platform = navigator.platform;y
const vendor = navigator.vendor;
const productSub = navigator.productSub;
const oscpu = navigator.oscpu;
let jsMemory = '';

try {
  jsMemory = window.performance.memory.jsHeapSizeLimit;
} catch {}

h1.textContent = 'Platform: ' + platform;
platformH2.textContent = 'GPU info: ' + GPUInfo;
vendorH2.textContent = 'Vendor: ' + vendor;
productSubH2.textContent = 'ProductSub: ' + productSub;
jsMemoryH2.textContent = 'jsMemory: ' + jsMemory;
oscpuH2.textContent = 'jsMemory: ' + oscpu;

// 2172649472
// 4294705152
// 3760000000
// 2190000000

// 1136000000 - Mobile
//
