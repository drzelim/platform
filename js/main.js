import './fonts-fingerprint.js';

// var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

// if (RTCPeerConnection) (function () {
//     var rtc = new RTCPeerConnection({iceServers:[]});
//     if (window.mozRTCPeerConnection) {      // FF needs a channel/stream to proceed
//         rtc.createDataChannel('', {reliable:false});
//     };

//     rtc.onicecandidate = function (evt) {
//         if (evt.candidate) grepSDP(evt.candidate.candidate);
//     };
//     rtc.createOffer(function (offerDesc) {
//         grepSDP(offerDesc.sdp);
//         rtc.setLocalDescription(offerDesc);
//     }, function (e) { console.warn("offer failed", e); });


//     var addrs = Object.create(null);
//     addrs["0.0.0.0"] = false;

//     function updateDisplay(newAddr) {

//         if (newAddr in addrs) return;
//         else addrs[newAddr] = true;
//         var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
//         document.getElementById('list').textContent = displayAddrs.join(" or perhaps ") || "n/a";
//     }

//     function grepSDP(sdp) {
//         var hosts = [];
//         sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
//             if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
//                 var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
//                     addr = parts[4],
//                     type = parts[7];
//                 if (type === 'host') updateDisplay(addr);
//             } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
//                 var parts = line.split(' '),
//                     addr = parts[2];
//                 updateDisplay(addr);
//             }
//         });
//     }
// })(); else {
//     document.getElementById('list').innerHTML = "<code>ifconfig | grep inet | grep -v inet6 | cut -d\" \" -f2 | tail -n1</code>";
//     document.getElementById('list').nextSibling.textContent = "In Chrome and Firefox your IP should display automatically, by the power of WebRTCskull.";
// }

const container = document.querySelector('.container');

let GPUInfo = null;
let vendor = null;
try {
  const canvas = document.createElement("canvas");
  const ctx =
    canvas.getContext("webgl2") ||
    canvas.getContext("experimental-webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")
    || canvas.getContext("moz-webgl");

  console.log("ctx", ctx);
  const renderer = ctx.getExtension("WEBGL_debug_renderer_info");
  console.log(renderer);

  renderer ? (GPUInfo = ctx.getParameter(renderer.UNMASKED_RENDERER_WEBGL)) : "";
  renderer ? vendor = ctx.getParameter(renderer.UNMASKED_VENDOR_WEBGL) : "";
} catch (err){
  console.log(err);
}

function getArchitecture() {
  const f = new Float32Array(1);
  const u8 = new Uint8Array(f.buffer);
  f[0] = Infinity;
  f[0] = f[0] - f[0];

  console.log(f);
  console.log(u8);

  return u8[3];
}

const h1 = document.querySelector("h1");
const useragentH2 = document.querySelector("#user-agent");
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
const fullscreenH2 = document.querySelector("#fullscreen");
const doNotTrackH2 = document.querySelector("#doNotTrack");

const errFirefoxFunc = () => {
  var errFirefox;
  try {
    throw "a";
  } catch (err) {
    try {
      console.log(err);
      err.toSource();
      errFirefox = true;
    } catch (errOfErr) {
      errFirefox = false;
    }
  }
  return errFirefox;
};

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

let jsMemory = "";
try {
  jsMemory = window.performance.memory.jsHeapSizeLimit;
} catch {}

const createElementsInArray = (arr, name) => {
  const h2Arr = [];

  Array.from(arr).forEach((elem, index) => {
    const h2 = document.createElement('h2')
    h2.textContent = `${name} ${index + 1} ${elem.name}`
    h2Arr.push(h2);
  });
  document.querySelector(`.${name}`).append(...h2Arr);
}
const d = document;
delete window.navigator.getBattery;
Reflect.deleteProperty(navigator, 'getBattery');

h1.textContent = "Platform: " + navigator.platform;
useragentH2.textContent = "User agent: " + navigator.userAgent;
platformH2.textContent = "GPU info: " + vendor + ' ~ ' + GPUInfo;
vendorH2.textContent = "Vendor: " + navigator.vendor;
productSubH2.textContent = "ProductSub: " + navigator.productSub;
jsMemoryH2.textContent = "jsMemory: " + jsMemory;
oscpuH2.textContent = "oscpu: " + navigator.oscpu;
pluginsH2.textContent = "plugins: " + navigator.plugins + ' ' + navigator.plugins.length;
createElementsInArray(navigator.plugins, 'plugins')
batteryH2.textContent = "battery: " + navigator.getBattery;
hiddenH2.textContent = "hiddenFunc: " + getHiddenFunc(document);
coresH2.textContent = "Cores: " + navigator.hardwareConcurrency;
deviceMemoryH2.textContent = "Device memory: " + navigator.deviceMemory;
doNotTrackH2.textContent = "doNotTrackH2: " + navigator.doNotTrack + ' ' + navigator.msDoNotTrack;
fullscreenH2.textContent = "fullscreenH2: " + !!(d.mozCancelFullScreen || d.mozFullScreen || d.mozFullScreenElement || d.mozFullScreenEnabled || d.mozSetImageElement);


