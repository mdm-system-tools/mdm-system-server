<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePresencaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'chamadas' => 'required|array',
            'chamadas.*.associado_id' => 'required|exists:associados,id',
            'chamadas.*.presenca' => 'required|boolean',
            'chamadas.*.representante' => 'nullable|boolean',
            'chamadas.*.representante_de_id' => 'nullable|exists:associados,id',
            'chamadas.*.justificativa' => 'nullable|string|max:100',
        ];
    }
}
