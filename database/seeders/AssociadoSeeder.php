<?php

namespace Database\Seeders;

use App\Models\Associado;
use Illuminate\Database\Seeder;

class AssociadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Associado::create([
            "numero_inscricao" => 20240001,
            "nome" => "Gabriel Silva Santos",
            "RG" => "123456789",
            "CPF" => "12345678901",
            "estado_civil" => "Solteiro",
            "NIS" => "11122233344",
            "cras" => "55566677788",
            "email" => "gabriel.silva@email.com",
            "data_nascimento" => "1995-05-15",
            "renda_familiar" => 2500.50,
            "data_inscricao" => "2024-02-13"
        ]);
    }
}
