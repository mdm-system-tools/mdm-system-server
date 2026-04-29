<?php

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\Local;
use App\Models\Projeto;
use App\Models\Reuniao;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('dashboard shows total projects count', function () {
    Projeto::factory(3)->create();

    $this->actingAs($this->user)->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->has('totalProjetos')
            ->where('totalProjetos', 3)
        );
});

test('dashboard shows total associados count', function () {
    Associado::factory(5)->create();

    $this->actingAs($this->user)->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->has('totalAssociados')
            ->where('totalAssociados', 5)
        );
});

test('dashboard shows total completed chamadas count', function () {
    $reuniao = Reuniao::factory()->create();
    Chamada::factory(3)->create(['reuniao_id' => $reuniao->id, 'presenca' => true]);
    Chamada::factory(2)->create(['reuniao_id' => $reuniao->id, 'presenca' => false]);

    $this->actingAs($this->user)->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->has('totalConcluidas')
            ->where('totalConcluidas', 3)
        );
});

test('dashboard shows reunioes from current month', function () {
    $project = Projeto::factory()->create();
    $local = Local::factory()->create();

    $currentMonth = now()->startOfMonth();
    Reuniao::factory(2)->create([
        'projeto_id' => $project->id,
        'local_id' => $local->id,
        'data_marcada' => $currentMonth->addDays(5),
    ]);

    // Meeting in next month should not be included
    Reuniao::factory()->create([
        'projeto_id' => $project->id,
        'local_id' => $local->id,
        'data_marcada' => $currentMonth->addMonths(1),
    ]);

    $this->actingAs($this->user)->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->has('reunioesMes', 2)
        );
});

test('dashboard shows projetos com reuniao in current month', function () {
    $project1 = Projeto::factory()->create();
    $project2 = Projeto::factory()->create();
    $project3 = Projeto::factory()->create();
    $local = Local::factory()->create();

    $currentMonth = now()->startOfMonth();

    Reuniao::factory()->create([
        'projeto_id' => $project1->id,
        'local_id' => $local->id,
        'data_marcada' => $currentMonth->addDays(5),
    ]);

    Reuniao::factory()->create([
        'projeto_id' => $project2->id,
        'local_id' => $local->id,
        'data_marcada' => $currentMonth->addDays(10),
    ]);

    // Project 3 has no meetings in current month
    Reuniao::factory()->create([
        'projeto_id' => $project3->id,
        'local_id' => $local->id,
        'data_marcada' => $currentMonth->subMonths(1),
    ]);

    $this->actingAs($this->user)->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->has('projetosComReuniao', 2)
        );
});

test('dashboard requires authentication', function () {
    $this->get('/dashboard')
        ->assertRedirect('/login');
});
