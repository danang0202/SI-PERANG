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

    // public function renderPengajuanRiwayatPengajuan(Request $request)
    // {
    //     $user = auth()->user();

    //     // Ambil parameter filter dari request query
    //     $startDate = $request->get('start_date');
    //     $endDate = $request->get('end_date');
    //     $statuses = $request->get('status', []); // Ini akan mengembalikan array
    //     $page = $request->get('page', 1);
    //     $perPage = $request->get('per_page', 1);
    //     $keyword = $request->get('keyword');


    //     // Query dasar
    //     $query = Pengajuan::where('user_id', $user->id);

    //     // Filter berdasarkan range tanggal jika diberikan
    //     if ($startDate && $endDate) {
    //         $query->whereBetween('created_at', [
    //             Carbon::parse($startDate)->startOfDay(),
    //             Carbon::parse($endDate)->endOfDay()
    //         ]);
    //     }

    //     // Filter berdasarkan status jika diberikan
    //     if (!empty($statuses)) {
    //         $query->whereIn('status', $statuses);
    //     }

    //     // Ambil data pengajuan dengan pagination
    //     $paginatedPengajuans = $query->orderBy('created_at', 'desc')
    //         ->paginate($perPage, ['*'], 'page', $page);

    //     return Inertia::render('User/Pengajuan/RiwayatPengajuan', [
    //         'user' => $user,
    //         'paginatedPengajuans' => $paginatedPengajuans,
    //         'filters' => [
    //             'start_date' => $startDate,
    //             'end_date' => $endDate,
    //             'status' => $statuses,
    //             'keyword' =>  $keyword
    //         ]
    //     ]);
    // }



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
