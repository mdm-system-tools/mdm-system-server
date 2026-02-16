<?php

namespace Database\Factories;

use App\Models\Associado;
use App\Models\Reuniao;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chamada>
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
            'numero_inscricao' => $associado->numero_inscricao,
            'reuniao_id' => Reuniao::inRandomOrder()->first()->id,
            'representante' => $associado->representante() && $this->faker->boolean(),
            'presenca' => $this->faker->boolean(),
            'justificativa' => fn(array $attributes) => !$attributes['presenca'] ? $this->faker->sentence() : null,
        ];
    }
}
