import { z } from 'zod';

export const jenisBarangSchema = z.object({
    kode: z.string()
        .regex(/^\d{3}$/, { message: 'Kode harus berupa tiga digit angka' }),
    nama: z.string()
        .regex(/^[A-Za-z\s]+$/, { message: 'Nama hanya boleh berisi huruf dan spasi' }),
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
        .min(1, 'Jumlah tidak boleh kosong')
        .refine(value => value, 10 >= 0, 'Jumlah tidak boleh negatif')
});