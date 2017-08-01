import renderSoundBar from './soundBar';
import renderPulse from './pulse';
import renderWaveform from './waveform';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  renderSoundBar();
  renderPulse();
  renderWaveform();

  console.log("DOM fully Loaded");
});