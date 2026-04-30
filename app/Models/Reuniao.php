<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reuniao extends Model
{
    use HasFactory;

    protected $table = 'reunioes';

    protected $fillable = [
        'id',
        'local_id',
        'projeto_id',
        'data_marcada',
        'concluida',
    ];

    protected $casts = [
        'concluida' => 'boolean',
    ];

    public function projeto(): BelongsTo
    {
        return $this->belongsTo(Projeto::class);
    }

    public function local(): BelongsTo
    {
        return $this->belongsTo(Local::class);
    }

    public function chamadas(): HasMany
    {
        return $this->hasMany(Chamada::class);
    }

    public function grupoReuniaos(): HasMany
    {
        return $this->hasMany(GrupoReuniao::class);
    }

    public function grupos()
    {
        return $this->hasMany(GrupoReuniao::class)->with('grupo');
    }
}
