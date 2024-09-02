<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersTableSeeder::class);
        $this->call(TimKerjaSeeder::class);
        $this->call(UserHasTimKerjaSeeder::class);
        $this->call(SatuanBarangSeeder::class);
        $this->call(JenisBarangSeeder::class);
        $this->call(BarangSeeder::class);
    }
}
