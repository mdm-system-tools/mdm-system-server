<?php

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\GrupoReuniao;
use App\Models\Reuniao;
use App\Models\User;

test('can store presenca for reuniao', function () {
    $user = User::factory()->create();
    $reuniao = Reuniao::factory()->create();

    $grupo = Grupo::factory()->create();
    $associados = Associado::factory()->count(3)->create(['grupo_id' => $grupo->id]);

    foreach ($associados as $associado) {
        Chamada::factory()->create([
            'reuniao_id' => $reuniao->id,
            'associado_id' => $associado->id,
        ]);
    }

    GrupoReuniao::create([
        'reuniao_id' => $reuniao->id,
        'grupo_id' => $grupo->id,
        'concluida' => false,
    ]);

    $response = $this->actingAs($user, 'sanctum')->postJson("/api/v1/reunioes-chamadas/{$reuniao->id}", [
        'chamadas' => [
            [
                'associado_id' => $associados[0]->id,
                'presenca' => true,
                'representante' => false,
            ],
            [
                'associado_id' => $associados[1]->id,
                'presenca' => false,
                'justificativa' => 'Motivo da falta',
            ],
            [
                'associado_id' => $associados[2]->id,
                'presenca' => true,
                'representante' => true,
                'representante_de_id' => $associados[1]->id,
            ],
        ],
    ]);

    $response->assertStatus(200)
        ->assertJson(['message' => 'Chamada concluída com sucesso!']);

    $chamada1 = Chamada::where('reuniao_id', $reuniao->id)
        ->where('associado_id', $associados[0]->id)->first();
    expect($chamada1->presenca)->toBeTrue();
    expect($chamada1->representante)->toBeFalse();

    $chamada2 = Chamada::where('reuniao_id', $reuniao->id)
        ->where('associado_id', $associados[1]->id)->first();
    // When represented by associado[2], chamada2 gets marked as present
    expect($chamada2->presenca)->toBeTrue();
    expect($chamada2->justificativa)->toBeNull();

    $grupoReuniao = GrupoReuniao::where('reuniao_id', $reuniao->id)->first();
    expect($grupoReuniao->concluida)->toBeTrue();
});

test('returns 404 for non-existing reuniao', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/reunioes-chamadas/999', [
        'chamadas' => [],
    ]);

    $response->assertStatus(404);
});

test('validates required fields', function () {
    $user = User::factory()->create();
    $reuniao = Reuniao::factory()->create();

    $response = $this->actingAs($user, 'sanctum')->postJson("/api/v1/reunioes-chamadas/{$reuniao->id}", [
        'chamadas' => [
            [
                'associado_id' => 999,
                'presenca' => true,
            ],
        ],
    ]);

    $response->assertStatus(422);
});
