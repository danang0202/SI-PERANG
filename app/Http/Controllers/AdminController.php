<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\JenisBarang;
use App\Models\Pengajuan;
use App\Models\SatuanBarang;
use App\Models\TimKerja;
use App\Models\User;
use Carbon\Carbon;
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

    public function renderAdminPengajuanPerluTindakan(Request $request)
    {
        // Ambil parameter 'statuses', 'dateRange', 'keyword', dan 'timKerjas' dari URL, jika ada
        $statuses = $request->get('statuses', []);
        $dateRange = $request->get('dateRange', []);
        $keyword = $request->get('keyword', '');
        $timKerjas = $request->get('timKerjas', []);

        // Query dasar dengan relasi dan pengurutan
        $query = Pengajuan::where('status', 'MENUNGGU KONFIRMASI')->with(['user:id,nama', 'timKerja:id,nama'])
            ->orderBy('id', 'desc');

        // Jika ada parameter 'statuses', tambahkan kondisi whereIn
        if (!empty($statuses)) {
            $query->whereIn('status', $statuses);
        }

        // Jika ada parameter 'dateRange', tambahkan kondisi whereBetween untuk tanggal
        if (!empty($dateRange) && count($dateRange) === 2) {
            $startDate = Carbon::parse($dateRange[0])->startOfDay();
            $endDate = Carbon::parse($dateRange[1])->endOfDay();
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        // Jika ada parameter 'keyword', tambahkan kondisi where untuk pencarian pada kolom 'no_pengajuan' atau nama user
        if (!empty($keyword)) {
            $query->where(function ($q) use ($keyword) {
                $q->where('no_pengajuan', 'like', '%' . $keyword . '%')
                    ->orWhereHas('user', function ($q) use ($keyword) {
                        $q->where('nama', 'like', '%' . $keyword . '%');
                    });
            });
        }

        // Jika ada parameter 'timKerjas', tambahkan kondisi whereIn untuk tim_kerja_id
        if (!empty($timKerjas)) {
            $query->whereHas('timKerja', function ($q) use ($timKerjas) {
                $q->whereIn('nama', $timKerjas); // Asumsi kolom 'nama' di tabel 'tim_kerja' digunakan untuk filter
            });
        }
        // Lakukan pagination dengan hasil query
        $pengajuans = $query->paginate(15);
        $timKerja = TimKerja::pluck('nama')->toArray();

        // Render halaman dengan data paginatedPengajuans dan filter
        return Inertia::render('Admin/Pengajuan/PerluTindakan', [
            'user' => auth()->user(),
            'paginatedPengajuans' => $pengajuans,
            'timKerja' => $timKerja,
            'filters' => [
                'statuses' => $statuses,
                'dateRange' => $dateRange,
                'keyword' => $keyword,
                'timKerjas' => $timKerjas,
            ],
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
            },
            'timKerja'
        ])->first();
        $status = session('status');
        return Inertia::render('Admin/Pengajuan/PengajuanDetail', [
            'user' => auth()->user(),
            'pengajuan' => $pengajuan,
            'status' => $status,
            'backUrl' => 'admin.pengajuan.perlu-tindakan'
        ]);
    }

    public function renderAdminPengajuanRiwayatPengajuan(Request $request)
    {
        // Ambil parameter 'statuses', 'dateRange', 'keyword', dan 'timKerjas' dari URL, jika ada
        $statuses = $request->get('statuses', []);
        $dateRange = $request->get('dateRange', []);
        $keyword = $request->get('keyword', '');
        $timKerjas = $request->get('timKerjas', []);
        // Query dasar dengan relasi dan pengurutan
        $query = Pengajuan::with(['user:id,nama', 'timKerja:id,nama'])
            ->orderBy('id', 'desc');

        // Jika ada parameter 'statuses', tambahkan kondisi whereIn
        if (!empty($statuses)) {
            $query->whereIn('status', $statuses);
        }

        // Jika ada parameter 'dateRange', tambahkan kondisi whereBetween untuk tanggal
        if (!empty($dateRange) && count($dateRange) === 2) {
            $startDate = Carbon::parse($dateRange[0])->startOfDay();
            $endDate = Carbon::parse($dateRange[1])->endOfDay();
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        // Jika ada parameter 'keyword', tambahkan kondisi where untuk pencarian pada kolom 'no_pengajuan' atau nama user
        if (!empty($keyword)) {
            $query->where(function ($q) use ($keyword) {
                $q->where('no_pengajuan', 'like', '%' . $keyword . '%')
                    ->orWhereHas('user', function ($q) use ($keyword) {
                        $q->where('nama', 'like', '%' . $keyword . '%');
                    });
            });
        }

        // Jika ada parameter 'timKerjas', tambahkan kondisi whereIn untuk tim_kerja_id
        if (!empty($timKerjas)) {
            $query->whereHas('timKerja', function ($q) use ($timKerjas) {
                $q->whereIn('nama', $timKerjas); // Asumsi kolom 'nama' di tabel 'tim_kerja' digunakan untuk filter
            });
        }

        // Lakukan pagination dengan hasil query
        $pengajuans = $query->paginate(15);
        $timKerja = TimKerja::pluck('nama')->toArray();

        // Render halaman dengan data paginatedPengajuans dan filter
        return Inertia::render('Admin/Pengajuan/RiwayatPengajuan', [
            'user' => auth()->user(),
            'paginatedPengajuans' => $pengajuans,
            'timKerja' => $timKerja,
            'filters' => [
                'statuses' => $statuses,
                'dateRange' => $dateRange,
                'keyword' => $keyword,
                'timKerjas' => $timKerjas,
            ],
        ]);
    }


    public function renderAdminPengajuanRiwayatPengajuanDetail($id)
    {
        $pengajuan = Pengajuan::where('id', $id)->with([
            'user',
            'items' => function ($query) {
                $query->with([
                    'barang' => function ($query) {
                        $query->with(['satuanBarang:id,nama', 'jenisBarang:id,nama']);
                    }
                ]);
            },
            'timKerja'
        ])->first();
        $status = session('status');
        return Inertia::render('Admin/Pengajuan/PengajuanDetail', [
            'user' => auth()->user(),
            'pengajuan' => $pengajuan,
            'status' => $status,
            'backUrl' => 'admin.pengajuan.riwayat-pengajuan'
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
        $jenisBarangs = JenisBarang::select('id', 'kode', 'nama')->get();
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
        $jenisBarangs = JenisBarang::select('id', 'kode', 'nama')->get();
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


    public function renderAdminInventarisBarangJenisBarangUpdate($id)
    {
        $jenisBarang = JenisBarang::find($id);
        return Inertia::render('Admin/InventarisBarang/UpdateJenisBarang', [
            'user' => auth()->user(),
            'prevJenisBarang' => $jenisBarang,
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

    public function renderAdminUserManagement()
    {
        $users = User::with('timKerjas')->get();
        $status = session('status');
        return Inertia::render('Admin/UserManagement/UserManagement', [
            'user' => auth()->user(),
            'users' => $users,
            'status' => $status,
        ]);
    }

    public function renderAdminUserManagementCreate()
    {
        $timKerjas = TimKerja::all();
        $status = session('status');
        return Inertia::render('Admin/UserManagement/CreateUser', [
            'user' => auth()->user(),
            'timKerjas' => $timKerjas,
            'status' => $status,
        ]);
    }

    public function renderUserManagementUpdate($id)
    {
        $prevUser = User::where('id', $id)->with('timKerjas')->first();
        $timKerjas = TimKerja::all();
        $status = session('status');
        return Inertia::render('Admin/UserManagement/UpdateUser', [
            'user' => auth()->user(),
            'timKerjas' => $timKerjas,
            'status' => $status,
            'prevUser' => $prevUser
        ]);
    }


    public function renderAdminUserManagementTimKerja()
    {
        $timKerjas = TimKerja::all();
        $status = session('status');
        return Inertia::render('Admin/UserManagement/DaftarTimKerja', [
            'user' => auth()->user(),
            'timKerjas' => $timKerjas,
            'status' => $status
        ]);
    }

    public function renderAdminUserManagementTimKerjaCreate()
    {
        $users = User::select('id', 'nama', 'nip')->get();
        $status = session('status');
        return Inertia::render('Admin/UserManagement/CreateTimKerja', [
            'user' => auth()->user(),
            'users' => $users,
            'status' => $status
        ]);
    }

    public function renderAdminUserManagementTimKerjaUpdate($id)
    {
        $prevTimKerja = TimKerja::findOrFail($id);
        $users = User::select('id', 'nama', 'nip')->get();
        $status = session('status');
        return Inertia::render('Admin/UserManagement/UpdateTimKerja', [
            'user' => auth()->user(),
            'users' => $users,
            'status' => $status,
            'prevTimKerja' => $prevTimKerja
        ]);
    }
}
