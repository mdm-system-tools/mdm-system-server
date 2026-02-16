<?php

namespace App\Http\Resources;

use App\Utils\Formatador;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChamadaResource extends JsonResource
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
            "reuniao_id" => $this->reuniao_id,
            "numero_inscricao" => Formatador::formatNumInscricao($this->numero_inscricao),
            "presenca" => $this->presenca ? "presente" : "faltou",
            "representante" => $this->representante ? "presente" : "faltou",
            "justificativa" => $this->justificativa ?? "sem justificativa",
        ];
    }
}
