<?php

namespace Database\Factories;

use App\Models\Grupo;
use App\Models\Projeto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Grupo>
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
        return [
            'projeto_id' => Projeto::inRandomOrder()->first()->id,
            'horario' => $this->faker->time('H:i'),
        ];
    }
}
