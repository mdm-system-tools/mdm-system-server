<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\GrupoResource;
use App\Models\Grupo;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return GrupoResource::collection(Grupo::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $valid = $request->validate([
            "horario" => ["required", "date_format:H:i"],
            "projeto_id" => ["required", "exists:App\Models\Projeto,id"],
        ]);

        try {
            if (Grupo::create($valid) != null) {
                return response()->json(["message" => "criando com sucesso"], ResponseAlias::HTTP_CREATED);
            }
        } catch (Exception $e) {
            return response()->json(['message' => "ocorreu um erro", 'error' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Grupo $grupo)
    {
        return new GrupoResource($grupo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grupo $grupo)
    {
        $valid = $request->validate([
            "horario" => ["date_format:H:i"],
            "projeto_id" => ["exists:App\Models\Projeto,id"],
        ]);
        try {
            if ($grupo->update($valid)) {
                return response()->json(['message' => 'atualizado com sucesso'], ResponseAlias::HTTP_OK);
            }
        } catch (Exception $e) {
            return response()->json(['message' => "ocorreu um erro", 'error' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grupo $grupo)
    {
        try {
            return response()->json(['message' => $grupo->delete()], ResponseAlias::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['message' => "ocorreu um erro", 'error' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
