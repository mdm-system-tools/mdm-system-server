<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAssociadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'numero_inscricao' => 'integer|unique:associados,numero_inscricao',
            'nome' => 'string|max:255',
            'RG' => 'string|size:9|unique:associados,RG',
            'CPF' => 'string|size:11|unique:associados,CPF',
            'estado_civil' => 'string|max:20',
            'status' => 'boolean',

            'NIS' => 'string|size:11|unique:associados,NIS',
            'cras' => 'string|size:11',
            'email' => 'email|max:100|unique:associados,email',

            'data_de_nascimento' => 'date|before:today',
            'renda_familiar' => 'numeric|between:0,99999999.99',
            'data_de_inscricao' => 'date',

            'documentos_img_id' => 'exists:anexos,id',
            'certidao_id' => 'exists:anexos,id',
            'dependente_id' => 'exists:dependentes,id',
        ];
    }
}
