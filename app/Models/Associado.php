<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Associado extends Model
{
    use HasFactory;

    /**
     * Atributos que podem ser preenchidos em massa.
     */
    protected $fillable = [
        'id',
        'numero_inscricao',
        'nome_completo',
        'telefone',
        'celular',
        'rg',
        'cpf',
        'estado_civil',
        'status',
        'nis',
        'cras',
        'email',
        'data_nascimento',
        'renda_familiar',
        'documentos_img_id',
        'certidao_id',
        'grupo_id',
    ];

    protected $casts = [
        'status' => 'boolean',
        'renda_familiar' => 'decimal:2',
        'data_nascimento' => 'date:d/m/Y',
        'data_inscricao' => 'date:d/m/Y',
    ];

    protected function phone(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => preg_replace('/[^0-9+]/', '', $value),
        );
    }

    public function grupo(): BelongsTo
    {
        return $this->belongsTo(Grupo::class);
    }

    public function chamadas(): HasMany
    {
        return $this->hasMany(Chamada::class);
    }

    public function pagamentos(): HasMany
    {
        return $this->hasMany(Pagamento::class);
    }

    public function dependentes(): HasMany
    {
        return $this->hasMany(Dependente::class
        );
    }

    public function endereco(): HasOne
    {
        return $this->hasOne(Endereco::class);
    }

    public function tituloEleitor(): HasOne
    {
        return $this->hasOne(TituloEleitor::class);
    }

    public function representante(): HasOne
    {
        return $this->hasOne(Representante::class);
    }
}
