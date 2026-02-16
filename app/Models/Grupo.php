<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Grupo extends Model
{
    use HasFactory;
    protected $fillable = [
        'projeto_id',
        'horario',
    ];

    protected $casts = [
        'horario' => 'datetime:H:i',
    ];

    function projeto(): BelongsTo
    {
        return $this->belongsTo(Projeto::class);
    }
    function associados(): HasMany
    {
        return $this->hasMany(Associado::class);
    }
}
