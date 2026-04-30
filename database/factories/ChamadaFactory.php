<?php

namespace Database\Factories;

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Reuniao;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Chamada>
 */
class ChamadaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $associado = Associado::inRandomOrder()->first();

        return [
            'associado_id' => $associado->id,
            'reuniao_id' => Reuniao::inRandomOrder()->first()->id,
            'representante' => $associado->representante() && $this->faker->boolean(),
            'presenca' => $this->faker->boolean(),
            'justificativa' => fn (array $attributes) => ! $attributes['presenca'] ? $this->faker->sentence() : null,
        ];
    }
}
