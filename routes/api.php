<?php

use App\Http\Controllers\Api\v1\{AssociadoController,
    ChamadaController,
    GrupoController,
    LocalController,
    PagamentoController,
    ProjetoController,
    ReuniaoController,
};
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    $missingModel = fn($label) => fn() => response()->json(['message' => "$label não encontrado."], 404);

    // --- ASSOCIADOS ---
    Route::apiResource('associados', AssociadoController::class)
        ->missing($missingModel('Associado'));

    Route::prefix('associados/{associado}')->group(function () {
        Route::patch('activate', [AssociadoController::class, 'activate']);
        Route::patch('deactivate', [AssociadoController::class, 'deactivate']);
    })->middleware('can:view,associado'); // Exemplo de segurança extra

    // --- PROJETOS ---
    Route::prefix('projetos')->group(function () use ($missingModel) {
        Route::get('pendentes', [ProjetoController::class, 'pending']);
        Route::get('concluidos', [ProjetoController::class, 'completed']);
        Route::get('cancelados', [ProjetoController::class, 'canceled']);

        Route::patch('{projeto}/conclude', [ProjetoController::class, 'conclude']);
        Route::patch('{projeto}/cancel', [ProjetoController::class, 'cancel']);
    });

    Route::apiResource('projetos', ProjetoController::class)
        ->missing($missingModel('Projeto'));

    // --- GRUPOS ---
    Route::apiResource('grupos', GrupoController::class)
        ->missing($missingModel('Grupo'));

    // --- REUNIOES ---
    Route::apiResource('reunioes', ReuniaoController::class)
        ->missing($missingModel('Reunião'))
        ->parameters(['reunioes' => 'reuniao']); // ??

    // --- LOCALS ---
    Route::apiResource('locals', LocalController::class)
        ->missing($missingModel('Local'));

    // --- CHAMADAS ---
    Route::apiResource('chamadas', ChamadaController::class)
        ->missing($missingModel('Chamada'));

    // --- PAGAMENTOS ---
    Route::apiResource('pagamentos', PagamentoController::class)
        ->missing($missingModel('Pagamento'));
});
