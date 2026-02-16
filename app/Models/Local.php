<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Local extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'endereco',
        'regiao',
        'tipo' // externo ou interno
    ];

    function reunioes(): HasOne
    {
        return $this->hasOne(Reuniao::class);
    }
}
