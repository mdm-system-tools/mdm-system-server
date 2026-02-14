<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Associado extends Model
{
    use HasFactory;

    // Nome da tabela (ajuste se estiver no singular no banco)
    protected $table = 'associados';

    // Definindo a chave primária customizada
    protected $primaryKey = 'numero_inscricao';

    // Desativando o autoincremento (já que você define o número)
    public $incrementing = false;

    // Tipo da chave primária
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
        'dependente_id',
    ];

    /**
     * Casts para garantir que os dados saiam no formato correto (opcional)
     */
    protected $casts = [
        'status' => 'boolean',
        'renda_familiar' => 'decimal:2',
        'data_de_nascimento' => 'date',
        'data_de_inscricao' => 'date',
    ];
}
