<?php

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\Local;
use App\Models\Projeto;
use App\Models\Reuniao;
use App\Models\User;

test('can create chamada with valid data', function () {
    // Create a user
    $user = User::factory()->create();

    // Create a project
    $projeto = Projeto::factory()->create();

    // Create a group for the project
    $grupo = Grupo::factory()->create(['projeto_id' => $projeto->id]);

    // Create some associados in the group
    Associado::factory()
        ->count(3)
        ->create(['grupo_id' => $grupo->id]);

    // Prepare valid data
    $data = [
        'projeto_id' => $projeto->id,
        'data_marcada' => now()->addDay()->format('Y-m-d'),
        'horario_inicio' => '14:30',
        'local' => [
            'logradouro' => 'Rua exemplo',
            'numero' => '123',
            'bairro' => 'Bairro teste',
            'cidade' => 'Cidade teste',
        ],
    ];

    // Make the request
    $response = $this->actingAs($user)->post('/chamadas', $data);

    // Assert the response is a redirect
    $response->assertRedirect('/chamadas');
    $response->assertSessionHas('success', 'Reunião criada com sucesso!');

    // Assert local was created
    expect(Local::where('logradouro', 'Rua exemplo')->count())->toBe(1);

    // Assert reuniao was created
    expect(Reuniao::count())->toBe(1);

    // Assert chamadas were created for each associado
    expect(Chamada::count())->toBe(3);

    // Verify chamadas belong to the created reuniao
    $reuniao = Reuniao::first();
    expect($reuniao->chamadas()->count())->toBe(3);

    // Verify each chamada has correct data
    $reuniao->chamadas()->each(function ($chamada) {
        expect($chamada->presenca)->toBeFalse();
        expect($chamada->numero_inscricao)->not->toBeNull();
    });
});

test('cannot create chamada without projeto_id', function () {
    $user = User::factory()->create();

    $data = [
        'data_marcada' => now()->addDay()->format('Y-m-d'),
        'horario_inicio' => '14:30',
        'local' => [
            'logradouro' => 'Rua exemplo',
            'numero' => '123',
            'bairro' => 'Bairro teste',
            'cidade' => 'Cidade teste',
        ],
    ];

    $response = $this->actingAs($user)->post('/chamadas', $data);

    $response->assertSessionHasErrors('projeto_id');
});

test('cannot create chamada with invalid projeto_id', function () {
    $user = User::factory()->create();

    $data = [
        'projeto_id' => 9999,
        'data_marcada' => now()->addDay()->format('Y-m-d'),
        'horario_inicio' => '14:30',
        'local' => [
            'logradouro' => 'Rua exemplo',
            'numero' => '123',
            'bairro' => 'Bairro teste',
            'cidade' => 'Cidade teste',
        ],
    ];

    $response = $this->actingAs($user)->post('/chamadas', $data);

    $response->assertSessionHasErrors('projeto_id');
});
