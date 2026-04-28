<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pagamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'associado_id',
        'divida_id',
        'data_pagamento',
        'metodo_pagamento',
        'status',
        'comprovante',
    ];

    public function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class);
    }

    public function divida(): BelongsTo
    {
        return $this->belongsTo(Divida::class);
    }
}
