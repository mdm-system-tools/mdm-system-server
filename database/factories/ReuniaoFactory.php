<?php

namespace Database\Factories;

use App\Models\Local;
use App\Models\Projeto;
use App\Models\Reuniao;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reuniao>
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
        $local = Local::inRandomOrder()->first() ?? Local::factory()->create();
        $horarios = $projeto->grupos->pluck('horario')->map(fn ($h) => Carbon::parse($h));
        $inicio = $horarios->min();
        $fim = $horarios->max();

        return [
            'projeto_id' => $projeto->id,
            'local_id' => $local->id,
            'data_marcada' => $this->faker->dateTimeBetween('now', '+1 month')->format('d/m/Y'),
        ];
    }
}
