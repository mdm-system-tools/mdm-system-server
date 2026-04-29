<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreReuniaoRequest extends FormRequest
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
                'nullable',
                'exists:locals,id',
            ],
            'local' => 'nullable|array',
            'local.logradouro' => 'required_with:local|string|max:255',
            'local.numero' => 'required_with:local|string|max:20',
            'local.bairro' => 'required_with:local|string|max:100',
            'local.cidade' => 'required_with:local|string|max:100',
            'projeto_id' => [
                'required',
                'exists:projetos,id',
            ],
            'data_marcada' => [
                'required',
                'date',
            ],
            'horario_inicio' => [
                'required',
                'date_format:H:i',
            ],
        ];
    }
}
