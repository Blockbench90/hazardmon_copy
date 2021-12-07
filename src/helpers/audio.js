const public_url = process.env.PUBLIC_URL
const au_play = new Audio(`${public_url}/audio/alarm.mp3`);

function play(sound) {
  let url = `${window.location.origin}${public_url}/audio/alarm.mp3`;
  if (url !== au_play.src) {
    au_play.src = url;
  }
  au_play.currentTime = 0;
  au_play.play();
}

const audio = {
  play,
}

export default audio;