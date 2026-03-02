<?php

namespace Database\Factories;

use App\Models\Associado;
use App\Models\Grupo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dependente>
 */
class DependenteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "associado_id" => Associado::inRandomOrder()->first()->id,
            "nome_completo" => $this->faker->name(),
            "cpf" => $this->faker->numerify('###########'),
            "rg" => $this->faker->numerify('##########'),
            "certidao" => $this->faker->numerify('##########'),
        ];
    }
}
