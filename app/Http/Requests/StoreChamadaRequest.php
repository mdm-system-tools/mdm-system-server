<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreChamadaRequest extends FormRequest
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
            'reuniao_id' => [
                'required',
                'exists:reuniaos,id',
            ],
            'representante' => [
                'required',
                'boolean',
            ],
            'presenca' => [
                'required',
                'boolean',
            ],
            'justificativa' => [
                'nullable',
                'string',
                'max:255',
                'required_if:presenca,false,0',
                'prohibited_if:presenca,true,1',
            ],
        ];
    }
}
