<?php

namespace App\Http\Resources;

use App\Utils\Formatador;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReuniaoComChamadaResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'local' => $this->local ? "{$this->local->logradouro}, {$this->local->bairro} - {$this->local->cidade}/{$this->local->estado}"
                : 'endereço não encontrado',
            'projeto' => $this->projeto,
            'data_marcada' => $this->data_marcada,
            'horario_inicio' => Formatador::formatDateToHoursMinutes($this->horario_inicio),
            'horario_fim' => Formatador::formatDateToHoursMinutes($this->horario_fim),
            'periodo' => Formatador::formatDateToHoursMinutes($this->horario_inicio).
                ' às '.
                Formatador::formatDateToHoursMinutes($this->horario_fim),
            'chamadas' => ChamadaResource::collection($this->whenLoaded('chamadas')),
        ];
    }
}
