export default class AudioStream {
  constructor(canvasPath, audioPath, audioId){
    this.audio = document.getElementById(audioId);
    this.audio.src = audioPath;
    this.audio.load();
    this.canvasPatch = canvasPath;
  }

  renderSoundBar() {
    let context = new AudioContext();
    let src = context.createMediaElementSource(this.audio);
    let analyser = context.createAnalyser();

    let canvas = document.getElementById(this.canvasPath);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    let bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    requestAnimationFrame(this.renderSoundBar);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      let r = barHeight + (25 * (i / bufferLength));
      let g = 250 * (i / bufferLength);
      let b = 50;

      // ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillStyle = "#000";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

}