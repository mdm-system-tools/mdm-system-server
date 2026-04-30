<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssociadoResource;
use App\Models\Associado;
use App\Models\Dependente;
use App\Models\Divida;
use App\Models\Endereco;
use App\Models\Grupo;
use App\Models\Pagamento;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AssociadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AssociadoResource::collection(Associado::with(['dependentes', 'grupo', 'endereco'])->get());
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

    public function dividas(Associado $associado)
    {
        $projeto = $associado->pagamentos;

        return response()->json($projeto);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
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

    /**
     * Display the specified resource.
     */
    public function show(Associado $associado): Response
    {
        return Inertia::render('detalhes-associado', [
            'associado' => $associado->load(['grupo.projeto', 'dependentes', 'pagamentos.divida']),
            'grupos' => Grupo::with('projeto')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Associado $associado)
    {
        $validated = $request->validate([
            'nome_completo' => 'sometimes|string|max:255',
            'grupo_id' => 'nullable|exists:grupos,id',
            'email' => 'sometimes|email',
        ]);

        $associado->update($validated);

        return back()->with('success', 'Associado atualizado com sucesso!');
    }

    public function setGrupo(Request $request, Associado $associado)
    {
        $validated = $request->validate([
            'grupo_id' => 'nullable|exists:grupos,id',
        ]);

        // Em vez de usar update($validated), tente atribuir diretamente:
        $associado->grupo_id = $validated['grupo_id'];

        // O save() força a gravação no banco e ignora o $fillable (útil para teste)
        $associado->save();

        return back()->with('success', 'Grupo atualizado!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Associado $associado)
    {
        try {
            if ($associado->delete()) {
                return response()->json($associado);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function activate(Associado $associado)
    {
        try {
            $associado->update(['status' => true]);

            if (! request()->expectsJson()) {
                return back()->with('success', 'Associado ativado com sucesso.');
            }

            return response()->json($associado);
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Falha ao ativar associado.']);
        }
    }

    public function deactivate(Associado $associado)
    {
        try {
            $associado->update([
                'status' => false,
                'grupo_id' => null,
            ]);

            if (! request()->expectsJson()) {
                return back()->with('success', 'Associado desativado com sucesso.');
            }

            return response()->json($associado);
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Falha ao desativar associado.']);
        }
    }
}
