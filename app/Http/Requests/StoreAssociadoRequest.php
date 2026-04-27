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
            'rg' => 'string|size:9|unique:associados,RG',
            'cpf' => 'required|string|size:11|unique:associados,CPF',
            'estado_civil' => 'required|string|max:20',
            'telefone' => ['phone:BR,US', 'fixed_line,mobile'],

            'nis' => 'string|size:11|unique:associados,NIS',
            'cras' => 'string|size:11',
            'email' => 'required|email|max:100|unique:associados,email',

            'data_nascimento' => ['required', 'before:today', 'date'],
            'renda_familiar' => 'numeric|between:0,99999999.99',

            'documentos_img_id' => 'exists:anexos,id',
            'certidao_id' => 'exists:anexos,id',
            'dependente_id' => 'exists:dependentes,id',
        ];
    }
}
