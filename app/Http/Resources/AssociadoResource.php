<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssociadoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "numero_inscricao" => substr_replace($this->numero_inscricao, '-', -2, 0),
            "nome" => $this->nome,
            "estado_civil" => $this->estado_civil,
            "data_de_nascimento" => Carbon::parse($this->data_de_nascimento)->format('d/m/Y'),
            "email" => $this->email,
            "CPF" => preg_replace("/(\d{3})(\d{3})(\d{3})([\dxX])/", "$1.$2.$3-$4", $this->CPF),
            "RG" => preg_replace("/(\d{2})(\d{3})(\d{3})([\dxX])/", "$1.$2.$3-$4", $this->RG),
            "NIS" => $this->NIS,
            "cras" => $this->cras,
            "renda_familiar" => "R$ " . number_format($this->renda_familiar, 2, ',', '.'),
            "data_de_inscricao" => Carbon::parse($this->data_de_inscricao)->format('d/m/Y'),
            "status" => $this->status ? "Ativo" : "Inativo",
            "dependente" => $this->dependente ? [
                "id" => $this->dependente->id,
                "nome" => $this->dependente->nome
            ] : null,
            "grupo" => $this->grupo ? [
                "horario" => Carbon::parse($this->grupo->horario)->format('H:i'),
            ] : null,
            "documento_img" => $this->documento_img,
            "certidao_img" => $this->certidao_img,
        ];
    }
}
