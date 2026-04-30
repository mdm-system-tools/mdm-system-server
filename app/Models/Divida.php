<?php

namespace App\Models;

use Database\Factories\DividaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Divida extends Model
{
    /** @use HasFactory<DividaFactory> */
    use HasFactory;

    protected $fillable = [
        'projeto_id',
        'valor',
        'data_divida',
    ];

    public function pagamentos(): HasMany
    {
        return $this->hasMany(Pagamento::class);
    }

    public function projeto(): BelongsTo
    {
        return $this->belongsTo(Projeto::class);
    }
}
