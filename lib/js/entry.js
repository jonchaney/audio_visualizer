import AudioStream from './audio';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  
  let sound = new AudioStream("bar-canvas","bar-audio","./assets/audio/shining_bright.mp3");
  sound.renderSoundBar();
  console.log(sound);
  console.log("DOM fully Loaded");
});