let touchEvent;
try {
  const obj = document.createEvent('TouchEvent');
  touchEvent = true;
} catch (_) {
  touchEvent = false
}


const wnd = window;
const nav = navigator;
const bs = document.body.style;
var firstLanguages = navigator.languages[0].substr(0, 2);
console.log(firstLanguages !== navigator.language.substr(0, 2));

const arr = [
  'window.navigator.buildID',
  '"getBattery"in navigator',
  '"hasFocus"in document ? document.hasFocus() ? true : false : undefined',
  '!!(window.mozRTCIceCandidate || window.mozRTCPeerConnection || window.mozRTCSessionDescription)',
  '("mozInnerScreenX"in wnd) && ("mozInnerScreenY"in wnd)',
  '!!wnd.openDatabase',
  '!!("webkitRequestFileSystem"in wnd)',
  '!!(d.mozCancelFullScreen || d.mozFullScreen || d.mozFullScreenElement || d.mozFullScreenEnabled || d.mozSetImageElement)',
  '!!(wnd.callPhantom || wnd._phantom)',
  'wnd.Buffer !== undefined',
  'wnd.emit !== undefined',
  'wnd.spawn !== undefined',
  'wnd.domAutomation !== undefined || wnd.domAutomationController !== undefined',
  'wnd.navigator.onLine',
  '(nav.clipboard != null) && (nav.clipboard != undefined)',
  '(wnd.locationbar && wnd.locationbar.visible) || wnd.locationbar != undefined',
  '!!(wnd.performance && "function" == typeof performance.now)',
  '!!(window.top === window.self)',
  'nav.sendBeacon ? true : false',
  '!!(nav.cookieEnabled)',
  'nav.mediaDevices && nav.mediaDevices.getUserMedia ? 2 : nav.getUserMedia ? 1 : 0',
  'nav.mediaDevices',
  'nav.getUserMedia',
  'Error.stackTraceLimit',
  'Error.captureStackTrace',
  'typeof console !== "undefined" && typeof console.warn !== "undefined"',
  'window.screen.colorDepth',
  'navigator.maxTouchPoints',
  '"ontouchstart" in window',
  'nav.msDoNotTrack',
  'nav.doNotTrack',
  'wnd.Intl.DateTimeFormat().resolvedOptions().timeZone',
  'new Date().getTimezoneOffset()',
  'navigator.webdriver',
  '"msTransform" in document.body.style',
  '"MozTransform" in bs && "MozColumnCount" in bs && "MozBorderImage" in bs && "MozColumnGap" in bs',
  '"OTransform" in bs',
  'touchEvent',
  'document.createEventObject',
  'Error.prototype.stack',
  'window.devicePixelRatio',
  '!!window.sessionStorage',
  '!!window.localStorage',
  '!!window.indexedDB',
  'window.MediaStreamTrack',
  'window.MediaStreamTrack.getSources',
  '!!RTCPeerConnection',
  '!!RTCDataChannel',
  'navigator.appVersion',
  'navigator.appCodeName',
  'navigator.appName',
  'navigator.vendorSub',
  '!!("ActiveXObject" in window)',
  '"chrome" in window',
  'window.performance.getEntriesByType',
  'screen.mozOrientation',
  'window.screen.orientation',
  'window.screen.orientation.type',
  '"MozAppearance" in document.documentElement.style',
  'document.documentElement.style.MozAppearance',
  'Element.prototype.mozMatchesSelector',
  'container.matches(".container")',
  'container.webkitMatchesSelector(".container")',
  'container.mozMatchesSelector(".container")',
  'container.msMatchesSelector(".container")',
  'container.oMatchesSelector(".container")',
  'navigator.javaEnabled()',
  'navigator.userLanguage',
  'navigator.browserLanguage',
  'navigator.systemLanguage',
  'navigator.connection',
  'InstallTrigger',
  'Array.prototype.map.toString().length',
  'Array.prototype.flatMap.toString().length',
  'Array.prototype.some.toString().length',
  'Array.prototype.reverse.toString().length',
  'Array.prototype.slice.toString().length',
  'Array.prototype.sort.toString().length',
  'Array.prototype.indexOf.toString().length',
  'Array.prototype.join.toString().length',
  'Array.prototype.reduce.toString().length',
  'Array.prototype.every.toString().length',
  'document.mozCancelFullScreen',
  'errFirefoxFunc()',
  'document.body.addBehavior',
  'navigator.language',
  'navigator.languages',
  'nav.plugins != null && nav.plugins != undefined',
  'nav.plugins.length',
  'firstLanguages',
  'navigator.language.substr(0, 2)',
  'firstLanguages !== navigator.language.substr(0, 2)',
  'window.performance',
  'navigator.getGamepads',
  'navigator.userAgentData.platform',
  'navigator.userAgentData.mobile',
  '"userAgentData" in window.navigator',
  "getArchitecture()",
  'Infinity - Infinity'
];

