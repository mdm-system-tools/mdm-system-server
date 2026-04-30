<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chamada extends Model
{
    use HasFactory;

    protected $fillable = [
        'associado_id',
        'reuniao_id',
        'representante',
        'presenca',
        'justificativa',
    ];

    protected $casts = [
        'presenca' => 'boolean',
        'representante' => 'boolean',
    ];

    public function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class);
    }

    // TODO Adiciona modelo representante
    //    function representante(): BelongsTo
    //    {
    //        return $this->belongsTo(Representante::class);
    //    }

    public function reuniao(): BelongsTo
    {
        return $this->belongsTo(Reuniao::class);
    }
}
