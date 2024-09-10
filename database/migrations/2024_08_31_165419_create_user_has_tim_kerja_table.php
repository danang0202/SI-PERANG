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
        Schema::create('siperang_user_has_tim_kerja', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('siperang_users')->onDelete('cascade');
            $table->foreignId('tim_kerja_id')->constrained('siperang_tim_kerja')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_has_tim_kerja');
    }
};
