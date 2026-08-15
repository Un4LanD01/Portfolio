# Portfolio PPG — Landing Page

Landing page statis (HTML + CSS + JS) untuk tugas portfolio mahasiswa PPG.
Berisi 5 section yang saling terhubung via anchor:

1. **Identitas Diri** (`#identitas`)
2. **Refleksi Semester 1** (`#semester1`)
3. **Refleksi Semester 2** (`#semester2`)
4. **Refleksi Program PPL Keseluruhan** (`#ppl`)
5. **Inovasi Karya Baru** (`#inovasi`)

## Cara Menjalankan

Cukup buka file `index.html` langsung di browser (klik dua kali).
Tidak perlu install apa pun.

## Cara Mengganti Konten

1. Buka `index.html` dengan editor teks.
2. Cari teks yang ditandai `[GANTI: ...]` — itulah placeholder.
3. Ganti dengan data asli kamu. Contoh:

   - `[GANTI: Nama Kamu]` → `Budi Santoso`
   - `[GANTI: email@kamu.com]` → `budi@email.com`

### Mengganti Foto Profil

Di section Identitas, ganti atribut `src` pada tag `<img class="avatar">`
dengan file foto kamu, misalnya:

```html
<img class="avatar" src="foto.png" alt="Foto saya" />
```

Letakkan file `foto.png` di folder yang sama dengan `index.html`.

### Mengganti Gambar Karya (Inovasi)

Di section Inovasi, bagian `<div class="thumb">📚</div>` bisa diganti dengan gambar:

```html
<div class="thumb" style="background-image:url('karya1.png'); background-size:cover;"></div>
```

## Fitur

- Navbar sticky + **smooth scroll** ke section tujuan saat menu diklik
- Kartu shortcut di hero yang langsung membawa ke tiap section
- Scroll-spy (menu aktif menyorot section yang sedang dilihat)
- Menu hamburger di layar kecil (mobile)
- Animasi reveal saat scroll
- Desain modern minimalis & responsif