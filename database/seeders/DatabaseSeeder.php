<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // grupo depende de projeto
            ProjetoSeeder::class,
            GrupoSeeder::class,

            AssociadoSeeder::class,
//            DependenteSeeder::class,
//            AnexoSeeder::class,

//            AgendaSeeder::class,
//            ChamadaSeeder::class,
//            ReuniaoSeeder::class,
        ]);
    }
}
