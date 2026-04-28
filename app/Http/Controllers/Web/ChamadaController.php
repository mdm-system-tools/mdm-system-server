<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Chamada;
use App\Models\Grupo;
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
        return Inertia::render('chamadas');
    }

    public function storeChamada(Request $request)
    {
        $validated = $request->validate([
            'projeto_id' => 'required|exists:projetos,id',
            'data_marcada' => 'required|date|after:today',
            'horario_inicio' => 'required|date_format:H:i',
            'nome' => 'required|string|max:100',
            'cep' => 'required|string|size:8',
            'logradouro' => 'required|string|max:100',
            'numero' => 'required|string',
            'bairro' => 'required|string|max:100',
            'cidade' => 'required|string|max:100',
            'estado' => 'required|string|max:100',
            'regiao' => 'required|string|max:100',
        ]);

        // Criar Local
        $local = Local::create([
            'nome' => $validated['nome'],
            'cep' => $validated['cep'],
            'logradouro' => $validated['logradouro'],
            'bairro' => $validated['bairro'],
            'cidade' => $validated['cidade'],
            'estado' => $validated['estado'],
            'regiao' => $validated['regiao'],
            'tipo' => true, // true = externo
        ]);

        // Criar Reunião
        $reuniao = Reuniao::create([
            'local_id' => $local->id,
            'projeto_id' => $validated['projeto_id'],
            'data_marcada' => $validated['data_marcada'],
            'horario_inicio' => $validated['horario_inicio'],
            'horario_fim' => $validated['horario_inicio'],
        ]);

        // Pegar todos os grupos do projeto
        $grupos = Grupo::where('projeto_id', $validated['projeto_id'])->get();

        // Criar chamadas para cada associado de cada grupo
        foreach ($grupos as $grupo) {
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
