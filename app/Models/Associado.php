<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Associado extends Model
{
    use HasFactory;

    protected $table = 'associados';

    protected $primaryKey = 'numero_inscricao';

    public $incrementing = false;

    protected $keyType = 'int';

    /**
     * Atributos que podem ser preenchidos em massa.
     */
    protected $fillable = [
        'numero_inscricao',
        'nome',
        'RG',
        'CPF',
        'estado_civil',
        'status',
        'NIS',
        'cras',
        'email',
        'data_de_nascimento',
        'renda_familiar',
        'data_de_inscricao',
        'documentos_img_id',
        'certidao_id',
        "grupo_id",
    ];

    protected $casts = [
        'status' => 'boolean',
        'renda_familiar' => 'decimal:2',
        'data_de_nascimento' => 'date:d/m/Y',
        'data_de_inscricao' => 'date:d/m/Y',
    ];

    function grupo(): BelongsTo
    {
        return $this->belongsTo(Grupo::class);
    }

    function chamadas(): HasMany
    {
        return $this->hasMany(Chamada::class);
    }

    function pagamentos(): HasMany
    {
        return $this->hasMany(Pagamento::class);
    }

    function dependentes(): HasMany
    {
        return $this->hasMany(Dependente::class,
            'numero_inscricao');
    }

    function endereco(): HasOne
    {
        return $this->hasOne(Endereco::class);
    }

    function tituloEleitor(): HasOne
    {
        return $this->hasOne(TituloEleitor::class);
    }
}
