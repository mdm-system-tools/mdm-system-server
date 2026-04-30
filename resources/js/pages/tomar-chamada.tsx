import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, Clock, Users } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { chamadas } from '@/routes';

interface Associado {
    id: number;
    nome_completo: string;
    numero_inscricao: string;
}

interface Grupo {
    id: number;
    horario: string;
    associados: Associado[];
}

interface Ausente {
    chamada_id: number;
    associado_id: number;
    nome: string;
    numero_inscricao: string;
}

interface Reuniao {
    id: number;
    projeto_nome: string;
    data_marcada: string;
}

interface TomarChamadaProps {
    reuniao: Reuniao;
    grupo: Grupo;
    ausentes: Ausente[];
}

type StatusType = 'presente' | 'ausente' | 'representante' | null;

function AssociadoRow({
    associado,
    ausentes,
    status,
    representanteDe,
    onStatusChange,
    onRepresentanteDeChange,
}: {
    associado: Associado;
    ausentes: Ausente[];
    status: StatusType;
    representanteDe: number | null;
    onStatusChange: (status: StatusType) => void;
    onRepresentanteDeChange: (id: number | null) => void;
}) {
    const outrosAusentes = ausentes.filter(
        (a) => a.associado_id !== associado.id,
    );

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                    {associado.nome_completo}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                     Nº {associado.numero_inscricao}
                  </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button
                    type="button"
                    size="sm"
                    variant={status === 'presente' ? 'default' : 'outline'}
                    className={
                        status === 'presente'
                            ? 'bg-green-600 hover:bg-green-700'
                            : ''
                    }
                    onClick={() => onStatusChange('presente')}
                >
                    Presente
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={status === 'ausente' ? 'default' : 'outline'}
                    className={
                        status === 'ausente'
                            ? 'bg-red-600 hover:bg-red-700'
                            : ''
                    }
                    onClick={() => onStatusChange('ausente')}
                >
                    Ausente
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={status === 'representante' ? 'default' : 'outline'}
                    className={
                        status === 'representante'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : ''
                    }
                    onClick={() => onStatusChange('representante')}
                >
                    Representante
                </Button>

                {status === 'representante' && outrosAusentes.length > 0 && (
                    <Select
                        value={representanteDe?.toString()}
                        onValueChange={(value) =>
                            onRepresentanteDeChange(
                                value ? parseInt(value, 10) : null,
                            )
                        }
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Representa quem?" />
                        </SelectTrigger>
                        <SelectContent>
                            {outrosAusentes.map((ausente) => (
                                <SelectItem
                                    key={ausente.associado_id}
                                    value={ausente.associado_id.toString()}
                                >
                                    {ausente.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
        </div>
    );
}

export default function TomarChamada({
    reuniao,
    grupo,
    ausentes,
}: TomarChamadaProps) {
    const [statuses, setStatuses] = useState<Record<number, StatusType>>({});
    const [representantesDe, setRepresentantesDe] = useState<Record<number, number | null>>({});
    const [processing, setProcessing] = useState(false);

    const allAssociados = useMemo(() => grupo.associados, [grupo.associados]);

    const handleStatusChange = (associadoId: number, status: StatusType) => {
        setStatuses((prev) => ({ ...prev, [associadoId]: status }));
        if (status !== 'representante') {
            setRepresentantesDe((prev) => {
                const next = { ...prev };
                delete next[associadoId];
                return next;
            });
        }
    };

    const handleRepresentanteDeChange = (
        associadoId: number,
        representadoId: number | null,
    ) => {
        setRepresentantesDe((prev) => ({
            ...prev,
            [associadoId]: representadoId,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const chamadasData = allAssociados.map((associado) => {
            const status = statuses[associado.id];
            return {
                associado_id: associado.id,
                presenca: status === 'presente' || status === 'representante',
                representante: status === 'representante',
                representante_de_id:
                    status === 'representante'
                        ? (representantesDe[associado.id] ?? null)
                        : null,
            };
        });

        setProcessing(true);
        router.patch(
            `/chamadas/${reuniao.id}/grupo/${grupo.id}/concluir`,
            { chamadas: chamadasData },
            {
                preserveScroll: true,
                onError: () => {
                    setProcessing(false);
                    alert('Erro ao concluir chamada. Tente novamente.');
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    const presentesCount = Object.values(statuses).filter(
        (s) => s === 'presente' || s === 'representante',
    ).length;

    const allMarked = allAssociados.length > 0 && allAssociados.every(
        (a) => statuses[a.id] !== undefined && statuses[a.id] !== null,
    );

    return (
        <>
            <Head title="Tomar Chamada" />
            <div
                suppressHydrationWarning
                className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6"
            >
                <div className="flex items-center gap-3">
                    <Link
                        href={chamadas()}
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                     <div>
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                              Tomar Chamada
                          </h1>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                              {reuniao.projeto_nome} — {(() => {
                                  const [year, month, day] = reuniao.data_marcada.split('-').map(Number);
                                  return new Date(year, month - 1, day).toLocaleDateString(
                                      'pt-BR',
                                      {
                                          weekday: 'long',
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                      },
                                  );
                              })()}
                          </p>
                      </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                     <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                         <Clock className="size-4" />
                         {grupo.horario}
                     </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="size-4" />
                        {allAssociados.length} membros
                    </div>
                    <div className="ml-auto text-sm font-medium text-green-600 dark:text-green-400">
                        {presentesCount}/{allAssociados.length} presentes
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        {grupo.associados.map((associado) => (
                             <AssociadoRow
                                 key={associado.id}
                                 associado={associado}
                                 ausentes={ausentes}
                                 status={statuses[associado.id] ?? null}
                                 representanteDe={
                                     representantesDe[associado.id] ?? null
                                 }
                                 onStatusChange={(status) =>
                                     handleStatusChange(associado.id, status)
                                 }
                                 onRepresentanteDeChange={(id) =>
                                     handleRepresentanteDeChange(associado.id, id)
                                 }
                             />
                         ))}
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Link href={chamadas()} className="flex-1">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                            >
                                Cancelar
                            </Button>
                        </Link>
                        {!allMarked && (
                            <p className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                                {allAssociados.length - Object.keys(statuses).length} membro(s) restante(s)
                            </p>
                        )}
                        <Button
                            type="submit"
                            disabled={processing || !allMarked}
                            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? 'Salvando...' : 'Concluir Chamada'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

TomarChamada.layout = {
    breadcrumbs: [
        {
            title: 'Chamadas',
            href: chamadas(),
        },
        {
            title: 'Tomar Chamada',
        },
    ],
};
