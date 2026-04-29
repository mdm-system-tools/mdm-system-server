import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    ChevronLeft,
    FileUp,
    Power,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import AdicionarPagamentoModal from '@/components/adicionar-pagamento-modal';
import ComprovanteModal from '@/components/comprovante-modal';
import { Button } from '@/components/ui/button';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cadastros } from '@/routes';
import type { DetalhesAssociadoProps, Pagamento, Tab } from '@/types/detalhes';

export default function DetalhesAssociado({
    associado,
    grupos,
}: DetalhesAssociadoProps) {
    // Estados de Controle de UI
    const [activeTab, setActiveTab] = useState<Tab>('informacoes');
    const [editingDependenteId, setEditingDependenteId] = useState<
        number | null
    >(null);
    const [selectedPagamento, setSelectedPagamento] =
        useState<Pagamento | null>(null);

    // Estados dos Modais
    const [isEditAssociadoModalOpen, setIsEditAssociadoModalOpen] =
        useState(false);
    const [isAddDependenteModalOpen, setIsAddDependenteModalOpen] =
        useState(false);
    const [isAssignGroupModalOpen, setIsAssignGroupModalOpen] = useState(false);
    const [isCobrancaModalOpen, setIsCobrancaModalOpen] = useState(false);
    const [isComprovanteModalOpen, setIsComprovanteModalOpen] = useState(false);
    const [isAdicionarPagamentoModalOpen, setIsAdicionarPagamentoModalOpen] =
        useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);

    // Formulários
    const groupForm = useForm({
        grupo_id: associado.grupo?.id?.toString() || '',
    });

    const associadoForm = useForm({
        nome_completo: associado.nome_completo,
        cpf: associado.cpf,
        rg: associado.rg ?? '',
        estado_civil: associado.estado_civil,
        email: associado.email ?? '',
        status: associado.status ? 1 : 0,
    });

    const createDependenteForm = useForm({
        nome_completo: '',
        cpf: '',
        rg: '',
        certidao: '',
    });

    const editDependenteForm = useForm({
        nome_completo: '',
        cpf: '',
        rg: '',
        certidao: '',
    });

    const cobrancaForm = useForm({
        valor: '',
        data_divida: '',
    });

    // Sincroniza o formulário de grupo quando o associado mudar
    useEffect(() => {
        groupForm.setData('grupo_id', associado.grupo?.id?.toString() || '');
    }, [associado.grupo]);

    return (
        <>
            <Head title="Detalhes do Associado" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Cabeçalho */}
                <div className="flex items-center gap-3">
                    <Link
                        href={cadastros()}
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detalhes do Associado
                    </h1>
                </div>

                {/* Resumo do Associado e Alerta de Grupo */}
                <div
                    className={`rounded-lg border p-4 dark:border-gray-700 dark:bg-gray-900 ${
                        associado.status
                            ? 'border-gray-200 bg-white'
                            : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30'
                    }`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p
                                className={`font-semibold ${associado.status ? 'text-gray-900 dark:text-white' : 'text-red-700 line-through dark:text-red-400'}`}
                            >
                                {associado.nome_completo}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Nº Carteirinha - {associado.numero_inscricao}
                            </p>
                        </div>
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                associado.status
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}
                        >
                            {associado.status ? 'Ativo' : 'Desativado'}
                        </span>
                    </div>

                    {associado.grupo ? (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Grupo: {associado.grupo?.id ?? '-'} | Horário:{' '}
                            {associado.grupo?.horario ?? '-'} | Projeto:{' '}
                            {associado.grupo?.projeto?.nome ?? '-'}
                        </p>
                    ) : (
                        <div className="mt-3 flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-900/50 dark:bg-amber-950/30">
                            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
                                <AlertTriangle className="size-4" />
                                <span className="text-xs font-semibold">
                                    Associado sem grupo atribuído
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 border-amber-300 bg-white px-3 text-xs text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-gray-900 dark:text-amber-400"
                                onClick={() => setIsAssignGroupModalOpen(true)}
                            >
                                Atribuir Grupo
                            </Button>
                        </div>
                    )}

                    {!associado.status && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                            Este associado está desativado e removido do grupo.
                        </p>
                    )}
                </div>

                {/* Navegação por Abas */}
                <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700">
                    {(
                        ['informacoes', 'dependentes', 'pagamentos'] as const
                    ).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                                activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-600'
                            }`}
                        >
                            {tab === 'informacoes'
                                ? 'Informações'
                                : tab === 'dependentes'
                                  ? 'Dependentes'
                                  : 'Pagamentos'}
                        </button>
                    ))}
                </div>

                {/* Aba: Informações */}
                {activeTab === 'informacoes' && (
                    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <div className="space-y-1">
                            <p>
                                <span className="font-semibold">CPF:</span>{' '}
                                {associado.cpf}
                            </p>
                            <p>
                                <span className="font-semibold">RG:</span>{' '}
                                {associado.rg ?? '-'}
                            </p>
                            <p>
                                <span className="font-semibold">E-mail:</span>{' '}
                                {associado.email ?? '-'}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Estado civil:
                                </span>{' '}
                                {associado.estado_civil}
                            </p>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setIsEditAssociadoModalOpen(true)
                                }
                            >
                                Editar Dados
                            </Button>

                            {associado.status ? (
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        setIsDeactivateModalOpen(true)
                                    }
                                    className="gap-2"
                                >
                                    <Power className="size-4" /> Desativar
                                </Button>
                            ) : (
                                <Button
                                    variant="default"
                                    onClick={() =>
                                        setIsReactivateModalOpen(true)
                                    }
                                    className="gap-2 bg-green-600 hover:bg-green-700"
                                >
                                    <Power className="size-4" /> Ativar
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Aba: Dependentes */}
                {activeTab === 'dependentes' && (
                    <div className="space-y-3">
                        <div className="flex justify-end">
                            <Button
                                onClick={() =>
                                    setIsAddDependenteModalOpen(true)
                                }
                            >
                                Adicionar Dependente
                            </Button>
                        </div>

                        {associado.dependentes.length === 0 && (
                            <p className="text-sm text-gray-500">
                                Nenhum dependente cadastrado.
                            </p>
                        )}

                        {associado.dependentes.map((dependente) => (
                            <div
                                key={dependente.id}
                                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                {editingDependenteId === dependente.id ? (
                                    <form
                                        className="space-y-2"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            editDependenteForm.patch(
                                                `/associados/${associado.id}/dependentes/${dependente.id}`,
                                                {
                                                    onSuccess: () =>
                                                        setEditingDependenteId(
                                                            null,
                                                        ),
                                                },
                                            );
                                        }}
                                    >
                                        <input
                                            className="w-full rounded border px-3 py-2 text-sm"
                                            value={
                                                editDependenteForm.data
                                                    .nome_completo
                                            }
                                            onChange={(e) =>
                                                editDependenteForm.setData(
                                                    'nome_completo',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                className="rounded border px-3 py-2 text-sm"
                                                value={
                                                    editDependenteForm.data.cpf
                                                }
                                                onChange={(e) =>
                                                    editDependenteForm.setData(
                                                        'cpf',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="CPF"
                                            />
                                            <input
                                                className="rounded border px-3 py-2 text-sm"
                                                value={
                                                    editDependenteForm.data.rg
                                                }
                                                onChange={(e) =>
                                                    editDependenteForm.setData(
                                                        'rg',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="RG"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="px-6"
                                                onClick={() =>
                                                    setEditingDependenteId(null)
                                                }
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="px-6"
                                                disabled={
                                                    editDependenteForm.processing
                                                }
                                            >
                                                Salvar
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <p className="font-medium">
                                            {dependente.nome_completo}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            CPF: {dependente.cpf} | RG:{' '}
                                            {dependente.rg}
                                        </p>
                                        <div className="mt-3 flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setEditingDependenteId(
                                                        dependente.id,
                                                    );
                                                    editDependenteForm.setData({
                                                        nome_completo:
                                                            dependente.nome_completo,
                                                        cpf: dependente.cpf,
                                                        rg: dependente.rg,
                                                        certidao:
                                                            dependente.certidao ??
                                                            '',
                                                    });
                                                }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    confirm(
                                                        'Remover dependente?',
                                                    ) &&
                                                    router.delete(
                                                        `/associados/${associado.id}/dependentes/${dependente.id}`,
                                                    )
                                                }
                                            >
                                                Remover
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Aba: Pagamentos */}
                {activeTab === 'pagamentos' && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                            <p className="font-medium text-gray-900 dark:text-white">
                                Histórico de Pagamento
                            </p>
                            <Button
                                onClick={() => setIsCobrancaModalOpen(true)}
                            >
                                Criar cobrança
                            </Button>
                        </div>

                        {associado.pagamentos.map((pagamento) => (
                            <div
                                key={pagamento.id}
                                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        {pagamento.status === 'Pago' ? (
                                            <CheckCircle2 className="mt-1 size-5 text-green-600" />
                                        ) : (
                                            <AlertCircle className="mt-1 size-5 text-red-600" />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {pagamento.divida
                                                    ?.data_divida ?? 'Cobrança'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Data:{' '}
                                                {pagamento.data_pagamento ??
                                                    'Não informada'}
                                            </p>
                                            <p className="text-sm font-semibold">
                                                Valor: R${' '}
                                                {pagamento.divida?.valor ?? '-'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => {
                                            setSelectedPagamento(pagamento);
                                            pagamento.status === 'Pago'
                                                ? setIsComprovanteModalOpen(
                                                      true,
                                                  )
                                                : setIsAdicionarPagamentoModalOpen(
                                                      true,
                                                  );
                                        }}
                                    >
                                        <FileUp className="size-4" />
                                        {pagamento.status === 'Pago'
                                            ? 'Comprovante'
                                            : 'Adicionar Pagamento'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Atribuir Grupo */}
                <Dialog
                    open={isAssignGroupModalOpen}
                    onOpenChange={setIsAssignGroupModalOpen}
                >
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Atribuir Grupo</DialogTitle>
                            {/* Adicione isso para remover o erro do console */}
                            <DialogDescription>
                                Selecione o grupo que deseja vincular a este
                                associado.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            className="space-y-4 pt-4"
                            onSubmit={(e) => {
                                e.preventDefault();

                                // Use groupForm.patch se a rota for PATCH ou groupForm.post se a rota for POST
                                groupForm.patch(
                                    `/associados/${associado.id}/setgrupo`,
                                    {
                                        preserveScroll: true,
                                        forceFormData: false, // Importante para garantir que envie como JSON e não como formulário de arquivo
                                        onSuccess: () => {
                                            setIsAssignGroupModalOpen(false);
                                        },
                                        onError: (errors) => {
                                            // Se der erro aqui, agora veremos apenas erros relacionados ao grupo_id
                                            console.error(
                                                'Erro ao atribuir grupo:',
                                                errors,
                                            );
                                        },
                                    },
                                );
                            }}
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Grupos Disponíveis
                                </label>
                                <select
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
                                    value={groupForm.data.grupo_id}
                                    onChange={(e) =>
                                        groupForm.setData(
                                            'grupo_id',
                                            e.target.value,
                                        )
                                    }
                                    required
                                >
                                    <option value="">
                                        Selecione um grupo...
                                    </option>
                                    {grupos?.map((g) => (
                                        <option key={g.id} value={g.id}>
                                            Grupo {g.id} - {g.projeto?.nome} (
                                            {g.horario})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6"
                                    onClick={() =>
                                        setIsAssignGroupModalOpen(false)
                                    }
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-6"
                                    disabled={groupForm.processing}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Editar Dados do Associado */}
                <Dialog
                    open={isEditAssociadoModalOpen}
                    onOpenChange={setIsEditAssociadoModalOpen}
                >
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                Editar Informações do Associado
                            </DialogTitle>
                        </DialogHeader>
                        <form
                            className="space-y-4 pt-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                associadoForm.patch(
                                    `/associados/${associado.id}`,
                                    {
                                        onSuccess: () =>
                                            setIsEditAssociadoModalOpen(false),
                                    },
                                );
                            }}
                        >
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500">
                                        Nome Completo
                                    </label>
                                    <input
                                        className="w-full rounded border px-3 py-2 text-sm"
                                        value={associadoForm.data.nome_completo}
                                        onChange={(e) =>
                                            associadoForm.setData(
                                                'nome_completo',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">
                                            CPF
                                        </label>
                                        <input
                                            className="w-full rounded border px-3 py-2 text-sm"
                                            value={associadoForm.data.cpf}
                                            onChange={(e) =>
                                                associadoForm.setData(
                                                    'cpf',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">
                                            RG
                                        </label>
                                        <input
                                            className="w-full rounded border px-3 py-2 text-sm"
                                            value={associadoForm.data.rg}
                                            onChange={(e) =>
                                                associadoForm.setData(
                                                    'rg',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500">
                                        E-mail
                                    </label>
                                    <input
                                        className="w-full rounded border px-3 py-2 text-sm"
                                        type="email"
                                        value={associadoForm.data.email}
                                        onChange={(e) =>
                                            associadoForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6"
                                    onClick={() =>
                                        setIsEditAssociadoModalOpen(false)
                                    }
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-6"
                                    disabled={associadoForm.processing}
                                >
                                    Salvar Alterações
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Novo Dependente */}
                <Dialog
                    open={isAddDependenteModalOpen}
                    onOpenChange={setIsAddDependenteModalOpen}
                >
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Novo Dependente</DialogTitle>
                        </DialogHeader>
                        <form
                            className="space-y-4 pt-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                createDependenteForm.post(
                                    `/associados/${associado.id}/dependentes`,
                                    {
                                        onSuccess: () => {
                                            createDependenteForm.reset();
                                            setIsAddDependenteModalOpen(false);
                                        },
                                    },
                                );
                            }}
                        >
                            <div className="space-y-2">
                                <input
                                    className="w-full rounded border px-3 py-2 text-sm"
                                    placeholder="Nome completo"
                                    value={
                                        createDependenteForm.data.nome_completo
                                    }
                                    onChange={(e) =>
                                        createDependenteForm.setData(
                                            'nome_completo',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        className="rounded border px-3 py-2 text-sm"
                                        placeholder="CPF"
                                        value={createDependenteForm.data.cpf}
                                        onChange={(e) =>
                                            createDependenteForm.setData(
                                                'cpf',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <input
                                        className="rounded border px-3 py-2 text-sm"
                                        placeholder="RG"
                                        value={createDependenteForm.data.rg}
                                        onChange={(e) =>
                                            createDependenteForm.setData(
                                                'rg',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <input
                                    className="w-full rounded border px-3 py-2 text-sm"
                                    placeholder="Certidão (opcional)"
                                    value={createDependenteForm.data.certidao}
                                    onChange={(e) =>
                                        createDependenteForm.setData(
                                            'certidao',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6"
                                    onClick={() =>
                                        setIsAddDependenteModalOpen(false)
                                    }
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-6"
                                    disabled={createDependenteForm.processing}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Modal: Criar Cobrança */}
                <Dialog
                    open={isCobrancaModalOpen}
                    onOpenChange={setIsCobrancaModalOpen}
                >
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Criar nova cobrança</DialogTitle>
                        </DialogHeader>
                        <form
                            className="space-y-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                cobrancaForm.post(
                                    `/associados/${associado.id}/cobrancas`,
                                    {
                                        onSuccess: () => {
                                            cobrancaForm.reset();
                                            setIsCobrancaModalOpen(false);
                                        },
                                    },
                                );
                            }}
                        >
                            <input
                                className="w-full rounded border px-3 py-2 text-sm"
                                placeholder="Valor (ex: 150,00)"
                                value={cobrancaForm.data.valor}
                                onChange={(e) =>
                                    cobrancaForm.setData(
                                        'valor',
                                        e.target.value,
                                    )
                                }
                            />
                            <input
                                className="w-full rounded border px-3 py-2 text-sm"
                                type="date"
                                value={cobrancaForm.data.data_divida}
                                onChange={(e) =>
                                    cobrancaForm.setData(
                                        'data_divida',
                                        e.target.value,
                                    )
                                }
                            />
                            <div className="flex justify-end gap-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6"
                                    onClick={() =>
                                        setIsCobrancaModalOpen(false)
                                    }
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-6"
                                    disabled={cobrancaForm.processing}
                                >
                                    Criar
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Modais Externos */}
                <ComprovanteModal
                    isOpen={isComprovanteModalOpen}
                    onClose={() => setIsComprovanteModalOpen(false)}
                    comprovante={
                        selectedPagamento
                            ? {
                                  mes:
                                      selectedPagamento.divida?.data_divida ??
                                      '',
                                  data: selectedPagamento.data_pagamento ?? '',
                                  valor: `R$ ${selectedPagamento.divida?.valor ?? '-'}`,
                                  arquivo: `comprovante-${selectedPagamento.id}.png`,
                              }
                            : undefined
                    }
                />

                <AdicionarPagamentoModal
                    isOpen={isAdicionarPagamentoModalOpen}
                    onClose={() => setIsAdicionarPagamentoModalOpen(false)}
                    mesAberto={selectedPagamento?.divida?.data_divida}
                />

                {/* Modais de Status (Ativar/Desativar) */}
                <Dialog
                    open={isDeactivateModalOpen}
                    onOpenChange={setIsDeactivateModalOpen}
                >
                    <DialogContent className="max-w-md p-6">
                        <DialogHeader>
                            <DialogTitle>Confirmar Desativação</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                            <p className="text-sm text-gray-600">
                                Tem certeza que deseja desativar{' '}
                                <strong>{associado.nome_completo}</strong>?
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() =>
                                        setIsDeactivateModalOpen(false)
                                    }
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() =>
                                        router.patch(
                                            `/associados/${associado.id}/deactivate`,
                                            {},
                                            {
                                                onSuccess: () =>
                                                    setIsDeactivateModalOpen(
                                                        false,
                                                    ),
                                            },
                                        )
                                    }
                                >
                                    Confirmar
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={isReactivateModalOpen}
                    onOpenChange={setIsReactivateModalOpen}
                >
                    <DialogContent className="max-w-md p-6">
                        <DialogHeader>
                            <DialogTitle>Confirmar Ativação</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                            <p className="text-sm text-gray-600">
                                Deseja ativar{' '}
                                <strong>{associado.nome_completo}</strong>?
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() =>
                                        setIsReactivateModalOpen(false)
                                    }
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    className="flex-1 bg-green-600 text-white"
                                    onClick={() =>
                                        router.patch(
                                            `/associados/${associado.id}/activate`,
                                            {},
                                            {
                                                onSuccess: () =>
                                                    setIsReactivateModalOpen(
                                                        false,
                                                    ),
                                            },
                                        )
                                    }
                                >
                                    Ativar
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

DetalhesAssociado.layout = {
    breadcrumbs: [
        { title: 'Cadastros', href: cadastros() },
        { title: 'Detalhes do Associado', href: '' },
    ],
};
