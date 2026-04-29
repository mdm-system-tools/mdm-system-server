<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Associado;
use App\Models\Chamada;
use App\Models\Dependente;
use App\Models\Divida;
use App\Models\Endereco;
use App\Models\Grupo;
use App\Models\Pagamento;
use App\Models\Projeto;
use App\Models\Reuniao;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function showAssociado(Associado $associado): Response
    {
        return Inertia::render('detalhes-associado', [
            'associado' => $associado->load(['grupo.projeto', 'dependentes', 'pagamentos.divida']),
        ]);
    }

    public function storeCobranca(Request $request, Associado $associado): RedirectResponse
    {
        $validated = $request->validate([
            'valor' => ['required', 'string'],
            'data_divida' => ['required', 'date'],
        ]);

        $projetoId = $associado->grupo?->projeto_id;

        if ($projetoId === null) {
            return back()->withErrors([
                'cobranca' => 'Associado precisa estar vinculado a um grupo com projeto para gerar cobrança.',
            ]);
        }

        DB::transaction(function () use ($validated, $associado, $projetoId): void {
            $divida = Divida::query()->create([
                'projeto_id' => $projetoId,
                'valor' => (float) str_replace(',', '.', preg_replace('/[^\d,.-]/', '', $validated['valor'])),
                'data_divida' => $validated['data_divida'],
            ]);

            Pagamento::query()->create([
                'associado_id' => $associado->id,
                'divida_id' => $divida->id,
                'status' => 'Pendente',
            ]);
        });

        return back()->with('success', 'Cobrança criada com sucesso.');
    }

    public function showGrupo(Grupo $grupo): Response
    {
        return Inertia::render('detalhes-grupo', [
            'grupo' => $grupo->load(['projeto', 'associados'])->loadCount('associados'),
        ]);
    }

    public function showProjeto(Projeto $projeto): Response
    {
        return Inertia::render('detalhes-projeto', [
            'projeto' => $projeto->load('grupos.associados')->loadCount('grupos'),
        ]);
    }

    public function updateAssociado(Request $request, Associado $associado): RedirectResponse
    {
        $validated = $request->validate([
            'nome_completo' => ['required', 'string', 'max:100'],
            'cpf' => ['required', 'string', 'max:14', 'unique:associados,cpf,'.$associado->id],
            'rg' => ['nullable', 'string', 'max:12', 'unique:associados,rg,'.$associado->id],
            'estado_civil' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:100', 'unique:associados,email,'.$associado->id],
            'telefone' => ['nullable', 'string', 'max:20'],
            'celular' => ['nullable', 'string', 'max:20'],
            'status' => ['nullable', 'boolean'],
        ]);

        $associado->update([
            ...$validated,
            'cpf' => preg_replace('/\D+/', '', $validated['cpf']),
            'rg' => isset($validated['rg']) ? preg_replace('/\D+/', '', $validated['rg']) : null,
        ]);

        return back()->with('success', 'Associado atualizado com sucesso.');
    }

    public function updateGrupo(Request $request, Grupo $grupo): RedirectResponse
    {
        $validated = $request->validate([
            'projeto_id' => ['required', 'exists:projetos,id'],
            'horario' => ['required', 'date_format:H:i'],
        ]);

        $grupo->update($validated);

        return back()->with('success', 'Grupo atualizado com sucesso.');
    }

    public function updateProjeto(Request $request, Projeto $projeto): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:100'],
            'regiao' => ['required', 'string', 'max:10'],
            'valor' => ['required', 'string'],
            'status' => ['nullable', 'boolean'],
        ]);

        $projeto->update([
            'nome' => $validated['nome'],
            'regiao' => $validated['regiao'],
            'valor' => (float) str_replace(',', '.', preg_replace('/[^\d,.-]/', '', $validated['valor'])),
            'status' => $validated['status'] ?? $projeto->status,
        ]);

        return back()->with('success', 'Projeto atualizado com sucesso.');
    }

    public function storeDependente(Request $request, Associado $associado): RedirectResponse
    {
        $validated = $request->validate([
            'nome_completo' => ['required', 'string', 'max:100'],
            'cpf' => ['required', 'string', 'max:14', 'unique:dependentes,cpf'],
            'rg' => ['required', 'string', 'max:14', 'unique:dependentes,rg'],
            'certidao' => ['nullable', 'string', 'max:20'],
        ]);

        Dependente::query()->create([
            'associado_id' => $associado->id,
            'nome_completo' => $validated['nome_completo'],
            'cpf' => preg_replace('/\D+/', '', $validated['cpf']),
            'rg' => preg_replace('/\D+/', '', $validated['rg']),
            'certidao' => $validated['certidao'] ?? null,
        ]);

        return back()->with('success', 'Dependente adicionado com sucesso.');
    }

    public function updateDependente(Request $request, Associado $associado, Dependente $dependente): RedirectResponse
    {
        abort_if($dependente->associado_id !== $associado->id, 404);

        $validated = $request->validate([
            'nome_completo' => ['required', 'string', 'max:100'],
            'cpf' => ['required', 'string', 'max:14', 'unique:dependentes,cpf,'.$dependente->id],
            'rg' => ['required', 'string', 'max:14', 'unique:dependentes,rg,'.$dependente->id],
            'certidao' => ['nullable', 'string', 'max:20'],
        ]);

        $dependente->update([
            'nome_completo' => $validated['nome_completo'],
            'cpf' => preg_replace('/\D+/', '', $validated['cpf']),
            'rg' => preg_replace('/\D+/', '', $validated['rg']),
            'certidao' => $validated['certidao'] ?? null,
        ]);

        return back()->with('success', 'Dependente atualizado com sucesso.');
    }

    public function destroyDependente(Associado $associado, Dependente $dependente): RedirectResponse
    {
        abort_if($dependente->associado_id !== $associado->id, 404);
        $dependente->delete();

        return back()->with('success', 'Dependente removido com sucesso.');
    }

    public function storeAssociado(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'numero_inscricao' => ['required', 'integer', 'unique:associados,numero_inscricao'],
            'nome_completo' => ['required', 'string', 'max:100'],
            'cpf' => ['required', 'string', 'max:14', 'unique:associados,cpf'],
            'rg' => ['nullable', 'string', 'max:12', 'unique:associados,rg'],
            'estado_civil' => ['required', 'string', 'max:20'],
            'data_nascimento' => ['required', 'date', 'before:today'],
            'email' => ['required', 'email', 'max:100', 'unique:associados,email'],
            'celular' => ['required', 'string', 'max:20'],
            'telefone' => ['nullable', 'string', 'max:20'],
            'cep' => ['required', 'string', 'max:9'],
            'logradouro' => ['required', 'string', 'max:150'],
            'numero' => ['required', 'string', 'max:10'],
            'bairro' => ['required', 'string', 'max:100'],
            'cidade' => ['required', 'string', 'max:100'],
            'estado' => ['nullable', 'string', 'max:20'],
        ]);

        DB::transaction(function () use ($validated): void {
            $associado = Associado::query()->create([
                'numero_inscricao' => $validated['numero_inscricao'],
                'nome_completo' => $validated['nome_completo'],
                'cpf' => preg_replace('/\D+/', '', $validated['cpf']),
                'rg' => isset($validated['rg']) ? preg_replace('/\D+/', '', $validated['rg']) : null,
                'estado_civil' => $validated['estado_civil'],
                'data_nascimento' => $validated['data_nascimento'],
                'email' => $validated['email'],
                'celular' => $validated['celular'],
                'telefone' => $validated['telefone'] ?? null,
            ]);

            Endereco::query()->create([
                'associado_id' => $associado->id,
                'cep' => $validated['cep'],
                'logradouro' => $validated['logradouro'],
                'numero' => $validated['numero'],
                'bairro' => $validated['bairro'],
                'cidade' => $validated['cidade'],
                'estado' => $validated['estado'] ?? '',
            ]);
        });

        return to_route('cadastros')->with('success', 'Associado criado com sucesso.');
    }

    public function storeGrupo(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'projeto_id' => ['required', 'exists:projetos,id'],
            'horario' => ['required', 'date_format:H:i'],
        ]);

        Grupo::query()->create($validated);

        return to_route('cadastros')->with('success', 'Grupo criado com sucesso.');
    }

    public function storeProjeto(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'regiao' => ['required', 'string', 'max:100'],
            'valor' => ['required', 'string'],
        ]);

        Projeto::query()->create([
            'nome' => $validated['nome'],
            'regiao' => $validated['regiao'],
            'valor' => (float) str_replace(',', '.', preg_replace('/[^\d,.-]/', '', $validated['valor'])),
        ]);

        return to_route('cadastros')->with('success', 'Projeto criado com sucesso.');
    }

    public function dashboard(): Response
    {
        $currentMonth = now()->startOfMonth();
        $currentMonthEnd = now()->endOfMonth();

        // Contar totais
        $totalProjetos = Projeto::count();
        $totalAssociados = Associado::count();
        $totalConcluidas = Chamada::where('presenca', true)->count();

        // Buscar reuniões do mês atual com seus projetos
        $reunioesMes = Reuniao::query()
            ->whereBetween('data_marcada', [$currentMonth, $currentMonthEnd])
            ->with([
                'projeto:id,nome',
                'projeto.grupos:id,projeto_id,horario',
                'local:id,logradouro,numero,bairro,cidade',
            ])
            ->orderBy('data_marcada')
            ->get();

        // Buscar projetos que têm reuniões no mês
        $projetosComReuniao = Projeto::query()
            ->whereHas('reunioes', function ($query) use ($currentMonth, $currentMonthEnd) {
                $query->whereBetween('data_marcada', [$currentMonth, $currentMonthEnd]);
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
