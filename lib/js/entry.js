import renderSoundBar from './soundBar';
import renderPulse from './pulse';
import renderWaveform from './waveform';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("play-button");
  
  const clickHandler = function () {
    renderSoundBar();
    renderWaveform();
    renderPulse();
  };

  button.addEventListener("click", clickHandler);
    
  console.log("DOM fully Loaded");
});