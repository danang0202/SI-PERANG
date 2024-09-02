<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // Renamed from 'name' to 'nama'
            $table->string('nip')->unique(); // Added NIP (Nomor Induk Pegawai)
            // $table->enum('tim_kerja', ['Team A', 'Team B', 'Team C']); // Example enum values for tim_kerja
            $table->enum('role', ['ADMIN', 'USER']); // Enum for role
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('status', ['AKTIF', 'NONAKTIF'])->default('AKTIF');
            $table->rememberToken();
            $table->timestamps(); // Includes both created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
