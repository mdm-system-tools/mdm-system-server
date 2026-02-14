<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssociadoRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'numero_inscricao' => 'required|integer|unique:associados,numero_inscricao',
            'nome' => 'required|string|max:255',
            'RG' => 'required|string|size:9|unique:associados,RG',
            'CPF' => 'required|string|size:11|unique:associados,CPF',
            'estado_civil' => 'required|string|max:20',
            'status' => 'boolean',

            'NIS' => 'required|string|size:11|unique:associados,NIS',
            'cras' => 'required|string|size:11',
            'email' => 'required|email|max:100|unique:associados,email',

            'data_de_nascimento' => 'required|date|before:today',
            'renda_familiar' => 'required|numeric|between:0,99999999.99',
            'data_de_inscricao' => 'required|date',

            'documentos_img_id' => 'exists:anexos,id',
            'certidao_id' => 'exists:anexos,id',
            'dependente_id' => 'exists:dependentes,id',
        ];
    }
}
