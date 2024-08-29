export function formatTanggal(tanggal) {
    const bulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const date = new Date(tanggal);
    const tanggalHari = date.getDate();
    const bulanIndex = date.getMonth();
    const tahun = date.getFullYear();

    return `${tanggalHari} ${bulan[bulanIndex]} ${tahun}`;
}
