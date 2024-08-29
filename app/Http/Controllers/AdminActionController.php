<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\JenisBarang;
use App\Models\Pengajuan;
use App\Models\SatuanBarang;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class AdminActionController extends Controller
{

    public function createBarangAction(Request $request)
    {
        $request->validate([
            'kode' => 'required|digits:6',
            'nama' => 'required|string|max:255',
            'jenisBarangId' => 'required|exists:jenis_barang,id',
            'satuanId' => 'required|exists:satuan_barang,id',
            'jumlah' => 'required|integer|min:1',
        ]);

        try {
            $barang = new Barang();
            $barang->kode = $request->input('kode');
            $barang->nama = strtoupper($request->input('nama'));
            $barang->jenis_barang_id = intval($request->input('jenisBarangId'));
            $barang->satuan_id = intval($request->input('satuanId'));
            $barang->jumlah = $request->input('jumlah');
            $barang->save();
            $status = [
                'type' => 'success',
                'message' => 'Barang ' . $barang->nama . ' berhasil ditambahkan!'
            ];

            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Gagal menambahkan barang. Terjadi kesalahan.'
            ];

            return redirect()->route('admin.inventaris-barang.create')
                ->with('status', $status);
        }
    }

    public function updateBarangAction(Request $request, $id)
    {
        $request->validate([
            'kode' => 'required|digits:6',
            'nama' => 'required|string|max:255',
            'jenisBarangId' => 'required|exists:jenis_barang,id',
            'satuanId' => 'required|exists:satuan_barang,id',
            'jumlah' => 'required|integer|min:1',
        ]);
        try {
            $barang = Barang::findOrFail($id);
            $barang->kode = $request->input('kode');
            $barang->nama = strtoupper($request->input('nama'));
            $barang->jenis_barang_id = intval($request->input('jenisBarangId'));
            $barang->satuan_id = intval($request->input('satuanId'));
            $barang->jumlah = $request->input('jumlah');
            $barang->save();

            $status = [
                'type' => 'success',
                'message' => 'Barang ' . $barang->nama . ' berhasil diperbarui!'
            ];

            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Gagal memperbarui barang. Terjadi kesalahan.'
            ];

            return redirect()->route('admin.inventaris-barang.update', ['id' => $id])
                ->with('status', $status);
        }
    }


    public function deleteBarangAction($id)
    {
        try {
            $barang =  Barang::findOrFail($id);
            $barang->delete();
            $status = [
                'type' => 'success',
                'message' => 'Barang "' . $barang->nama . '" berhasil dihapus!'
            ];
            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        } catch (\Throwable $th) {
            $status = [
                'type' => $barang ? 'fail' : 'success',
                'message' => $barang
                    ? 'Jenis barang "' . $barang->nama . '" tidak dapat dihapus!'
                    : 'Barang tidak terhapus!',
            ];
            return redirect()->route('admin.inventaris-barang.jenis')
                ->with('status', $status);
        }
    }

    public function tambahStockAction(Request $request, $id)
    {
        try {
            $request->validate([
                'stock' => 'required|integer'
            ]);

            $barang =  Barang::findOrFail($id);
            $barang->jumlah += $request->input('stock');
            $barang->save();
            $status = [
                'type' => 'success',
                'message' => 'Stock barang "' . $barang->nama . '" berhasil ditambah!'
            ];

            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        } catch (\Throwable $th) {
            $status = [
                'type' => 'fail',
                'message' => 'Stock barang gagal ditambahkan!'
            ];
            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        }
    }
    // Jenis Barang
    public function updateJenisBarangAction(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $jenisBarang = JenisBarang::findOrFail($id);

        $jenisBarang->nama = $request->input('nama');
        $jenisBarang->save();

        $status = [
            'type' => 'success',
            'message' => 'Jenis barang dengan nama "' . $jenisBarang->nama . '" berhasil diperbarui!'
        ];

        return redirect()->route('admin.inventaris-barang.jenis')
            ->with('status', $status);
    }

    public function deleteJenisBarangAction($id)
    {
        // Cari jenis barang berdasarkan ID
        $jenisBarang = JenisBarang::findOrFail($id);

        // Cek apakah jenis barang digunakan oleh barang lain
        $isUsed = $jenisBarang->barang()->exists();

        // Jika digunakan oleh barang lain, kirimkan status gagal
        if ($isUsed) {
            $status = [
                'type' => 'fail',
                'message' => 'Jenis barang"' . $jenisBarang->nama . '" tidak dapat dihapus karena sedang digunakan!'
            ];

            return redirect()->route('admin.inventaris-barang.jenis')
                ->with('status', $status);
        }

        // Jika tidak digunakan, hapus jenis barang
        $jenisBarang->delete();

        $status = [
            'type' => 'success',
            'message' => 'Jenis barang "' . $jenisBarang->nama . '" berhasil dihapus!'
        ];

        return redirect()->route('admin.inventaris-barang.jenis')
            ->with('status', $status);
    }

    //  Satuan Barang
    public function createSatuanBarangAction(Request $request)
    {
        // Validasi input dengan tambahan validasi unique
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        try {
            // Membuat dan menyimpan SatuanBarang baru
            $satuanBarang = new SatuanBarang();
            $satuanBarang->nama = strtoupper($request->input('nama'));
            $satuanBarang->save();

            $status = [
                'type' => 'success',
                'message' => 'Satuan barang ' . $satuanBarang->nama . ' berhasil ditambahkan!'
            ];

            return redirect()->route('admin.inventaris-barang.satuan')
                ->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Gagal menambahkan satuan barang ' . $satuanBarang->nama . '. Nama sudah digunakan.'
            ];
            return redirect()->route('admin.inventaris-barang.satuan.create')
                ->with('status', $status);
        }
    }


    public function updateSatuanBarangAction(Request $request, $id)
    {
        // Validasi input dengan tambahan validasi unique
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);
        try {
            // Membuat dan menyimpan SatuanBarang baru
            $satuanBarang = SatuanBarang::findOrFail($id);
            $satuanBarang->nama = strtoupper($request->input('nama'));
            $satuanBarang->save();

            $status = [
                'type' => 'success',
                'message' => 'Satuan barang ' . $satuanBarang->nama . ' berhasil ditambahkan!'
            ];

            return redirect()->route('admin.inventaris-barang.satuan')
                ->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Gagal menambahkan satuan barang ' . $satuanBarang->nama . '. Nama sudah digunakan.'
            ];
            return redirect()->route('admin.inventaris-barang.satuan.create')
                ->with('status', $status);
        }
    }

    public function deleteSatuanBarangAction($id)
    {
        // Cari jenis barang berdasarkan ID
        $satuanBarang = SatuanBarang::findOrFail($id);

        // Cek apakah jenis barang digunakan oleh barang lain
        $isUsed = $satuanBarang->barang()->exists();
        // Jika digunakan oleh barang lain, kirimkan status gagal
        if ($isUsed) {
            $status = [
                'type' => 'fail',
                'message' => 'Satuan barang"' . $satuanBarang->nama . '" tidak dapat dihapus karena sedang digunakan!'
            ];

            return redirect()->route('admin.inventaris-barang.satuan')
                ->with('status', $status);
        }

        // Jika tidak digunakan, hapus jenis barang
        $satuanBarang->delete();

        $status = [
            'type' => 'success',
            'message' => 'Satuan barang "' . $satuanBarang->nama . '" berhasil dihapus!'
        ];

        return redirect()->route('admin.inventaris-barang.satuan')
            ->with('status', $status);
    }

    public function terimaPengajuanAction(Request $request, $id)
    {
        try {
            $pengajuan = Pengajuan::findOrFail($id);
            $tahun = now()->year;
            $lastPengajuan = Pengajuan::whereYear('created_at', $tahun)
                ->whereNotNull('no_pengajuan')
                ->orderBy('no_pengajuan', 'desc')
                ->first();

            if ($lastPengajuan) {
                $lastNumber = (int) substr($lastPengajuan->no_pengajuan, 2, 3);
                $nextNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
            } else {
                $nextNumber = '001';
            }

            $noPengajuan = "B-" . $nextNumber . "/34021/PL615/" . $tahun;
            $pengajuan->status = 'PENGAJUAN DITERIMA';
            $pengajuan->no_pengajuan = $noPengajuan;
            $pengajuan->save();

            $status = [
                'type' => 'success',
                'message' => 'Pengajuan telah diterima dengan nomor pengajuan: ' . $noPengajuan
            ];
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Terjadi kesalahan saat menerima pengajuan: ' . $e->getMessage()
            ];
        }

        return redirect()->back()->with('status', $status);
    }

    public function tolakPengajuanAction(Request $request, $id)
    {
        try {
            $pengajuan = Pengajuan::findOrFail($id);
            $pengajuan->status = 'PENGAJUAN DITOLAK';
            $pengajuan->save();
            $status = [
                'type' => 'success',
                'message' => 'Pengajuan telah ditolak.'
            ];
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Terjadi kesalahan saat menolak pengajuan: ' . $e->getMessage()
            ];
        }
        return redirect()->back()->with('status', $status);
    }
}
