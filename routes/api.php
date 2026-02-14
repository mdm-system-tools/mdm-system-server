<?php

use App\Http\Controllers\Api\AgendaController;
use App\Http\Controllers\Api\AssociadoController;
use App\Http\Controllers\Api\GrupoController;
use App\Http\Controllers\Api\ProjetoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/agendas", [AgendaController::class, 'index']);
Route::get("/grupos", [GrupoController::class, 'index']);
Route::get("/projetos", [ProjetoController::class, 'index']);

Route::resource("associados", AssociadoController::class);
Route::resource("grupos", GrupoController::class);
