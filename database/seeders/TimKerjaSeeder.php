<?php

namespace Database\Seeders;

use App\Models\TimKerja;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimKerjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $timKerjaData = [
            "PIMPINAN",
            "PRODUKSI",
            "NWA",
            "DISTRIBUSI",
            "SOSIAL",
            "IPDS",
            "RB",
            "UMUM",
        ];

        foreach ($timKerjaData as $tim) {
            TimKerja::create([
                'nama' => $tim,
                'nama_ketua' => 'Ketua ' . $tim,
                'nip_ketua' => '198601092008012002'
            ]);
        }
    }
}
