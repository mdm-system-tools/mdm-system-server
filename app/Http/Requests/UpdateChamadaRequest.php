<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateChamadaRequest extends FormRequest
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
                'exists:associados,numero_inscricao',
            ],
            'reunioes_id' => [
                'exists:reuniaos,id',
            ],
            'representante' => [
                'boolean',
            ],
            'presenca' => [
                'boolean',
            ],
            'justificativa' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }
}
