import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Users, CheckCircle, Calendar, Users2 } from 'lucide-react';
import { useState } from 'react';

import CreateMeetingModal from '@/components/create-meeting-modal';
import { dashboard, home } from '@/routes';

// Placeholder functions para chamadas ao backend
const getGrupos = () => {
    console.log('buscando grupos');
};

const getAssociados = () => {
    console.log('buscando associados');
};

const getConcluidas = () => {
    console.log('buscando chamadas concluídas');
};


// Mock projects data - será substituído por dados reais do backend
const mockProjects = [
    { id: 1, name: 'Projeto A' },
    { id: 2, name: 'Projeto B' },
    { id: 3, name: 'Projeto C' },
    { id: 4, name: 'Projeto D' },
];

export default function Dashboard() {
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
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Menu Principal</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sistema de gerenciamento e controle de projetos</p>
                    </div>
                </div>

                {/* Main Cards Grid - 3 columns */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Projetos Card */}
                    <button
                        onClick={getGrupos}
                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 px-6 py-8 text-white transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                            <Users className="size-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">4</p>
                            <p className="text-sm font-medium">Projetos</p>
                        </div>
                    </button>

                    {/* Associados Card */}
                    <button
                        onClick={getAssociados}
                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 px-6 py-8 text-white transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                            <Users2 className="size-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">2</p>
                            <p className="text-sm font-medium">Associados</p>
                        </div>
                    </button>

                    {/* Concluídas Card */}
                    <button
                        onClick={getConcluidas}
                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-green-500 to-green-600 px-6 py-8 text-white transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                            <CheckCircle className="size-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">-</p>
                            <p className="text-sm font-medium">Concluídas</p>
                        </div>
                    </button>
                </div>

                {/* Upcoming Meetings Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Próximas Reuniões</h2>
                        <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            0
                        </div>
                    </div>

                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12 dark:border-gray-600 dark:bg-gray-900">
                        <Calendar className="size-12 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Nenhuma reunião agendada</p>
                        <button
                            onClick={() => setIsCreateMeetingModalOpen(true)}
                            className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600 active:scale-95"
                        >
                            Criar primeira reunião
                        </button>
                    </div>
                </div>

                {/* Create Meeting Modal */}
                <CreateMeetingModal
                    isOpen={isCreateMeetingModalOpen}
                    onClose={() => setIsCreateMeetingModalOpen(false)}
                    projects={mockProjects}
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
