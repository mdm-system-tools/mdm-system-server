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
            'id' => $this->id,
            "numero_inscricao" => Formatador::formatNumInscricao($this->numero_inscricao),
            "nome_completo" => $this->nome_completo,
            "estado_civil"     => $this->estado_civil,
            "data_nascimento"  => Formatador::formatDateToDayMonthYear($this->data_nascimento),
            "genero"         => $this->genero,
            "email"           => $this->email,
            "cpf" => Formatador::formatCPF($this->cpf),
            "rg" => Formatador::formatRG($this->rg),
            "nis" => Formatador::formatNis($this->nis),
            "cras"            => Formatador::formatCras($this->cras),
            "renda_familiar"   => Formatador::formatValueBR($this->renda_familiar),
            "data_inscricao"   => Formatador::formatDateToDayMonthYear($this->data_inscricao),
            "status"          => $this->status ? "Ativo" : "Inativo",
            "dependentes" => $this->dependentes->map(function ($dependente) {
                return [
                    "nome_completo" => $dependente->nome_completo,
                    "cpf" => Formatador::formatCPF($dependente->cpf),
                    "rg" => Formatador::formatRG($dependente->rg),
                    "certidao" => $dependente->certidao ?: null,
                ];
            }),
            "grupo" => $this->grupo ? Formatador::saudacaoPorHorario($this->grupo->horario) : null,
            "documento_img"    => $this->documento_img,
            "certidao_img"     => $this->certidao_img,
            "endereco" => $this->endereco ? [
                "logradouro" => $this->endereco->logradouro,
                "numero" => $this->endereco->numero,
                "bairro" => $this->endereco->bairro,
                "cidade" => $this->endereco->cidade,
                "estado" => $this->endereco->estado,
                "cep" => Formatador::formatCEP($this->endereco->cep),
            ] : null,
        ];
    }
}
