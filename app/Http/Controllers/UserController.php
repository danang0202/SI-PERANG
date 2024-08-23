<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Dashboard', [
            'user' => auth()->user(),
        ]);
    }

    public function renderPengajuanTambahPengajuan()
    {
        return Inertia::render('User/Pengajuan/TambahPengajuan', [
            'user' => auth()->user()
        ]);
    }
    public function renderPengajuanRiwayatPengajuan()
    {
        return Inertia::render('User/Pengajuan/RiwayatPengajuan', [
            'user' => auth()->user()
        ]);
    }

    public function renderDaftarBarang()
    {
        return Inertia::render('User/DaftarBarang', [
            'user' => auth()->user()
        ]);
    }
}

