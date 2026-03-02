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
        return [
            'numero_inscricao' => $this->faker->numerify("#########"),
            'nome_completo' => $this->faker->name,
            'rg' => $this->faker->numerify('#########'),
            'cpf' => $this->faker->numerify('###########'),
            'estado_civil' => $this->faker->randomElement(['Solteiro', 'Casado', 'Divorciado', 'Viúvo']),
            'status' => true,
            'genero' => $this->faker->randomElement(['M', 'F']),
            'telefone' => $this->faker->numerify('+5511########'),
            'celular' => $this->faker->numerify('+5511#########'),
            'nis' => $this->faker->numerify('###########'),
            'cras' => $this->faker->numerify('###########'),
            'email' => $this->faker->unique()->safeEmail,
            'data_nascimento' => $this->faker->date('Y-m-d', '2005-01-01'),
            'renda_familiar' => $this->faker->randomFloat(2, 1300, 3000),
            'data_inscricao' => $this->faker->date('Y-m-d', '2026-01-01'),
            'grupo_id' => Grupo::inRandomOrder()->first()->id,
        ];
    }
}
