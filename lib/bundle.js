/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _soundBar = __webpack_require__(3);

var _soundBar2 = _interopRequireDefault(_soundBar);

var _pulse = __webpack_require__(4);

var _pulse2 = _interopRequireDefault(_pulse);

var _waveform = __webpack_require__(5);

var _waveform2 = _interopRequireDefault(_waveform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('root');

  (0, _soundBar2.default)();
  (0, _pulse2.default)();
  (0, _waveform2.default)();

  console.log("DOM fully Loaded");
});

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderSoundBar;
function renderSoundBar() {
  var audio = document.getElementById("bar-audio");

  audio.src = './assets/audio/shining-bright.mp3';
  audio.crossOrigin = 'anonynmous';

  var context = new (window.webkitAudioContext || window.AudioContext)();

  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  var canvas = document.getElementById("bar-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  src.connect(analyser);

  analyser.connect(context.destination);

  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = WIDTH / bufferLength * 2.5;
  var barHeight = void 0;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      var r = barHeight + 25 * (i / bufferLength);
      var g = 250 * (i / bufferLength);
      var b = 50;

      // ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillStyle = "#829";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  renderFrame();
}

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderPulse;
function renderPulse() {
  // Define audio information and load
  var audio = document.getElementById("pulse-audio");
  audio.src = './assets/audio/shining-bright.mp3';
  // audio.loop = true;
  // audio.autoplay = true;
  audio.crossOrigin = "anonymous";

  // Define letiables for analyser
  var audioContext = void 0,
      analyser = void 0,
      source = void 0,
      fbc_array = void 0,
      data = void 0,
      len = void 0,
      total = void 0;

  // Define Audio Analyser Helpers
  function createAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512; // change this to more or less triangles
    len = analyser.fftSize / 16;
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  // Define main letiables for canvas start
  var canvas = void 0,
      canvasCtx = void 0;

  // Define Canvas helpers
  function createCanvas() {
    canvas = document.getElementById('pulse-canvas');
    canvasCtx = canvas.getContext('2d');
  }

  function defineSizesCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Define math info for draw
  var i = void 0,
      cx = void 0,
      cy = void 0,
      r = 50,
      beginAngle = 0,
      angle = void 0,
      twoPI = 2 * Math.PI,
      angleGap = twoPI / 3,
      color = '#000';

  // Create the animation
  function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);

    canvasCtx.save();
    analyser.getByteFrequencyData(fbc_array);
    data = fbc_array;
    angle = beginAngle;
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.strokeStyle = color;
    canvasCtx.globalCompositeOperation = 'lighter';
    canvasCtx.lineWidth = 10;
    total = 0;
    for (i = 8; i < len; i += 2) {
      angle += 0.2;
      canvasCtx.beginPath();
      // canvasCtx.arc(data[i], 75, 50, 0, 2 * Math.PI);

      canvasCtx.moveTo(cx + data[i] * Math.sin(angle), cy + data[i] * Math.cos(angle));
      canvasCtx.lineTo(cx + data[i] * Math.sin(angle + angleGap), cy + data[i] * Math.cos(angle + angleGap));
      canvasCtx.lineTo(cx + data[i] * Math.sin(angle + angleGap * 2), cy + data[i] * Math.cos(angle + angleGap * 2));
      canvasCtx.closePath();
      canvasCtx.stroke();
      total += data[i];
    }
    beginAngle = (beginAngle + 0.00001 * total) % twoPI;
    canvasCtx.restore();
  }

  function init() {
    createAudioContext();
    createCanvas();
    defineSizesCanvas();
    frameLooper();
  }

  window.addEventListener('load', init, false);
  window.addEventListener('resize', defineSizesCanvas, false);
}

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderWaveform;
function renderWaveform() {
  var audio = document.getElementById('wave-audio');
  audio.src = './assets/audio/shining-bright.mp3';
  audio.crossOrigin = 'anonynmous';

  // extract data from audio source using Web Audio API

  // create AudioContext Object
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Analyzer Node using AudioContext.createAnalyser()
  var analyser = audioCtx.createAnalyser();

  // connect Node to audio source
  var src = audioCtx.createMediaElementSource(audio);
  src.connect(analyser);

  // capture data using FFT (Fast Fourier Transform) in stated frequency domain
  // 2048 is default if none is specified
  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  // To capture data, use the methods 
  // AnalyserNode.getFloatFrequencyData()
  // AnalyserNode.getByteFrequencyData() 
  // to capture frequency data, 
  // and AnalyserNode.getByteTimeDomainData() 
  // and AnalyserNode.getFloatTimeDomainData() to capture waveform data.

  analyser.getByteTimeDomainData(dataArray);

  // waveform fun time

  var canvas = document.getElementById("wave-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvasCtx = canvas.getContext("2d");
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var drawVisual = void 0;

  function draw() {
    //  use requestAnimationFrame() to keep looping
    // the drawing function once it has been started:
    drawVisual = requestAnimationFrame(draw);

    // fill canvas with a solid color
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map