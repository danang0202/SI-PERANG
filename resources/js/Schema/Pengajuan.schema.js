import { z } from 'zod';

export const itemPengajuanSchema = z.object({
    barangId: z.string().min(1, { message: 'Barang harus dipilih' }),
    jumlah: z.union([
        z.number()
            .min(1, { message: 'Jumlah tidak boleh kosong' })
            .refine(value => value >= 0, { message: 'Jumlah tidak boleh negatif' }),
        z.null(),
    ]),
    keterangan: z.string().optional(),
});

export const pengajuanSchema = z.object({
    tanggalPengajuan: z.date({
        required_error: 'Tanggal Pengajuan tidak boleh kosong',
    }),
    namaPengaju: z.string().min(1, { message: 'Nama Pengaju tidak boleh kosong' }),
    timKerjaId: z.string().min(1, { message: 'Tim Kerja tidak boleh kosong' }),
});