<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reuniao extends Model
{
    use HasFactory;
    protected $fillable =[
        "projeto_id",
        "data_reuniao",
    ];

    function projeto(): BelongsTo
    {
        return $this->belongsTo(Projeto::class);
    }
    function locals(): BelongsTo
    {
        return $this->belongsTo(Local::class);
    }
}
