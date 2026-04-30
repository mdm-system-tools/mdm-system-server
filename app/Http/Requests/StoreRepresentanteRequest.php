<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRepresentanteRequest extends FormRequest
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
            'numero_inscricao' => [
                'required',
                'exists:associados,numero_inscricao',
            ],
            'nome' => [
                'required',
                'string',
                'max:255',
            ],
            'CPF' => [
                'required',
                'string',
                'size:11',
            ],
        ];
    }
}
