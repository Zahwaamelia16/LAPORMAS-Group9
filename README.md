# LAPORMAS Login Frontend

Halaman login LAPORMAS menggunakan React + Vite.

## Menjalankan project

```bash
npm install
npm run dev
```

## Gambar hero

Letakkan foto lingkungan/desa yang dipakai pada panel kiri dengan nama:

`public/images/hero-lapormas.png`

Jika gambar belum tersedia, panel tetap memiliki warna dasar dan overlay hijau, tetapi foto latar tidak akan tampil.

## Integrasi login dengan backend

1. Salin `.env.example` menjadi `.env`.
2. Isi `VITE_API_BASE_URL` dengan URL server backend.
3. Isi `VITE_LOGIN_ENDPOINT` sesuai route login backend.
4. Periksa bagian `handleSubmit` pada `src/App.jsx`. Payload saat ini mengirim:

```json
{
  "identifier": "email atau nomor telepon",
  "password": "kata sandi",
  "role": "warga atau petugas"
}
```

Sesuaikan nama properti dan format respons dengan REST API yang benar. Endpoint `/api/auth/login` pada contoh ini merupakan asumsi konfigurasi, bukan klaim bahwa endpoint tersebut sudah tersedia di backend.

## Navigasi

Tautan Sign Up diarahkan ke `/register?role=warga` atau `/register?role=petugas`. Halaman register perlu dibuat terpisah.
