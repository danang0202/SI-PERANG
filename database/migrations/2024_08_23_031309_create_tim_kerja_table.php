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
        Schema::create('siperang_tim_kerja', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 256);
            $table->string('nama_ketua', 256);
            $table->string('nip_ketua', 256);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tim_kerja');
    }
};
