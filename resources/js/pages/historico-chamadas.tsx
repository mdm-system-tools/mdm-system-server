import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, MapPin, Users, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { historicoChamadas, detalhesChamada } from '@/routes';

interface ReuniaoHistorico {
    id: number;
    data_marcada: string;
    horario_inicio: string;
    projeto_id: number;
    local_id: number | null;
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
    total: number;
    presentes: number;
    ausentes: number;
    taxa_presenca: number;
}

interface HistoricoChamadasProps {
    reunioes: ReuniaoHistorico[];
    flash?: {
        success?: string;
        error?: string;
    };
}

function ReuniaoCard({ reuniao }: { reuniao: ReuniaoHistorico }) {
    return (
        <Link
            href={detalhesChamada({ reuniao: reuniao.id }).url}
            className="block rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-700"
        >
            <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    {reuniao.projeto.nome}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Concluída
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
                {reuniao.local && (
                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="mt-0.5 size-4 shrink-0" />
                        <span>
                            {reuniao.local.logradouro} - {reuniao.local.bairro}, {reuniao.local.cidade}
                        </span>
                    </div>
                )}
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                    <Users className="size-4" />
                    Resumo de Presença
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {reuniao.total}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">total</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                            {reuniao.presentes}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">presentes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-red-600 dark:text-red-400">
                            {reuniao.ausentes}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">ausentes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                            {reuniao.taxa_presenca}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">taxa</div>
                    </div>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${reuniao.taxa_presenca}%` }}
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {reuniao.presentes} presente{reuniao.presentes !== 1 ? 's' : ''}
                    </span>
                    <XCircle className="ml-2 size-4 text-red-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {reuniao.ausentes} ausente{reuniao.ausentes !== 1 ? 's' : ''}
                    </span>
                </div>
                <Button size="sm" variant="default" className="gap-1">
                    Ver detalhes
                </Button>
            </div>
        </Link>
    );
}

export default function HistoricoChamadas({ reunioes = [], flash }: HistoricoChamadasProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReunioes = reunioes.filter((reuniao) =>
        reuniao.projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            <Head title="Histórico de Chamadas" />
            <div
                suppressHydrationWarning
                className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6"
            >
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
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Histórico de Chamadas
                    </h1>
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
                    {filteredReunioes.length > 0 ? (
                        filteredReunioes.map((reuniao) => (
                            <ReuniaoCard key={reuniao.id} reuniao={reuniao} />
                        ))
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-gray-500 dark:text-gray-400">
                                Nenhuma chamada concluída
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
