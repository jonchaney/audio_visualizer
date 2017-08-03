export default function renderPulse() {
  // Define audio information and load
  let audio = document.getElementById("pulse-audio");
  audio.src = './assets/audio/shining-bright-vocals.mp3';
  audio.crossOrigin = "anonymous";

  // Define letiables for analyser
  let audioContext, analyser, source, fbc_array, data, len, total;

  // define audio analysers
  audioContext = new (window.AudioContext || window.webkitAudioContext);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512; // change this to more or less triangles
  len = analyser.fftSize / 16;
  source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);


  let canvas, canvasCtx;

  // create canvas
  canvas = document.getElementById('pulse-canvas');
  canvasCtx = canvas.getContext('2d');

  // define canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let r, g, b = 0;
  let i,
    x, y,
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