import { Head } from '@inertiajs/react';
import { ChevronLeft, MapPin, DollarSign, Users, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Grupo {
    id: string;
    nome: string;
    horario: string;
    associados: number;
}

export default function DetalhesProjeto() {
    const projeto = {
        id: '1',
        nome: 'Projeto Vila Nova',
        dataInicio: '01/01/2025',
        regiao: 'Zona sul',
        orcamento: 'R$ 456,00',
        grupos: 4,
        associados: 48,
    };

    const grupos: Grupo[] = [
        {
            id: '1',
            nome: 'Grupo Manhã - 09:00',
            horario: '09:00',
            associados: 12,
        },
        {
            id: '2',
            nome: 'Grupo Manhã - 09:00',
            horario: '09:00',
            associados: 45,
        },
        {
            id: '3',
            nome: 'Grupo Manhã - 09:00',
            horario: '09:00',
            associados: 86,
        },
        {
            id: '4',
            nome: 'Grupo Manhã - 09:00',
            horario: '09:00',
            associados: 65,
        },
    ];

    return (
        <>
            <Head title="Detalhes do Projeto" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button className="rounded-lg hover:bg-gray-100 p-2 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detalhes do Projeto
                    </h1>
                </div>

                {/* Projeto Info Card */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {projeto.nome}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Início: {projeto.dataInicio}
                            </p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                            Ativo
                        </span>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                            <div className="flex flex-col items-center text-center">
                                <MapPin className="size-5 text-blue-600 dark:text-blue-400 mb-2" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Região
                                </p>
                                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    {projeto.regiao}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                            <div className="flex flex-col items-center text-center">
                                <DollarSign className="size-5 text-green-600 dark:text-green-400 mb-2" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Orçamento
                                </p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">
                                    {projeto.orcamento}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                            <div className="flex flex-col items-center text-center">
                                <Clock className="size-5 text-purple-600 dark:text-purple-400 mb-2" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Grupos
                                </p>
                                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                    {projeto.grupos}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                            <div className="flex flex-col items-center text-center">
                                <Users className="size-5 text-orange-600 dark:text-orange-400 mb-2" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Associados
                                </p>
                                <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                    {projeto.associados}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full gap-2">
                        ✏️ Editar
                    </Button>
                </div>

                {/* Grupos Section */}
                <div>
                    <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                        Grupos do Projeto
                    </h3>
                    <div className="space-y-3">
                        {grupos.map((grupo) => (
                            <div
                                key={grupo.id}
                                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <Clock className="size-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {grupo.nome}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            👥 {grupo.associados} Associados
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                >
                                    Ver Grupo
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

