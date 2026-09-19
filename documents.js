const teachingDocuments=[
{type:"Terbimbing",subject:"Bahasa Indonesia",grade:"Kelas 2",title:"Menjaga Kesehatan",pages:28,size:"25,3 MB",file:"terbimbing-bahasa-indonesia-kelas-2-menjaga-kesehatan.pdf"},
{type:"Terbimbing",subject:"Matematika",grade:"Kelas 4",title:"Pembagian Bilangan Cacah sampai 100",pages:27,size:"12,2 MB",file:"terbimbing-matematika-kelas-4-pembagian.pdf"},
{type:"Mandiri",subject:"Matematika",grade:"Kelas 1",title:"Menghitung Maju dan Mundur",pages:18,size:"1,4 MB",file:"mandiri-matematika-kelas-1-menghitung-maju-mundur.pdf"},
{type:"Mandiri",subject:"Matematika",grade:"Kelas 2",title:"Soal Cerita Penjumlahan dan Pengurangan",pages:18,size:"1,1 MB",file:"mandiri-matematika-kelas-2-soal-cerita.pdf"},
{type:"Mandiri",subject:"Bahasa Indonesia",grade:"Kelas 3",title:"Kalimat Denotatif",pages:19,size:"1,1 MB",file:"mandiri-bahasa-indonesia-kelas-3-kalimat-denotatif.pdf"},
{type:"Mandiri",subject:"Pendidikan Pancasila",grade:"Kelas 2",title:"Mengenal Perumus Pancasila",pages:18,size:"1,4 MB",file:"mandiri-pancasila-kelas-2-perumus-pancasila.pdf"},
{type:"Mandiri",subject:"IPAS",grade:"Kelas 3",title:"Pertumbuhan dan Perkembangan Manusia",pages:17,size:"8,9 MB",file:"mandiri-ipas-kelas-3-pertumbuhan-manusia.pdf"},
{type:"Mandiri",subject:"Matematika",grade:"Kelas 5",title:"Kelipatan Persekutuan",pages:16,size:"1,1 MB",file:"mandiri-matematika-kelas-5-kelipatan-persekutuan.pdf"},
{type:"Mandiri",subject:"Matematika",grade:"Kelas 2",title:"Bangun Ruang",pages:17,size:"2,7 MB",file:"mandiri-matematika-kelas-2-bangun-ruang.pdf"},
{type:"Mandiri",subject:"Matematika",grade:"Kelas 3",title:"Kalimat Matematika Pengurangan",pages:20,size:"1,3 MB",file:"mandiri-matematika-kelas-3-pengurangan.pdf"},
{type:"Mandiri",subject:"IPAS",grade:"Kelas 4",title:"Gaya",pages:15,size:"1,4 MB",file:"mandiri-ipas-kelas-4-gaya.pdf"}
];
const evidenceGrid=document.querySelector("#dokumen .evidence-grid");
if(evidenceGrid){
  const firstButton=evidenceGrid.querySelector(".evidence-card button");
  if(firstButton){const jump=document.createElement("a");jump.className="document-jump";jump.href="#katalog-modul";jump.textContent="Lihat 11 modul ajar";firstButton.replaceWith(jump)}
  const catalog=document.createElement("div");catalog.id="katalog-modul";catalog.className="document-catalog";
  catalog.innerHTML=`<div class="catalog-head"><div><p class="eyebrow">Katalog PDF</p><h3>Modul Ajar & Evaluasi</h3></div><p>${teachingDocuments.length} dokumen · PPL Terbimbing dan Mandiri</p></div><div class="document-list">${teachingDocuments.map((doc,index)=>`<article class="document-row"><span class="doc-index">${String(index+1).padStart(2,"0")}</span><div class="doc-main"><div class="doc-tags"><span>${doc.type}</span><span>${doc.subject}</span><span>${doc.grade}</span></div><h4>${doc.title}</h4><p>${doc.pages} halaman · ${doc.size} · Modul dan evaluasi</p></div><div class="doc-actions"><a href="documents/${doc.file}" target="_blank" rel="noopener">Buka PDF</a><a href="documents/${doc.file}" download>Unduh</a></div></article>`).join("")}</div>`;
  evidenceGrid.insertAdjacentElement("afterend",catalog);
}
