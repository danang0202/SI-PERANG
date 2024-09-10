<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimKerja extends Model
{
    use HasFactory;
    protected $table = 'siperang_tim_kerja';

    protected $fillable = [
        'nama',
        'nama_ketua',
        'nip_ketua'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_has_tim_kerja', 'tim_kerja_id', 'user_id');
    }
}
