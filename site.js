const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#nav-list');
if (menu && nav) {
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-list a').forEach(link => {
  const active = link.getAttribute('href') === currentPage;
  link.classList.toggle('active', active);
  if (active) link.setAttribute('aria-current', 'page');
});
const printButton = document.querySelector('#print-lk');
if (printButton) printButton.addEventListener('click', () => window.print());
// Preserve bookmarks from the former single-page portfolio.
if (currentPage === 'index.html') {
  const destinations = { '#identifikasi':'identifikasi.html', '#identitas':'identifikasi.html', '#refleksi':'refleksi.html', '#semester1':'refleksi.html', '#semester2':'refleksi.html?semester=2', '#ppg':'refleksi-ppg.html', '#ppl':'refleksi-ppg.html', '#inovasi':'inovasi.html', '#dokumen':'dokumen.html', '#katalog-modul':'dokumen.html#katalog-modul', '#dokumentasi':'dokumen.html#dokumentasi' };
  if (destinations[location.hash]) location.replace(destinations[location.hash]);
}
