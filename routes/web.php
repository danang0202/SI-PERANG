<?php

use App\Http\Controllers\AdminActionController;
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

    // Dashboard
    Route::get('dashboard', [AdminController::class, 'renderAdminDashboard'])->name('admin.dashboard');

    // Pengajuan
    Route::prefix('pengajuan')->group(function () {
        Route::get('perlu-tindakan',  [AdminController::class, 'renderAdminPengajuanPerluTindakan'])->name('admin.pengajuan.perlu-tindakan');
        Route::get('riwayat-pengajuan',  [AdminController::class, 'renderAdminPengajuanRiwayatPengajuan'])->name('admin.pengajuan.riwayat-pengajuan');
    });

    // Inventaris Barang
    Route::prefix('inventaris-barang')->group(function () {
        Route::get('/',  [AdminController::class, 'renderAdminInventarisBarang'])->name('admin.inventaris-barang');

        // Jenis Barang
        Route::prefix('jenis-barang')->group(function () {
            Route::get('/',  [AdminController::class, 'renderAdminInventarisBarangJenisBarang'])->name('admin.inventaris-barang.jenis');
            Route::get('create',  [AdminController::class, 'renderAdminInventarisBarangJenisBarangCreate'])->name('admin.inventaris-barang.jenis.create');
            Route::post('create/action',  [AdminController::class, 'createJenisBarangAction'])->name('admin.inventaris-barang.jenis.create.action');
            Route::get('{id}/update', [AdminController::class, 'renderAdminInventarisBarangJenisBarangUpdate'])->name('admin.inventaris-barang.jenis.update');
            Route::post('{id}/update/action', [AdminActionController::class, 'updateJenisBarangAction'])->name('admin.inventaris-barang.jenis.update.action');
            Route::delete('{id}/delete', [AdminActionController::class, 'deleteJenisBarangAction'])->name('admin.inventaris-barang.jenis.delete');
        });

        // Satuan Barang
        Route::prefix('satuan-barang')->group(function () {
            Route::get('/',  [AdminController::class, 'renderAdminInventarisBarangSatuanBarang'])->name('admin.inventaris-barang.satuan');
            Route::get('create',  [AdminController::class, 'renderAdminInventarisBarangSatuanBarangCreate'])->name('admin.inventaris-barang.satuan.create');
            Route::post('create/action',  [AdminActionController::class, 'createSatuanBarangAction'])->name('admin.inventaris-barang.satuan.create.action');
            Route::get('{id}/update', [AdminController::class, 'renderAdminInventarisBarangSatuanBarangUpdate'])->name('admin.inventaris-barang.satuan.update');
            Route::post('{id}/update/action', [AdminActionController::class, 'updateSatuanBarangAction'])->name('admin.inventaris-barang.satuan.update.action');
            Route::delete('{id}/delete', [AdminActionController::class, 'deleteSatuanBarangAction'])->name('admin.inventaris-barang.satuan.delete');
        });
    });

    // User Management
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
