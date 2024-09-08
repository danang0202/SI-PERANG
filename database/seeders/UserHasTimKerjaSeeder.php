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
        // $users = User::all();
        // $timKerjas = TimKerja::all();

        // // Misalnya, kita ingin mengasosiasikan setiap user dengan salah satu tim kerja secara acak
        // foreach ($users as $user) {
        //     // Pilih tim kerja secara acak
        //     $randomTimKerja = $timKerjas->random();

        //     // Masukkan data ke tabel user_has_tim_kerja
        //     DB::table('user_has_tim_kerja')->insert([
        //         'user_id' => $user->id,
        //         'tim_kerja_id' => $randomTimKerja->id,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ]);
        // }

        $csvFile = fopen(base_path("database/data/data-users-seeders.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                DB::table('user_has_tim_kerja')->insert([
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
