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

export function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formattedDate = date.toLocaleDateString('id-ID', options);
    return formattedDate;
}