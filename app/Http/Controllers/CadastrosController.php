<?php

namespace App\Http\Controllers;

use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\Projeto;
use App\Models\Reuniao;
use Inertia\Inertia;
use Inertia\Response;

class CadastrosController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('cadastros', [
            'associados' => Associado::query()
                ->orderBy('nome_completo')
                ->get(['id', 'nome_completo', 'numero_inscricao', 'status']),
            'grupos' => Grupo::query()
                ->with(['projeto:id,nome'])
                ->withCount('associados')
                ->orderBy('horario')
                ->get(['id', 'projeto_id', 'horario']),
            'projetos' => Projeto::query()
                ->orderBy('nome')
                ->get(['id', 'nome', 'status']),
        ]);
    }

    public function dashboard(): Response
    {
        $currentMonth = now()->startOfMonth();
        $currentMonthEnd = now()->endOfMonth();
        $today = now()->format('Y-m-d');

        $totalProjetos = Projeto::count();
        $totalAssociados = Associado::count();
        $totalConcluidas = Chamada::where('presenca', true)->count();

        $reunioesMes = Reuniao::query()
            ->whereBetween('data_marcada', [$currentMonth, $currentMonthEnd])
            ->whereDate('data_marcada', '>=', $today)
            ->with([
                'projeto:id,nome',
                'projeto.grupos:id,projeto_id,horario',
                'local:id,logradouro,numero,bairro,cidade',
            ])
            ->orderBy('data_marcada')
            ->get();

        $projetosComReuniao = Projeto::query()
            ->whereHas('reunioes', function ($query) use ($currentMonth, $currentMonthEnd, $today) {
                $query->whereBetween('data_marcada', [$currentMonth, $currentMonthEnd])
                    ->whereDate('data_marcada', '>=', $today);
            })
            ->get(['id', 'nome']);

        return Inertia::render('dashboard', [
            'totalProjetos' => $totalProjetos,
            'totalAssociados' => $totalAssociados,
            'totalConcluidas' => $totalConcluidas,
            'reunioesMes' => $reunioesMes,
            'projetosComReuniao' => $projetosComReuniao,
        ]);
    }
}
