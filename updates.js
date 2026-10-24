/* Semester II reflections and teaching documentation. */
if (document.querySelector('#course-grid')) {
fetch('semester2.json?v=20261022').then(response => { if (!response.ok) throw new Error('Refleksi tidak tersedia'); return response.json(); }).then(items => {
  courses.s2 = items.map(source => {
    const detail = semester2Details[source.title];
    if (!detail) throw new Error(`Data pendukung belum tersedia: ${source.title}`);
    const fields = Object.fromEntries(['connection','challenge','concept','change'].map((key,index) => [key, source.answers[index]?.trim() || detail.supplement?.[key] || '']));
    return {...source, ...detail, ...fields, sourceAnalysis:source.answers.slice(4)};
  });
  if(document.querySelector('[data-semester="s2"]').getAttribute('aria-selected') === 'true') renderCourses('s2');
}).catch(error => {
  console.error(error);
  const originalRender = renderCourses;
  renderCourses = function(semester) {
    if (semester !== 's2') return originalRender(semester);
    grid.innerHTML = '<p class="load-message">Refleksi Semester II belum dapat dimuat. Muat ulang halaman untuk mencoba kembali.</p>';
  };
  if(document.querySelector('[data-semester="s2"]').getAttribute('aria-selected') === 'true') renderCourses('s2');
});
if (new URLSearchParams(location.search).get('semester') === '2') document.querySelector('[data-semester="s2"]').click();
}
if (document.querySelector('#dokumen .evidence-grid')) {
const gallery = document.createElement('div'); gallery.id='dokumentasi'; gallery.className='teaching-gallery';
gallery.innerHTML = `<div class="section-heading"><p class="eyebrow">Dokumentasi pembelajaran</p><h3>Jejak praktik di kelas</h3></div><div class="photo-grid">${Array.from({length:11},(_,i)=>`<figure><a href="image/dokumentasi/${i+1}.jpeg" target="_blank" rel="noopener"><img src="image/dokumentasi/${i+1}.jpeg" loading="lazy" alt="Dokumentasi kegiatan pembelajaran ${i+1}"></a><figcaption>Dokumentasi pembelajaran ${i+1}</figcaption></figure>`).join('')}</div>`;
document.querySelector('#dokumen .evidence-grid').after(gallery);
const evidenceButtons=document.querySelectorAll('#dokumen .evidence-card button');
evidenceButtons.forEach(button=>{const title=button.closest('article').querySelector('h3').textContent;if(title.includes('Dokumentasi') || title.includes('LK &')){const link=document.createElement('a');link.className='document-jump';link.href=title.includes('Dokumentasi')?'#dokumentasi':'refleksi.html';link.textContent=title.includes('Dokumentasi')?'Lihat 11 foto pembelajaran':'Baca refleksi Semester I & II';button.replaceWith(link)}});
document.querySelector('.completion-note p').textContent='Refleksi Semester I dan II, modul ajar, dokumentasi pembelajaran, serta tautan karya inovatif tersedia di portofolio ini. Sebagian uraian PPL Mandiri merupakan draf pengembangan yang perlu ditinjau sesuai pengalaman praktik.';
}