arr.forEach(item => {
  const h2 = document.createElement('h2');
  try {
    h2.textContent = item.toString() + ' === ' + eval(item);
  } catch {
    h2.textContent = item.toString() + ' === Error'
  }
  container.appendChild(h2);
});

// const brands = navigator.userAgentData.brands;
// brands.forEach(item => {
//   const h2 = document.createElement('h2');
//   h2.textContent = `brand: ${item.brand}, version: ${item.version}`;
//   container.appendChild(h2);
// })

navigator.userAgentData && navigator.userAgentData.getHighEntropyValues && navigator.userAgentData.getHighEntropyValues(
  ["architecture",
  "model",
  "platformVersion",
  "fullVersionList",
  "brands", "mobile", "platform", "bitness", "uaFullVersion", "wow64"])
  .then((values) => {
    Object.keys(values).forEach(key => {
     try {
      if (Array.isArray(values[key])) {
        values[key].forEach(item => {
          const h2 = document.createElement('h2');
          h2.textContent = `brand: ${item.brand}, version: ${item.version}`;
          container.appendChild(h2);
        })
      } else {
        const h2 = document.createElement('h2');
        h2.textContent = `${key}: ${typeof values[key] === undefined ? 'undefined' : values[key]}`;
        container.appendChild(h2);
      }
     } catch {

     }

    })
    console.log(values);
  });


async function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (evt) => {
      console.log(navigator.userAgent);
      console.log(evt.data);
    });

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage('give me ua');
    } else {
      let reistration = await navigator.serviceWorker.register('./sw.js');
      await navigator.serviceWorker.ready;
      reistration.active.postMessage('give me ua');
    }
  }
}

// await register()

// Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {get: () => window});

const iframe = document.createElement('iframe');
iframe.style.display = 'none';
iframe.style.width = '1px';
iframe.style.height = '1px';
iframe.style.display = 'hidden';


const frames = Array.from(document.querySelectorAll('iframe'));
console.log(frames);
frames.length && console.log(frames[0].contentWindow.screen);

const schooll = document.querySelector('#schooll');
// console.log(schooll.contentWindow.screen.width);

async function getMedia() {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch(err) {
    console.log(err);
  }
  console.log(stream);
}

void 0 === navigator.mediaDevices && (navigator.mediaDevices = {});
void 0 === navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = function(b) {
    var a = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    return a ? new Promise(function(c, d) {
        a.call(navigator, b, c, d)
      }
    ) : Promise.reject(Error("polyfillReject"))
  }
);

try {
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
  try {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (e) {
        navigator.mediaDevices.enumerateDevices().then(function (e) {
          const arr = Array.from(e);
          console.log(arr);
          arr.forEach((item) => {
            const h2 = document.createElement("h2");
            h2.textContent = item.kind;
            container.appendChild(h2);
          });
        });
      })
      .catch(function () {
        throw 1;
      });
  } catch (e) {
    console.log(e);
  }
else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources)
  try {
    MediaStreamTrack.getSources(function (e) {
      navigator.mediaDevices.enumerateDevices().then(function (e) {
        const arr = Array.from(e);
        arr.forEach((item) => {
          const h2 = document.createElement("h2");
          h2.textContent = item.kind;
          container.appendChild(h2);
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
} catch {

}

const mediaQueries = "prefers-reduced-motion;prefers-reduced-transparency;prefers-color-scheme: dark;prefers-color-scheme: light;pointer: none;pointer: coarse;pointer: fine;any-pointer: none;any-pointer: coarse;any-pointer: fine;scan: interlace;scan: progressive;color-gamut: srgb;color-gamut: p3;color-gamut: rec2020;update: fast;update: slow;update: none;grid: 0;grid: 2;hover: hover;inverted-colors: inverted;inverted-colors: none".split(';')

// mediaQueries.forEach(mediaQuery => {
//   const h2 = document.createElement('h2');
//   h2.textContent = mediaQuery.toString() + ' === ' + window.matchMedia(`(${mediaQuery})`).matches;
//   container.appendChild(h2);
// });


const medias = "video/ogg video/mp4 video/webm audio/x-aiff audio/x-m4a audio/mpeg audio/aac audio/wav audio/ogg audio/mp4".split(" ");
const codecs = "theora vorbis 1 avc1.4D401E mp4a.40.2 vp8.0 mp4a.40.5".split(" ");
let obj = document.createElement('video');
// medias.forEach(item => {
//   codecs.forEach((codec, index,) => {
//     const h2 = document.createElement('h2');
//     let obj = document.createElement('video');
//     h2.textContent = item.toString() + ' ' + codec + ' === ' + obj.canPlayType(item + '; codecs=' + `"${codec}"`);
//     // console.log(item + '; codecs=' + codec);
//     container.appendChild(h2);
//   })
// })



