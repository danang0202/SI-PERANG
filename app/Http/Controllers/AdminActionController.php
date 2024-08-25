<?php

namespace App\Http\Controllers;

use App\Models\JenisBarang;
use App\Models\SatuanBarang;
use Illuminate\Http\Request;

class AdminActionController extends Controller
{

    // Jenis Barang
    public function updateJenisBarangAction(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $jenisBarang = new JenisBarang();
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
}
