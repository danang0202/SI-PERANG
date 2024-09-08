<?php

namespace Database\Seeders;

use App\Models\TimKerja;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimKerjaSeeder extends Seeder
{
   
    
    public function run(): void
    {
        $csvFile = fopen(base_path("database/data/data-tim-kerja-seeders.csv"), "r");

        $firstline = true;


        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                TimKerja::create([
                    "nama" => $data['0'],
                    "nama_ketua" => $data['2'],
                    "nip_ketua" => $data['3'],
                ]);
            }
            $firstline = false;
        }

        fclose($csvFile);
        // $timKerjaData = [
        //     "PIMPINAN",
        //     "PRODUKSI",
        //     "NWA",
        //     "DISTRIBUSI",
        //     "SOSIAL",
        //     "IPDS",
        //     "RB",
        //     "UMUM",
        // ];

        // foreach ($timKerjaData as $tim) {
        //     TimKerja::create([
        //         'nama' => $tim,
        //         'nama_ketua' => 'Ketua ' . $tim,
        //         'nip_ketua' => '198601092008012002'
        //     ]);
        // }
    }
}
