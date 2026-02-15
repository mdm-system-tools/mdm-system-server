<?php

use App\Http\Controllers\Api\AgendaController;
use App\Http\Controllers\Api\AssociadoController;
use App\Http\Controllers\Api\GrupoController;
use App\Http\Controllers\Api\ProjetoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('associados')
        ->missing(function (Request $request) {
            return response()->json([
                'message' => 'Associado não encontrado.'
            ], 404);
        })
        ->group(function () {
            Route::resource("", AssociadoController::class)->parameters(['' => 'associado']);
            Route::patch("{associado}/activate", [AssociadoController::class, 'activate']);
            Route::patch("{associado}/deactivate", [AssociadoController::class, 'deactivate']);
        });

    Route::prefix('projetos')
        ->missing(function (Request $request) {
            return response()->json([
                'message' => 'projeto não encontrado.'
            ], 404);
        })
        ->group(function () {
            Route::resource("", ProjetoController::class)->parameters(['' => 'projeto']);
        });
    Route::prefix('grupos')
        ->missing(function (Request $request) {
            return response()->json([
                'message' => 'grupo não encontrado.'
            ], 404);
        })
        ->group(function () {
            Route::resource("", GrupoController::class)->parameters(['' => 'grupo']);
        });
    Route::prefix('agendas')
        ->missing(function (Request $request) {
            return response()->json([
                'message' => 'agenda não encontrado.'
            ], 404);
        })
        ->group(function () {

            Route::resource("", AgendaController::class)->parameters(['' => 'agenda']);
        });
});
