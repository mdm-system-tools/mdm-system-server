import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, MapPin, CheckCircle2, XCircle, Users } from 'lucide-react';

import { historicoChamadas } from '@/routes';

interface ChamadaItem {
    id: number;
    presenca: boolean;
    representante: boolean;
    justificativa: string | null;
    created_at: string;
    associado: {
        id: number;
        nome_completo: string;
        numero_inscricao: string;
        email: string | null;
        celular: string | null;
    } | null;
}

interface DetalhesChamadaData {
    id: number;
    data_marcada: string;
    horario_inicio: string;
    horario_fim: string;
    projeto: {
        id: number;
        nome: string;
    };
    local: {
        id: number;
        logradouro: string;
        bairro: string;
        cidade: string;
    } | null;
    chamadas: ChamadaItem[];
    total: number;
    presentes: number;
    ausentes: number;
    taxa_presenca: number;
}

interface DetalhesChamadaProps {
    chamada: DetalhesChamadaData;
}

function DetalhesChamada({ chamada }: DetalhesChamadaProps) {
    return (
        <>
            <Head title="Detalhes da Chamada" />
            <div
                suppressHydrationWarning
                className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6"
            >
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link
                        href={historicoChamadas().url}
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detalhes da Chamada
                    </h1>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Info Card */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            {chamada.projeto.nome}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="size-4" />
                                <span>Data:</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {new Date(chamada.data_marcada).toLocaleDateString('pt-BR', {
                                        weekday: 'long',
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="size-4" />
                                <span>Horário:</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {chamada.horario_inicio}
                                </span>
                            </div>
                            {chamada.local && (
                                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin className="mt-0.5 size-4 shrink-0" />
                                    <span>Local:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {chamada.local.logradouro} - {chamada.local.bairro}, {chamada.local.cidade}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resumo de Presença */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Resumo de Presença
                        </h2>

                        <div className="mb-6 grid grid-cols-4 gap-4">
                            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {chamada.total}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">total</div>
                            </div>
                            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {chamada.presentes}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Presentes</div>
                            </div>
                            <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {chamada.ausentes}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Ausentes</div>
                            </div>
                            <div className="rounded-lg bg-yellow-50 p-4 text-center dark:bg-yellow-900/20">
                                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                    {chamada.taxa_presenca}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Taxa</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Presença</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {chamada.taxa_presenca}%
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className="h-full bg-green-500"
                                    style={{ width: `${chamada.taxa_presenca}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lista de Presença */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-2">
                            <Users className="size-5 text-gray-700 dark:text-gray-300" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Lista de Presença
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {chamada.chamadas.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                                >
                                    <div>
                                        <span className="text-gray-900 dark:text-white">
                                            {item.associado?.nome_completo || 'N/A'}
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Nº {item.associado?.numero_inscricao || 'N/A'}
                                        </p>
                                    </div>
                                    <span
                                        className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                                            item.representante
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                                : item.presenca
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                        }`}
                                    >
                                        {item.representante ? (
                                            <>
                                                <CheckCircle2 className="size-4" />
                                                Representante
                                            </>
                                        ) : item.presenca ? (
                                            <>
                                                <CheckCircle2 className="size-4" />
                                                Presente
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="size-4" />
                                                Ausente
                                            </>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

DetalhesChamada.layout = {
    breadcrumbs: [
        {
            title: 'Histórico de Chamadas',
            href: historicoChamadas.url(),
        },
        {
            title: 'Detalhes',
        },
    ],
};

export default DetalhesChamada;
