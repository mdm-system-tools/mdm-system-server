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
            "nome"            => $this->nome,
            "estado_civil"     => $this->estado_civil,
            "data_nascimento"  => Formatador::formatDateToDayMonthYear($this->data_nascimento),
            "email"           => $this->email,
            "cpf"             => Formatador::formatCPF($this->CPF),
            "rg"              => Formatador::formatRG($this->RG),
            "nis"             => Formatador::formatNis($this->NIS),
            "cras"            => Formatador::formatCras($this->cras),
            "renda_familiar"   => Formatador::formatValueBR($this->renda_familiar),
            "data_inscricao"   => Formatador::formatDateToDayMonthYear($this->data_inscricao),
            "status"          => $this->status ? "Ativo" : "Inativo",
            "dependente"      => $this->dependente ? [
                "id"   => $this->dependente->id,
                "nome" => $this->dependente->nome
            ] : null,
            "grupo"           => $this->grupo ? [
                "horario" => Formatador::formatDateToHoursMinutes($this->grupo->horario),
            ] : null,
            "documento_img"    => $this->documento_img,
            "certidao_img"     => $this->certidao_img,
            "representante"   => $this->representante ? [
                "nome" => $this->representante->nome,
                "cpf"  => $this->representante->CPF,
            ] : null,
        ];
    }
}
