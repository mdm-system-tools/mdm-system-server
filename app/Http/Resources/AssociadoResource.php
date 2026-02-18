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
            "numeroInscricao" => Formatador::formatNumInscricao($this->numero_inscricao),
            "nome"            => $this->nome,
            "estadoCivil"     => $this->estado_civil,
            "dataNascimento"  => Formatador::formatDateToDayMonthYear($this->data_nascimento),
            "email"           => $this->email,
            "cpf"             => Formatador::formatCPF($this->CPF),
            "rg"              => Formatador::formatRG($this->RG),
            "nis"             => Formatador::formatNis($this->NIS),
            "cras"            => Formatador::formatCras($this->cras),
            "rendaFamiliar"   => Formatador::formatValueBR($this->renda_familiar),
            "dataInscricao"   => Formatador::formatDateToDayMonthYear($this->data_inscricao),
            "status"          => $this->status ? "Ativo" : "Inativo",
            "dependente"      => $this->dependente ? [
                "id"   => $this->dependente->id,
                "nome" => $this->dependente->nome
            ] : null,
            "grupo"           => $this->grupo ? [
                "horario" => Formatador::formatDateToHoursMinutes($this->grupo->horario),
            ] : null,
            "documentoImg"    => $this->documento_img,
            "certidaoImg"     => $this->certidao_img,
            "representante"   => $this->representante ? [
                "nome" => $this->representante->nome,
                "cpf"  => $this->representante->CPF,
            ] : null,
        ];
    }
}
