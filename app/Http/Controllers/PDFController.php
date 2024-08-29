<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $pengajuan = Pengajuan::with(['items.barang.satuanBarang', 'user'])->findOrFail($id);
        $pdf = Pdf::loadView('pdf.document', ['pengajuan' => $pengajuan]);
        return $pdf->stream('document.pdf');
    }

    public function renderPDFPage($id)
    {
        return Inertia::render('FramePDF', [
            'pengajuanId' => $id,
        ]);;
    }
}
