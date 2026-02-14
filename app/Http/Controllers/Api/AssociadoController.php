<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssociadoRequest;
use App\Http\Requests\UpdateAssociadoRequest;
use App\Models\Associado;
use Exception;

class AssociadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Associado::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssociadoRequest $request)
    {
        $associado = Associado::create($request->validated());

        return response()->json($associado, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Associado $associado)
    {
        return response()->json($associado);
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
}
