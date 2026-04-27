<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Associado;
use App\Models\Grupo;
use App\Models\Projeto;
use Inertia\Inertia;

class CadastrosController extends Controller
{
    public function index()
    {
        return Inertia::render('cadastros', [
            'associados' => Associado::all(['id', 'nome_completo', 'numero_inscricao']),
            'grupos' => Grupo::with('projeto')->get(['id', 'projeto_id', 'horario']),
            'projetos' => Projeto::all(['id', 'nome', 'status']),
        ]);
    }

    public function showAssociado(Associado $associado)
    {
        return Inertia::render('detalhes-associado', [
            'associado' => $associado->load(['grupo', 'dependentes', 'pagamentos']),
        ]);
    }

    public function showGrupo(Grupo $grupo)
    {
        return Inertia::render('detalhes-grupo', [
            'grupo' => $grupo->load(['projeto', 'associados']),
        ]);
    }

    public function showProjeto(Projeto $projeto)
    {
        return Inertia::render('detalhes-projeto', [
            'projeto' => $projeto->load('grupos'),
        ]);
    }

    public function storeAssociado()
    {
        // TODO: implementar
    }

    public function storeGrupo()
    {
        // TODO: implementar
    }

    public function storeProjeto()
    {
        // TODO: implementar
    }
}

