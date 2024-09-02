<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserHasTimKerja extends Model
{
    use HasFactory;
    protected $table = 'user_has_tim_kerja';

    protected $fillable = [
        'user_id',
        'tim_kerja_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function timKerja()
    {
        return $this->belongsTo(TimKerja::class, 'tim_kerja_id');
    }
}
