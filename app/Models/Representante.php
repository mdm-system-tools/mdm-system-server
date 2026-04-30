<?php

namespace App\Models;

use Database\Factories\RepresentanteFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Representante extends Model
{
    /** @use HasFactory<RepresentanteFactory> */
    use HasFactory;

    protected $fillable = [
        'numero_inscricao',
        'nome',
        'CPF',
    ];

    public function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class);
    }
}
