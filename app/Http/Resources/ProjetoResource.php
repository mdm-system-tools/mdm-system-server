<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjetoResource extends JsonResource
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
            'grupos' => $this->grupos->isNotEmpty() ? [
                'horario' => $this->grupos
                    ->sortBy('horario')
                    ->map(function ($grupo) {
                        return Carbon::parse($grupo->horario)->format('H:i');
                    })
                    ->values()
                    ->all(),
            ] : null,
            'nome' => $this->nome,
            'regiao' => $this->regiao,
            'valor' => number_format($this->valor, '2', ',', '.'),
            'status' => $this->status ? 'ativo' : 'inativo',
            'concluido' => $this->concluido ? 'sim' : 'nao',
        ];
    }
}
