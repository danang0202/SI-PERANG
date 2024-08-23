<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
// Route::get('/', function () {
//     return Inertia::render('User/Dashboard', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

//  Route group admin
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'renderAdminDashboard'])->name('admin.dashboard');

    Route::get('pengajuan/perlu-tindakan',  [AdminController::class, 'renderAdminPengajuanPerluTindakan'])->name('admin.pengajuan.perlu-tindakan');

    Route::get('pengajuan/riwayat-pengajuan',  [AdminController::class, 'renderAdminPengajuanRiwayatPengajuan'])->name('admin.pengajuan.riwayat-pengajuan');

    Route::get('inventaris-barang',  [AdminController::class, 'renderAdminInventarisBarang'])->name('admin.inventaris-barang');

    Route::get('user-management', [AdminController::class, 'renderAdminUserManagement'])->name('admin.user-management');
});

// Route grub user
Route::middleware(['auth', 'user'])->group(function () {
    Route::get('/dashboard', [UserController::class, 'index'])->name('user.dashboard');
    Route::get('/pengajuan/tambah-pengajuan', [UserController::class, 'renderPengajuanTambahPengajuan'])->name('user.tambah-pengajuan');
    Route::get('/pengajuan/riwayat-pengajuan', [UserController::class, 'renderPengajuanRiwayatPengajuan'])->name('user.riwayat-pengajuan');
    Route::get('/daftar-barang', [UserController::class, 'renderDaftarBarang'])->name('user.daftar-barang');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
