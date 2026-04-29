import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { historicoChamadas, detalhesChamada } from '@/routes';

interface Chamada {
    id: number;
    numero_inscricao: string;
    reuniao_id: number;
    presenca: boolean;
    justificativa: string | null;
    created_at: string;
    associado: {
        id: number;
        nome_completo: string;
        numero_inscricao: string;
    } | null;
    reuniao: {
        id: number;
        data_marcada: string;
        horario_inicio: string;
        projeto: {
            id: number;
            nome: string;
        };
    } | null;
}

interface HistoricoChamadasProps {
    chamadas: Chamada[];
}

function ChamadaCard({ chamada }: { chamada: Chamada }) {
    if (!chamada.associado || !chamada.reuniao) {
        return null;
    }

    const statusColor = chamada.presenca
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700';
    const statusText = chamada.presenca ? 'Presente' : 'Ausente';

    return (
        <Link
            href={detalhesChamada({ chamada: chamada.id }).url}
            className="block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-700"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {chamada.associado.nome_completo}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {chamada.reuniao.projeto.nome}
                    </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor}`}>
                    {statusText}
                </span>
            </div>

            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="size-4" />
                    {new Date(chamada.reuniao.data_marcada).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="size-4" />
                    {chamada.reuniao.horario_inicio}
                </div>
            </div>
        </Link>
    );
}

export default function HistoricoChamadas({ chamadas }: HistoricoChamadasProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChamadas = chamadas.filter((chamada) => {
        if (!chamada.associado || !chamada.reuniao) {
return false;
}

        return (
            chamada.associado.nome_completo
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            chamada.reuniao.projeto.nome
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <Head title="Histórico de Chamadas" />
            <div
                suppressHydrationWarning
                className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6"
            >
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Histórico de Chamadas
                    </h1>
                </div>

                {/* Search */}
                <div className="flex gap-3">
                    <Input
                        placeholder="Pesquisar por nome ou projeto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                </div>

                {/* Chamadas List */}
                <div className="space-y-3">
                    {filteredChamadas.length > 0 ? (
                        filteredChamadas.map((chamada) => (
                            <ChamadaCard key={chamada.id} chamada={chamada} />
                        ))
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-gray-500 dark:text-gray-400">
                                Nenhuma chamada encontrada
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

HistoricoChamadas.layout = {
    breadcrumbs: [
        {
            title: 'Histórico de Chamadas',
            href: historicoChamadas.url(),
        },
    ],
};

