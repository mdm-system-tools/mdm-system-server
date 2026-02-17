<?php

namespace App\Http\Resources;

use App\Utils\Formatador;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PagamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "numero_inscricao" => $this->numero_inscricao,
            "valor" => Formatador::formatValueBR($this->valor),
            "mes_referencia" => $this->mes_referencia,
        ];
    }
}
