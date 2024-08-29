<?php

use App\Http\Controllers\AdminActionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserActionController;
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
        Route::get('perlu-tindakan/{id}/detail',  [AdminController::class, 'renderAdminPengajuanPerluTindakanDetail'])->name('admin.pengajuan.perlu-tindakan.detail');
        Route::get('riwayat-pengajuan',  [AdminController::class, 'renderAdminPengajuanRiwayatPengajuan'])->name('admin.pengajuan.riwayat-pengajuan');
    });

    // Inventaris Barang
    Route::prefix('inventaris-barang')->group(function () {
        Route::get('/',  [AdminController::class, 'renderAdminInventarisBarang'])->name('admin.inventaris-barang');
        Route::get('create',  [AdminController::class, 'renderAdminInventarisBarangCreate'])->name('admin.inventaris-barang.create');
        Route::post('create/action',  [AdminActionController::class, 'createBarangAction'])->name('admin.inventaris-barang.create.action');
        Route::get('/{id}/update',  [AdminController::class, 'renderAdminInventarisBarangUpdate'])->name('admin.inventaris-barang.update');
        Route::post('/{id}/update/action',  [AdminActionController::class, 'updateBarangAction'])->name('admin.inventaris-barang.update.action');
        Route::delete('{id}/delete', [AdminActionController::class, 'deleteBarangAction'])->name('admin.inventaris-barang.delete');
        Route::post('/{id}/tambah-stock',  [AdminActionController::class, 'tambahStockAction'])->name('admin.inventaris-barang.tambah-stock');

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
    Route::prefix('pengajuan')->name('user.pengajuan.')->group(function () {
        Route::prefix('tambah-pengajuan')->group(function () {
            Route::get('/', [UserController::class, 'renderPengajuanTambahPengajuan'])->name('tambah');
            Route::post('/action', [UserActionController::class, 'tambahPengajuanAction'])->name('tambah.action');
        });
        Route::get('/riwayat-pengajuan', [UserController::class, 'renderPengajuanRiwayatPengajuan'])->name('riwayat');
        Route::get('/{id}/pembatalan', [UserActionController::class, 'pembatalanPengajuanAction'])->name('pembatalan');
    });

    Route::get('/dashboard', [UserController::class, 'index'])->name('user.dashboard');
    Route::get('/daftar-barang', [UserController::class, 'renderDaftarBarang'])->name('daftar-barang');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/pengajuan/{id}/stream-pdf', [PDFController::class, 'streamPDF'])->name('streamPDF');

require __DIR__ . '/auth.php';
