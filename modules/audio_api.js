let get_player_run = 0;
let audio_player;

function getPlayer() {
  const audioContext = new AudioContext();
  const audio_player = document.querySelector("#bgm");
  const bgm = audioContext.createMediaElementSource(audio_player);
  bgm.connect(audioContext.destination);
  get_player_run++;

  return audio_player;
}

function playBGM() {
  if (get_player_run != 1) {
    audio_player = getPlayer();
  }
  audio_player.play();
  setTimeout(() => {
    audio_player.pause();
  }, 5000);
}

export { playBGM };
