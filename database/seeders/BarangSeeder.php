<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = fopen(base_path("database/data/barang_seeders.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                Barang::create([
                    "kode" => $data['0'],
                    "jenis_barang_id" => $data['2'],
                    "nama" => $data['3'],
                    'jumlah' => $data['4'],
                    "satuan_id" => $data['6'],

                ]);
            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
