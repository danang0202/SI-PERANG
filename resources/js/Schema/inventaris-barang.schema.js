import { z } from 'zod';

export const jenisBarangSchema = z.object({
    nama: z.string().min(1, { message: 'Nama tidak boleh kosong' })
});

export const barangSchema = z.object({
    kode: z.string()
        .min(6, 'Kode harus terdiri dari 6 digit angka')
        .max(6, 'Kode harus terdiri dari 6 digit angka'),
    nama: z.string()
        .min(1, 'Nama tidak boleh kosong'),
    jenisBarangId: z.string()
        .min(1, 'Jenis barang tidak boleh kosong'),
    satuanId: z.string()
        .min(1, 'Satuan barang tidak boleh kosong'),
    jumlah: z.number()
        .min(0, 'Jumlah tidak boleh negatif')
});