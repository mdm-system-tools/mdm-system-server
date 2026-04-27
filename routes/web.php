<?php

use App\Http\Controllers\Web\CadastrosController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Cadastros routes
    Route::get('cadastros', [CadastrosController::class, 'index'])->name('cadastros');
    Route::get('associados/{associado}', [CadastrosController::class, 'showAssociado'])->name('detalhes-associado');
    Route::get('grupos/{grupo}', [CadastrosController::class, 'showGrupo'])->name('detalhes-grupo');
    Route::get('projetos/{projeto}', [CadastrosController::class, 'showProjeto'])->name('detalhes-projeto');
});

require __DIR__.'/settings.php';
