import { Head } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import AdicionarPagamentoModal from '@/components/adicionar-pagamento-modal';
import ComprovanteModal from '@/components/comprovante-modal';
import { Button } from '@/components/ui/button';

interface Dependente {
    id: string;
    nome: string;
    cpf: string;
    dataNascimento: string;
}

interface Pagamento {
    id: string;
    mes: string;
    data: string;
    valor: string;
    status: 'pago' | 'pendente';
    comprovante?: string;
}

export default function DetalhesAssociado() {
    const [activeTab, setActiveTab] = useState('informacoes');
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isComprovanteModalOpen, setIsComprovanteModalOpen] = useState(false);
    const [isAdicionarPagamentoModalOpen, setIsAdicionarPagamentoModalOpen] = useState(false);
    const [selectedPagamento, setSelectedPagamento] = useState<any>(null);

    const associado = {
        id: '1',
        nome: 'João Silva Santos',
        nomeCompleto: 'João Silva Santos',
        numero: 'Nº Carterinha – 000000-000',
        cpf: '987.651.312-00',
        rg: '98.653.421-1',
        genero: 'Homem',
        email: 'joaosilva123@gmail.com',
        grupo: 'Manhã',
        horario: '9:00',
        projeto: 'Vila Velha',
        status: 'Ativo',
    };

    const dependentes: Dependente[] = [
        {
            id: '1',
            nome: 'Maria Silva Santos',
            cpf: '987.651.312-00',
            dataNascimento: '01/01/2000',
        },
    ];

    const pagamentos: Pagamento[] = [
        {
            id: '1',
            mes: 'Novembro 2025',
            data: '05/11/2025',
            valor: 'R$ 450,00',
            status: 'pago',
            comprovante: 'COMP-2025-11-001.png',
        },
        {
            id: '2',
            mes: 'Agosto 2025',
            data: '21/09/2025',
            valor: 'R$ 450,00',
            status: 'pago',
            comprovante: 'COMP-2025-08-001.png',
        },
        {
            id: '3',
            mes: 'Outubro 2025',
            data: '',
            valor: 'R$ 450,00',
            status: 'pendente',
        },
    ];

    return (
        <>
            <Head title="Detalhes do Associado" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button className="rounded-lg hover:bg-gray-100 p-2 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detalhes do Associado
                    </h1>
                </div>

                {/* Info Card */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <svg
                                    className="size-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {associado.nome}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {associado.numero}
                                </p>
                            </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                            {associado.status}
                        </span>
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>
                            Grupo – {associado.grupo} - {associado.horario}
                        </span>
                        <span>Projeto – {associado.projeto}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="space-y-4">
                    <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700">
                        {['informacoes', 'dependente', 'pagamentos'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                }`}
                            >
                                {tab === 'informacoes'
                                    ? 'Informações'
                                    : tab === 'dependente'
                                      ? 'Dependente'
                                      : 'Pagamentos'}
                            </button>
                        ))}
                    </div>

                    {/* Informações Tab */}
                    {activeTab === 'informacoes' && (
                        <div className="space-y-4">
                            {!isEditingInfo ? (
                                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Nome Completo
                                            </p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {associado.nomeCompleto}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                CPF
                                            </p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {associado.cpf}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                RG
                                            </p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {associado.rg}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Gênero
                                            </p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {associado.genero}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                E-mail
                                            </p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {associado.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setIsEditingInfo(true)}
                                        variant="outline"
                                        className="mt-4 w-full gap-2"
                                    >
                                        ✏️ Editar
                                    </Button>
                                </div>
                            ) : (
                                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Modo edição - em desenvolvimento
                                    </p>
                                    <Button
                                        onClick={() => setIsEditingInfo(false)}
                                        variant="outline"
                                        className="mt-4 w-full"
                                    >
                                        Voltar
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Dependente Tab */}
                    {activeTab === 'dependente' && (
                        <div className="space-y-4">
                            <div className="flex justify-end">
                                <Button className="gap-2">
                                    <span>+</span>
                                    Adicionar Dependente
                                </Button>
                            </div>
                            {dependentes.length > 0 ? (
                                <div className="space-y-3">
                                    {dependentes.map((dep) => (
                                        <div
                                            key={dep.id}
                                            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                                        >
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {dep.nome}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                CPF: {dep.cpf}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Nascimento: {dep.dataNascimento}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-800">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Nenhum dependente cadastrado
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagamentos Tab */}
                    {activeTab === 'pagamentos' && (
                        <div className="space-y-3">
                            {pagamentos.map((pag) => (
                                <div
                                    key={pag.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {pag.mes}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Data: {pag.data || 'Não informada'}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Valor: {pag.valor}
                                            </p>
                                        </div>
                                        {pag.status === 'pago' ? (
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="size-5 text-green-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs"
                                                    onClick={() => {
                                                        setSelectedPagamento({
                                                            mes: pag.mes,
                                                            data: pag.data,
                                                            valor: pag.valor,
                                                            arquivo: pag.comprovante,
                                                        });
                                                        setIsComprovanteModalOpen(true);
                                                    }}
                                                >
                                                    Comprovante
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="size-5 text-red-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="text-xs text-red-600 font-medium">
                                                    Pendente
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs"
                                                    onClick={() => setIsAdicionarPagamentoModalOpen(true)}
                                                >
                                                    Adicionar
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Modals */}
                            <ComprovanteModal
                                isOpen={isComprovanteModalOpen}
                                onClose={() => setIsComprovanteModalOpen(false)}
                                comprovante={selectedPagamento}
                            />
                            <AdicionarPagamentoModal
                                isOpen={isAdicionarPagamentoModalOpen}
                                onClose={() => setIsAdicionarPagamentoModalOpen(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}




