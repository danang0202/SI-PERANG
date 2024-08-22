<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


//  Route group admin
Route::get('/test', function () {
    return Inertia::render('Test');
});
Route::prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::get('pengajuan/perlu-tindakan', function () {
        return Inertia::render('Admin/Pengajuan/PerluTindakan');
    })->name('admin.pengajuan.perlu-tindakan');

    Route::get('pengajuan/riwayat-pengajuan', function () {
        return Inertia::render('Admin/Pengajuan/RiwayatPengajuan');
    })->name('admin.pengajuan.riwayat-pengajuan');

    Route::get('inventaris-barang', function () {
        return Inertia::render('Admin/InventarisBarang');
    })->name('admin.inventaris-barang');

    Route::get('user-management', function () {
        return Inertia::render('Admin/UserManagement');
    })->name('admin.user-management');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
