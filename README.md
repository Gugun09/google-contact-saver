# google-contact-saver

Simpan otomatis nomor WhatsApp ke Google Kontak. Cocok digunakan untuk bot WhatsApp yang ingin menyimpan nomor baru sebelum membalas pesan.

## ✨ Fitur
- 🔐 Autentikasi via Google OAuth
- 📁 Simpan kontak ke akun Google Kontak
- 🔄 Otomatis refresh token
- ✅ Cek duplikat sebelum menambahkan
- 📦 Bisa digunakan di semua project, tidak hanya WhatsApp bot

## 🚀 Instalasi
```bash
npm install google-contact-saver
```

## 🔐 Login Google (wajib pertama kali)
1. Buat file `google-credentials.json` dari [Google Cloud Console](https://console.cloud.google.com/)
2. Jalankan:
```bash
npx google-contact-saver login
```

## 🧑‍💻 Cara Pakai
```js
const { simpanKontak } = require('google-contact-saver');
await simpanKontak({ nama: 'Joko Widodo', nomor: '081234567890' });
```

## 🔧 Konfigurasi Path (opsional)
Default:
- `./google-credentials.json`
- `./token.json`

Override via ENV:
```bash
GCRED_PATH=/config/gcred.json GTOKEN_PATH=/data/token.json node bot.js
```

## 🤖 Use case
- Bot WhatsApp
- CRM auto-enrichment
- Pengarsipan otomatis nomor WA
- Kontak leads dari broadcast

## 📄 Lisensi
MIT © 2025 - Bpr Bulungan
