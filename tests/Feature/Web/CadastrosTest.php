<?php

use App\Models\Associado;
use App\Models\Dependente;
use App\Models\Divida;
use App\Models\Grupo;
use App\Models\Pagamento;
use App\Models\Projeto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('cadastros page shows real database records', function () {
    $user = User::factory()->create();

    $primeiroProjeto = Projeto::factory()->create([
        'nome' => 'Projeto Azul',
        'status' => true,
    ]);

    $segundoProjeto = Projeto::factory()->create([
        'nome' => 'Projeto Verde',
        'status' => false,
    ]);

    $grupo = Grupo::factory()->create([
        'projeto_id' => $primeiroProjeto->id,
        'horario' => '09:00',
    ]);

    $associadoA = Associado::factory()->create([
        'grupo_id' => $grupo->id,
        'nome_completo' => 'Ana Souza',
        'numero_inscricao' => '111111111',
    ]);

    $associadoB = Associado::factory()->create([
        'grupo_id' => $grupo->id,
        'nome_completo' => 'Bruno Silva',
        'numero_inscricao' => '222222222',
    ]);

    $this->actingAs($user)
        ->get(route('cadastros'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('cadastros')
            ->has('associados', 2)
            ->has('grupos', 1)
            ->has('projetos', 2)
            ->where('associados.0.nome_completo', $associadoA->nome_completo)
            ->where('associados.1.nome_completo', $associadoB->nome_completo)
            ->where('grupos.0.associados_count', 2)
            ->where('grupos.0.projeto.nome', $primeiroProjeto->nome)
            ->where('projetos.0.nome', $primeiroProjeto->nome)
            ->where('projetos.1.nome', $segundoProjeto->nome)
        );
});

test('detalhes pages show real database props', function () {
    $user = User::factory()->create();
    $projeto = Projeto::factory()->create(['nome' => 'Projeto Real']);
    $grupo = Grupo::factory()->create(['projeto_id' => $projeto->id, 'horario' => '10:00']);
    $associado = Associado::factory()->create([
        'grupo_id' => $grupo->id,
        'nome_completo' => 'Associado Real',
    ]);

    Dependente::factory()->create([
        'associado_id' => $associado->id,
        'nome_completo' => 'Dependente Real',
    ]);

    $this->actingAs($user)
        ->get(route('detalhes-associado', $associado))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('detalhes-associado')
            ->where('associado.nome_completo', 'Associado Real')
            ->where('associado.grupo.projeto.nome', 'Projeto Real')
            ->has('associado.dependentes', 1)
        );

    $this->actingAs($user)
        ->get(route('detalhes-grupo', $grupo))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('detalhes-grupo')
            ->where('grupo.projeto.nome', 'Projeto Real')
            ->where('grupo.associados.0.nome_completo', 'Associado Real')
        );

    $this->actingAs($user)
        ->get(route('detalhes-projeto', $projeto))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('detalhes-projeto')
            ->where('projeto.nome', 'Projeto Real')
            ->has('projeto.grupos', 1)
        );
});

test('can add and remove dependente in associado details flow', function () {
    $user = User::factory()->create();
    $projeto = Projeto::factory()->create();
    $grupo = Grupo::factory()->create(['projeto_id' => $projeto->id]);
    $associado = Associado::factory()->create(['grupo_id' => $grupo->id]);

    $this->actingAs($user)
        ->post(route('cadastros.dependentes.store', $associado), [
            'nome_completo' => 'Novo Dependente',
            'cpf' => '12345678901',
            'rg' => '12345678901',
            'certidao' => 'ABC123',
        ])
        ->assertRedirect();

    $dependente = Dependente::query()->where('nome_completo', 'Novo Dependente')->first();
    expect($dependente)->not->toBeNull();

    $this->actingAs($user)
        ->delete(route('cadastros.dependentes.destroy', [$associado, $dependente]))
        ->assertRedirect();

    expect(Dependente::query()->where('id', $dependente->id)->exists())->toBeFalse();
});

test('can create cobranca for associado details', function () {
    $user = User::factory()->create();
    $projeto = Projeto::factory()->create();
    $grupo = Grupo::factory()->create(['projeto_id' => $projeto->id]);
    $associado = Associado::factory()->create(['grupo_id' => $grupo->id]);

    $this->actingAs($user)
        ->post(route('cadastros.cobrancas.store', $associado), [
            'valor' => '125,50',
            'data_divida' => now()->toDateString(),
        ])
        ->assertRedirect();

    $divida = Divida::query()->where('projeto_id', $projeto->id)->latest('id')->first();
    expect($divida)->not->toBeNull();
    expect((float) $divida->valor)->toBe(125.50);

    $pagamento = Pagamento::query()->where('associado_id', $associado->id)->where('divida_id', $divida->id)->first();
    expect($pagamento)->not->toBeNull();
    expect($pagamento->status)->toBe('Pendente');
});
