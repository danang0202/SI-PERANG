<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemPengajuan extends Model
{
    use HasFactory;
    protected $table = 'siperang_item_pengajuan';

    protected $fillable = [
        'pengajuan_id',
        'barang_id',
        'jumlah',
        'keterangan',
    ];

    public function pengajuan()
    {
        return $this->belongsTo(Pengajuan::class);
    }

    public function barang()
    {
        return $this->belongsTo(Barang::class);
    }
}
