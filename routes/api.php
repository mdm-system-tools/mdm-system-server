<?php

//use App\Http\Controllers\Api\v1\{AuthController, ChamadaController};
//use App\Http\Controllers\AssociadoController;
//use App\Http\Controllers\CepApiClientController;
//use App\Http\Controllers\DividaController;
//use App\Http\Controllers\GrupoController;
//use App\Http\Controllers\LocalController;
//use App\Http\Controllers\PagamentoController;
//use App\Http\Controllers\ProjetoController;
//use App\Http\Controllers\RepresentanteController;
//use App\Http\Controllers\ReuniaoController;
//use App\Models\Associado;
//use App\Models\Grupo;
//use App\Models\Projeto;
//use App\Models\Reuniao;
//use Illuminate\Support\Facades\Route;
//use Symfony\Component\HttpFoundation\Response;

//Route::post('v1/register', [AuthController::class, 'register'])->name('api.auth.register');
//Route::post('v1/login', [AuthController::class, 'login'])->name('api.auth.login');
//
//Route::prefix('v1')->middleware("auth:sanctum")->group(function () {
//
//    $missingModel = fn($label) => fn() => response()->json(['message' => "$label não encontrado."], 404);
//
//    // --- ASSOCIADOS ---
//    Route::apiResource('associados', AssociadoController::class)
//        ->missing($missingModel('Associado'));
//
//    Route::get('/associados/{associado}/dividas', [AssociadoController::class, 'dividas'])
//        ->missing($missingModel('Associado'));
//
//
//    Route::prefix('associados/{associado}')->group(function () {
//        Route::patch('activate', [AssociadoController::class, 'activate']);
//        Route::patch('deactivate', [AssociadoController::class, 'deactivate']);
//    })->middleware('can:view,associado');
//
//    // --- PROJETOS ---
//    Route::prefix('projetos')->group(function () use ($missingModel) {
//        Route::get('pendentes', [ProjetoController::class, 'pending']);
//        Route::get('concluidos', [ProjetoController::class, 'completed']);
//        Route::get('cancelados', [ProjetoController::class, 'canceled']);
//
//        Route::patch('{projeto}/conclude', [ProjetoController::class, 'conclude']);
//        Route::patch('{projeto}/cancel', [ProjetoController::class, 'cancel']);
//    });
//
//
//    Route::apiResource('projetos', ProjetoController::class)
//        ->missing($missingModel('Projeto'));
//
//    // --- GRUPOS ---
//    Route::apiResource('grupos', GrupoController::class)
//        ->missing($missingModel('Grupo'));
//
//
//    // --- REUNIOES ---
//    Route::apiResource('reunioes', ReuniaoController::class)
//        ->missing($missingModel('Reunião'));
//
//    Route::post('reunioes-chamada', [\App\Http\Controllers\ChamadaController::class, 'storeChamada']);
//
//    // --- LOCALS ---
//    Route::apiResource('locals', LocalController::class)
//        ->missing($missingModel('Local'));
//
//    // --- CHAMADAS ---
//    Route::apiResource('chamadas', ChamadaController::class)
//        ->missing($missingModel('Chamada'));
//
//    // --- PAGAMENTOS ---
//    Route::apiResource('pagamentos', PagamentoController::class)
//        ->missing($missingModel('Pagamento'));
//
//    // --- REPRESENTANTE ---
//    Route::apiResource('representantes', RepresentanteController::class)
//        ->missing($missingModel('Representante'));
//
//    // --- DIVIDA ---
//    Route::apiResource('dividas', DividaController::class)
//        ->missing($missingModel('dividas'));
//
//    // --- CEP ---
//    Route::post("/cep", [CepApiClientController::class, 'searchCep']);
//
//    Route::prefix("count")->group(function () {
//        Route::get("projetos", function () {
//            $count = Projeto::where("concluido", true)->count();
//            return response()->json(["total" => $count], Response::HTTP_OK);
//        });
//
//        Route::get("grupos", function () {
//            $count = Grupo::count();
//            return response()->json(["total" => $count], Response::HTTP_OK);
//        });
//
//        Route::get("associados", function () {
//            $count = Associado::where("status", true)->count();
//            return response()->json(["total" => $count], Response::HTTP_OK);
//        });
//
//        Route::get("reunioes", function () {
//            $count = Reuniao::count();
//            return response()->json(["total" => $count], Response::HTTP_OK);
//        });
//    });
//});
//
