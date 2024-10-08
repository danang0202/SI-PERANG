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
        Schema::create('siperang_barang', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 16)->unique();
            $table->foreignId('jenis_barang_id')->constrained('siperang_jenis_barang');
            $table->foreignId('satuan_id')->constrained('siperang_satuan_barang');
            $table->string('nama', 256);
            $table->integer('jumlah')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang');
    }
};
