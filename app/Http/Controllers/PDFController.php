<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PDFController extends Controller
{

    public function generatePDF()
    {
        $data = ['title' => 'domPDF in Laravel 10'];
        $pdf = Pdf::loadView('pdf.document', $data);
        return $pdf->download('document.pdf');
    }

    public function streamPDF($id)
    {
        // Mengambil data pengajuan dan item pengajuannya
        $pengajuan = Pengajuan::with(['items.barang.satuanBarang', 'user'])->findOrFail($id);
        // dd($pengajuan);

        // Memasukkan data ke dalam view Blade
        $pdf = Pdf::loadView('pdf.document', ['pengajuan' => $pengajuan]);

        // Men-stream PDF agar dapat diunduh atau dilihat langsung di browser
        return $pdf->stream('document.pdf');
    }
}
