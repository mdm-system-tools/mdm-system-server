<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Projeto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'regiao',
        'valor',
        'status',
        'concluido',
    ];

    public function grupos(): HasMany
    {
        return $this->hasMany(Grupo::class);
    }

    public function reunioes(): HasMany
    {
        return $this->hasMany(Reuniao::class);
    }

    public function dividas(): HasMany
    {
        return $this->hasMany(Divida::class);
    }
}
