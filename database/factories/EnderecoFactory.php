<?php

namespace Database\Factories;

use App\Models\Associado;
use App\Models\Endereco;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Endereco>
 */
class EnderecoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->unique()->numberBetween(1, 32767),
            'associado_id' => Associado::inRandomOrder()->first()->id,
            'cep' => fake()->numerify('#####-###'),
            'logradouro' => fake()->streetName(),
            'bairro' => fake()->streetName(),
            'numero' => fake()->buildingNumber(),
            'cidade' => fake()->city(),
            'estado' => fake()->country(),
        ];
    }
}
