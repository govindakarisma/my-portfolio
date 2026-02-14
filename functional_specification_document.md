# Functional Specification Document: Dynamic Portfolio Website

## Tanggal: 14 Februari 2026

## Pendahuluan

Website portfolio saat ini adalah situs statis yang dibangun menggunakan HTML, CSS, Bootstrap, dan sedikit JavaScript. Website ini di-host menggunakan GitHub Pages untuk publikasi gratis. Namun, untuk mengakomodasi pembaruan konten secara dinamis tanpa mengubah kode, website perlu dikembangkan menjadi aplikasi web dinamis dengan pemisahan antara Client Side (untuk publik) dan Admin Side (untuk pengelolaan konten).

### Tujuan Proyek

- Mengubah website statis menjadi dinamis untuk memudahkan pembaruan konten.
- Memisahkan akses publik (Client Side) dan admin (Admin Side).
- Memungkinkan pengelolaan konten seperti portfolio, sertifikat, dan file CV PDF melalui interface admin.
- Menjaga hosting gratis dan mudah di-deploy.

### Masalah yang Dihadapi

- GitHub Pages hanya mendukung situs statis; tidak dapat menjalankan backend atau database.
- Perlu solusi hosting yang mendukung aplikasi dinamis secara gratis.

### Kemungkinan Solusi Hosting

Ya, ini memungkinkan dengan menggunakan platform hosting yang mendukung aplikasi dinamis secara gratis, seperti:

- **Vercel**: Mendukung frontend dinamis (misal, dengan Next.js) dan serverless functions. Gratis untuk penggunaan dasar.
- **Netlify**: Mirip dengan Vercel, mendukung serverless functions dan hosting statis/dinamis.
- **Firebase Hosting + Firebase Functions**: Hosting gratis dengan backend serverless.
- Alternatif: GitHub Pages untuk frontend statis, dan backend di Heroku (free tier terbatas) atau Render (gratis untuk web apps sederhana).

Rekomendasi: Gunakan Vercel untuk kesederhanaan, karena terintegrasi dengan Git dan mendukung Next.js (React-based) yang cocok untuk aplikasi dinamis.

## Persyaratan Fungsional

### Client Side (Publik)

- **Halaman Utama**: Menampilkan informasi pribadi, tech stack, portfolio, sertifikat, dan link download CV.
- **Halaman Portfolio Detail**: Halaman terpisah untuk setiap proyek portfolio (sudah ada beberapa, seperti gis-menara.html, umkm.html).
- **Responsivitas**: Menggunakan Bootstrap untuk tampilan mobile-friendly.
- **Navigasi**: Menu navigasi dengan scroll ke section (Home, Tentang, Tech Stack, Portfolio, Sertifikat).
- **Sosial Media**: Link ke GitHub, LinkedIn, Instagram, Twitter.
- **Konten Dinamis**: Konten diambil dari database atau API, bukan hardcoded.

### Admin Side

- **Autentikasi**: Login untuk admin (pengguna tunggal: Govinda).
- **Dashboard**: Ringkasan konten (portfolio, sertifikat, CV).
- **Manajemen Portfolio**:
  - Tambah/Edit/Hapus proyek portfolio.
  - Upload gambar katalog, deskripsi, tech stack digunakan.
  - Link ke halaman detail.
- **Manajemen Sertifikat**:
  - Tambah/Edit/Hapus sertifikat.
  - Upload gambar sertifikat.
- **Manajemen CV**:
  - Upload file PDF CV baru.
  - Update link download.
- **Manajemen Tech Stack**: Tambah/Edit/Hapus tech stack dengan ikon SVG.
- **Manajemen Informasi Pribadi**: Update nama, deskripsi, foto profil.
- **Keamanan**: Hanya admin yang bisa akses; validasi input untuk mencegah XSS/SQL injection.

## Persyaratan Non-Fungsional

### Teknologi

- **Frontend**: Next.js (React) untuk Client Side dan Admin Side (menggunakan routing Next.js).
- **Backend**: Serverless functions (Vercel Functions atau Firebase Functions) untuk API.
- **Database**: Firebase Firestore (gratis untuk penggunaan kecil) atau Supabase (PostgreSQL gratis).
- **Styling**: Bootstrap untuk konsistensi dengan website lama.
- **Authentication**: Firebase Auth untuk admin login.
- **File Storage**: Firebase Storage untuk upload gambar dan PDF.
- **Deployment**: Vercel untuk hosting dan CI/CD otomatis dari GitHub.

### Performa

- Loading cepat; gunakan lazy loading untuk gambar.
- SEO-friendly dengan Next.js SSR.

### Keamanan

- HTTPS enforced.
- Validasi input di frontend dan backend.
- Rate limiting pada API.

### Skalabilitas

- Mudah ditambahkan fitur baru (misal, blog atau contact form).

## Arsitektur Sistem

### Komponen Utama

1. **Frontend (Client Side)**: Halaman publik yang mengkonsumsi API.
2. **Frontend (Admin Side)**: Interface admin untuk CRUD konten.
3. **Backend (API)**: Serverless functions untuk operasi database dan file storage.
4. **Database**: Firestore untuk data konten.
5. **Storage**: Firebase Storage untuk file.

### Alur Kerja

- Admin login via Firebase Auth.
- Admin mengelola konten melalui form di Admin Side.
- Data disimpan di Firestore/Storage.
- Client Side mengambil data via API dan render.

## Roadmap Development

### Fase 1: Setup dan Migrasi

- Setup proyek Next.js.
- Migrasi HTML/CSS/JS existing ke Next.js components.
- Setup Firebase (Auth, Firestore, Storage).
- Deploy ke Vercel.

### Fase 2: Implementasi Client Side

- Buat halaman publik dengan data dinamis dari API.
- Integrasi dengan database untuk konten.

### Fase 3: Implementasi Admin Side

- Buat halaman admin dengan autentikasi.
- Implementasi CRUD untuk portfolio, sertifikat, CV, dll.

### Fase 4: Testing dan Optimisasi

- Testing fungsionalitas.
- Optimisasi performa dan SEO.
- Dokumentasi penggunaan.

### Fase 5: Deployment Final

- Deploy production.
- Monitoring dan maintenance.

## Risiko dan Mitigasi

- **Hosting Gratis Limitasi**: Jika traffic tinggi, upgrade ke paid plan. Mitigasi: Optimisasi kode.
- **Kompleksitas**: Next.js mungkin baru; mitigasi dengan tutorial dan dokumentasi.
- **Keamanan**: Gunakan best practices Firebase.

## Kesimpulan

Proyek ini feasible dengan teknologi modern dan hosting gratis. Setelah diskusi ini, jika disetujui, lanjut ke eksekusi kode sesuai roadmap.
