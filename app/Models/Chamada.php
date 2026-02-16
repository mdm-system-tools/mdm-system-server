<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chamada extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_inscricao',
        "reunioes_id",
        "representante",
        "presenca",
        "justificativa"
    ];

    function associados(): HasMany
    {
        return $this->hasMany(Associado::class);
    }

    //TODO Adiciona modelo representante
//    function representante(): BelongsTo
//    {
//        return $this->belongsTo(Representante::class);
//    }

    function reuniaos(): HasMany
    {
        return $this->hasMany(Associado::class);
    }
}
