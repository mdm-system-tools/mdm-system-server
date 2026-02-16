<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TituloEleitor extends Model
{
    use hasFactory;
    protected $fillable = [
        "numero_inscricao",
        "zona",
        "sacao",
    ];

    function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class);
    }
}
