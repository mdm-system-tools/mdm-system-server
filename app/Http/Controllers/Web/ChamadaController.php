<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Chamada;
use App\Models\Local;
use App\Models\Projeto;
use App\Models\Reuniao;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChamadaController extends Controller
{
    public function chamadas(): Response
    {
        return Inertia::render('chamadas', [
            'reunioes' => Reuniao::query()
                ->with([
                    'projeto:id,nome',
                    'projeto.grupos:id,projeto_id,horario',
                    'local:id,logradouro,numero,bairro,cidade',
                ])
                ->get(),
            'projetos' => Projeto::query()
                ->with('grupos:id,projeto_id,horario')
                ->get(['id', 'nome']),
        ]);
    }

    public function storeChamada(Request $request)
    {
        $validated = $request->validate([
            'projeto_id' => 'required|exists:projetos,id',
            'data_marcada' => 'required|date',
            'horario_inicio' => 'required|date_format:H:i',
            'local' => 'nullable|array',
            'local.nome' => 'nullable|string|max:255',
            'local.logradouro' => 'required_with:local|string|max:255',
            'local.numero' => 'required_with:local|string|max:20',
            'local.bairro' => 'required_with:local|string|max:100',
            'local.cidade' => 'required_with:local|string|max:100',
            'local.cep' => 'nullable|string|max:20',
            'local.estado' => 'nullable|string|max:100',
            'local.regiao' => 'nullable|string|max:100',
        ]);

        // Criar ou usar Local existente
        if (isset($validated['local']) && ! isset($validated['local_id'])) {
            $local = Local::create([
                'nome' => $validated['local']['nome'] ?? $validated['local']['logradouro'],
                'logradouro' => $validated['local']['logradouro'],
                'numero' => $validated['local']['numero'],
                'bairro' => $validated['local']['bairro'],
                'cidade' => $validated['local']['cidade'],
                'cep' => $validated['local']['cep'] ?? '00000000',
                'estado' => $validated['local']['estado'] ?? 'Não informado',
                'regiao' => $validated['local']['regiao'] ?? 'Não informado',
                'tipo' => false, // false = interno
            ]);
            $localId = $local->id;
        } else {
            $localId = $validated['local_id'] ?? null;
        }

        // Pegar projeto com grupos
        $projeto = Projeto::with(['grupos' => function ($query) {
            $query->orderBy('horario', 'asc');
        }])->findOrFail($validated['projeto_id']);

        // Criar Reunião
        $reuniao = Reuniao::create([
            'local_id' => $localId,
            'projeto_id' => $projeto->id,
            'data_marcada' => $validated['data_marcada'],
            'horario_inicio' => $validated['data_marcada'].' '.$validated['horario_inicio'],
            'horario_fim' => $validated['data_marcada'].' '.$validated['horario_inicio'],
        ]);

        // Criar chamadas para cada associado de cada grupo
        foreach ($projeto->grupos as $grupo) {
            $associados = $grupo->associados()->get(['numero_inscricao']);
            foreach ($associados as $associado) {
                Chamada::create([
                    'numero_inscricao' => $associado->numero_inscricao,
                    'reuniao_id' => $reuniao->id,
                    'presenca' => false,
                ]);
            }
        }

        return redirect()->route('chamadas')->with('success', 'Reunião criada com sucesso!');
    }

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
