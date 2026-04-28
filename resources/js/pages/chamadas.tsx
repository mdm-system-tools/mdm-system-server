import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, MapPin, } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chamadas } from '@/routes';

interface Local {
    id: number;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
}

interface Grupo {
    id: number;
    projeto_id: number;
    horario: string;
}

interface Projeto {
    id: number;
    nome: string;
    grupos: Grupo[];
}

interface Reuniao {
    id: number;
    data_marcada: string;
    horario_inicio: string;
    projeto_id: number;
    local_id: number;
    projeto: Projeto;
    local: Local;
}

interface ChamadasProps {
    reunioes?: Reuniao[];
    projetos?: Array<{
        id: number;
        nome: string;
    }>;
    flash?: {
        success?: string;
        error?: string;
    };
}

function ReuniaoCard({ reuniao }: { reuniao: Reuniao }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    {reuniao.projeto.nome}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(reuniao.data_marcada) < new Date() ? 'Concluída' : 'Agendada'}
                </p>
            </div>

            <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="size-4" />
                    {new Date(reuniao.data_marcada).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="size-4" />
                    {reuniao.horario_inicio}
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="size-4 shrink-0 mt-0.5" />
                    <span>
                        {reuniao.local.logradouro}, {reuniao.local.numero} -{' '}
                        {reuniao.local.bairro}, {reuniao.local.cidade}
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Grupos ({reuniao.projeto.grupos?.length || 0})
                </p>
                <div className="space-y-2">
                    {reuniao.projeto.grupos?.map((grupo) => (
                        <div
                            key={grupo.id}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                        >
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Grupo {grupo.horario}
                            </span>
                            <Button
                                size="sm"
                                variant="default"
                                className="gap-2"
                            >
                                <span>▶</span>
                                Iniciar
                            </Button>
                        </div>
                    ))}
                    {(!reuniao.projeto.grupos || reuniao.projeto.grupos.length === 0) && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Nenhum grupo cadastrado para este projeto
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Chamadas({
    reunioes = [],
    flash,
}: ChamadasProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReuniones = reunioes.filter((reuniao) =>
        reuniao.projeto.nome
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            <Head title="Chamadas" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        {flash.error}
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Chamadas
                        </h1>
                    </div>

                </div>

                {/* Search */}
                <div className="flex gap-3">
                    <Input
                        placeholder="Pesquisar por projeto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                </div>

                {/* Reuniões List */}
                <div className="space-y-4">
                    {filteredReuniones.length > 0 ? (
                        filteredReuniones.map((reuniao) => (
                            <ReuniaoCard key={reuniao.id} reuniao={reuniao} />
                        ))
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-gray-500 dark:text-gray-400">
                                Nenhuma chamada agendada
                            </p>
                        </div>
                    )}
                </div>

                {/* Create Chamada Modal */}

            </div>
        </>
    );
}

Chamadas.layout = {
    breadcrumbs: [
        {
            title: 'Chamadas',
            href: chamadas(),
        },
    ],
};

