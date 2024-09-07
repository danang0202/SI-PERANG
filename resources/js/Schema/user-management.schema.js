import { z } from 'zod';

export const userSchema = z.object({
    nama: z.string().min(1, { message: 'Nama harus diisi' }),
    username: z.string().min(1, { message: 'Username harus diisi' }),
    nip: z.string().length(18, { message: 'NIP harus terdiri dari 18 digit angka' }).regex(/^\d+$/, { message: 'NIP harus berupa angka' }),
    role: z.string().min(1, { message: 'Role harus diisi' }),
    timKerjaId: z.array(z.string()).min(1, { message: 'Minimal 1 tim kerja harus dipilih' }), password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
    confirmPassword: z.string().min(8, { message: 'Konfirmasi password minimal 8 karakter' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'],
});

export const updateUserSchema = z.object({
    nama: z.string().min(1, { message: 'Nama harus diisi' }),
    username: z.string().min(1, { message: 'Username harus diisi' }),
    nip: z.string().length(18, { message: 'NIP harus terdiri dari 18 digit angka' }).regex(/^\d+$/, { message: 'NIP harus berupa angka' }),
    role: z.string().min(1, { message: 'Role harus diisi' }),
    timKerjaId: z.array(z.string()).min(1, { message: 'Minimal 1 tim kerja harus dipilih' }),

    // Memastikan password minimal 8 karakter jika diisi
    password: z.union([
        z.string().min(8, { message: 'Password minimal 8 karakter' }),
        z.literal(''), // Mengizinkan string kosong (password tidak diisi)
    ]),

    // confirmPassword juga opsional
    confirmPassword: z.union([
        z.string().min(8, { message: 'Konfirmasi password minimal 8 karakter' }),
        z.literal(''), // Mengizinkan string kosong (confirmPassword tidak diisi)
    ]),
}).refine((data) => {
    // Hanya validasi jika password diisi
    if (data.password !== '') {
        return data.password === data.confirmPassword;
    }
    return true; // Jika password tidak diisi, tidak perlu validasi confirmPassword
}, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'],
});

export const timKerjaSchema = z.object({
    nama: z.string().min(1, { message: 'Nama harus diisi' }),
    namaKetua: z.string().min(1, { message: 'Nama Ketua harus diisi' }),
    nipKetua: z.string().min(1, { message: 'NIP Ketua harus diisi' }),
});