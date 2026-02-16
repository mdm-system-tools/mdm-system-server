<?php

namespace Database\Factories;

use App\Models\Associado;
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
            'numero_inscricao' => Associado::inRandomOrder()->first()->numero_inscricao,
            'valor' => $this->faker->randomFloat(2, 10, 500),
            'mes_de_referencia' => $this->faker->dateTimeBetween('-1 year', 'now')->format('m/Y'),
            'comprovante' => 'comprovantes/' . $this->faker->uuid() . '.pdf',
        ];
    }
}
