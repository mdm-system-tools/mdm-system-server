<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePagamentoRequest extends FormRequest
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
            'numero_inscricao' => [
                'exists:associados,numero_inscricao'
            ],
            'valor' => [
                'numeric',
                'gt:0'
            ],
            'mes_referencia' => [
                'date_format:m/Y'
            ],
            'comprovante' => [
                'file',
                'mimes:jpg,jpeg,png,pdf',
                'max:2048'
            ],
        ];
    }
}
