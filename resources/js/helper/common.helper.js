
export const statusesData = [
    'MENUNGGU KONFIRMASI', 'PERMINTAAN DITERIMA', 'PERMINTAAN DITOLAK', 'PERMINTAAN DIBATALKAN',
]

export const timKerjaData = [
    "PIMPINAN",
    "PRODUKSI",
    "NWA",
    "DISTRIBUSI",
    "SOSIAL",
    "IPDS",
    "RB",
    "UMUM",
]

export const getStatusColor = (status) => {
    if (status == 'MENUNGGU KONFIRMASI') {
        return 'gray'
    } else if (status == 'PERMINTAAN DITERIMA') {
        return 'accent5'
    } else if (status == 'PERMINTAAN DIBATALKAN') {
        return 'secondaryPurple'
    } else {
        return 'accent6'
    }
}

export function toTitleCase(str) {
    return str
        .toLowerCase() // Ubah semua huruf menjadi lowercase
        .split(' ') // Pisahkan string menjadi array kata-kata
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Ubah huruf pertama tiap kata menjadi kapital
        .join(' '); // Gabungkan kembali menjadi string
}