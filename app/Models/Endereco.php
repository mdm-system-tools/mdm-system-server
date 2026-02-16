<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Endereco extends Model
{
    use HasFactory;
    protected $fillable = [
        "CEP",
        "rua",
        "bairro",
        "numero",
        "municipio",
    ];

    function associado(): belongsTo
    {
        return $this->belongsTo(Associado::class);
    }
}
