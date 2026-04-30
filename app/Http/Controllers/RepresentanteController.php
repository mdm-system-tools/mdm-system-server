<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRepresentanteRequest;
use App\Http\Requests\UpdateRepresentanteRequest;
use App\Http\Resources\RepresentanteResource;
use App\Models\Representante;
use Exception;

class RepresentanteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RepresentanteResource::collection(Representante::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRepresentanteRequest $request)
    {
        try {
            $representante = Representante::create($request->validated());

            return response()->json(new RepresentanteResource($representante), 201);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Representante $representante): RepresentanteResource
    {
        return new RepresentanteResource($representante);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRepresentanteRequest $request, Representante $representante)
    {
        try {
            if ($representante->update($request->validated())) {
                return response()->json(new RepresentanteResource($representante));
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Representante $representante)
    {
        try {
            $representanteCopy = new RepresentanteResource($representante);
            if ($representante->delete()) {
                return response()->json($representanteCopy);
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
