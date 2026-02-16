<?php

namespace App\Http\Resources;

use App\Utils\Formatador;
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
            "numero_inscricao" => Formatador::formatNumInscricao($this->numero_inscricao),
            "nome" => $this->nome,
            "estado_civil" => $this->estado_civil,
            "data_de_nascimento" => Formatador::formatDateToDayMonthYear($this->data_nascimento),
            "email" => $this->email,
            "CPF" => Formatador::formatCPF($this->CPF),
            "RG" => Formatador::formatRG($this->RG),
            "NIS" => Formatador::formatNis($this->NIS),
            "cras" => Formatador::formatCras($this->cras),
            "renda_familiar" => Formatador::formatValueBR($this->renda_familiar),
            "data_de_inscricao" => Formatador::formatDateToDayMonthYear($this->data_inscricao),
            "status" => $this->status ? "Ativo" : "Inativo",
            "dependente" => $this->dependente ? [
                "id" => $this->dependente->id,
                "nome" => $this->dependente->nome
            ] : null,
            "grupo" => $this->grupo ? [
                "horario" => Formatador::formatDateToHoursMinutes($this->grupo->horario),
            ] : null,
            "documento_img" => $this->documento_img,
            "certidao_img" => $this->certidao_img,
        ];
    }
}
