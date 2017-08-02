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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

  // define audio analysers
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512; // change this to more or less triangles
  len = analyser.fftSize / 16;
  source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  var canvas = void 0,
      canvasCtx = void 0;

  // create canvas
  canvas = document.getElementById('pulse-canvas');
  canvasCtx = canvas.getContext('2d');

  // define canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var r = void 0,
      g = void 0,
      b = 0;
  var i = void 0,
      x = void 0,
      y = void 0,
      color = '#829';

  // Create the animation
  function draw() {
    window.drawPulse = window.requestAnimationFrame(draw);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);

    canvasCtx.save();
    analyser.getByteFrequencyData(fbc_array);
    data = fbc_array;
    x = canvas.width / 2;
    y = canvas.height / 2;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.strokeStyle = color;
    canvasCtx.globalCompositeOperation = 'lighter';
    canvasCtx.lineWidth = 5;
    total = 0;

    for (i = 8; i < len; i += 2) {
      canvasCtx.beginPath();
      canvasCtx.arc(x, y, data[i], 0 * Math.PI, 2 * Math.PI);
      canvasCtx.closePath();
      canvasCtx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
      canvasCtx.stroke();
      total += data[i];
    }

    canvasCtx.restore();
  }

  draw();
}

/***/ },
/* 1 */
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
    window.drawBar = window.requestAnimationFrame(renderFrame);
    x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      var r = barHeight + 125 * (i / bufferLength);
      var g = 50 * (i / bufferLength);
      var b = 150;
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  renderFrame();
}

/***/ },
/* 2 */
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
  var distortion = audioCtx.createWaveShaper();
  analyser.connect(distortion);

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

  var canvas = document.getElementById('wave-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvasCtx = canvas.getContext("2d");
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  function draw() {
    //  use requestAnimationFrame() to keep looping
    // the drawing function once it has been started:
    window.drawWave = window.requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 10;
    canvasCtx.strokeStyle = '#829';
    canvasCtx.beginPath();
    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }

  draw();
}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _soundBar = __webpack_require__(1);

var _soundBar2 = _interopRequireDefault(_soundBar);

var _pulse = __webpack_require__(0);

var _pulse2 = _interopRequireDefault(_pulse);

var _waveform = __webpack_require__(2);

var _waveform2 = _interopRequireDefault(_waveform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById("play-button");

  var clickHandler = function clickHandler() {
    (0, _soundBar2.default)();
    (0, _waveform2.default)();
    (0, _pulse2.default)();
  };

  button.addEventListener("click", clickHandler);

  console.log("DOM fully Loaded");
});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map