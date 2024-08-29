<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\JenisBarang;
use App\Models\Pengajuan;
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
        $pengajuans = Pengajuan::where('status', 'MENUNGGU KONFIRMASI')->with(['user:id,nama,tim_kerja'])->orderBy('created_at', 'asc')->get();
        return Inertia::render('Admin/Pengajuan/PerluTindakan', [
            'user' => auth()->user(),
            'pengajuans' => $pengajuans

        ]);
    }

    public function renderAdminPengajuanPerluTindakanDetail($id)
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
        return Inertia::render('Admin/Pengajuan/PengajuanDetail', [
            'user' => auth()->user(),
            'pengajuan' => $pengajuan
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
        $status = session('status');
        return Inertia::render('Admin/InventarisBarang/DaftarBarang', [
            'user' => auth()->user(),
            'barangs' => $barang,
            'status' => $status
        ]);
    }

    public function renderAdminInventarisBarangCreate()
    {
        $jenisBarangs = JenisBarang::select('id', 'nama')->get();
        $satuanBarangs = SatuanBarang::select('id', 'nama')->get();
        return Inertia::render('Admin/InventarisBarang/CreateBarang', [
            'user' => auth()->user(),
            'jenisBarangs' => $jenisBarangs,
            'satuanBarangs' => $satuanBarangs,
        ]);
    }

    public function renderAdminInventarisBarangUpdate($id)
    {
        $prevBarang = Barang::findOrFail($id);
        $jenisBarangs = JenisBarang::select('id', 'nama')->get();
        $satuanBarangs = SatuanBarang::select('id', 'nama')->get();
        $status = session('status');
        return Inertia::render('Admin/InventarisBarang/UpdateBarang', [
            'user' => auth()->user(),
            'jenisBarangs' => $jenisBarangs,
            'satuanBarangs' => $satuanBarangs,
            'prevBarang' => $prevBarang,
            'status' => $status
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

    public function renderAdminInventarisBarangSatuanBarangUpdate($id)
    {
        $satuanBarang = SatuanBarang::find($id);
        $status = session('status');
        return Inertia::render('Admin/InventarisBarang/UpdateSatuanBarang', [
            'user' => auth()->user(),
            'prevSatuanBarang' => $satuanBarang,
            'status' => $status
        ]);
    }
}
