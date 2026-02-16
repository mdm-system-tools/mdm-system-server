<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pagamento extends Model
{
    use HasFactory;

    protected $fillable = [
        "numero_inscricao",
        "valor",
        "mes_de_referencia",
        "comprovante",
    ];

    function associado(): BelongsTo
    {
        return $this->belongsTo(Associado::class);
    }
}
