<?php

namespace App\Http\Resources;

use App\Utils\Formatador;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'cep' => Formatador::formatCep($this->cep),
            'logradouro' => $this->logradouro,
            'bairro' => $this->bairro,
            'cidade' => $this->cidade,
            'estado' => $this->estado,
            'regiao' => $this->regiao,
            'tipo' => $this->tipo ? 'Interno' : 'Externo',

            'endereco_completo' => "{$this->logradouro}, {$this->bairro} - {$this->cidade}/{$this->estado}"
        ];
    }
}
