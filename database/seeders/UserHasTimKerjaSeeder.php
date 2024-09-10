<?php

namespace Database\Seeders;

use App\Models\TimKerja;
use App\Models\User;
use App\Models\UserHasTimKerja;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserHasTimKerjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $csvFile = fopen(base_path("database/data/data-users-seeders.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                DB::table('siperang_user_has_tim_kerja')->insert([
                    'user_id' => $data[0],
                    'tim_kerja_id' => $data[5],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $firstline = false;
        }

        fclose($csvFile);
    }
}
