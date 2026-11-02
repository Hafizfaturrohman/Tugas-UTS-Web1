# BukuKita - UTS Pemrograman Web 1

Aplikasi front-end sederhana untuk pemesanan buku online menggunakan HTML, CSS, dan JavaScript.

## Fitur
1. Login dengan data pengguna dari `data.js`.
2. Modal Daftar dan Lupa Password.
3. Dashboard dengan greeting sesuai waktu lokal.
4. Katalog buku dinamis dari `dataKatalogBuku`.
5. Menambah data stok menggunakan JavaScript DOM.
6. Keranjang belanja: tambah buku, ubah jumlah, hapus item.
7. Checkout dengan informasi pemesan, alamat, ekspedisi, dan pembayaran.
8. Tracking pengiriman berdasarkan nomor DO.
9. Laporan pemesanan dan history transaksi.

## Struktur Folder

```text
UTS_Pemesanan_Buku/
├── css/
│   └── style.css
├── img/
│   ├── pengantar_komunikasi.jpg
│   ├── manajemen_keuangan.jpg
│   ├── kepemimpinan.jpg
│   ├── mikrobiologi.jpg
│   └── paud_perkembangan.jpg
├── js/
│   ├── app.js
│   ├── login.js
│   ├── dashboard.js
│   ├── stok.js
│   ├── checkout.js
│   ├── tracking.js
│   ├── laporan.js
│   └── history.js
├── data.js
├── login.html
├── dashboard.html
├── stok.html
├── checkout.html
├── tracking.html
├── laporan.html
├── history.html
└── README.md
```

## Cara Menjalankan
1. Ekstrak file ZIP.
2. Buka folder `UTS_Pemesanan_Buku` menggunakan Visual Studio Code.
3. Jalankan `login.html` menggunakan browser atau ekstensi Live Server.
4. Login menggunakan akun contoh berikut.

| Email | Password | Role |
|---|---|---|
| rina@gmail.com | rina123 | User |
| agus@gmail.com | agus123 | User |
| siti@gmail.com | siti123 | Admin |

## Alur Penggunaan
1. Login ke aplikasi.
2. Buka menu Stok/Katalog.
3. Klik `+ Keranjang` pada buku yang dipilih.
4. Buka menu Pemesanan, periksa jumlah buku, dan isi data pemesan.
5. Klik Buat Pesanan. Sistem membuat nomor DO otomatis.
6. Halaman Tracking akan terbuka dengan nomor DO tersebut.
7. Lihat Laporan Pemesanan dan History Transaksi.

## Catatan
- Project ini merupakan simulasi front-end sesuai instruksi UTS. Tidak menggunakan database atau backend.
- Data katalog awal dan data tracking contoh berada di `data.js`.
- Keranjang, akun tambahan, stok tambahan, dan transaksi disimpan menggunakan `localStorage` browser.
- Data `localStorage` hanya tersedia pada browser/perangkat yang sama. Gunakan browser yang sama saat menguji.
- Fitur Lupa Password hanya simulasi dan menampilkan password contoh melalui alert, bukan mengirim email.
- Data tracking awal `20230012` dan `20230013` berasal dari data soal. Status dan perjalanan merupakan data simulasi.
