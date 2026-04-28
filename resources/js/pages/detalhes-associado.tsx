import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft, CheckCircle2, AlertCircle, FileUp } from 'lucide-react';
import { useState } from 'react';

import AdicionarPagamentoModal from '@/components/adicionar-pagamento-modal';
import ComprovanteModal from '@/components/comprovante-modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cadastros } from '@/routes';

type Tab = 'informacoes' | 'dependentes' | 'pagamentos';

interface Dependente {
    id: number;
    nome_completo: string;
    cpf: string;
    rg: string;
    certidao: string | null;
}

interface Pagamento {
    id: number;
    data_pagamento: string | null;
    status: string;
    divida?: {
        id: number;
        valor: string | number;
        data_divida: string;
    } | null;
}

interface DetalhesAssociadoProps {
    associado: {
        id: number;
        nome_completo: string;
        numero_inscricao: string;
        cpf: string;
        rg: string | null;
        estado_civil: string;
        email: string | null;
        status: boolean;
        grupo: {
            id: number;
            horario: string;
            projeto: { nome: string } | null;
        } | null;
        dependentes: Dependente[];
        pagamentos: Pagamento[];
    };
}

export default function DetalhesAssociado({ associado }: DetalhesAssociadoProps) {
    const [activeTab, setActiveTab] = useState<Tab>('informacoes');
    const [editingInfo, setEditingInfo] = useState(false);
    const [showNewDependenteForm, setShowNewDependenteForm] = useState(false);
    const [editingDependenteId, setEditingDependenteId] = useState<number | null>(null);
    const [isCobrancaModalOpen, setIsCobrancaModalOpen] = useState(false);
    const [isComprovanteModalOpen, setIsComprovanteModalOpen] = useState(false);
    const [isAdicionarPagamentoModalOpen, setIsAdicionarPagamentoModalOpen] = useState(false);
    const [selectedPagamento, setSelectedPagamento] = useState<Pagamento | null>(null);

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

    return (
        <>
            <Head title="Detalhes do Associado" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center gap-3">
                    <Link href={cadastros()} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detalhes do Associado</h1>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                    <p className="font-semibold text-gray-900 dark:text-white">{associado.nome_completo}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nº Carteirinha - {associado.numero_inscricao}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Grupo: {associado.grupo?.id ?? '-'} | Horário: {associado.grupo?.horario ?? '-'} | Projeto: {associado.grupo?.projeto?.nome ?? '-'}
                    </p>
                </div>

                <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700">
                    {(['informacoes', 'dependentes', 'pagamentos'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${
                                activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'
                            }`}
                        >
                            {tab === 'informacoes' ? 'Informações' : tab === 'dependentes' ? 'Dependentes' : 'Pagamentos'}
                        </button>
                    ))}
                </div>

                {activeTab === 'informacoes' && (
                    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        {!editingInfo ? (
                            <>
                                <p>CPF: {associado.cpf}</p>
                                <p>RG: {associado.rg ?? '-'}</p>
                                <p>E-mail: {associado.email ?? '-'}</p>
                                <p>Estado civil: {associado.estado_civil}</p>
                                <Button className="mt-4" variant="outline" onClick={() => setEditingInfo(true)}>
                                    Editar
                                </Button>
                            </>
                        ) : (
                            <form
                                className="space-y-2"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    associadoForm.patch(`/associados/${associado.id}`, {
                                        onSuccess: () => setEditingInfo(false),
                                    });
                                }}
                            >
                                <input className="w-full rounded border px-3 py-2" value={associadoForm.data.nome_completo} onChange={(event) => associadoForm.setData('nome_completo', event.target.value)} />
                                <input className="w-full rounded border px-3 py-2" value={associadoForm.data.cpf} onChange={(event) => associadoForm.setData('cpf', event.target.value)} />
                                <input className="w-full rounded border px-3 py-2" value={associadoForm.data.rg} onChange={(event) => associadoForm.setData('rg', event.target.value)} />
                                <input className="w-full rounded border px-3 py-2" value={associadoForm.data.estado_civil} onChange={(event) => associadoForm.setData('estado_civil', event.target.value)} />
                                <input className="w-full rounded border px-3 py-2" value={associadoForm.data.email} onChange={(event) => associadoForm.setData('email', event.target.value)} />
                                <div className="flex gap-2">
                                    <Button type="button" variant="outline" className="w-full" onClick={() => setEditingInfo(false)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" className="w-full" disabled={associadoForm.processing}>
                                        Salvar
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {activeTab === 'dependentes' && (
                    <div className="space-y-3">
                        <div className="flex justify-end">
                            <Button onClick={() => setShowNewDependenteForm((state) => !state)}>Adicionar Dependente</Button>
                        </div>

                        {showNewDependenteForm && (
                            <form
                                className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    createDependenteForm.post(`/associados/${associado.id}/dependentes`, {
                                        onSuccess: () => {
                                            createDependenteForm.reset();
                                            setShowNewDependenteForm(false);
                                        },
                                    });
                                }}
                            >
                                <input className="w-full rounded border px-3 py-2" placeholder="Nome completo" value={createDependenteForm.data.nome_completo} onChange={(event) => createDependenteForm.setData('nome_completo', event.target.value)} />
                                <input className="w-full rounded border px-3 py-2" placeholder="CPF" value={createDependenteForm.data.cpf} onChange={(event) => createDependenteForm.setData('cpf', event.target.value)} />
                                <input className="w-full rounded border px-3 py-2" placeholder="RG" value={createDependenteForm.data.rg} onChange={(event) => createDependenteForm.setData('rg', event.target.value)} />
                                <input className="w-full rounded border px-3 py-2" placeholder="Certidão (opcional)" value={createDependenteForm.data.certidao} onChange={(event) => createDependenteForm.setData('certidao', event.target.value)} />
                                <Button type="submit" className="w-full" disabled={createDependenteForm.processing}>
                                    Salvar Dependente
                                </Button>
                            </form>
                        )}

                        {associado.dependentes.length === 0 && <p className="text-sm text-gray-500">Nenhum dependente cadastrado.</p>}

                        {associado.dependentes.map((dependente) => (
                            <div key={dependente.id} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                {editingDependenteId === dependente.id ? (
                                    <form
                                        className="space-y-2"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            editDependenteForm.patch(`/associados/${associado.id}/dependentes/${dependente.id}`, {
                                                onSuccess: () => setEditingDependenteId(null),
                                            });
                                        }}
                                    >
                                        <input className="w-full rounded border px-3 py-2" value={editDependenteForm.data.nome_completo} onChange={(event) => editDependenteForm.setData('nome_completo', event.target.value)} />
                                        <input className="w-full rounded border px-3 py-2" value={editDependenteForm.data.cpf} onChange={(event) => editDependenteForm.setData('cpf', event.target.value)} />
                                        <input className="w-full rounded border px-3 py-2" value={editDependenteForm.data.rg} onChange={(event) => editDependenteForm.setData('rg', event.target.value)} />
                                        <div className="flex gap-2">
                                            <Button type="button" variant="outline" className="w-full" onClick={() => setEditingDependenteId(null)}>
                                                Cancelar
                                            </Button>
                                            <Button type="submit" className="w-full" disabled={editDependenteForm.processing}>
                                                Salvar
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <p className="font-medium">{dependente.nome_completo}</p>
                                        <p className="text-sm text-gray-600">CPF: {dependente.cpf}</p>
                                        <p className="text-sm text-gray-600">RG: {dependente.rg}</p>
                                        <div className="mt-3 flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setEditingDependenteId(dependente.id);
                                                    editDependenteForm.setData({
                                                        nome_completo: dependente.nome_completo,
                                                        cpf: dependente.cpf,
                                                        rg: dependente.rg,
                                                        certidao: dependente.certidao ?? '',
                                                    });
                                                }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Remover dependente?')) {
                                                        router.delete(`/associados/${associado.id}/dependentes/${dependente.id}`);
                                                    }
                                                }}
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

                {activeTab === 'pagamentos' && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                            <p className="font-medium text-gray-900 dark:text-white">Histórico de Pagamento</p>
                            <Button onClick={() => setIsCobrancaModalOpen(true)}>Criar cobrança</Button>
                        </div>

                        {associado.pagamentos.map((pagamento) => (
                            <div key={pagamento.id} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        {pagamento.status === 'Pago' ? (
                                            <CheckCircle2 className="mt-1 size-5 text-green-600" />
                                        ) : (
                                            <AlertCircle className="mt-1 size-5 text-red-600" />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {pagamento.divida?.data_divida ?? 'Cobrança'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Data: {pagamento.data_pagamento ?? 'Não informada'}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Valor: R$ {pagamento.divida?.valor ?? '-'}
                                            </p>
                                        </div>
                                    </div>

                                    {pagamento.status === 'Pago' ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2"
                                            onClick={() => {
                                                setSelectedPagamento(pagamento);
                                                setIsComprovanteModalOpen(true);
                                            }}
                                        >
                                            <FileUp className="size-4" />
                                            Comprovante
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2"
                                            onClick={() => {
                                                setSelectedPagamento(pagamento);
                                                setIsAdicionarPagamentoModalOpen(true);
                                            }}
                                        >
                                            <FileUp className="size-4" />
                                            Adicionar Pagamento
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <Dialog open={isCobrancaModalOpen} onOpenChange={(open) => !open && setIsCobrancaModalOpen(false)}>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Criar nova cobrança</DialogTitle>
                                </DialogHeader>
                                <form
                                    className="space-y-2"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        cobrancaForm.post(`/associados/${associado.id}/cobrancas`, {
                                            onSuccess: () => {
                                                cobrancaForm.reset();
                                                setIsCobrancaModalOpen(false);
                                            },
                                        });
                                    }}
                                >
                                    <input
                                        className="w-full rounded border px-3 py-2"
                                        placeholder="Valor (ex: 150,00)"
                                        value={cobrancaForm.data.valor}
                                        onChange={(event) => cobrancaForm.setData('valor', event.target.value)}
                                    />
                                    <input
                                        className="w-full rounded border px-3 py-2"
                                        type="date"
                                        value={cobrancaForm.data.data_divida}
                                        onChange={(event) => cobrancaForm.setData('data_divida', event.target.value)}
                                    />
                                    <div className="flex gap-2 pt-2">
                                        <Button type="button" variant="outline" className="w-full" onClick={() => setIsCobrancaModalOpen(false)}>
                                            Cancelar
                                        </Button>
                                        <Button type="submit" className="w-full" disabled={cobrancaForm.processing}>
                                            Criar
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <ComprovanteModal
                            isOpen={isComprovanteModalOpen}
                            onClose={() => setIsComprovanteModalOpen(false)}
                            comprovante={
                                selectedPagamento
                                    ? {
                                          mes: selectedPagamento.divida?.data_divida ?? 'Mês não informado',
                                          data: selectedPagamento.data_pagamento ?? 'Não informado',
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
                    </div>
                )}
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
