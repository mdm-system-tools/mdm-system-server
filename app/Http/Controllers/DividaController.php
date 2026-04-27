<?php

namespace App\Http\Controllers;

use App\Models\Divida;
use Illuminate\Http\Request;

class DividaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Divida::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Divida::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Divida $divida)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Divida $divida)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Divida $divida)
    {
        //
    }
}
