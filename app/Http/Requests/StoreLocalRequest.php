<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLocalRequest extends FormRequest
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
            'nome' => [
                'required',
                'string',
                'max:255'
            ],
            'endereco' => [
                'required',
                'string',
                'max:255'
            ],
            'regiao' => [
                'required',
                'string',
                'max:100'
            ],
            'tipo' => [
                'required',
                'string',
                'in:externo,interno'
            ],
        ];
    }
}
