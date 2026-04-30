<?php

namespace App\Http\Controllers;

use App\Models\Chamada;
use App\Models\Grupo;
use App\Models\GrupoReuniao;
use App\Models\Local;
use App\Models\Projeto;
use App\Models\Reuniao;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChamadaController extends Controller
{
    public function index(): Response
    {
        $today = now()->format('Y-m-d');
        $reunioes = Reuniao::query()
            ->with([
                'projeto:id,nome',
                'projeto.grupos:id,projeto_id,horario',
                'grupoReuniaos.grupo:id,horario',
                'local:id,logradouro,bairro,cidade',
            ])
            ->where('concluida', false)
            ->whereDate('data_marcada', '>=', $today)
            ->orderBy('data_marcada', 'asc')
            ->get()
            ->map(function ($reuniao) {
                $grupos = $reuniao->projeto->grupos->map(function ($grupo) use ($reuniao) {
                    $grupoReuniao = $reuniao->grupoReuniaos->firstWhere('grupo_id', $grupo->id);

                    return [
                        'id' => $grupo->id,
                        'horario' => $grupo->horario,
                        'concluida' => $grupoReuniao ? (bool) $grupoReuniao->concluida : false,
                    ];
                })->values();

                $dataMarcada = $reuniao->data_marcada;
                if ($dataMarcada && ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataMarcada)) {
                    try {
                        $parsed = Carbon::parse($dataMarcada);
                        if ($parsed) {
                            $dataMarcada = $parsed->format('Y-m-d');
                        }
                    } catch (\Exception $e) {
                        $dataMarcada = null;
                    }
                }

                return [
                    'id' => $reuniao->id,
                    'projeto_id' => $reuniao->projeto_id,
                    'local_id' => $reuniao->local_id,
                    'projeto' => $reuniao->projeto,
                    'local' => $reuniao->local,
                    'grupos' => $grupos,
                    'concluida' => (bool) $reuniao->concluida,
                    'data_marcada' => $dataMarcada,
                ];
            });

        return Inertia::render('chamadas', [
            'reunioes' => $reunioes,
            'projetos' => Projeto::query()
                ->with('grupos:id,projeto_id,horario')
                ->get(['id', 'nome']),
        ]);
    }

    public function indexHistorico(): Response
    {
        $reunioes = Reuniao::query()
            ->with([
                'projeto:id,nome',
                'local:id,logradouro,bairro,cidade',
                'chamadas.associado:id,nome_completo,numero_inscricao',
            ])
            ->where('concluida', true)
            ->orderBy('data_marcada', 'desc')
            ->get()
            ->map(function ($reuniao) {
                $total = $reuniao->chamadas?->count() ?? 0;
                $presentes = $reuniao->chamadas?->where('presenca', true)->count() ?? 0;
                $ausentes = $total - $presentes;
                $taxa = $total > 0 ? round(($presentes / $total) * 100) : 0;

                $dataMarcada = $reuniao->data_marcada;
                if ($dataMarcada && ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataMarcada)) {
                    try {
                        $parsed = Carbon::createFromFormat('d/m/y', $dataMarcada);
                        if ($parsed) {
                            $dataMarcada = $parsed->format('Y-m-d');
                        }
                    } catch (\Exception $e) {
                        $dataMarcada = null;
                    }
                }

                return [
                    'id' => $reuniao->id,
                    'projeto_id' => $reuniao->projeto_id,
                    'local_id' => $reuniao->local_id,
                    'data_marcada' => $dataMarcada,
                    'projeto' => $reuniao->projeto,
                    'local' => $reuniao->local,
                    'total' => $total,
                    'presentes' => $presentes,
                    'ausentes' => $ausentes,
                    'taxa_presenca' => $taxa,
                ];
            });

        return Inertia::render('historico-chamadas', [
            'reunioes' => $reunioes,
        ]);
    }

    public function show(Reuniao $reuniao): Response
    {
        $reuniao->load([
            'projeto:id,nome',
            'local:id,logradouro,bairro,cidade',
            'chamadas.associado:id,nome_completo,numero_inscricao,email,celular',
        ]);

        $total = $reuniao->chamadas?->count() ?? 0;
        $presentes = $reuniao->chamadas?->where('presenca', true)->count() ?? 0;
        $ausentes = $total - $presentes;
        $taxa = $total > 0 ? round(($presentes / $total) * 100) : 0;

        $dataMarcada = $reuniao->data_marcada;
        if ($dataMarcada && ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataMarcada)) {
            try {
                $parsed = Carbon::createFromFormat('d/m/y', $dataMarcada);
                if ($parsed) {
                    $dataMarcada = $parsed->format('Y-m-d');
                }
            } catch (\Exception $e) {
                $dataMarcada = null;
            }
        }

        $chamadas = $reuniao->chamadas?->map(function ($chamada) {
            return [
                'id' => $chamada->id,
                'presenca' => (bool) $chamada->presenca,
                'representante' => (bool) $chamada->representante,
                'justificativa' => $chamada->justificativa,
                'created_at' => $chamada->created_at,
                'associado' => $chamada->associado ? [
                    'id' => $chamada->associado->id,
                    'nome_completo' => $chamada->associado->nome_completo,
                    'numero_inscricao' => $chamada->associado->numero_inscricao,
                    'email' => $chamada->associado->email,
                    'celular' => $chamada->associado->celular,
                ] : null,
            ];
        });

        return Inertia::render('detalhes-chamada', [
            'chamada' => [
                'id' => $reuniao->id,
                'data_marcada' => $dataMarcada,
                'projeto' => $reuniao->projeto,
                'local' => $reuniao->local,
                'chamadas' => $chamadas,
                'total' => $total,
                'presentes' => $presentes,
                'ausentes' => $ausentes,
                'taxa_presenca' => $taxa,
            ],
        ]);
    }

    public function tomar(Reuniao $reuniao, Grupo $grupo): Response
    {
        $grupo->load(['associados:id,nome_completo,numero_inscricao,grupo_id']);

        $chamadas = $reuniao->chamadas()
            ->whereIn('associado_id', $grupo->associados->pluck('id'))
            ->get();

        $ausentes = $chamadas
            ->where('presenca', false)
            ->map(function ($chamada) {
                return [
                    'chamada_id' => $chamada->id,
                    'associado_id' => $chamada->associado_id,
                    'nome' => $chamada->associado?->nome_completo ?? '',
                    'numero_inscricao' => $chamada->associado?->numero_inscricao ?? '',
                ];
            });

        $dataMarcada = $reuniao->data_marcada;
        if ($dataMarcada && ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataMarcada)) {
            try {
                $parsed = Carbon::parse($dataMarcada);
                if ($parsed) {
                    $dataMarcada = $parsed->format('Y-m-d');
                }
            } catch (\Exception $e) {
                $dataMarcada = null;
            }
        }

        return Inertia::render('tomar-chamada', [
            'reuniao' => [
                'id' => $reuniao->id,
                'projeto_nome' => $reuniao->projeto->nome,
                'data_marcada' => $dataMarcada,
            ],
            'grupo' => [
                'id' => $grupo->id,
                'horario' => $grupo->horario,
                'associados' => $grupo->associados->map(function ($associado) {
                    return [
                        'id' => $associado->id,
                        'nome_completo' => $associado->nome_completo,
                        'numero_inscricao' => $associado->numero_inscricao,
                    ];
                })->values(),
            ],
            'ausentes' => $ausentes,
        ]);
    }

    public function concluir(Reuniao $reuniao, Grupo $grupo, Request $request)
    {
        $validated = $request->validate([
            'chamadas' => 'required|array',
            'chamadas.*.associado_id' => 'required|exists:associados,id',
            'chamadas.*.presenca' => 'required|boolean',
            'chamadas.*.representante' => 'nullable|boolean',
            'chamadas.*.representante_de_id' => 'nullable|exists:associados,id',
        ]);

        $expectedAssociadoIds = $grupo->associados->pluck('id')->toArray();
        $submittedIds = array_map(fn ($item) => $item['associado_id'], $validated['chamadas']);

        if (count($submittedIds) !== count($expectedAssociadoIds) || ! empty(array_diff($expectedAssociadoIds, $submittedIds))) {
            return back()->with('error', 'Todas as presenças devem ser marcadas antes de concluir.');
        }

        foreach ($validated['chamadas'] as $item) {
            $chamada = Chamada::where('reuniao_id', $reuniao->id)
                ->where('associado_id', $item['associado_id'])
                ->first();

            if (! $chamada) {
                continue;
            }

            if ($item['presenca']) {
                $chamada->update([
                    'presenca' => true,
                    'representante' => ! empty($item['representante']),
                    'justificativa' => null,
                ]);

                if (! empty($item['representante']) && ! empty($item['representante_de_id'])) {
                    $chamadaRepresentado = Chamada::where('reuniao_id', $reuniao->id)
                        ->where('associado_id', $item['representante_de_id'])
                        ->first();

                    if ($chamadaRepresentado && ! $chamadaRepresentado->presenca) {
                        $chamadaRepresentado->update([
                            'presenca' => true,
                            'representante' => false,
                            'justificativa' => null,
                        ]);
                    }
                }
            } else {
                $chamada->update([
                    'presenca' => false,
                    'representante' => false,
                    'justificativa' => $item['justificativa'] ?? null,
                ]);
            }
        }

        $grupoReuniao = GrupoReuniao::where('reuniao_id', $reuniao->id)
            ->where('grupo_id', $grupo->id)
            ->first();

        if ($grupoReuniao) {
            $grupoReuniao->update(['concluida' => true]);
        }

        $totalGrupos = $reuniao->grupoReuniaos()->count();
        $gruposConcluidos = $reuniao->grupoReuniaos()->where('concluida', true)->count();

        $reuniaoConcluida = false;
        if ($gruposConcluidos === $totalGrupos && $totalGrupos > 0) {
            $reuniao->update(['concluida' => true]);
            $reuniaoConcluida = true;
        }

        if ($reuniaoConcluida) {
            return redirect()->route('historico-chamadas')
                ->with('success', 'Reunião concluída com sucesso! Todos os grupos foram chamados.');
        }

        return redirect()->route('chamadas')
            ->with('success', 'Chamada do grupo '.$grupo->horario.' concluída com sucesso!');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'projeto_id' => 'required|exists:projetos,id',
            'data_marcada' => 'required|date',
            'local' => 'nullable|array',
            'local.nome' => 'nullable|string|max:255',
            'local.logradouro' => 'required_with:local|string|max:255',
            'local.numero' => 'nullable|string|max:20',
            'local.bairro' => 'required_with:local|string|max:100',
            'local.cidade' => 'required_with:local|string|max:100',
            'local.cep' => 'nullable|string|max:20',
            'local.estado' => 'nullable|string|max:100',
            'local.regiao' => 'nullable|string|max:100',
        ]);

        if (isset($validated['local']) && ! isset($validated['local_id'])) {
            $local = Local::create([
                'nome' => $validated['local']['nome'] ?? $validated['local']['logradouro'],
                'logradouro' => $validated['local']['logradouro'],
                'numero' => $validated['local']['numero'] ?? 'S/N',
                'bairro' => $validated['local']['bairro'],
                'cidade' => $validated['local']['cidade'],
                'cep' => $validated['local']['cep'] ?? '00000000',
                'estado' => $validated['local']['estado'] ?? 'Não informado',
                'regiao' => $validated['local']['regiao'] ?? 'Não informado',
                'tipo' => false,
            ]);
            $localId = $local->id;
        } else {
            $localId = $validated['local_id'] ?? null;
        }

        $projeto = Projeto::with(['grupos' => function ($query) {
            $query->orderBy('horario', 'asc');
        }])->findOrFail($validated['projeto_id']);

        $reuniao = Reuniao::create([
            'local_id' => $localId,
            'projeto_id' => $projeto->id,
            'data_marcada' => $validated['data_marcada'],
        ]);

        foreach ($projeto->grupos as $grupo) {
            GrupoReuniao::create([
                'reuniao_id' => $reuniao->id,
                'grupo_id' => $grupo->id,
                'concluida' => false,
            ]);

            $associados = $grupo->associados()->get(['id']);
            foreach ($associados as $associado) {
                Chamada::create([
                    'associado_id' => $associado->id,
                    'reuniao_id' => $reuniao->id,
                    'presenca' => false,
                ]);
            }
        }

        return redirect()->route('chamadas')->with('success', 'Reunião criada com sucesso!');
    }

    public function update(Reuniao $reuniao, Request $request)
    {
        $dataMarcada = $reuniao->data_marcada;
        if ($dataMarcada && ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataMarcada)) {
            try {
                $parsed = Carbon::createFromFormat('d/m/y', $dataMarcada);
                if ($parsed) {
                    $dataMarcada = $parsed->format('Y-m-d');
                }
            } catch (\Exception $e) {
                $dataMarcada = null;
            }
        }

        if ($dataMarcada && $dataMarcada < now()->format('Y-m-d')) {
            return redirect()->route('chamadas')
                ->with('error', 'Não é possível editar reuniões já concluídas.');
        }
        $validated = $request->validate([
            'projeto_id' => 'required|exists:projetos,id',
            'data_marcada' => 'required|date',
            'local' => 'nullable|array',
            'local.logradouro' => 'required_with:local|string|max:255',
            'local.bairro' => 'required_with:local|string|max:100',
            'local.cidade' => 'required_with:local|string|max:100',
        ]);

        if (isset($validated['local'])) {
            if ($reuniao->local) {
                $reuniao->local->update([
                    'logradouro' => $validated['local']['logradouro'],
                    'bairro' => $validated['local']['bairro'],
                    'cidade' => $validated['local']['cidade'],
                ]);
            } else {
                $local = Local::create([
                    'nome' => $validated['local']['logradouro'],
                    'logradouro' => $validated['local']['logradouro'],
                    'bairro' => $validated['local']['bairro'],
                    'cidade' => $validated['local']['cidade'],
                    'cep' => '00000000',
                    'estado' => 'Não informado',
                    'regiao' => 'Não informado',
                    'tipo' => false,
                ]);
                $reuniao->update(['local_id' => $local->id]);
            }
        }

        $reuniao->update([
            'projeto_id' => $validated['projeto_id'],
            'data_marcada' => $validated['data_marcada'],
        ]);

        return redirect()->route('chamadas')->with('success', 'Reunião atualizada com sucesso!');
    }

    public function destroy(Reuniao $reuniao)
    {
        if ($reuniao->concluida) {
            return redirect()->route('chamadas')->with('error', 'Não é possível excluir reuniões já concluídas.');
        }

        $reuniao->chamadas()->delete();
        $reuniao->grupoReuniaos()->delete();
        $local = $reuniao->local;
        $reuniao->delete();

        if ($local && $local->tipo === false) {
            $local->delete();
        }

        return redirect()->route('chamadas')->with('success', 'Reunião excluída com sucesso!');
    }
}
