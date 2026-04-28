<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Chamada;
use Inertia\Inertia;
use Inertia\Response;

class ChamadaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('historico-chamadas', [
            'chamadas' => Chamada::query()
                ->with([
                    'associado:id,nome_completo,numero_inscricao',
                    'reuniao:id,data_marcada,horario_inicio,projeto_id',
                    'reuniao.projeto:id,nome',
                ])
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    public function show(Chamada $chamada): Response
    {
        return Inertia::render('detalhes-chamada', [
            'chamada' => $chamada->load([
                'associado:id,nome_completo,numero_inscricao,email,celular',
                'reuniao:id,data_marcada,horario_inicio,horario_fim,projeto_id',
                'reuniao.projeto:id,nome',
                'reuniao.chamada:id,reuniao_id,presenca,numero_inscricao',
                'reuniao.chamada.associado:id,nome_completo',
            ]),
        ]);
    }
}
