import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';

import { historicoChamadas } from '@/routes';
import type { DetalhesChamadaProps } from '@/types/detalhes';

function DetalhesChamada({ chamada }: DetalhesChamadaProps) {
    const presentCount = chamada.reuniao.chamada?.filter((c) => c.presenca).length || 0;
    const absentCount = (chamada.reuniao.chamada?.length || 0) - presentCount;
    const totalCount = chamada.reuniao.chamada?.length || 0;
    const presentPercent = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    return (
        <>
            <Head title="Conclusão da Chamada" />
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
                        Conclusão da Chamada
                    </h1>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Card Info */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Projeto</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {chamada.reuniao.projeto.nome}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Data</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {new Date(chamada.reuniao.data_marcada).toLocaleDateString(
                                        'pt-BR',
                                        {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        },
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Grupo</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {chamada.reuniao.horario_inicio}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Finalizada em</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {new Date(chamada.created_at).toLocaleDateString('pt-BR')},{' '}
                                    {new Date(chamada.created_at).toLocaleTimeString('pt-BR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Resumo de Presença */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Resumo de Presença
                        </h2>

                        {/* Stats Grid */}
                        <div className="mb-6 grid grid-cols-4 gap-4">
                            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {totalCount}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">total</div>
                            </div>
                            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {presentCount}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Presentes
                                </div>
                            </div>
                            <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {absentCount}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Ausentes</div>
                            </div>
                            <div className="rounded-lg bg-yellow-50 p-4 text-center dark:bg-yellow-900/20">
                                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                    {presentPercent}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Taxa</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Presença</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {presentPercent}%
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className="h-full bg-yellow-400"
                                    style={{ width: `${presentPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lista de Presença */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Lista de Presença
                        </h2>

                        <div className="space-y-3">
                            {chamada.reuniao.chamada?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                                >
                                    <span className="text-gray-900 dark:text-white">
                                        {item.associado.nome_completo}
                                    </span>
                                    <span
                                        className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                                            item.presenca
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                        }`}
                                    >
                                        {item.presenca ? (
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

                    {/* Detalhes Associado */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Informações do Associado
                        </h2>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Nome</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {chamada.associado.nome_completo}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Número de Inscrição
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {chamada.associado.numero_inscricao}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Email</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {chamada.associado.email}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Celular</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {chamada.associado.celular}
                                </span>
                            </div>
                            {chamada.justificativa && (
                                <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Justificativa
                                    </span>
                                    <p className="mt-2 text-gray-900 dark:text-white">
                                        {chamada.justificativa}
                                    </p>
                                </div>
                            )}
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

