/* Semester II reflections and teaching documentation. */
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
fetch('semester2.json?v=20261022').then(response => { if (!response.ok) throw new Error('Refleksi tidak tersedia'); return response.json(); }).then(items => {
  courses.s2 = items;
  const originalRender = renderCourses;
  renderCourses = function(semester) {
    if (semester !== 's2') return originalRender(semester);
    grid.innerHTML = items.map((course, index) => `<article class="course-card"><button class="course-summary" type="button" aria-expanded="false"><span class="number">${index+1}</span><span><strong>${esc(course.title)}</strong><small>${course.incomplete ? 'Refleksi sebagian tersedia' : 'Buka refleksi 4C & analisis artefak'}</small></span><span class="chevron">+</span></button><div class="course-body"><div class="four-c">${['Connection','Challenge','Concept','Change'].map((label,i)=>`<div><b>${label}</b><p>${esc(course.answers[i] || 'Belum diisi dalam dokumen sumber.')}</p></div>`).join('')}</div><div class="artifact-block"><strong>Analisis artefak</strong>${course.answers.slice(4).map((answer,i)=>`<p><b>${['Artefak pilihan','Alasan pemilihan','Bagian yang mendukung refleksi'][i]}</b><br>${esc(answer || 'Belum diisi dalam dokumen sumber.')}</p>`).join('')}<a class="button secondary" href="${esc(course.file)}" download>Unduh LK refleksi (DOCX)</a></div></div></article>`).join('');
    grid.querySelectorAll('.course-summary').forEach(button=>button.addEventListener('click',()=>button.setAttribute('aria-expanded',String(button.closest('.course-card').classList.toggle('open')))));
  };
  if(document.querySelector('[data-semester="s2"]').getAttribute('aria-selected') === 'true') renderCourses('s2');
}).catch(error => console.error(error));
const innovation = document.querySelector('.innovation-copy');
innovation.innerHTML = `<span class="status">Sudah terbit</span><h3>Karya Inovatif Pendidikan</h3><p>Jelajahi karya inovatif pembelajaran yang saya kembangkan melalui situs khusus berikut.</p><a class="button primary" href="https://un4land01.github.io/Karya-Inovatif/" target="_blank" rel="noopener">Jelajahi karya inovatif ↗</a>`;
document.querySelector('.innovation-visual p').textContent = 'Karya pembelajaran tersedia melalui situs interaktif.';
const gallery = document.createElement('div'); gallery.id='dokumentasi'; gallery.className='teaching-gallery';
gallery.innerHTML = `<div class="section-heading"><p class="eyebrow">Dokumentasi pembelajaran</p><h3>Jejak praktik di kelas</h3></div><div class="photo-grid">${Array.from({length:11},(_,i)=>`<figure><a href="image/dokumentasi/${i+1}.jpeg" target="_blank" rel="noopener"><img src="image/dokumentasi/${i+1}.jpeg" loading="lazy" alt="Dokumentasi kegiatan pembelajaran ${i+1}"></a><figcaption>Dokumentasi pembelajaran ${i+1}</figcaption></figure>`).join('')}</div>`;
document.querySelector('#dokumen .evidence-grid').after(gallery);
const evidenceButtons=document.querySelectorAll('#dokumen .evidence-card button');
evidenceButtons.forEach(button=>{const title=button.closest('article').querySelector('h3').textContent;if(title.includes('Dokumentasi') || title.includes('LK &')){const link=document.createElement('a');link.className='document-jump';link.href=title.includes('Dokumentasi')?'#dokumentasi':'#refleksi';link.textContent=title.includes('Dokumentasi')?'Lihat 11 foto pembelajaran':'Baca refleksi Semester I & II';button.replaceWith(link)}});
document.querySelector('.completion-note p').textContent='Refleksi Semester I dan II, modul ajar, dokumentasi pembelajaran, serta tautan karya inovatif tersedia di portofolio ini. Refleksi PPL Mandiri masih perlu dilengkapi sesuai dokumen sumber.';
