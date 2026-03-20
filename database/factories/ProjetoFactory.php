<?php

namespace Database\Factories;

use App\Models\Projeto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Projeto>
 */
class ProjetoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'valor' => $this->faker->randomFloat(2, 0, 1000),
            'nome' => $this->faker->jobTitle,
            'regiao' => $this->faker->lexify('Regiao ???'),
            "concluido" => $this->faker->boolean(),
        ];
    }
}
