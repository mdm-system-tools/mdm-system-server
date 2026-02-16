<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dependente extends Model
{
    use HasFactory;

    protected $fillable = [
        "numero_inscricao",
        "CPF",
        "RG",
        "certidao",
    ];

    function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class);
    }
}
