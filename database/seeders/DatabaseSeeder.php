<?php

namespace Database\Seeders;

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Dependente;
use App\Models\Divida;
use App\Models\Endereco;
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
        Projeto::factory()->count(2)->create();
        Grupo::factory()->count(6)->create();
        Associado::factory()->count(20)->create();
        Dependente::factory()->count(10)->create();
        Endereco::factory()->count(20)->create();
        Local::factory()->count(10)->create();
        Reuniao::factory()->count(10)->create();
        Chamada::factory()->count(10)->create();
        Divida::factory()->count(10)->create();
        $this->call([
            TokenSeeder::class,
        ]);

//        Pagamento::factory()->count(20)->create();
    }
}
