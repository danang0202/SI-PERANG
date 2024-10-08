<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisBarang extends Model
{
    use HasFactory;
    protected $table = 'siperang_jenis_barang';

    protected $fillable = ['kode', 'nama'];

    public $timestamps = true;

    public function barang()
    {
        return $this->hasMany(Barang::class);
    }
}
