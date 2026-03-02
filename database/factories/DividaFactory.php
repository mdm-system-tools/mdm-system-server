<?php

namespace Database\Factories;

use App\Models\Projeto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Divida>
 */
class DividaFactory extends Factory
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
            'valor' => $this->faker->randomFloat(2, 100, 1000),
            'data_divida' => $this->faker->date(),
        ];
    }
}
