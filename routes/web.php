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

Route::get('/pengajuan/{id}/stream-pdf', [PDFController::class, 'streamPDF'])->name('streamPDF');

Route::get('/pengajuan/{id}/cetak-surat', [PDFController::class, 'renderPDFPage'])->name('cetak-surat')->middleware(['auth']);


//  Route group admin
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    // Dashboard
    Route::get('dashboard', [AdminController::class, 'renderAdminDashboard'])->name('admin.dashboard');
    // Pengajuan
    Route::prefix('pengajuan')->group(function () {
        // Group for "perlu-tindakan" routes
        Route::prefix('perlu-tindakan')->group(function () {
            Route::get('/', [AdminController::class, 'renderAdminPengajuanPerluTindakan'])
                ->name('admin.pengajuan.perlu-tindakan');

            Route::get('{id}/detail', [AdminController::class, 'renderAdminPengajuanPerluTindakanDetail'])
                ->name('admin.pengajuan.perlu-tindakan.detail');
        });
        // Group for "riwayat-pengajuan" routes
        Route::prefix('riwayat-pengajuan')->group(function () {
            Route::get('/', [AdminController::class, 'renderAdminPengajuanRiwayatPengajuan'])
                ->name('admin.pengajuan.riwayat-pengajuan');

            Route::get('{id}/detail', [AdminController::class, 'renderAdminPengajuanRiwayatPengajuanDetail'])
                ->name('admin.pengajuan.riwayat-pengajuan.detail');
        });
        // Routes for actions (accept/reject)
        Route::get('{id}/accepted', [AdminActionController::class, 'terimaPengajuanAction'])
            ->name('admin.pengajuan.accept');

        Route::get('{id}/rejected', [AdminActionController::class, 'tolakPengajuanAction'])
            ->name('admin.pengajuan.reject');
    });

    // Inventaris Barang
    Route::prefix('inventaris-barang')->group(function () {
        Route::get('/',  [AdminController::class, 'renderAdminInventarisBarang'])->name('admin.inventaris-barang');

        Route::get('create',  [AdminController::class, 'renderAdminInventarisBarangCreate'])->name('admin.inventaris-barang.create');

        Route::post('create/action',  [AdminActionController::class, 'saveBarangAction'])->name('admin.inventaris-barang.create.action');

        Route::get('/{id}/update',  [AdminController::class, 'renderAdminInventarisBarangUpdate'])->name('admin.inventaris-barang.update');

        Route::post('/{id}/update/action',  [AdminActionController::class, 'saveBarangAction'])->name('admin.inventaris-barang.update.action');

        Route::delete('{id}/delete', [AdminActionController::class, 'deleteBarangAction'])->name('admin.inventaris-barang.delete');

        Route::post('/{id}/tambah-stock',  [AdminActionController::class, 'tambahStockAction'])->name('admin.inventaris-barang.tambah-stock');

        // Jenis Barang
        Route::prefix('jenis-barang')->group(function () {
            Route::get('/',  [AdminController::class, 'renderAdminInventarisBarangJenisBarang'])->name('admin.inventaris-barang.jenis');

            Route::get('create',  [AdminController::class, 'renderAdminInventarisBarangJenisBarangCreate'])->name('admin.inventaris-barang.jenis.create');

            Route::post('create/action',  [AdminActionController::class, 'saveJenisBarangAction'])->name('admin.inventaris-barang.jenis.create.action');

            Route::get('{id}/update', [AdminController::class, 'renderAdminInventarisBarangJenisBarangUpdate'])->name('admin.inventaris-barang.jenis.update');

            Route::post('{id}/update/action', [AdminActionController::class, 'saveJenisBarangAction'])->name('admin.inventaris-barang.jenis.update.action');

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
    Route::prefix('user-management')->group(function () {
        Route::get('/', [AdminController::class, 'renderAdminUserManagement'])->name('admin.user-management');

        Route::get('/create', [AdminController::class, 'renderAdminUserManagementCreate'])->name('admin.user-management.create');

        Route::post('/create/action', [AdminActionController::class, 'createUserAction'])->name('admin.user-management.create.action');

        Route::get('/{id}/update', [AdminController::class, 'renderUserManagementUpdate'])->name('admin.user-management.update');

        Route::post('/{id}/update/action', [AdminActionController::class, 'updateUserAction'])->name('admin.user-management.update.action');

        Route::get('/{id}/status-update', [AdminActionController::class, 'changeUserStatusAction'])->name('admin.user-management.status-update');

        Route::prefix('tim-kerja')->group(function () {
            Route::get('/', [AdminController::class, 'renderAdminUserManagementTimKerja'])->name('admin.user-management.tim-kerja');

            Route::get('/create', [AdminController::class, 'renderAdminUserManagementTimKerjaCreate'])->name('admin.user-management.tim-kerja.create');

            Route::post('/create/action', [AdminActionController::class, 'createTimKerjaAction'])->name('admin.user-management.tim-kerja.create.action');

            Route::get('/{id}/update', [AdminController::class, 'renderAdminUserManagementTimKerjaUpdate'])->name('admin.user-management.tim-kerja.update');

            Route::post('/{id}/update/action', [AdminActionController::class, 'updateTimKerjaAction'])->name('admin.user-management.tim-kerja.update.action');

            Route::delete('/{id}/delete', [AdminActionController::class, 'deleteTimKerja'])->name('admin.user-management.tim-kerja.delete');
        });
    });
});

// Route grub user
Route::middleware(['auth', 'user'])->group(function () {
    Route::prefix('pengajuan')->name('user.pengajuan.')->group(function () {
        Route::prefix('tambah-pengajuan')->group(function () {
            Route::get('/', [UserController::class, 'renderPengajuanTambahPengajuan'])->name('tambah');

            Route::post('/action', [UserActionController::class, 'tambahPengajuanAction'])->name('tambah.action');
        });
        Route::get('/riwayat-pengajuan', [UserController::class, 'renderPengajuanRiwayatPengajuan'])->name('riwayat');

        Route::get('/riwayat-pengajuan/{id}/detail', [UserController::class, 'renderPengajuanRiwayatPengajuanDetail'])->name('riwayat.detail');

        Route::get('/{id}/pembatalan', [UserActionController::class, 'pembatalanPengajuanAction'])->name('pembatalan');
    });

    Route::get('/dashboard', [UserController::class, 'index'])->name('user.dashboard');

    Route::get('/daftar-barang', [UserController::class, 'renderDaftarBarang'])->name('user.daftar-barang');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__ . '/auth.php';
