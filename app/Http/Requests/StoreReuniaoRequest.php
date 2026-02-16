<?php

namespace App\Http\Requests;

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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'local_id' => [
                'required',
                'exists:locals,id'
            ],
            'projeto_id' => [
                'required',
                'exists:projetos,id'
            ],
            'data_marcada' => [
                'required',
                'date_format:d/m/Y'
            ],
            'horario_inicio' => [
                'required',
                'date_format:H:i'
            ],
            'horario_fim' => [
                'required',
                'date_format:H:i',
                'after:horario_inicio'
            ],
        ];
    }
}
