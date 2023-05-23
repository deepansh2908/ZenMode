const musicContainer = document.querySelector(".music-container");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const shuffle = document.querySelector("#shuffleBtn");
const list = document.querySelector("#list");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const imageCover = document.querySelector("#image-cover");
const musicList = document.querySelector(".music-list");
const close = document.querySelector("#close");
const ulTag = document.querySelector("ul");

const songs = [
  "black-coffee",
  "both-of-us",
  "candy-rain",
  "chill-abstract",
  "every-morning",
  "far-from-home",
  "forget",
  "freshness",
  "moment",
  "morning-garden",
  "pause",
  "rush",
  "spirit-blossom",
  "rain",
  "ocean",
  "waterfall",
];
let songIndex = 0;
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  imageCover.src = `images/${song}.jfif`;
}

function playSong() {
  musicContainer.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play-circle");
  play.querySelector("i.fas").classList.add("fa-pause-circle");
  play.querySelector("i.fas").setAttribute("title", "Pause");
  audio.play();
  playingSong();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  play.querySelector("i.fas").classList.remove("fa-pause-circle");
  play.querySelector("i.fas").classList.add("fa-play-circle");
  play.querySelector("i.fas").setAttribute("title", "Play");
  audio.pause();
  playingSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
  playingSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  playingSong();
}

function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
}

function setProgress(event) {
  const width = this.clientWidth;
  const widthX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (widthX / width) * duration;
}

play.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
// audio.addEventListener('ended',nextSong)

list.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

close.addEventListener("click", () => {
  list.click();
});

for (let i = 0; i < songs.length; i++) {
  let liTag = `<li li-index="${i}">
                <div class="music-row">
                <span><i>${songs[i]}</i></span>
                </div>
                <span id="${songs[i]}" class="audio-duration">3:40</span>
                <audio class="${songs[i]}" src="music/${songs[i]}.mp3"></audio>
                </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuartionTag = ulTag.querySelector(`#${songs[i]}`);
  let liAudioTag = ulTag.querySelector(`.${songs[i]}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

const allLiTags = document.querySelectorAll("li");
function playingSong() {
  for (let j = 0; j < allLiTags.length; j++) {
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
    }
    if (allLiTags[j].getAttribute("li-index") == songIndex) {
      allLiTags[j].classList.add("playing");
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  songIndex = getLiIndex;
  loadSong(songs[songIndex]);
  playSong();
  playingSong();
}

shuffle.addEventListener("click", () => {
  let getText = shuffle.innerText;
  switch (getText) {
    case "repeat":
      shuffle.innerText = "repeat_one";
      shuffle.setAttribute("title", "Song Looped");
      break;
    case "repeat_one":
      shuffle.innerText = "shuffle";
      shuffle.setAttribute("title", "Playback Shuffled");
      break;
    case "shuffle":
      shuffle.innerText = "repeat";
      shuffle.setAttribute("title", "Playlist Looped");
      break;
  }
});

audio.addEventListener("ended", () => {
  let getText = shuffle.innerText;

  switch (getText) {
    case "repeat":
      nextSong();
      break;
    case "repeat_one":
      audio.currentTime = 0;
      loadSong(songs[songIndex]);
      playSong();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * songs.length + 1);
      do {
        randIndex = Math.floor(Math.random() * songs.length + 1);
      } while (songIndex == randIndex);
      songIndex = randIndex;
      loadSong(songs[songIndex]);
      playSong();
      playingSong();
      break;
  }
});
