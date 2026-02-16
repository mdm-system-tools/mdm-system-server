<?php

namespace Database\Factories;

use App\Models\Reuniao;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Local>
 */
class LocalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome'     => $this->faker->name(),
            'endereco' => $this->faker->address(),
            'regiao'   => $this->faker->randomElement(['Norte', 'Sul', 'Leste', 'Oeste', 'Centro-Oeste']),
            'tipo'     => $this->faker->randomElement(['externo', 'interno']),
        ];
    }
}
