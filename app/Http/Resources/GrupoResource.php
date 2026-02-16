<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Carbon\Exceptions\Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GrupoResource extends JsonResource
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
            'projeto' =>[
                'nome' => $this->projeto->nome,
            ],
            'horario' => Carbon::parse($this->horario)->format('H:i'),
        ];
    }
}
