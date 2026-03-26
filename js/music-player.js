// Music Player
const musicToggle = document.getElementById('music-toggle');
const musicControls = document.getElementById('music-controls');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const uploadBtn = document.getElementById('upload-btn');
const audioUpload = document.getElementById('audio-upload');

let audio = new Audio();
let playlist = [];
let currentTrackIndex = 0;
let isPlaying = false;

// Toggle music controls visibility
musicToggle.addEventListener('click', () => {
    musicControls.classList.toggle('hidden');
});

// Upload audio file
uploadBtn.addEventListener('click', () => {
    audioUpload.click();
});

audioUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            playlist.push({
                url: url,
                name: file.name
            });
        }
    });
    
    if (playlist.length > 0 && !audio.src) {
        loadTrack(0);
    }
});

// Load track
function loadTrack(index) {
    if (playlist.length === 0) return;
    
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];
    
    audio.src = track.url;
    audio.load();
    
    console.log('Loaded track:', track.name);
}

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (playlist.length === 0) {
        alert('Please upload audio files first!');
        return;
    }
    
    if (isPlaying) {
        audio.pause();
        playPauseBtn.querySelector('i').className = 'fas fa-play';
        isPlaying = false;
    } else {
        audio.play().catch(e => {
            console.error('Playback failed:', e);
        });
        playPauseBtn.querySelector('i').className = 'fas fa-pause';
        isPlaying = true;
    }
});

// Previous track
prevBtn.addEventListener('click', () => {
    if (playlist.length === 0) return;
    
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = playlist.length - 1;
    }
    
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
});

// Next track
nextBtn.addEventListener('click', () => {
    if (playlist.length === 0) return;
    
    currentTrackIndex++;
    if (currentTrackIndex >= playlist.length) {
        currentTrackIndex = 0;
    }
    
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Auto-play next track when current ends
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Only work when music player is visible
    if (musicControls.classList.contains('hidden')) return;
    
    switch(e.code) {
        case 'Space':
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                playPauseBtn.click();
            }
            break;
        case 'ArrowRight':
            if (e.ctrlKey) {
                e.preventDefault();
                nextBtn.click();
            }
            break;
        case 'ArrowLeft':
            if (e.ctrlKey) {
                e.preventDefault();
                prevBtn.click();
            }
            break;
        case 'ArrowUp':
            if (e.ctrlKey) {
                e.preventDefault();
                volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
                audio.volume = volumeSlider.value / 100;
            }
            break;
        case 'ArrowDown':
            if (e.ctrlKey) {
                e.preventDefault();
                volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
                audio.volume = volumeSlider.value / 100;
            }
            break;
    }
});

// Optional: Add some default demo tracks (you can remove this in production)
const demoTracks = [
    {
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        name: 'Cosmic Journey'
    }
];

// Uncomment to preload demo tracks
// playlist = [...demoTracks];
// if (playlist.length > 0) {
//     loadTrack(0);
// }