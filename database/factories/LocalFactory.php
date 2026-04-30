<?php

namespace Database\Factories;

use App\Models\Local;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Local>
 */
class LocalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bairros = [
            'Centro', 'Jardim América', 'Vila Nova', 'Bela Vista',
            'Santo Antônio', 'Industrial', 'Parque das Nações',
            'Santa Terezinha', 'São Cristóvão', 'Planalto',
            'Alvorada', 'Primavera', 'Liberdade', 'Boa Vista',
        ];

        return [
            'nome' => $this->faker->company(),
            'cep' => $this->faker->postcode(),
            'logradouro' => $this->faker->streetName().', '.$this->faker->buildingNumber(),
            'bairro' => $this->faker->randomElement($bairros),
            'cidade' => $this->faker->city(),
            'estado' => $this->faker->country(),
            'regiao' => $this->faker->randomElement(['Norte', 'Sul', 'Leste', 'Oeste', 'Centro-Oeste']),
            'tipo' => $this->faker->randomElement(['externo', 'interno']),
        ];
    }
}
