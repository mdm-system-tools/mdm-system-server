<?php

namespace Database\Seeders;

use App\Models\Grupo;
use App\Models\Projeto;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjetoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create('pt_BR');

        $gruposIds = Grupo::pluck('id');

        if ($gruposIds->isEmpty()) {
            $this->command->warn("Nenhum grupo encontrado. Rode o GrupoSeeder primeiro!");
            return;
        }

        for ($i = 0; $i < 10; $i++) {
            Projeto::create([
                'grupo_id' => $gruposIds->random(),
                'valor'    => $faker->randomFloat(2, 100, 999), // Decimal(5,2) suporta até 999.99
                'nome'     => $faker->jobTitle,
                'regiao'   => $faker->lexify('Regiao ???'), // Gera algo como 'Regiao ABC'
            ]);
        }
    }
}
