<?php

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Reuniao;
use App\Models\User;

test('can list reunioes with chamadas', function () {
    $user = User::factory()->create();
    $reuniao = Reuniao::factory()->create();

    $associado = Associado::factory()->create();
    Chamada::factory()->count(3)->create([
        'reuniao_id' => $reuniao->id,
        'associado_id' => $associado->id,
    ]);

    $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/reunioes-chamadas');

    $response->assertStatus(200);
    $json = $response->json();
    // Handle both wrapped and unwrapped responses
    $data = $json['data'] ?? $json;
    expect($data)->toBeArray();
    expect($data[0] ?? null)->not->toBeNull();
});

test('can show reuniao with chamadas', function () {
    $user = User::factory()->create();
    $reuniao = Reuniao::factory()->create();

    $associado = Associado::factory()->create();
    Chamada::factory()->count(2)->create([
        'reuniao_id' => $reuniao->id,
        'associado_id' => $associado->id,
    ]);

    $response = $this->actingAs($user, 'sanctum')->getJson("/api/v1/reunioes-chamadas/{$reuniao->id}");

    $response->assertStatus(200);
    $json = $response->json();
    $data = $json['data'] ?? $json;
    expect($data)->toHaveKey('chamadas');
});

test('returns 404 for non-existing reuniao', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/reunioes-chamadas/999');

    $response->assertStatus(404);
});
