<?php

namespace Database\Factories;

use App\Models\Local;
use App\Models\Projeto;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reuniao>
 */
class ReuniaoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $projeto = Projeto::has('grupos')->inRandomOrder()->first() ?? Projeto::factory()->hasGrupos(3)->create();
        $horarios = $projeto->grupos->pluck('horario')->map(fn($h) => Carbon::parse($h));
        $inicio = $horarios->min();
        $fim = $horarios->max();

        return [
            'projeto_id'     => $projeto->id,
            'local_id'       => Local::inRandomOrder()->first()->id,
            'data_marcada'   => $this->faker->dateTimeBetween('now', '+1 month')->format('d/m/y'),

            'horario_inicio' => $inicio ? $inicio->format('H:i') : '08:00',
            'horario_fim'    => $fim ? $fim->format('H:i') : '17:00',
        ];
    }
}
