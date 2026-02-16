<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Projeto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'regiao',
        'valor',
        "status",
        "concluido",
    ];

    function grupos(): hasMany
    {
        return $this->hasMany(Grupo::class);
    }
}
