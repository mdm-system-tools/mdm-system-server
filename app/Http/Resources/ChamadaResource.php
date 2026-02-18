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
            "reuniao" => $this->reuniao ? [
                "data_marcada" => $this->reuniao->data_marcada,
                "projeto" => $this->reuniao->projeto->nome ?? "sem projeto",
                "grupo" => Formatador::formatDateToHoursMinutes($this->associado->grupo->horario) ?? "sem grupo",
            ] : "reuniao não encontrado",
            "associado" => $this->associado ? [
                "nome" => $this->associado->nome,
                "numero_inscricao" => Formatador::formatNumInscricao($this->numero_inscricao),
            ] : "associado não encontrado",
            "presenca" => $this->presenca ? "presente" : "faltou",
            "representante" => $this->representante ? "presente" : "faltou",
            "justificativa" => $this->justificativa ?? "sem justificativa",
        ];
    }
}
