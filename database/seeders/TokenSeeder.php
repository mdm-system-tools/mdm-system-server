<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TokenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Cria o seu usuário de desenvolvedor
        $user = User::updateOrCreate(
            ['email' => 'dev@teste.com'],
            [
                'name' => 'Dev',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Remove tokens antigos para não acumular
        $user->tokens()->delete();

        // 3. Cria o token com uma string fixa (Plain Text)
        // Nota: O Sanctum armazena o hash no banco, mas permite definir o valor
        $user->createToken('dev-token')->plainTextToken;

        // Se você quiser que o TOKEN seja sempre a mesma STRING literal
        // Você pode inserir diretamente na tabela personal_access_tokens
        \DB::table('personal_access_tokens')->insert([
            'tokenable_type' => 'App\Models\User',
            'tokenable_id'   => $user->id,
            'name'           => 'fixed-token',
            'token'          => hash('sha256', '1234567890'), // O token real será '1234567890'
            'abilities'      => '["*"]',
            'created_at'     => now(),
            'updated_at'     => now(),
        ]);
    }
}
