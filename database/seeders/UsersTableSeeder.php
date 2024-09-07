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
                'username' => 'user1',
                'role' => 'ADMIN',
                'password' => Hash::make('danang123'),
            ],
            [
                'nama' => 'Regular User',
                'nip' => '0987654321',
                'username' => 'user2',
                'role' => 'USER',
                'password' => Hash::make('danang123'),
            ],
        ]);
    }
}
