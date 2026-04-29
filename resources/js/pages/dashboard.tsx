import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Users, CheckCircle, Calendar, Users2, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import CreateMeetingModal from '@/components/create-meeting-modal';
import { dashboard, home } from '@/routes';
import type { DashboardProps } from '@/types/dashboard';
export default function Dashboard({
    totalProjetos,
    totalAssociados,
    totalConcluidas,
    reunioesMes,
    projetosComReuniao,
}: DashboardProps) {
    const [isCreateMeetingModalOpen, setIsCreateMeetingModalOpen] = useState(false);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header Section */}
                <div className="space-y-4">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ChevronLeft className="size-4" />
                        Voltar
                    </Link>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Menu Principal
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Sistema de gerenciamento e controle de projetos
                        </p>
                    </div>
                </div>

                {/* Main Cards Grid - 3 columns */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Projetos Card */}
                    <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 px-6 py-8 text-white transition-all hover:scale-105 hover:shadow-lg">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                            <Users className="size-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">
                                {totalProjetos}
                            </p>
                            <p className="text-sm font-medium">Projetos</p>
                        </div>
                    </div>

                    {/* Associados Card */}
                    <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 px-6 py-8 text-white transition-all hover:scale-105 hover:shadow-lg">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                            <Users2 className="size-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">
                                {totalAssociados}
                            </p>
                            <p className="text-sm font-medium">Associados</p>
                        </div>
                    </div>

                    {/* Concluídas Card */}
                    <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-green-500 to-green-600 px-6 py-8 text-white transition-all hover:scale-105 hover:shadow-lg">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                            <CheckCircle className="size-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">
                                {totalConcluidas}
                            </p>
                            <p className="text-sm font-medium">Concluídas</p>
                        </div>
                    </div>
                </div>

                {/* Upcoming Meetings Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Próximas Reuniões do Mês
                        </h2>
                        <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {reunioesMes.length}
                        </div>
                    </div>

                    {reunioesMes.length > 0 ? (
                        <div className="space-y-3">
                            {reunioesMes.map((reuniao) => (
                                <div
                                    key={reuniao.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {reuniao.projeto.nome}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {reuniao.projeto.grupos
                                                    ?.length || 0}{' '}
                                                grupo(s)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar className="size-4" />
                                            {new Date(
                                                reuniao.data_marcada,
                                            ).toLocaleDateString('pt-BR', {
                                                weekday: 'short',
                                                day: '2-digit',
                                                month: 'short',
                                            })}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Clock className="size-4" />
                                            {reuniao.horario_inicio}
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <MapPin className="mt-0.5 size-4 shrink-0" />
                                            <span>
                                                {reuniao.local.logradouro},{' '}
                                                {reuniao.local.numero} -{' '}
                                                {reuniao.local.bairro},{' '}
                                                {reuniao.local.cidade}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12 dark:border-gray-600 dark:bg-gray-900">
                            <Calendar className="size-12 text-gray-400 dark:text-gray-600" />
                            <p className="text-gray-600 dark:text-gray-400">
                                Nenhuma reunião agendada para este mês
                            </p>
                            <Link
                                href="/chamadas"
                                className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600"
                            >
                                Criar primeira reunião
                            </Link>
                        </div>
                    )}
                </div>

                {/* Create Meeting Modal */}
                <CreateMeetingModal
                    isOpen={isCreateMeetingModalOpen}
                    onClose={() => setIsCreateMeetingModalOpen(false)}
                    projects={projetosComReuniao.map((projeto) => ({
                        id: projeto.id,
                        name: projeto.nome, // Assume o valor de 'nome' para a propriedade esperada 'name'
                    }))}
                />
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Início',
            href: home(),
        },
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
