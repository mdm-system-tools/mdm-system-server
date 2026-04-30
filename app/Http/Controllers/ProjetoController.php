<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjetoResource;
use App\Models\Projeto;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'regiao' => ['required', 'string', 'max:100'],
            'valor' => ['required', 'string'],
        ]);

        Projeto::query()->create([
            'nome' => $validated['nome'],
            'regiao' => $validated['regiao'],
            'valor' => (float) str_replace(',', '.', preg_replace('/[^\d,.-]/', '', $validated['valor'])),
        ]);

        return to_route('cadastros')->with('success', 'Projeto criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Projeto $projeto): Response
    {
        return Inertia::render('detalhes-projeto', [
            'projeto' => $projeto->load('grupos.associados')->loadCount('grupos'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Projeto $projeto): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:100'],
            'regiao' => ['required', 'string', 'max:10'],
            'valor' => ['required', 'string'],
            'status' => ['nullable', 'boolean'],
        ]);

        $projeto->update([
            'nome' => $validated['nome'],
            'regiao' => $validated['regiao'],
            'valor' => (float) str_replace(',', '.', preg_replace('/[^\d,.-]/', '', $validated['valor'])),
            'status' => $validated['status'] ?? $projeto->status,
        ]);

        return back()->with('success', 'Projeto atualizado com sucesso.');
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
