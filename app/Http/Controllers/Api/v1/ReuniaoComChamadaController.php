<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePresencaRequest;
use App\Http\Resources\ReuniaoComChamadaResource;
use App\Models\Chamada;
use App\Models\GrupoReuniao;
use App\Models\Reuniao;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ReuniaoComChamadaController extends Controller
{
    /**
     * Display a listing of reunioes with chamadas.
     */
    public function index()
    {
        $reunioes = Reuniao::with(['local', 'projeto', 'chamadas.associado'])->get();

        return ReuniaoComChamadaResource::collection($reunioes);
    }

    /**
     * Display the specified reuniao with chamadas.
     */
    public function show(Reuniao $reuniao)
    {
        $reuniao->load(['local', 'projeto', 'chamadas.associado']);

        return new ReuniaoComChamadaResource($reuniao);
    }

    /**
     * Store presenca for a reuniao (concluir chamada).
     */
    public function storePresenca(StorePresencaRequest $request, Reuniao $reuniao)
    {
        try {
            $validated = $request->validated();

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

            $grupoReuniao = GrupoReuniao::where('reuniao_id', $reuniao->id)->first();

            if ($grupoReuniao) {
                $grupoReuniao->update(['concluida' => true]);
            }

            $totalGrupos = $reuniao->grupoReuniaos()->count();
            $gruposConcluidos = $reuniao->grupoReuniaos()->where('concluida', true)->count();

            if ($gruposConcluidos === $totalGrupos && $totalGrupos > 0) {
                $reuniao->update(['concluida' => true]);
            }

            return response()->json(['message' => 'Chamada concluída com sucesso!'], ResponseAlias::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao concluir chamada!', 'error' => $e->getMessage()], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
