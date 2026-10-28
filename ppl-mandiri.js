const videoButton = document.querySelector('#load-ppl-video');
const videoFrame = document.querySelector('#ppl-video-frame');
if (videoButton && videoFrame) {
  videoButton.addEventListener('click', () => {
    if (!videoFrame.querySelector('iframe')) {
      const frame = document.createElement('iframe');
      const videoId = videoButton.dataset.videoId || '17MazYqRPv4aZrt80cgP6OgchWLRVUQ0J';
      frame.src = `https://drive.google.com/file/d/${encodeURIComponent(videoId)}/preview`;
      frame.title = videoButton.dataset.videoTitle || 'Video praktik mengajar Matematika kelas II: Bangun Ruang';
      frame.allow = 'autoplay; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      videoFrame.append(frame);
    }
    videoFrame.hidden = false;
    videoButton.setAttribute('aria-expanded', 'true');
    videoButton.textContent = 'Pemutar video terbuka';
    videoButton.disabled = true;
  });
}
let previouslyClosed = [];
window.addEventListener('beforeprint', () => {
  previouslyClosed = [...document.querySelectorAll('.ppl-activities details:not([open])')];
  previouslyClosed.forEach(item => item.open = true);
});
window.addEventListener('afterprint', () => {
  previouslyClosed.forEach(item => item.open = false);
  previouslyClosed = [];
});
