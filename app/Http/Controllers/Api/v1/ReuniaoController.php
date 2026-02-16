<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReuniaoRequest;
use App\Http\Requests\UpdateReuniaoRequest;
use App\Http\Resources\ReuniaoResource;
use App\Models\Reuniao;
use Exception;

class ReuniaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ReuniaoResource::collection(Reuniao::with(['local', 'projeto'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReuniaoRequest $request)
    {
        try {
            $reuniao = Reuniao::create($request->validated());
            return response()->json(new ReuniaoResource($reuniao), 201);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reuniao $reuniao): ReuniaoResource
    {
        return new ReuniaoResource($reuniao->load(['local', 'projeto']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReuniaoRequest $request, Reuniao $reuniao)
    {
        try {
            if ($reuniao->update($request->validated())) {
                return response()->json(new ReuniaoResource($reuniao));
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reuniao $reuniao)
    {
        try {
            $reuniaoCopy = new ReuniaoResource($reuniao);
            if ($reuniao->delete()) {
                return response()->json($reuniaoCopy);
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
