<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function renderAdminDashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'user' => auth()->user()
        ]);
    }

    public function renderAdminPengajuanPerluTindakan()
    {
        return Inertia::render('Admin/Pengajuan/PerluTindakan', [
            'user' => auth()->user()
        ]);
    }

    public function renderAdminPengajuanRiwayatPengajuan()
    {
        return Inertia::render('Admin/Pengajuan/RiwayatPengajuan', [
            'user' => auth()->user()
        ]);
    }

    public function renderAdminInventarisBarang()
    {
        return Inertia::render('Admin/InventarisBarang', [
            'user' => auth()->user()
        ]);
    }

    public function renderAdminUserManagement()
    {
        return Inertia::render('Admin/UserManagement', [
            'user' => auth()->user()
        ]);
    }
}
