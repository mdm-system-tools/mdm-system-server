<?php

namespace Database\Seeders;

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\Local;
use App\Models\Pagamento;
use App\Models\Projeto;
use App\Models\Reuniao;
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
        Pagamento::factory()->count(20)->create();


        $this->call([
            AssociadoSeeder::class,
            TokenSeeder::class,
        ]);
    }
}
