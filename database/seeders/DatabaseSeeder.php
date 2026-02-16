<?php

namespace Database\Seeders;

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\Local;
use App\Models\Projeto;
use App\Models\Reuniao;
use Database\Factories\AssociadoFactory;
use Database\Factories\LocalFactory;
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
        Projeto::factory()->count(5)->create();
        Grupo::factory()->count(20)->create();
        Associado::factory()->count(10)->create();
        Local::factory()->count(10)->create();
        Reuniao::factory()->count(10)->create();
        Chamada::factory()->count(10)->create();
    }
}
