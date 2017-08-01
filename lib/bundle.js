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
  console.log(context);
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderPulse;
function renderPulse() {
  var audio = document.getElementById("pulse-audio");

  audio.src = './assets/audio/shining-bright.mp3';
  audio.crossOrigin = 'anonynmous';

  var context = new (window.webkitAudioContext || window.AudioContext)();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  var canvas = document.getElementById("pulse-canvas");
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
      ctx.fillStyle = "#421A99";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  renderFrame();
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
  var audio = document.getElementById("wave-audio");

  audio.src = './assets/audio/shining-bright.mp3';
  audio.crossOrigin = 'anonynmous';

  var context = new (window.webkitAudioContext || window.AudioContext)();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  var canvas = document.getElementById("wave-canvas");
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
      ctx.fillStyle = "#551682";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  renderFrame();
}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map