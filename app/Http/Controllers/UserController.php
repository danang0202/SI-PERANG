<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pengajuan;
use App\Models\SatuanBarang;
use Carbon\Carbon;
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
        $barang = Barang::get();
        $satuanBarang = SatuanBarang::all();
        $status = session('status');
        return Inertia::render('User/Pengajuan/TambahPengajuan', [
            'user' => auth()->user(),
            'barangs' => $barang,
            'satuanBarangs' =>  $satuanBarang,
            'status' => $status
        ]);
    }
    public function renderPengajuanRiwayatPengajuan()
    {
        $user = auth()->user();
        $pengajuans = Pengajuan::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        $status = session('status');
        return Inertia::render('User/Pengajuan/RiwayatPengajuan', [
            'user' => $user,
            'pengajuans' => $pengajuans,
            'status' => $status
        ]);
    }

    public function renderPengajuanRiwayatPengajuanDetail($id)
    {
        $pengajuan = Pengajuan::where('id', $id)->with([
            'user',
            'items' => function ($query) {
                $query->with([
                    'barang' => function ($query) {
                        $query->with(['satuanBarang:id,nama', 'jenisBarang:id,nama']);
                    }
                ]);
            }
        ])->first();
        $status = session('status');
        return Inertia::render('Admin/Pengajuan/PengajuanDetail', [
            'user' => auth()->user(),
            'pengajuan' => $pengajuan,
            'status' => $status,
            'backUrl' => 'user.pengajuan.riwayat'
        ]);
    }
    public function renderDaftarBarang()
    {
        $barang = Barang::with([
            'jenisBarang:id,nama',
            'satuanBarang:id,nama'
        ])->get();
        return Inertia::render('User/DaftarBarang', [
            'user' => auth()->user(),
            'barangs' => $barang
        ]);
    }
}
