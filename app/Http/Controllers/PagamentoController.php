<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePagamentoRequest;
use App\Http\Requests\UpdatePagamentoRequest;
use App\Http\Resources\PagamentoResource;
use App\Models\Pagamento;
use Exception;

class PagamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PagamentoResource::collection(Pagamento::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePagamentoRequest $request)
    {
        try {
            $pagamento = Pagamento::create($request->validated());
            return response()->json(new PagamentoResource($pagamento), 201);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pagamento $pagamento)
    {
        return new PagamentoResource($pagamento);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePagamentoRequest $request, Pagamento $pagamento)
    {
        try {
            if ($pagamento->update($request->validated())) {
                return response()->json(new PagamentoResource($pagamento));
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pagamento $pagamento)
    {
        try {
            $pagamentoCopy = new PagamentoResource($pagamento);
            if ($pagamento->delete()) {
                return response()->json($pagamentoCopy);
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
