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
        Schema::create('pengajuan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('no_pengajuan', 50)->nullable();
            $table->foreignId('tim_kerja_id')->constrained('tim_kerja');
            $table->enum('status', ['PERMINTAAN DITERIMA', 'PERMINTAAN DITOLAK', 'MENUNGGU KONFIRMASI', 'PERMINTAAN DIBATALKAN'])->default('MENUNGGU KONFIRMASI');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Pengajuan');
    }
};
