// Helper: Extract YouTube video ID from various URL formats
function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const qualities = [
  { label: 'Max Resolution', key: 'maxresdefault' },
  { label: 'Standard', key: 'sddefault' },
  { label: 'Medium', key: 'mqdefault' },
  { label: 'Default', key: 'hqdefault' },
];

const input = document.getElementById('youtube-url');
const button = document.getElementById('get-thumbnail');
const thumbnailsDiv = document.getElementById('thumbnails');

// Spinner HTML
const spinner = `<div class="flex justify-center items-center py-8"><svg class="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg></div>`;

input.addEventListener('input', () => {
  thumbnailsDiv.innerHTML = '';
});

button.addEventListener('click', () => {
  const url = input.value.trim();
  const videoId = extractVideoId(url);
  thumbnailsDiv.innerHTML = spinner;

  setTimeout(() => { // Simulate loading for effect
    thumbnailsDiv.innerHTML = '';
    if (!videoId) {
      thumbnailsDiv.innerHTML = '<div class="text-red-500 text-center animate-fade-in">Invalid YouTube URL.</div>';
      return;
    }

    // Confetti (CSS only, simple)
    showConfetti();

    qualities.forEach((q, i) => {
      const thumbUrl = `https://img.youtube.com/vi/${videoId}/${q.key}.jpg`;
      const thumbBlock = document.createElement('div');
      thumbBlock.className = 'flex flex-col items-center opacity-0';
      thumbBlock.innerHTML = `
        <div class="mb-2 font-semibold">${q.label}</div>
        <img src="${thumbUrl}" alt="${q.label} Thumbnail" class="mb-2 border shadow">
        <a href="${thumbUrl}" download="${videoId}_${q.key}.jpg" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition" target="_blank" rel="noopener">Download</a>
      `;
      thumbnailsDiv.appendChild(thumbBlock);
      setTimeout(() => {
        thumbBlock.classList.add('animate-fade-in');
        thumbBlock.style.opacity = 1;
      }, 100 * i);
    });
  }, 500);
});

// Simple confetti (CSS only, for fun)
function showConfetti() {
  removeConfetti();
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    dot.className = 'confetti-dot';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.background = `hsl(${Math.random()*360},90%,70%)`;
    dot.style.animationDelay = (Math.random()*0.5) + 's';
    confetti.appendChild(dot);
  }
  document.body.appendChild(confetti);
  setTimeout(removeConfetti, 1200);
}
function removeConfetti() {
  document.querySelectorAll('.confetti').forEach(e => e.remove());
} 