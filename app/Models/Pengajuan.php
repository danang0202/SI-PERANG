<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengajuan extends Model
{
    use HasFactory;
    protected $table = 'siperang_pengajuan';

    protected $fillable = [
        'user_id',
        'no_pengajuan',
        'status',
        'tim_kerja_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(ItemPengajuan::class);
    }
    public function timKerja()
    {
        return $this->belongsTo(TimKerja::class, 'tim_kerja_id');
    }
}
