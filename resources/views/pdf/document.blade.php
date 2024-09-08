<!DOCTYPE html>
<html>

<head>
    <title>Permintaan Barang Persediaan</title>
    <style>
        body {
            font-family: 'Calibri', sans-serif;
            font-size: 12px;
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
            width: 49%;
            text-align: center;
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="logo">
        <img src="{{ public_path('images/logo-bps-bantul.png') }}" alt="Logo BPS Bantul" style="height:3rem; width:auto;">
    </div>

    <p style="text-align: center; font-size: 13px">Permintaan Barang Persediaan</p>

    <p style="text-align: center">Nomor: {{ $pengajuan->no_pengajuan }}</p>
    <p>Dari: Tim {{ $pengajuan->timKerja->nama }}</p>

    <table>
        <thead>
            <tr>
                <th style="width: 2rem; text-align: center">No</th>
                <th style="width: 15rem">Nama Barang</th>
                <th style="width: 3rem; text-align: center">Jumlah</th>
                <th style="width: 5rem; text-align: center">Satuan</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pengajuan->items as $index => $item)
                <tr>
                    <td style="text-align: center">{{ $index + 1 }}</td>
                    <td>{{ $item->barang->nama }}</td>
                    <td style="text-align: center">{{ $item->jumlah }}</td>
                    <td>{{ $item->barang->satuanBarang->nama }}</td>
                    <td>{{ $item->keterangan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <p> Bantul, {{ \Carbon\Carbon::now()->format('d M Y') }}<br /></p>
    <div class="signature">
        <div>
            Penerima Barang<br /><br /><br /><br /><br />
            {{ $pengajuan->user->nama }}
        </div>
        <div>
            Mengetahui,<br />
            Kepala Subbag/Ketua Tim<br /><br /><br /><br /><br />
            {{ $pengajuan->timKerja->nama_ketua }}
        </div>
    </div>
    <p style="text-align: center"><br /> Setuju Untuk Dikeluarkan:<br /></p>
    <div class="signature">
        <div>
            Menyetujui,<br />
            Kepala Subbagian Umum<br /><br /><br /><br /><br />
            {{ $ketuaSubbagUmum->nama_ketua }}
        </div>
        <div>
            Petugas Penyimpanan Barang<br /><br /><br /><br /><br />
            {{ $namaAdmin->nama }}
        </div>
    </div>
</body>

</html>
