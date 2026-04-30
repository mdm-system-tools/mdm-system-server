<?php

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\GrupoReuniao;
use App\Models\Local;
use App\Models\Projeto;
use App\Models\Reuniao;
use App\Models\User;

test('can delete non-concluded reuniao', function () {
    $user = User::factory()->create();
    $projeto = Projeto::factory()->create();
    $grupo = Grupo::factory()->create(['projeto_id' => $projeto->id]);
    $local = Local::factory()->create();

    $reuniao = Reuniao::factory()->create([
        'projeto_id' => $projeto->id,
        'local_id' => $local->id,
        'concluida' => false,
    ]);

    GrupoReuniao::create([
        'reuniao_id' => $reuniao->id,
        'grupo_id' => $grupo->id,
        'concluida' => false,
    ]);

    $associado = Associado::factory()->create(['grupo_id' => $grupo->id]);
    Chamada::create([
        'associado_id' => $associado->id,
        'reuniao_id' => $reuniao->id,
        'presenca' => false,
    ]);

    $response = $this->actingAs($user)->delete("/chamadas/{$reuniao->id}");

    $response->assertRedirect('/chamadas');
    $response->assertSessionHas('success', 'Reunião excluída com sucesso!');

    expect(Reuniao::find($reuniao->id))->toBeNull();
    expect(Chamada::where('reuniao_id', $reuniao->id)->count())->toBe(0);
    expect(GrupoReuniao::where('reuniao_id', $reuniao->id)->count())->toBe(0);
});

test('cannot delete concluded reuniao', function () {
    $user = User::factory()->create();
    $projeto = Projeto::factory()->create();
    $local = Local::factory()->create();

    $reuniao = Reuniao::factory()->create([
        'projeto_id' => $projeto->id,
        'local_id' => $local->id,
        'concluida' => true,
    ]);

    $response = $this->actingAs($user)->delete("/chamadas/{$reuniao->id}");

    $response->assertRedirect('/chamadas');
    $response->assertSessionHas('error', 'Não é possível excluir reuniões já concluídas.');

    expect(Reuniao::find($reuniao->id))->not->toBeNull();
});
