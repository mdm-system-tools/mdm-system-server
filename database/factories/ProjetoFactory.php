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
        $faker = \Faker\Factory::create('pt_BR');
        return [
            'valor' => $faker->randomFloat(2, 100, 999),
            'nome' => $faker->jobTitle,
            'regiao' => $faker->lexify('Regiao ???'),
            "concluido" => $faker->boolean(),
        ];
    }
}
