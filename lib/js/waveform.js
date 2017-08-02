export default function renderWaveform() {
  let audio = document.getElementById('wave-audio');
  audio.src = './assets/audio/shining-bright.mp3';
  audio.crossOrigin = 'anonynmous';

  // extract data from audio source using Web Audio API
  
  // create AudioContext Object
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Analyzer Node using AudioContext.createAnalyser()
  let analyser = audioCtx.createAnalyser();

  // connect Node to audio source
  let src = audioCtx.createMediaElementSource(audio); 
  src.connect(analyser);
  let distortion = audioCtx.createWaveShaper();
  analyser.connect(distortion);

  // capture data using FFT (Fast Fourier Transform) in stated frequency domain
  // 2048 is default if none is specified
  analyser.fftSize = 2048;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  // To capture data, use the methods 
  // AnalyserNode.getFloatFrequencyData()
  // AnalyserNode.getByteFrequencyData() 
  // to capture frequency data, 
  // and AnalyserNode.getByteTimeDomainData() 
  // and AnalyserNode.getFloatTimeDomainData() to capture waveform data.

  analyser.getByteTimeDomainData(dataArray);

  // waveform fun time

  let canvas = document.getElementById('wave-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let canvasCtx = canvas.getContext("2d");
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;

  
  function draw() {
    //  use requestAnimationFrame() to keep looping
    // the drawing function once it has been started:
    window.drawWave = window.requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 10;
    canvasCtx.strokeStyle = '#829';
    canvasCtx.beginPath();
    let sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] / 128.0;
      let y = v * HEIGHT / 2;

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