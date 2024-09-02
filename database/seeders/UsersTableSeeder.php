<?php

namespace Database\Seeders;

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
        DB::table('users')->insert([
            [
                'nama' => 'Admin User',
                'nip' => '1234567890',
                // 'tim_kerja' => 'Team A',
                'role' => 'ADMIN',
                'email' => 'admin@example.com',
                'password' => Hash::make('danang123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Regular User',
                'nip' => '0987654321',
                // 'tim_kerja' => 'Team B',
                'role' => 'USER',
                'email' => 'user@example.com',
                'password' => Hash::make('danang123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
