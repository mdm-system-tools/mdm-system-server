<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GrupoReuniao extends Model
{
    protected $table = 'grupo_reuniaos';

    protected $fillable = ['reuniao_id', 'grupo_id', 'concluida'];

    protected $casts = ['concluida' => 'boolean'];

    public function reuniao(): BelongsTo
    {
        return $this->belongsTo(Reuniao::class);
    }

    public function grupo(): BelongsTo
    {
        return $this->belongsTo(Grupo::class);
    }
}
