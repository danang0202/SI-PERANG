
export const statusesData = [
    'MENUNGGU KONFIRMASI', 'PENGAJUAN DITERIMA', 'PENGAJUAN DITOLAK', 'PENGAJUAN DIBATALKAN',
]
export const getStatusColor = (status) => {
    if (status == 'MENUNGGU KONFIRMASI') {
        return 'gray'
    } else if (status == 'PENGAJUAN DITERIMA') {
        return 'accent5'
    } else if (status == 'PENGAJUAN DIBATALKAN') {
        return 'secondaryPurple'
    } else {
        return 'accent6'
    }
}