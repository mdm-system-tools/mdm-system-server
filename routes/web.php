<?php

use App\Http\Controllers\AssociadoController;
use App\Http\Controllers\CadastrosController;
use App\Http\Controllers\ChamadaController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\ProjetoController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Chamadas routes
    Route::get('chamadas', [ChamadaController::class, 'index'])->name('chamadas');
    Route::post('chamadas', [ChamadaController::class, 'store'])->name('chamadas.store');
    Route::put('chamadas/{reuniao}', [ChamadaController::class, 'update'])->name('chamadas.update');
    Route::get('chamadas/{reuniao}/grupo/{grupo}/tomar', [ChamadaController::class, 'tomar'])->name('chamadas.tomar');
    Route::patch('chamadas/{reuniao}/grupo/{grupo}/concluir', [ChamadaController::class, 'concluir'])->name('chamadas.concluir');
    Route::get('historico-chamadas', [ChamadaController::class, 'indexHistorico'])->name('historico-chamadas');
    Route::get('historico-chamadas/{reuniao}', [ChamadaController::class, 'show'])->name('detalhes-chamada');

    // Cadastros e dashboard routes
    Route::get('cadastros', [CadastrosController::class, 'index'])->name('cadastros');
    Route::get('dashboard', [CadastrosController::class, 'dashboard'])->name('dashboard');

    // Associados routes
    Route::post('cadastros/associados', [AssociadoController::class, 'store'])->name('cadastros.associados.store');
    Route::get('associados/{associado}', [AssociadoController::class, 'show'])->name('detalhes-associado');
    Route::patch('/associados/{associado}/activate', [AssociadoController::class, 'activate']);
    Route::patch('/associados/{associado}/deactivate', [AssociadoController::class, 'deactivate']);
    Route::patch('/associados/{associado}/setgrupo', [AssociadoController::class, 'setGrupo']);
    Route::patch('associados/{associado}', [AssociadoController::class, 'updateAssociado']);
    Route::post('associados/{associado}/dependentes', [AssociadoController::class, 'storeDependente'])->name('cadastros.dependentes.store');
    Route::patch('associados/{associado}/dependentes/{dependente}', [AssociadoController::class, 'updateDependente']);
    Route::delete('associados/{associado}/dependentes/{dependente}', [AssociadoController::class, 'destroyDependente']);
    Route::post('associados/{associado}/cobrancas', [AssociadoController::class, 'storeCobranca']);

    // Grupos routes
    Route::patch('grupos/{grupo}', [GrupoController::class, 'update'])->name('cadastros.grupos.update');
    Route::post('cadastros/grupos', [GrupoController::class, 'store'])->name('cadastros.grupos.store');
    Route::get('grupos/{grupo}', [GrupoController::class, 'show'])->name('detalhes-grupo');

    // Projetos routes
    Route::patch('projetos/{projeto}', [ProjetoController::class, 'update'])->name('cadastros.projetos.update');
    Route::post('cadastros/projetos', [ProjetoController::class, 'store'])->name('cadastros.projetos.store');
    Route::get('projetos/{projeto}', [ProjetoController::class, 'show'])->name('detalhes-projeto');
});

require __DIR__.'/settings.php';
