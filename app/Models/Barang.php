<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    protected $table = 'barang';

    protected $fillable = ['kode', 'jenis_barang_id', 'satuan_id', 'nama', 'jumlah'];

    public $timestamps = true;

    public function jenisBarang()
    {
        return $this->belongsTo(JenisBarang::class);
    }

    public function satuanBarang()
    {
        return $this->belongsTo(SatuanBarang::class);
    }

    public function itemPengajuan()
    {
        return $this->hasMany(ItemPengajuan::class);
    }
}
