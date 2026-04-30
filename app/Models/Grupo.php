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
        'horario' => 'string',
    ];

    public function projeto(): BelongsTo
    {
        return $this->belongsTo(Projeto::class);
    }

    public function associados(): HasMany
    {
        return $this->hasMany(Associado::class);
    }

    public function grupoReuniaos(): HasMany
    {
        return $this->hasMany(GrupoReuniao::class);
    }
}
