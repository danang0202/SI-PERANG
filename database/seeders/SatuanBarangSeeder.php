<?php

namespace Database\Seeders;

use App\Models\SatuanBarang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SatuanBarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $csvFile = fopen(base_path("database/data/satuan_barang_seeders.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                SatuanBarang::create([
                    "nama" => $data['0'],
                ]);
            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
