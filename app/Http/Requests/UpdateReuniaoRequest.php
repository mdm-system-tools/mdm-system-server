<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReuniaoRequest extends FormRequest
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
            'local_id' => [
                'exists:locals,id',
            ],
            'projeto_id' => [
                'exists:projetos,id',
            ],
            'data_marcada' => [
                'date_format:d/m/Y',
            ],
            'horario_inicio' => [
                'date_format:H:i',
            ],
            'horario_fim' => [
                'date_format:H:i',
                'after:horario_inicio',
            ],
        ];
    }
}
