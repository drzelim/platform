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


function getFonts() {
  var baseFonts = ["monospace", "sans-serif", "serif"];
  var fontList = [
    "Andale Mono",
    "Arial",
    "Arial Black",
    "Arial Hebrew",
    "Arial MT",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Bitstream Vera Sans Mono",
    "Book Antiqua",
    "Bookman Old Style",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Century",
    "Century Gothic",
    "Century Schoolbook",
    "Comic Sans",
    "Comic Sans MS",
    "Consolas",
    "Courier",
    "Courier New",
    "Garamond",
    "Geneva",
    "Georgia",
    "Helvetica",
    "Helvetica Neue",
    "Impact",
    "Lucida Bright",
    "Lucida Calligraphy",
    "Lucida Console",
    "Lucida Fax",
    "LUCIDA GRANDE",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Typewriter",
    "Lucida Sans Unicode",
    "Microsoft Sans Serif",
    "Monaco",
    "Monotype Corsiva",
    "MS Gothic",
    "MS Outlook",
    "MS PGothic",
    "MS Reference Sans Serif",
    "MS Sans Serif",
    "MS Serif",
    "MYRIAD",
    "MYRIAD PRO",
    "Palatino",
    "Palatino Linotype",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Light",
    "Segoe UI Semibold",
    "Segoe UI Symbol",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Times New Roman PS",
    "Trebuchet MS",
    "Verdana",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",
  ];
  fontList = fontList.filter(function (font, position) {
    return fontList.indexOf(font) === position;
  });
  var testString = "mmmmmmmmmmlli";
  var testSize = "72px";
  var h = document.getElementsByTagName("html")[0];
  var baseFontsDiv = document.createElement("div");
  var fontsDiv = document.createElement("div");
  var defaultWidth = {};
  var defaultHeight = {};
  var createSpan = function () {
    var s = document.createElement("span");
    s.style.position = "absolute";
    s.style.left = "-9999px";
    s.style.fontSize = testSize;
    s.style.lineHeight = "normal";
    s.innerHTML = testString;
    return s;
  };
  var createSpanWithFonts = function (fontToDetect, baseFont) {
    var s = createSpan();
    s.style.fontFamily = "'" + fontToDetect + "'," + baseFont;
    return s;
  };
  var initializeBaseFontsSpans = function () {
    var spans = [];
    for (var index = 0, length = baseFonts.length; index < length; index++) {
      var s = createSpan();
      s.style.fontFamily = baseFonts[index];
      baseFontsDiv.appendChild(s);
      spans.push(s);
    }
    return spans;
  };
  var initializeFontsSpans = function () {
    var spans = {};
    for (var i = 0, l = fontList.length; i < l; i++) {
      var fontSpans = [];
      for (
        var j = 0, numDefaultFonts = baseFonts.length;
        j < numDefaultFonts;
        j++
      ) {
        var s = createSpanWithFonts(fontList[i], baseFonts[j]);
        fontsDiv.appendChild(s);
        fontSpans.push(s);
      }
      spans[fontList[i]] = fontSpans;
    }
    return spans;
  };
  var isFontAvailable = function (fontSpans) {
    var detected = false;
    for (var i = 0; i < baseFonts.length; i++) {
      detected =
        fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]];
      if (detected) {
        return detected;
      }
    }
    return detected;
  };
  var baseFontsSpans = initializeBaseFontsSpans();
  h.appendChild(baseFontsDiv);
  for (var index = 0, length = baseFonts.length; index < length; index++) {
    defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth;
    defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight;
  }
  var fontsSpans = initializeFontsSpans();
  h.appendChild(fontsDiv);
  var available = [];
  for (var i = 0, l = fontList.length; i < l; i++) {
    if (isFontAvailable(fontsSpans[fontList[i]])) {
      available.push(fontList[i]);
    }
  }
  h.removeChild(fontsDiv);
  h.removeChild(baseFontsDiv);
  return available;
}
const available = getFonts();
console.log(available);


function GetFontsCanvas() {
  var baseFonts = ["monospace", "sans-serif", "serif"];

  var fontList = [
    "Andale Mono",
    "Arial",
    "Arial Black",
    "Arial Hebrew",
    "Arial MT",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Bitstream Vera Sans Mono",
    "Book Antiqua",
    "Bookman Old Style",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Century",
    "Century Gothic",
    "Century Schoolbook",
    "Comic Sans",
    "Comic Sans MS",
    "Consolas",
    "Courier",
    "Courier New",
    "Garamond",
    "Geneva",
    "Georgia",
    "Helvetica",
    "Helvetica Neue",
    "Impact",
    "Lucida Bright",
    "Lucida Calligraphy",
    "Lucida Console",
    "Lucida Fax",
    "LUCIDA GRANDE",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Typewriter",
    "Lucida Sans Unicode",
    "Microsoft Sans Serif",
    "Monaco",
    "Monotype Corsiva",
    "MS Gothic",
    "MS Outlook",
    "MS PGothic",
    "MS Reference Sans Serif",
    "MS Sans Serif",
    "MS Serif",
    "MYRIAD",
    "MYRIAD PRO",
    "Palatino",
    "Palatino Linotype",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Light",
    "Segoe UI Semibold",
    "Segoe UI Symbol",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Times New Roman PS",
    "Trebuchet MS",
    "Verdana",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",
  ];

  var testString = "mmmmmmmmmmlli";

  var testSize = "72px";

  var c = document.getElementById("TestCanvas");
  var ctx = c.getContext("2d");

  var DefaultSizes = {};

  for (var i = 0; i < baseFonts.length; i++) {
    var Font = baseFonts[i];
    ctx.font = testSize + " " + Font;
    var Width = ctx.measureText(testString).width;
    DefaultSizes[Font] = Width;
  }

  var Res = [];

  for (var i = 0; i < fontList.length; i++) {
    var Font = fontList[i];
    var IsDetected = false;
    var DefaultSizesKeys = Object.keys(DefaultSizes);
    for (var j = 0; j < DefaultSizesKeys.length; j++) {
      var FontDefault = DefaultSizesKeys[j];
      var WidthDefault = DefaultSizes[FontDefault];
      ctx.font = testSize + ' "' + Font + '", ' + FontDefault;
      var Width = ctx.measureText(testString).width;

      if (Math.abs(Width - WidthDefault) > 0.001) {
        IsDetected = true;
        break;
      }
    }

    if (IsDetected) {
      Res.push(Font);
    }
  }

  return Res;
}

const result = GetFontsCanvas();
console.log(result);

const fonts1 = document.querySelector('#fonts1');
const fonts2 = document.querySelector('#fonts2');
fonts1.textContent = 'Fonts_1: ' +  available.length
fonts2.textContent = 'Fonts_2: ' +  result.length
