<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reuniao extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'local_id',
        "projeto_id",
        "data_marcada",
        "horario_inicio",
        "horario_fim",
    ];

    function projeto(): BelongsTo
    {
        return $this->belongsTo(Projeto::class);
    }
    function local(): BelongsTo
    {
        return $this->belongsTo(Local::class);
    }
    function chamada(): HasMany
    {
        return $this->hasMany(Chamada::class);
    }
}
