<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
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
                User::create([
                    "nama" => $data['1'],
                    "nip" => $data['3'],
                    "username" => $data['2'],
                    'role' => $data['6'],
                    "password" => Hash::make($data['7']),
                ]);
            }
            $firstline = false;
        }

        fclose($csvFile);



        // DB::table('users')->insert([
        //     [
        //         'nama' => 'Admin User',
        //         'nip' => '1234567890',
        //         'username' => 'user1',
        //         'role' => 'ADMIN',
        //         'password' => Hash::make('danang123'),
        //     ],
        //     [
        //         'nama' => 'Regular User',
        //         'nip' => '0987654321',
        //         'username' => 'user2',
        //         'role' => 'USER',
        //         'password' => Hash::make('danang123'),
        //     ],
        // ]);
    }
}
