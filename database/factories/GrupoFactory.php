<?php

namespace Database\Factories;

use App\Models\Projeto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grupo>
 */
class GrupoFactory extends Factory
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
            "projeto_id" => Projeto::inRandomOrder()->first()->id,
            "horario" => $faker->time(),
        ];
    }
}
