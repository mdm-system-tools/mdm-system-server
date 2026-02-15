<?php

namespace Database\Seeders;

use App\Models\Associado;
use App\Models\Grupo;
use Faker\Factory;
use Illuminate\Database\Seeder;

class AssociadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create('pt_BR');

        for ($i = 1; $i <= 10; $i++) {
            Associado::create([
                'numero_inscricao' => 2026000 + $i,
                'nome' => $faker->name,
                'RG' => $faker->numerify('#########'),
                'CPF' => $faker->numerify('#########'),
                'estado_civil' => $faker->randomElement(['Solteiro', 'Casado', 'Divorciado', 'Viúvo']),
                'status' => true,
                'NIS' => $faker->numerify('###########'),
                'cras' => $faker->numerify('###########'),
                'email' => $faker->unique()->safeEmail,
                'data_de_nascimento' => $faker->date('Y-m-d', '2005-01-01'),
                'renda_familiar' => $faker->randomFloat(2, 1300, 5000),
                'data_de_inscricao' => $faker->date('Y-m-d', '2026-01-01'),
                'grupo_id' => Grupo::inRandomOrder()->first()->id,
            ]);
        }
    }
}
