<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLocalRequest extends FormRequest
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
            'nome' => [
                'required',
                'string',
                'max:255',
            ],
            'cep' => [
                'required',
                'string',
                //                'formato_cep',
            ],
            'logradouro' => [
                'required',
                'string',
                'max:255',
            ],
            'bairro' => [
                'required',
                'string',
                'max:100',
            ],
            'cidade' => [
                'required',
                'string',
                'max:100',
            ],
            'estado' => [
                'required',
                'string',
                'max:100',
            ],
            'regiao' => [
                'required',
                'string',
                'max:100',
            ],
            'tipo' => [
                'required',
                'string',
                'in:Interno,Externo',
            ],
        ];
    }
}
