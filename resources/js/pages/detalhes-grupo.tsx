import { Head } from '@inertiajs/react';
import { ChevronLeft, Clock, Users, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Associado {
    id: string;
    nome: string;
    email: string;
    status: 'Ativo' | 'Inativo';
}

export default function DetalhesGrupo() {
    const grupo = {
        id: '1',
        nome: 'Grupo Manhã',
        horario: '09:00',
        associados: 12,
        projeto: 'Vila Nova',
    };

    const associados: Associado[] = [
        {
            id: '1',
            nome: 'João Silva Santos',
            email: 'joao.silva@gmail.com',
            status: 'Ativo',
        },
        {
            id: '2',
            nome: 'Maria da Penha',
            email: 'maria.penha@gmail.com',
            status: 'Ativo',
        },
        {
            id: '3',
            nome: 'Dalva da silva',
            email: 'dalva.silva@gmail.com',
            status: 'Inativo',
        },
    ];

    return (
        <>
            <Head title="Detalhes do Grupo" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button className="rounded-lg hover:bg-gray-100 p-2 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detalhes da Grupo
                    </h1>
                </div>

                {/* Grupo Info Card */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {grupo.nome}
                        </h2>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                            <div className="flex flex-col items-center text-center">
                                <Clock className="size-6 text-blue-600 dark:text-blue-400 mb-2" />
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Horário
                                </p>
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {grupo.horario}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                            <div className="flex flex-col items-center text-center">
                                <Users className="size-6 text-green-600 dark:text-green-400 mb-2" />
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Associados
                                </p>
                                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                    {grupo.associados}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                            <div className="flex flex-col items-center text-center">
                                <Zap className="size-6 text-purple-600 dark:text-purple-400 mb-2" />
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Projeto
                                </p>
                                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                    {grupo.projeto}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full gap-2">
                        ✏️ Editar
                    </Button>
                </div>

                {/* Associados Section */}
                <div>
                    <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                        Associados do Grupo
                    </h3>
                    <div className="space-y-3">
                        {associados.map((associado) => (
                            <div
                                key={associado.id}
                                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <svg
                                            className="size-5"
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
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {associado.nome}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {associado.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                            associado.status === 'Ativo'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                        }`}
                                    >
                                        {associado.status}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs"
                                    >
                                        Ver Perfil
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

