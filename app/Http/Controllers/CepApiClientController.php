<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class CepApiClientController extends Controller
{
    /**
     * @throws ConnectionException
     */
    public function searchCep(Request $request)
    {
        $response = Http::timeout(5)
            ->retry(3, 100)
            ->get("https://viacep.com.br/ws/{$request->cep}/json/");

        if ($response->failed()) {
            return response()->json(['message' => 'Cep não encontrado'], ResponseAlias::HTTP_BAD_REQUEST);
        }

        $data = $response->json();

        return response()->json([
            'cep' => $data['cep'] ?? null,
            'logradouro' => $data['logradouro'] ?? null,
            'bairro' => $data['bairro'] ?? null,
            'cidade' => $data['localidade'] ?? null,
            'estado' => $data['uf'] ?? null,
            'regiao' => $data['regiao'] ?? null,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
