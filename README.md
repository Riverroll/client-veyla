# Resto Next Gen - Frontend

Proyek ini adalah aplikasi front-end untuk manajemen restoran modern bernama "D'Ristorante". Aplikasi ini dikembangkan menggunakan React dan Vite, serta diatur untuk mendukung Hot Module Replacement (HMR) dan beberapa aturan ESLint.

## Struktur Folder

src/
├── app/
├── assets/
├── components/
├── features/
├── hooks/
├── pages/
├── utils/
└── App.js

### Penjelasan Direktori

- **app/**: Mengandung konfigurasi aplikasi global seperti pengaturan state management (`store.js`).
- **assets/**: Berisi aset statis seperti gambar (logo, background, dan profil).
- **components/**: Komponen UI yang dapat digunakan kembali, seperti kartu, ikon, layout, dan tabel.
- **features/**: Fitur spesifik seperti keranjang belanja, kategori produk, pesanan, manajemen produk, dan pengguna.
- **hooks/**: Custom hooks untuk logika aplikasi yang dapat digunakan kembali.
- **pages/**: Halaman utama aplikasi, termasuk halaman administrasi seperti autentikasi, dashboard, produk, transaksi, dan manajemen pengguna.
- **utils/**: Fungsi helper dan utilitas yang digunakan di berbagai bagian aplikasi.
- **App.js**: Entry point utama aplikasi untuk konfigurasi routing dan tata letak.

## Teknologi yang Digunakan

Proyek ini memanfaatkan berbagai pustaka dan alat untuk pengembangan front-end modern:

### Dependencies

- **[@emotion/react](https://emotion.sh/docs/introduction)** & **[@emotion/styled](https://emotion.sh/docs/styled)**: Digunakan untuk styling berbasis CSS-in-JS.
- **[@mui/material](https://mui.com/)**: Komponen Material-UI untuk antarmuka pengguna.
- **[@mui/x-data-grid](https://mui.com/x/react-data-grid/)**: Komponen tabel data yang canggih.
- **[@reduxjs/toolkit](https://redux-toolkit.js.org/)**: Untuk state management yang lebih mudah dan terstruktur.
- **[axios](https://axios-http.com/)**: Library untuk melakukan permintaan HTTP.
- **[crypto-js](https://cryptojs.gitbook.io/docs/)**: Digunakan untuk enkripsi dan dekripsi data.
- **[dotenv](https://github.com/motdotla/dotenv)**: Mengelola variabel lingkungan secara aman.
- **[framer-motion](https://www.framer.com/motion/)**: Library animasi untuk React.
- **[jwt-decode](https://github.com/auth0/jwt-decode)**: Untuk decoding token JWT.
- **[lucide-react](https://lucide.dev/docs/react)**: Ikon berbasis SVG untuk React.
- **[react](https://reactjs.org/)** & **[react-dom](https://reactjs.org/docs/react-dom.html)**: Library inti untuk membangun antarmuka pengguna.
- **[react-icons](https://react-icons.github.io/react-icons/)**: Ikon untuk React dari berbagai pustaka ikon.
- **[react-redux](https://react-redux.js.org/)**: Integrasi Redux dengan React.
- **[react-router-dom](https://reactrouter.com/)**: Digunakan untuk navigasi aplikasi.
- **[react-spinners](https://www.davidhu.io/react-spinners/)**: Komponen loader untuk antarmuka pengguna.
- **[react-toastify](https://fkhadra.github.io/react-toastify/)**: Pemberitahuan toast untuk memberikan umpan balik pengguna.
- **[yup](https://github.com/jquense/yup)**: Library untuk validasi skema objek.

### DevDependencies

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)**: Plugin resmi untuk mendukung React di Vite.
- **[autoprefixer](https://github.com/postcss/autoprefixer)**: Menambahkan prefix CSS secara otomatis untuk kompatibilitas browser.
- **[eslint](https://eslint.org/)** & plugin terkait: Digunakan untuk memastikan kualitas dan konsistensi kode.
- **[postcss](https://postcss.org/)**: Alat untuk memproses CSS.
- **[tailwindcss](https://tailwindcss.com/)**: Framework CSS berbasis utility-first.
- **[vite](https://vitejs.dev/)**: Alat build modern yang menyediakan pengembangan cepat dengan dukungan HMR.

## Cara Menjalankan Proyek

## Instalasi Dependensi

Untuk menginstal semua dependensi yang diperlukan, jalankan perintah berikut:

```
npm install
```

## Menjalankan Aplikasi

Setelah semua dependensi terinstal, Anda dapat menjalankan aplikasi dengan perintah berikut:

```
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000 secara default.
