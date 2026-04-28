<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjetoRequest;
use App\Http\Requests\UpdateProjetoRequest;
use App\Http\Resources\ProjetoResource;
use App\Models\Projeto;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

use function response;

class ProjetoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProjetoResource::collection(Projeto::all());
    }

    public function pending()
    {
        return ProjetoResource::collection(Projeto::where('concluido', false)->get());
    }

    public function completed()
    {
        return ProjetoResource::collection(Projeto::where('concluido', true)->get());
    }

    public function canceled()
    {
        return ProjetoResource::collection(Projeto::where('status', false)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjetoRequest $request): JsonResponse|RedirectResponse
    {
        try {
            if (empty($request->validated())) {
                return response()->json(['message' => 'nenhum dado valido passado, operação ignorada'], ResponseAlias::HTTP_BAD_REQUEST);
            }
            if (Projeto::create($request->validated()) != null) {
                if (! request()->expectsJson()) {
                    return to_route('cadastros')->with('success', 'Projeto cadastrado com sucesso.');
                }

                return response()->json(['message' => 'Projeto cadastrado com sucesso!'], ResponseAlias::HTTP_CREATED);
            }
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Projeto $projeto)
    {
        return new ProjetoResource($projeto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjetoRequest $request, Projeto $projeto)
    {
        try {
            if (empty($request->validated())) {
                return response()->json(['message' => 'nenhum dado valido passado, operação ignorada'], ResponseAlias::HTTP_BAD_REQUEST);
            }
            if ($projeto->update($request->validated()) != null) {
                return response()->json(['message' => 'Projeto atualizado com sucesso!'], ResponseAlias::HTTP_OK);
            }
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Projeto $projeto)
    {
        try {
            if ($projeto->delete()) {
                return response()->json(['message' => 'Projeto removido com sucesso!'], ResponseAlias::HTTP_OK);
            }
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function cancel(Projeto $projeto)
    {
        try {
            if ($projeto->status != true) {
                return response()->json(['message' => 'projeto já cancelado, operação ignorada'], ResponseAlias::HTTP_BAD_REQUEST);
            }
            if ($projeto->update(['status' => false])) {
                return response()->json(['message' => 'Projeto cancelado com sucesso!'], ResponseAlias::HTTP_OK);
            }
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function conclude(Projeto $projeto)
    {
        try {
            if ($projeto->status == false) {
                return response()->json(['message' => 'projeto está cancelado, operação ignorada'], ResponseAlias::HTTP_BAD_REQUEST);
            }
            if ($projeto->concluido == true) {
                return response()->json(['message' => 'projeto está marcado como concluido, operação ignorada'], ResponseAlias::HTTP_BAD_REQUEST);
            }
            if ($projeto->update(['concluido' => true])) {
                return response()->json(['message' => 'Projeto marcado como concluido com sucesso!'], ResponseAlias::HTTP_OK);
            }
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
