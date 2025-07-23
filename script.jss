const moodSelect = document.getElementById('moodSelect');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const progressBar = document.getElementById('progressBar');

const playlists = {
  happy: [
    {
      title: 'Sunny Days',
      artist: 'AudioHub',
      url: 'https://cdn.pixabay.com/download/audio/2021/10/14/audio_ba4a3a38b9.mp3?filename=happy-acoustic-guitar-6288.mp3',
    },
    {
      title: 'Joyful Journey',
      artist: 'Pixabay Music',
      url: 'https://cdn.pixabay.com/download/audio/2021/09/16/audio_159b2b7b9d.mp3?filename=upbeat-acoustic-6293.mp3',
    },
  ],
  sad: [
    {
      title: 'Melancholy',
      artist: 'AudioHub',
      url: 'https://cdn.pixabay.com/download/audio/2021/10/14/audio_68b399a5b6.mp3?filename=sad-piano-5055.mp3',
    },
    {
      title: 'Blue Sky',
      artist: 'Pixabay Music',
      url: 'https://cdn.pixabay.com/download/audio/2021/09/16/audio_299b6e95f8.mp3?filename=ambient-piano-6290.mp3',
    },
  ],
  chill: [
    {
      title: 'Calm Waves',
      artist: 'AudioHub',
      url: 'https://cdn.pixabay.com/download/audio/2021/10/14/audio_3b09b69d8e.mp3?filename=chill-electronic-4895.mp3',
    },
    {
      title: 'Easy Breeze',
      artist: 'Pixabay Music',
      url: 'https://cdn.pixabay.com/download/audio/2021/09/16/audio_21390fefa4.mp3?filename=relaxing-ambient-6289.mp3',
    },
  ],
  energetic: [
    {
      title: 'Upbeat Vibes',
      artist: 'AudioHub',
      url: 'https://cdn.pixabay.com/download/audio/2021/10/14/audio_2f1e9e7f7e.mp3?filename=energetic-beat-5125.mp3',
    },
    {
      title: 'Fast Lane',
      artist: 'Pixabay Music',
      url: 'https://cdn.pixabay.com/download/audio/2021/09/16/audio_788a4c17a6.mp3?filename=fast-tempo-6291.mp3',
    },
  ],
};

let currentPlaylist = playlists['happy'];
let currentIndex = 0;

function loadSong(index) {
  const song = currentPlaylist[index];
  audio.src = song.url;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  progressBar.value = 0;
}

function playSong() {
  audio.play();
  playPauseBtn.textContent = '⏸️';
}

function pauseSong() {
  audio.pause();
  playPauseBtn.textContent = '▶️';
}

function togglePlayPause() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % currentPlaylist.length;
  loadSong(currentIndex);
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadSong(currentIndex);
  playSong();
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent || 0;
}

function setProgress(e) {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

moodSelect.addEventListener('change', () => {
  currentPlaylist = playlists[moodSelect.value];
  currentIndex = 0;
  loadSong(currentIndex);
  pauseSong();
});

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', (e) => {
  const value = e.target.value;
  audio.currentTime = (value / 100) * audio.duration;
});

// Initialize
loadSong(currentIndex);
