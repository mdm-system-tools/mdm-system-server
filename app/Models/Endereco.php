<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Endereco extends Model
{
    use HasFactory;

    protected $fillable = [
        'CEP',
        'rua',
        'bairro',
        'numero',
        'municipio',
    ];

    public function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class);
    }
}
