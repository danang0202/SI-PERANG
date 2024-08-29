<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\ItemPengajuan;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserActionController extends Controller
{
    public function tambahPengajuanAction(Request $request)
    {

        $user = auth()->user();
        // Validasi data yang masuk
        $validatedData = $request->validate([
            'tanggalPengajuan' => 'required|date',
            'namaPengaju' => 'required|string|max:255',
            'timKerja' => 'required|string|max:255',
            'itemPengajuan' => 'required|array',
            'itemPengajuan.*.barangId' => 'required|exists:barang,id',
            'itemPengajuan.*.jumlah' => 'required|integer|min:1',
            'itemPengajuan.*.keterangan' => 'nullable|string',
        ]);


        // Gunakan transaksi database untuk memastikan data tersimpan dengan baik
        DB::beginTransaction();

        try {
            // Simpan data pengajuan
            $pengajuan = Pengajuan::create([
                'user_id' => $user->id,
            ]);

            // Simpan setiap item pengajuan
            foreach ($validatedData['itemPengajuan'] as $item) {
                // Kurangi jumlah stok barang
                $barang = Barang::find($item['barangId']);
                if ($barang->jumlah < $item['jumlah']) {
                    throw new \Exception("Stok barang {$barang->nama} tidak mencukupi");
                }

                $barang->decrement('jumlah', $item['jumlah']);

                ItemPengajuan::create([
                    'pengajuan_id' => $pengajuan->id,
                    'barang_id' => $item['barangId'],
                    'jumlah' => $item['jumlah'],
                    'keterangan' => $item['keterangan'],
                ]);
            }

            DB::commit();

            $status = [
                'type' => 'success',
                'message' => 'Pengajuan berhasil ditambahkan!'
            ];
            return redirect()->route('user.pengajuan.tambah')
                ->with('status', $status);
        } catch (\Exception $e) {
            DB::rollBack();
            $status = [
                'type' => 'fail',
                'message' => 'Pengajuan gagal ditambahkan!'
            ];
            return redirect()->route('user.pengajuan.tambah')
                ->with('status', $status);
        }
    }

    public function PembatalanPengajuanAction($id)
    {
        DB::beginTransaction(); // Mulai transaksi

        try {
            $pengajuan = Pengajuan::with('items.barang')->findOrFail($id);
            $pengajuan->update(['status' => 'PENGAJUAN DIBATALKAN']);

            foreach ($pengajuan->items as $item) {
                $barang = $item->barang;
                if ($barang) {
                    $barang->increment('jumlah', $item->jumlah);
                }
            }

            DB::commit(); // Commit transaksi jika semua operasi berhasil

            // Status sukses
            $status = [
                'type' => 'success',
                'message' => 'Pengajuan berhasil dibatalkan!'
            ];
            return redirect()->route('user.pengajuan.riwayat')
                ->with('status', $status);
        } catch (\Throwable $th) {
            DB::rollBack(); // Rollback transaksi jika terjadi kesalahan

            // Status gagal
            $status = [
                'type' => 'fail',
                'message' => 'Pengajuan gagal dibatalkan!'
            ];
            return redirect()->route('user.pengajuan.riwayat')
                ->with('status', $status);
        }
    }
}
