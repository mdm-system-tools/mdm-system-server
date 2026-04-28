<?php

use App\Http\Controllers\Web\CadastrosController;
use App\Http\Controllers\Web\ChamadaController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Chamadas routes
    Route::get('chamadas', [ChamadaController::class, 'chamadas'])->name('chamadas');
    Route::post('chamadas', [ChamadaController::class, 'storeChamada'])->name('chamadas.store');
    Route::get('historico-chamadas', [ChamadaController::class, 'index'])->name('historico-chamadas');
    Route::get('historico-chamadas/{chamada}', [ChamadaController::class, 'show'])->name('detalhes-chamada');

    // Cadastros routes
    Route::get('cadastros', [CadastrosController::class, 'index'])->name('cadastros');
    Route::post('cadastros/associados', [CadastrosController::class, 'storeAssociado'])->name('cadastros.associados.store');
    Route::post('cadastros/grupos', [CadastrosController::class, 'storeGrupo'])->name('cadastros.grupos.store');
    Route::post('cadastros/projetos', [CadastrosController::class, 'storeProjeto'])->name('cadastros.projetos.store');
    Route::get('associados/{associado}', [CadastrosController::class, 'showAssociado'])->name('detalhes-associado');
    Route::patch('associados/{associado}', [CadastrosController::class, 'updateAssociado'])->name('cadastros.associados.update');
    Route::post('associados/{associado}/cobrancas', [CadastrosController::class, 'storeCobranca'])->name('cadastros.cobrancas.store');
    Route::post('associados/{associado}/dependentes', [CadastrosController::class, 'storeDependente'])->name('cadastros.dependentes.store');
    Route::patch('associados/{associado}/dependentes/{dependente}', [CadastrosController::class, 'updateDependente'])->name('cadastros.dependentes.update');
    Route::delete('associados/{associado}/dependentes/{dependente}', [CadastrosController::class, 'destroyDependente'])->name('cadastros.dependentes.destroy');
    Route::get('grupos/{grupo}', [CadastrosController::class, 'showGrupo'])->name('detalhes-grupo');
    Route::patch('grupos/{grupo}', [CadastrosController::class, 'updateGrupo'])->name('cadastros.grupos.update');
    Route::get('projetos/{projeto}', [CadastrosController::class, 'showProjeto'])->name('detalhes-projeto');
    Route::patch('projetos/{projeto}', [CadastrosController::class, 'updateProjeto'])->name('cadastros.projetos.update');
});

require __DIR__.'/settings.php';
