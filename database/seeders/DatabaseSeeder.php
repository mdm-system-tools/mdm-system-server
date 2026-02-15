<?php

namespace Database\Seeders;

use App\Models\Associado;
use App\Models\Grupo;
use App\Models\Projeto;
use Database\Factories\AssociadoFactory;
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
        Grupo::factory()->count(5)->create();
        Associado::factory()->count(10)->create();
    }
}
