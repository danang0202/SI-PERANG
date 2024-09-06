<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pengajuan;
use App\Models\SatuanBarang;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $userData = User::where('id', $user->id)->with(['timKerjas:id,nama,nama_ketua'])->first();

        $countTotal = Pengajuan::where('user_id', $user->id)->count();
        $countMenungguKonfirmasi = Pengajuan::where('status', 'MENUNGGU KONFIRMASI')->where('user_id', $user->id)->count();
        $countPermintaanDiterima = Pengajuan::where('status', 'PERMINTAAN DITERIMA')->where('user_id', $user->id)->count();
        $countPermintaanDitolak = Pengajuan::where('status', 'PERMINTAAN DITOLAK')->where('user_id', $user->id)->count();
        $countPermintaanDibatalkan = Pengajuan::where('status', 'PERMINTAAN DIBATALKAN')->where('user_id', $user->id)->count();

        $statusCardData = [
            [
                'color' => 'gray5',
                'icon' => 'IconHourglass',
                'text' => 'Menunggu Konfirmasi',
                'count' => $countMenungguKonfirmasi,
                'iconColor' => 'black',
            ],
            [
                'color' => 'accent5',
                'icon' => 'IconCircleCheck',
                'text' => 'Permintaan Diterima',
                'count' => $countPermintaanDiterima,
                'iconColor' => 'white',
            ],
            [
                'color' => 'accent6',
                'icon' => 'IconCircleX',
                'text' => 'Permintaan Ditolak',
                'count' => $countPermintaanDitolak,
                'iconColor' => 'white',
            ],
            [
                'color' => 'accent3',
                'icon' => 'IconCancel',
                'text' => 'Permintaan Dibatalkan',
                'count' => $countPermintaanDibatalkan,
                'iconColor' => 'white',
            ],
        ];

        // Mendapatkan data pengajuan per bulan berdasarkan status
        $pengajuanPerBulan = Pengajuan::selectRaw("
                MONTHNAME(created_at) as month, 
                MONTH(created_at) as month_number,
                SUM(CASE WHEN status = 'MENUNGGU KONFIRMASI' THEN 1 ELSE 0 END) as MENUNGGU_KONFIRMASI,
                SUM(CASE WHEN status = 'PERMINTAAN DITERIMA' THEN 1 ELSE 0 END) as PERMINTAAN_DITERIMA,
                SUM(CASE WHEN status = 'PERMINTAAN DITOLAK' THEN 1 ELSE 0 END) as PERMINTAAN_DITOLAK,
                SUM(CASE WHEN status = 'PERMINTAAN DIBATALKAN' THEN 1 ELSE 0 END) as PERMINTAAN_DIBATALKAN
            ")
            ->whereYear('created_at', date('Y'))
            ->where('user_id', $user->id)
            ->groupByRaw('month, month_number')
            ->orderByRaw("month_number")
            ->get()
            ->keyBy('month_number');

        // Template data untuk semua bulan
        $allMonths = collect([
            ['month' => 'Jan', 'month_number' => 1],
            ['month' => 'Feb', 'month_number' => 2],
            ['month' => 'Mar', 'month_number' => 3],
            ['month' => 'Apr', 'month_number' => 4],
            ['month' => 'Mei', 'month_number' => 5],
            ['month' => 'Jun', 'month_number' => 6],
            ['month' => 'Jul', 'month_number' => 7],
            ['month' => 'Ags', 'month_number' => 8],
            ['month' => 'Sep', 'month_number' => 9],
            ['month' => 'Okt', 'month_number' => 10],
            ['month' => 'Nov', 'month_number' => 11],
            ['month' => 'Des', 'month_number' => 12],
        ]);

        // Gabungkan template dengan data dari query
        $chartData = $allMonths->map(function ($month) use ($pengajuanPerBulan) {
            $data = $pengajuanPerBulan->get($month['month_number'], [
                'PERMINTAAN_DITERIMA' => 0,
                'PERMINTAAN_DITOLAK' => 0,
                'PERMINTAAN_DIBATALKAN' => 0,
                'MENUNGGU_KONFIRMASI' =>  0
            ]);

            return [
                'month' => $month['month'],
                'MENUNGGU_KONFIRMASI' => (int) $data['MENUNGGU_KONFIRMASI'],
                'PERMINTAAN_DITERIMA' => (int) $data['PERMINTAAN_DITERIMA'],
                'PERMINTAAN_DITOLAK' => (int) $data['PERMINTAAN_DITOLAK'],
                'PERMINTAAN_DIBATALKAN' => (int) $data['PERMINTAAN_DIBATALKAN'],
            ];
        });

        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'statusCardData' => $statusCardData,
            'countTotal' => $countTotal,
            'userData' => $userData,
            'chartData' => $chartData
        ]);
    }


    public function renderPengajuanTambahPengajuan()
    {
        $barang = Barang::get();
        $satuanBarang = SatuanBarang::all();
        $status = session('status');
        $user = auth()->user();
        $userProfile = User::where('id', $user->id)->with(['timKerjas:id,nama'])->first();
        return Inertia::render('User/Pengajuan/TambahPengajuan', [
            'user' => $user,
            'barangs' => $barang,
            'satuanBarangs' =>  $satuanBarang,
            'status' => $status,
            'userProfile' => $userProfile
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
            },
            'timKerja'
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
