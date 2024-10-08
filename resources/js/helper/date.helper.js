export const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
export function formatTanggal(tanggal) {
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

export const getTodayDate = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
  
    return {
      dayName,
      date: `${day} ${month} ${year}`,
    };
  };