<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Chamada extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_inscricao',
        "reuniao_id",
        "representante",
        "presenca",
        "justificativa"
    ];

    function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class, 'numero_inscricao', 'numero_inscricao');
    }

    //TODO Adiciona modelo representante
//    function representante(): BelongsTo
//    {
//        return $this->belongsTo(Representante::class);
//    }

    function reuniao(): BelongsTo
    {
        return $this->belongsTo(Reuniao::class);
    }
}
