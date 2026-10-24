const semester1Titles = ['Filosofi Pendidikan dan Pendidikan Nilai', 'Pemahaman tentang Peserta Didik dan Pembelajaran', 'Pembelajaran Mendalam dan Asesmen Dasar', 'PPL Terbimbing', 'Pola Pikir Bertumbuh (Growth Mindset)', 'Bahasa Inggris untuk Guru SD'];
const courses = {
  s1: semester1Details.map((detail, index) => ({ title: semester1Titles[index], ...detail })),
  s2: ['Pembelajaran Sosial Emosional', 'Pembelajaran Mendalam dan Asesmen Lanjut', 'PPL Mandiri', 'Projek Kepemimpinan', 'Teknologi Baru dalam Pengajaran dan Pembelajaran'].map(title => ({ title, pending: true }))
};
const grid = document.querySelector('#course-grid');
const escapeContent = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function artifactLinks(items = []) {
  return `<div class="artifact-analysis">${items.map((item, i) => {
    const href = escapeContent(item.href || `artifacts-semester1/${item.file}`);
    const isDocx = href.toLowerCase().endsWith('.docx');
    const actions = isDocx
      ? `<a class="button secondary" href="${href}" download>Unduh artefak (DOCX)</a>`
      : `<a class="button secondary" href="${href}" target="_blank" rel="noopener">Buka PDF ↗</a><a href="${href}" download>Unduh artefak</a>`;
    return `<article class="artifact-review"><h4>${i + 1}. ${escapeContent(item.label)}</h4><dl><div><dt>Alasan pemilihan artefak</dt><dd>${escapeContent(item.reason)}</dd></div><div><dt>Bagian yang mendukung refleksi</dt><dd>${escapeContent(item.part)}</dd></div><div><dt>Keterkaitan dengan hasil refleksi</dt><dd>${escapeContent(item.meaning)}</dd></div></dl><div class="artifact-actions">${actions}</div></article>`;
  }).join('')}</div>`;
}
function bindCourseButtons() {
  grid.querySelectorAll('.course-summary').forEach(button => button.addEventListener('click', () => {
    const open = button.closest('.course-card').classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  }));
}
function renderCourses(semester) {
  grid.innerHTML = courses[semester].map((course, index) => {
    const id = `course-${semester}-${index + 1}`;
    const sourceAnalysis = course.sourceAnalysis?.some(answer => answer.trim())
      ? `<details class="source-analysis"><summary>Uraian analisis lengkap dari LK sumber</summary>${course.sourceAnalysis.map((answer, i) => `<div><h4>${['Artefak pilihan', 'Alasan pemilihan', 'Bagian yang mendukung refleksi'][i]}</h4><p>${escapeContent(answer || 'Belum diisi dalam LK sumber.')}</p></div>`).join('')}</details>` : '';
    const sourceDownload = course.file ? `<p class="source-download"><a class="button secondary" href="${escapeContent(course.file)}" download>Unduh LK sumber (DOCX)</a></p>` : '';
    const editorial = course.editorialNote ? `<aside class="draft-note"><strong>Draf pengembangan untuk ditinjau</strong><p>${escapeContent(course.editorialNote)}</p></aside>` : '';
    const content = course.pending
      ? '<p>Refleksi Semester II sedang dimuat. Silakan tunggu sebentar.</p>'
      : `${editorial}<section class="lk2-part"><h3>A. Refleksi 4C</h3><div class="four-c">${['connection', 'challenge', 'concept', 'change'].map(key => `<div><h4>${key[0].toUpperCase() + key.slice(1)}</h4><p>${escapeContent(course[key] || 'Belum diisi dalam LK sumber.')}</p></div>`).join('')}</div></section><section class="lk2-part"><h3>B. Analisis artefak pembelajaran</h3>${artifactLinks(course.artifacts)}${sourceAnalysis}${sourceDownload}</section><section class="lk2-part practice-link"><h3>C. Kaitan praktis dan tindak lanjut</h3><p>${escapeContent(course.practice)}</p></section>`;
    return `<article class="course-card"><h2 class="course-heading"><button class="course-summary" type="button" aria-expanded="false" aria-controls="${id}"><span class="number">${String(index + 1).padStart(2, '0')}</span><span><strong>${escapeContent(course.title)}</strong><small>${course.pending ? 'Memuat refleksi' : course.draft ? 'Draf pengembangan · Perlu ditinjau' : '4C · Analisis artefak · Kaitan praktis'}</small></span><span class="chevron" aria-hidden="true">+</span></button></h2><div class="course-body" id="${id}">${content}</div></article>`;
  }).join('');
  bindCourseButtons();
}
const tabs = [...document.querySelectorAll('.tab')];
function selectSemester(tab, focus = false) {
  tabs.forEach(item => {
    item.classList.toggle('active', item === tab);
    item.setAttribute('aria-selected', String(item === tab));
    item.tabIndex = item === tab ? 0 : -1;
  });
  grid.setAttribute('aria-labelledby', tab.id);
  const description = document.querySelector('#semester-description');
  if (description) description.textContent = tab.dataset.semester === 's1'
    ? 'Semester I memuat enam hasil refleksi. Setiap mata kuliah disajikan dalam tiga bagian: A. Refleksi 4C, B. Analisis artefak pembelajaran, dan C. Kaitan praktis dan tindak lanjut. Tautan dokumen tersedia pada analisis masing-masing artefak.'
    : 'Semester II memuat lima hasil refleksi dengan struktur 4C, analisis artefak, serta kaitan praktis dan tindak lanjut. LK sumber dan dokumen pendukung tersedia pada setiap mata kuliah. Bagian PPL Mandiri yang dikembangkan dari perangkat pembelajaran diberi label draf untuk ditinjau.';
  renderCourses(tab.dataset.semester);
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSemester(tab));
  tab.addEventListener('keydown', event => {
    const offsets = {ArrowRight: 1, ArrowLeft: -1};
    if (event.key in offsets) {event.preventDefault();selectSemester(tabs[(index + offsets[event.key] + tabs.length) % tabs.length], true);}
    if (event.key === 'Home' || event.key === 'End') {event.preventDefault();selectSemester(tabs[event.key === 'Home' ? 0 : tabs.length - 1], true);}
  });
});
selectSemester(tabs[0]);
