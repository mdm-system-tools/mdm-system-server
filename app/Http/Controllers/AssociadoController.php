<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssociadoRequest;
use App\Http\Requests\UpdateAssociadoRequest;
use App\Http\Resources\AssociadoResource;
use App\Models\Associado;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class AssociadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AssociadoResource::collection(Associado::with(['dependentes', 'grupo', 'endereco'])->get());
    }

    public function dividas(Associado $associado)
    {
        $projeto = $associado->pagamentos;

        return response()->json($projeto);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssociadoRequest $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validated();

        if (array_key_exists('nome', $validated) && ! array_key_exists('nome_completo', $validated)) {
            $validated['nome_completo'] = $validated['nome'];
            unset($validated['nome']);
        }

        if (array_key_exists('cpf', $validated)) {
            $validated['cpf'] = preg_replace('/\D+/', '', (string) $validated['cpf']);
        }

        if (array_key_exists('rg', $validated) && $validated['rg'] !== null) {
            $validated['rg'] = preg_replace('/\D+/', '', (string) $validated['rg']);
        }

        $associado = Associado::create($validated);

        if (! request()->expectsJson()) {
            return to_route('cadastros')->with('success', 'Associado criado com sucesso.');
        }

        return response()->json($associado, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Associado $associado)
    {
        return new AssociadoResource($associado);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssociadoRequest $request, Associado $associado)
    {
        try {
            if ($associado->update($request->validated())) {
                return response()->json($associado);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Associado $associado)
    {
        try {
            if ($associado->delete()) {
                return response()->json($associado);
            }
        } catch (Exception $e) {

            return response()->json($e);
        }
    }

    public function activate(Associado $associado)
    {
        try {
            if ($associado->update(['status' => true])) {
                return response()->json($associado);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function deactivate(Associado $associado)
    {
        try {
            if ($associado->update(['status' => false, 'grupo_id' => null])) {
                return response()->json($associado);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
