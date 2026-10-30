// Rekaman Warna Panas dan Dingin: minggu ke-5 PPL, perangkat UAS siklus 4.
const uasVideoIds = {2: '1nH4WqZFItFn1U2WdBJY21Rr8nID401ZV', 3: '17MazYqRPv4aZrt80cgP6OgchWLRVUQ0J', 4: '1PFNc5HIP5DN92BeQwDfZSnPfE9pwrjOm'};
document.querySelectorAll('.uas-video-load').forEach(button => {button.addEventListener('click', () => {const cycle = button.dataset.cycle; const id = uasVideoIds[cycle]; const region = document.getElementById('video-frame-' + cycle); if (!id || !region) return; if (!region.querySelector('iframe')) {const frame = document.createElement('iframe');frame.src = 'https://drive.google.com/file/d/' + encodeURIComponent(id) + '/preview';frame.title = 'Video praktik mengajar mandiri siklus ' + cycle;frame.allow = 'autoplay; fullscreen';frame.allowFullscreen = true;frame.referrerPolicy = 'strict-origin-when-cross-origin';region.append(frame);}region.hidden = false;button.setAttribute('aria-expanded', 'true');button.textContent = 'Pemutar video siklus ' + cycle + ' terbuka';button.disabled = true;});});
const uasDetails = [...document.querySelectorAll('.uas-detail')];
const expandButton = document.querySelector('#expand-analysis');
const syncExpandButton = () => {if (!expandButton) return;const allOpen = uasDetails.every(detail => detail.open);expandButton.setAttribute('aria-expanded', String(allOpen));expandButton.textContent = allOpen ? 'Tutup semua analisis' : 'Buka semua analisis';};
if (expandButton) expandButton.addEventListener('click', () => {const shouldOpen = !uasDetails.every(detail => detail.open);uasDetails.forEach(detail => {detail.open = shouldOpen;});syncExpandButton();});
uasDetails.forEach(detail => detail.addEventListener('toggle', syncExpandButton));
let uasClosedBeforePrint = [];
window.addEventListener('beforeprint', () => {uasClosedBeforePrint = uasDetails.filter(detail => !detail.open);uasClosedBeforePrint.forEach(detail => {detail.open = true;});});
window.addEventListener('afterprint', () => {uasClosedBeforePrint.forEach(detail => {detail.open = false;});uasClosedBeforePrint = [];syncExpandButton();});
