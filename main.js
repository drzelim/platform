import './fonts-fingerprint.js'

const canvas = document.createElement("canvas");
const ctx =
  canvas.getContext("webgl2") ||
  canvas.getContext("experimental-webgl2") ||
  canvas.getContext("webgl") ||
  canvas.getContext("experimental-webgl") ||
  canvas.getContext("moz-webgl");
const renderer = ctx.getExtension("WEBGL_debug_renderer_info");
let GPUInfo = null;
renderer ? (GPUInfo = ctx.getParameter(renderer.UNMASKED_RENDERER_WEBGL)) : "";

const h1 = document.querySelector("h1");
const platformH2 = document.querySelector("#platform");
const vendorH2 = document.querySelector("#vendor");
const productSubH2 = document.querySelector("#productSub");
const jsMemoryH2 = document.querySelector("#jsMemory");
const oscpuH2 = document.querySelector("#oscpu");
const pluginsH2 = document.querySelector("#plugins");
const errorH2 = document.querySelector("#error");
const batteryH2 = document.querySelector("#battery");
const hiddenH2 = document.querySelector("#hidden");
const coresH2 = document.querySelector("#cores");
const deviceMemoryH2 = document.querySelector("#device-memory");

const platform = navigator.platform;
const vendor = navigator.vendor;
const productSub = navigator.productSub;
const oscpu = navigator.oscpu;
const plugins = navigator.plugins;
const battery = navigator.getBattery;
let jsMemory = "";

function getHiddenFunc(d) {
  try {
    if (d.webkitHidden != undefined) return "webkitHidden";
    if (d.msHidden != undefined) return "msHidden";
    if (d.mozHidden != undefined) return "mozHidden";
    else return "n/a";
  } catch (_a) {
    return "n/a";
  }
}

try {
  jsMemory = window.performance.memory.jsHeapSizeLimit;
} catch {}

h1.textContent = "Platform: " + platform;
platformH2.textContent = "GPU info: " + GPUInfo;
vendorH2.textContent = "Vendor: " + vendor;
productSubH2.textContent = "ProductSub: " + productSub;
jsMemoryH2.textContent = "jsMemory: " + jsMemory;
oscpuH2.textContent = "oscpu: " + oscpu;
pluginsH2.textContent = "oscpu: " + plugins;
batteryH2.textContent = "battery: " + battery;
hiddenH2.textContent = "hiddenFunc: " + getHiddenFunc(document);
coresH2.textContent = "Cores: " + navigator.hardwareConcurrency;
deviceMemoryH2.textContent = "Device memory: " + navigator.deviceMemory;

