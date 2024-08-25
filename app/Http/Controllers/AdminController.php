<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\JenisBarang;
use App\Models\SatuanBarang;
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

    //  Inventaris Barang
    public function renderAdminInventarisBarang()
    {
        $barang = Barang::with([
            'jenisBarang:id,nama',
            'satuanBarang:id,nama'
        ])->get();
        return Inertia::render('Admin/InventarisBarang/DaftarBarang', [
            'user' => auth()->user(),
            'barangs' => $barang,
        ]);
    }

    // Jenis Barang
    public function renderAdminInventarisBarangJenisBarang()
    {
        $jenisBarang = JenisBarang::all();
        $status = session('status');
        return Inertia::render('Admin/InventarisBarang/DaftarJenisBarang', [
            'user' => auth()->user(),
            'jenisBarangs' => $jenisBarang,
            'status' => $status
        ]);
    }
    public function renderAdminInventarisBarangJenisBarangCreate()
    {
        return Inertia::render('Admin/InventarisBarang/CreateJenisBarang', [
            'user' => auth()->user(),
        ]);
    }

    public function renderAdminUserManagement()
    {
        return Inertia::render('Admin/UserManagement', [
            'user' => auth()->user()
        ]);
    }


    public function createJenisBarangAction(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $jenisBarang = new JenisBarang();
        $jenisBarang->nama = $request->input('nama');
        $jenisBarang->save();
        $status = [
            'type' => 'success',
            'message' => 'Jenis barang berhasil ditambahkan!'
        ];

        return redirect()->route('admin.inventaris-barang.jenis')
            ->with('status', $status);
    }

    public function renderAdminInventarisBarangJenisBarangUpdate($id)
    {
        $jenisBarang = JenisBarang::find($id);
        return Inertia::render('Admin/InventarisBarang/UpdateJenisBarang', [
            'user' => auth()->user(),
            'prevJenisBarang' => $jenisBarang
        ]);
    }

    // Satuan barang

    public function renderAdminInventarisBarangSatuanBarang()
    {
        $satuanBarang = SatuanBarang::all();
        $status = session('status');
        return Inertia::render('Admin/InventarisBarang/DaftarSatuanBarang', [
            'user' => auth()->user(),
            'satuanBarangs' => $satuanBarang,
            'status' => $status
        ]);
    }

    public function renderAdminInventarisBarangSatuanBarangCreate()
    {
        $status = session('status');
        return Inertia::render('Admin/InventarisBarang/CreateSatuanBarang', [
            'user' => auth()->user(),
            'status' => $status
        ]);
    }
}
