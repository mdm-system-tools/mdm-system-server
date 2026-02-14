<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Projeto;
use Illuminate\Http\Request;

class ProjetoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Projeto::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Projeto $projeto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Projeto $projeto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Projeto $projeto)
    {
        //
    }
}
