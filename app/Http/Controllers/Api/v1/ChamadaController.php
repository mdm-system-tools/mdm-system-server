<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChamadaRequest;
use App\Http\Requests\UpdateChamadaRequest;
use App\Http\Resources\ChamadaResource;
use App\Models\Associado;
use App\Models\Chamada;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ChamadaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ChamadaResource::collection(Chamada::with(["reuniao", "associado"])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChamadaRequest $request)
    {
        try {
            if (empty($request->validated())) {
                return response()->json(["message" => "dados invalidos"], ResponseAlias::HTTP_BAD_REQUEST);
            }

            if ($request->validated()["representante"]) {
                if (Associado::findOrFail($request->validated()["numero_inscricao"])->representante()["id"] == null) {
                    return response()->json(["message" => "este associado não possui um representante, operação cancelada"], ResponseAlias::HTTP_BAD_REQUEST);
                }
            }

            if (Chamada::create($request->validated())) {
                return response()->json(["message" => "Chamada cadastrada com sucesso!"], ResponseAlias::HTTP_CREATED);
            }
        } catch (\Exception $e) {
            return response()->json(["message" => "Erro ao cadastrar chamada!", "error" => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Chamada $chamada)
    {
        return new ChamadaResource($chamada);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChamadaRequest $request, Chamada $chamada)
    {
        try {
            if ($chamada->update($request->validated())) {
                return response()->json(["message" => "Chamada atualizado com sucesso!"], ResponseAlias::HTTP_OK);
            }
        } catch (\Exception $e) {
            return response()->json(["message" => "Erro ao atualizar chamada!", "error" => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chamada $chamada)
    {
        try {
            if ($chamada->delete()) {
                return response()->json(["message" => "chamada apagada com sucesso"], ResponseAlias::HTTP_OK);
            }
        } catch (\Exception $e) {
            return response()->json(["message" => "ocorreu um erro", "error" => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
