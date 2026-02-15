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
            'valor' => $faker->randomFloat(2, 100, 999), // Decimal(5,2) suporta até 999.99
            'nome' => $faker->jobTitle,
            'regiao' => $faker->lexify('Regiao ???'), // Gera algo como 'Regiao ABC'
        ];
    }
}
