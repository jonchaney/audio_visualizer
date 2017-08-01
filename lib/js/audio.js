export default class AudioStream {
  
  constructor(canvasId, audioId, audioPath){
    this.audio = document.getElementById(audioId);
    this.audio.crossOrigin = 'anonymous';
    this.audio.src = audioPath;
    this.audio.load();
    this.canvasId = canvasId;
  }
  
  renderSoundBar() {
    this.audio.load();
    this.audio.play();
    let context = new AudioContext();
    console.log(this.audio);
    let src = context.createMediaElementSource(this.audio);
    let analyser = context.createAnalyser();

    let canvas = document.getElementById(this.canvasId);
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

    requestAnimationFrame(() => this.renderSoundBar);

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

  play() {
    this.audio.play();
  }
  
  load() {
    this.audio.load();
  }


}