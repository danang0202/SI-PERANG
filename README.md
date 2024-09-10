# (logo-HD.png)

> ### SI PERANG merupakan aplikasi yang bertujuan untuk mengekomodasi permintaan barang dari setiap tim Kerja ke bagian umum BPS Bantul. Pengguna aplikasi ini adalah admin dan user. Admin dapat melakukan inventaris barang (CRUD Barang, CRUD Jenis Barang, CRUD Satuan Barang), Melihat dashoard permintaan barang, menerima permintaan, membatalkna pmermintaan, melihat riwayat permintaan barang, manajemen user, dan manajemen tim kerja. Sementara itu, user dapat melihat dashboard permintaan barang mereka, menambah permintaan barang baru, melihat riwayat permintaan barang, dan melihat daftar barang. 

# Ringkasan TechStack
| **Kategori** 	| **Teknologi**              	| **Deskripsi**            	|
|-------------	|----------------------------	|------------------	|
| Backend        | PHP Laravel 10.10             | Framework PHP populer untuk membangun aplikasi web. 	|
| Frontend       | React 18.3.1                  | Library JavaScript untuk membangun antarmuka pengguna. 	|
| Frontend       | Inertia.js 0.6.3              | Framework rendering server untuk Laravel, mengintegrasikan PHP dan React. 	|
| Database         | MySQL                         | Sistem manajemen basis data relasional untuk menyimpan data aplikasi. 	|
| UI Components       | Mantine UI                         | Kumpulan komponen React untuk membangun antarmuka pengguna modern. 	|

# Getting started

## Installation
Pastikan Anda memeriksa panduan instalasi Laravel resmi untuk mengetahui persyaratan server sebelum memulai. [Official Documentation](https://laravel.com/docs/10.10/installation#installation)

Clone repositori ini:

    git clone git@github.com:gothinkster/laravel-realworld-example-app.git

Beralih ke folder repo:

    cd SI-PERANG

Install semua dependensi menggunakan composer:

    npm install

Install semua dependensi frontend menggunakan composer:

    composer install

Salin file .env contoh dan lakukan perubahan konfigurasi yang diperlukan:

    cp .env.example .env

Generate aplikasi key baru:

    php artisan key:generate

Jalankan migrasi database (**Setel koneksi database di file .env sebelum menjalankan migrasi**)

    php artisan migrate

Mulai server pengembangan lokal

    php artisan serve

Pada terminal baru, jalankan perintah berikut untuk memulai bundler frontend:

    php artisan serve

Anda dapat mengakses server di http://localhost:8000

**Ringkasan Perintah**

    git clone git@github.com:gothinkster/laravel-realworld-example-app.git
    cd laravel-realworld-example-app
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan jwt:generate 
**Pastikan file .env anda sudah benar sebelum melakukan migrasi** [Environment variables](#environment-variables)

    php artisan migrate
    php artisan serve
**Buka terminal baru**

    npm run dev


## Database seeding

**Isi database dengan data dummy termasuk hubungan antar tabel yang mencakup pengguna, tim kerja, user_has_tim_kerja, barang, jenis_barang, satuan_barang, pengajuan, item_pengajuan, dll.**

Buka DatabaseSeeder dan sesuaikan nilai properti sesuai kebutuhan Anda:

    database/seeds/DatabaseSeeder.php

Jalankan seeder database dan anda sudah siap:

    php artisan db:seed

***Catatan*** : ICatatan: Disarankan untuk memiliki database yang bersih sebelum seeding. Anda dapat me-refresh migrasi kapan saja untuk membersihkan database dengan menjalankan perintah berikut:

    php artisan migrate:fresh

## Dependencies

- [Laravel-Breeze] - Untuk otentikasi
- [barryvdh/laravel-dompdf] - Untuk menangani pembuatan PDF
- [inertiajs/inertia-laravel] - Untuk integrasi antara Laravel dan React
- [tightenco/ziggy] - Untuk menggunakan Laravel routes di JavaScript

## Additional Information
- **Frontend Framework**:  Proyek ini menggunakan React yang diintegrasikan dengan Laravel melalui Inertia.js untuk menciptakan pengalaman SPA (Single Page Application).
- **Component Library**: Kami menggunakan Mantine untuk komponen UI.
- **State Management**: Menggunakan React's built-in state management bersama dengan Inertia.js untuk manajemen state halaman.
- **Deployment**: Saat melakukan deployment ke production, pastikan untuk mengubah environment dari local ke production dalam file .env dan jalankan npm run build untuk mengoptimalkan aset frontend.
