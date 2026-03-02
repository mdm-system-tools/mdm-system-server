<?php

namespace Database\Factories;

use App\Models\Associado;
use App\Models\Divida;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pagamento>
 */
class PagamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'associado_id' => Associado::inRandomOrder()->first()->id,
            'divida_id' => Divida::inRandomOrder()->first()->id,
            'metodo_pagamento' => $this->faker->randomElement(['cartão de crédito', 'boleto', 'pix']),
            'data_pagamento' => $this->faker->date(),
            'comprovante' => 'comprovantes/' . $this->faker->uuid() . '.pdf',
        ];
    }
}
