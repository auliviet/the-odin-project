type audio = "start" | "click" | "won" | "lost" | "restart";
export default async function playSound(audioType: audio) {
  switch (audioType) {
    case "start":
      await randomAudio(startAudio).play();
      break;

    case "won":
      await randomAudio(wonAudio).play();
      break;

    case "lost":
      await randomAudio(lostAudio).play();
      break;

    case "restart":
      await randomAudio(restartAudio).play();
      break;

    default:
      await randomAudio(clickAudio).play();
      break;
  }
}

function randomAudio(source: HTMLAudioElement[]) {
  const index = Math.floor(Math.random() * source.length);

  return source[index];
}

const startAudio = [
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/LETS%20GO%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
];
const clickAudio = [
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/YEAH%201%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/YEAH%202%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/YES%201%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/YES%202%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/OH%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/WHATEVER%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/WHATEVER(1)%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/YEAH%20YER%20YER%20YER%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
];

const wonAudio = [
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/WUBBA%20LUBBA%20DUB%20DUB%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
];

const lostAudio = [
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/YOU%20BUNCH%20OF%20IDIOTS%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/YOU%20LITTLE%20TURD%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/DUMB%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/WRONG%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/FUCK%20THIS%20WHOLE%20THING%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
];

const restartAudio = [
  new Audio(
    "https://storage.googleapis.com/soundboards/Cartoons/Rick%20and%20Morty/RICK%20SANCHEZ/MP3/OKAY%20YEAH%20FINE%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3"
  ),
];
