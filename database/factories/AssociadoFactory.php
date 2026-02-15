<?php

namespace Database\Factories;

use App\Models\Grupo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Associado>
 */
class AssociadoFactory extends Factory
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
            'numero_inscricao' => $faker->numerify("#########"),
            'nome' => $faker->name,
            'RG' => $faker->numerify('#########'),
            'CPF' => $faker->numerify('###########'),
            'estado_civil' => $faker->randomElement(['Solteiro', 'Casado', 'Divorciado', 'Viúvo']),
            'status' => true,
            'NIS' => $faker->numerify('###########'),
            'cras' => $faker->numerify('###########'),
            'email' => $faker->unique()->safeEmail,
            'data_de_nascimento' => $faker->date('Y-m-d', '2005-01-01'),
            'renda_familiar' => $faker->randomFloat(2, 1300, 3000),
            'data_de_inscricao' => $faker->date('Y-m-d', '2026-01-01'),
            'grupo_id' => Grupo::inRandomOrder()->first()->id,
        ];
    }
}
