<?php

namespace App\Http\Resources;

use App\Utils\Formatador;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReuniaoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,

            'local'          => $this->local?->endereco,
            'projeto'        => $this->projeto?->nome,

            'data_marcada'   => Formatador::formatDateToDayMonthYear($this->data_marcada),
            'horario_inicio' => Formatador::formatDateToHoursMinutes($this->horario_inicio),
            'horario_fim'    => Formatador::formatDateToHoursMinutes($this->horario_fim),

            'periodo'        => Formatador::formatDateToHoursMinutes($this->horario_inicio) .
                ' às ' .
                Formatador::formatDateToHoursMinutes($this->horario_fim),
        ];
    }
}
