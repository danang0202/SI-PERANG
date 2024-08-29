<!DOCTYPE html>
<html>
<head>
    <title>Permintaan Barang Persediaan</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
            border: 1px solid black;
        }

        .signature {
            margin-top: 50px;
        }

        .signature div {
            display: inline-block;
            width: 30%;
            text-align: center;
        }
    </style>
</head>

<body>
    <h2 style="text-align: center;">BADAN PUSAT STATISTIK KABUPATEN BANTUL</h2>
    <h3 style="text-align: center;">Permintaan Barang Persediaan</h3>

    <p>Nomor: {{ $pengajuan->no_pengajuan }}</p>
    <p>Dari: {{ $pengajuan->user->name }}</p>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Satuan</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pengajuan->items as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item->barang->nama }}</td>
                    <td>{{ $item->jumlah }}</td>
                    <td>{{ $item->barang->satuanBarang->nama }}</td>
                    <td>{{ $item->keterangan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="signature">
        <div>
            Bantul, {{ \Carbon\Carbon::now()->format('d M Y') }}<br />
            Penerima Barang<br /><br /><br />
            ____________________
        </div>
        <div>
            Mengetahui,<br />
            Kepala Subbag/Ketua Tim<br /><br /><br />
            ____________________
        </div>
    </div>

    <div class="signature">
        <div>
            Menyetujui,<br />
            Kepala Subbagian Umum<br /><br /><br />
            ____________________
        </div>
        <div>
            Petugas Penyimpanan Barang<br /><br /><br />
            ____________________
        </div>
    </div>

    <p style="text-align: center; margin-top: 100px;">
        Achmad Basuki Adibrata, SE, M.Acc &nbsp;&nbsp;&nbsp; Eka Dayana Putri, A.P.Kb.N
    </p>
</body>

</html>
