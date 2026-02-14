<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGrupoRequest;
use App\Models\Grupo;
use Illuminate\Http\Request;

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Grupo::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGrupoRequest $request)
    {
        return response()->json($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Grupo $grupo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grupo $grupo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grupo $grupo)
    {
        //
    }
}
