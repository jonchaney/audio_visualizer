export default function renderSoundBar() {
  let audio = document.getElementById("bar-audio");

  audio.src = './assets/audio/shining-bright-guitar.mp3';
  audio.crossOrigin = 'anonynmous';

  let context = new (window.webkitAudioContext || window.AudioContext)();

  let src = context.createMediaElementSource(audio);
  let analyser = context.createAnalyser();

  let canvas = document.getElementById("bar-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");

  src.connect(analyser);

  analyser.connect(context.destination);

  analyser.fftSize = 256;

  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  console.log(dataArray);

  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;

  let barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  function renderFrame() {
    window.drawBar = window.requestAnimationFrame(renderFrame);
    x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      let r = barHeight + (125 * (i / bufferLength));
      let g = 50 * (i / bufferLength);
      let b = 150;
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  renderFrame();
}