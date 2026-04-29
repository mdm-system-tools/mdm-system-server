<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGrupoRequest;
use App\Http\Requests\UpdateGrupoRequest;
use App\Http\Resources\GrupoResource;
use App\Models\Grupo;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'projeto_id' => ['required', 'exists:projetos,id'],
            'horario' => ['required', 'date_format:H:i'],
        ]);

        Grupo::query()->create($validated);

        return to_route('cadastros')->with('success', 'Grupo criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Grupo $grupo): Response
    {
        return Inertia::render('detalhes-grupo', [
            'grupo' => $grupo->load(['projeto', 'associados'])->loadCount('associados'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grupo $grupo): RedirectResponse
    {
        $validated = $request->validate([
            'projeto_id' => ['required', 'exists:projetos,id'],
            'horario' => ['required', 'date_format:H:i'],
        ]);

        $grupo->update($validated);

        return back()->with('success', 'Grupo atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grupo $grupo)
    {
        try {
            return response()->json(['message' => $grupo->delete()], ResponseAlias::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['message' => 'ocorreu um erro', 'error' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
