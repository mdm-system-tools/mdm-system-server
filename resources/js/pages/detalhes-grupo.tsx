import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cadastros, detalhesAssociado } from '@/routes';

interface DetalhesGrupoProps {
    grupo: {
        id: number;
        horario: string;
        projeto_id: number;
        associados_count: number;
        projeto: { id: number; nome: string } | null;
        associados: Array<{
            id: number;
            nome_completo: string;
            email: string | null;
            status: boolean;
        }>;
    };
}

export default function DetalhesGrupo({ grupo }: DetalhesGrupoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const form = useForm({
        horario: grupo.horario,
        projeto_id: grupo.projeto_id,
    });

    return (
        <>
            <Head title="Detalhes do Grupo" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center gap-3">
                    <Link href={cadastros()} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detalhes do Grupo</h1>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    {!isEditing ? (
                        <>
                            <p className="text-lg font-semibold">Grupo #{grupo.id}</p>
                            <p className="text-sm text-gray-600">Horário: {grupo.horario}</p>
                            <p className="text-sm text-gray-600">Projeto: {grupo.projeto?.nome ?? 'Sem projeto'}</p>
                            <p className="text-sm text-gray-600">Associados: {grupo.associados_count}</p>
                            <Button className="mt-4" variant="outline" onClick={() => setIsEditing(true)}>
                                Editar
                            </Button>
                        </>
                    ) : (
                        <form
                            className="space-y-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                form.patch(`/grupos/${grupo.id}`, {
                                    onSuccess: () => setIsEditing(false),
                                });
                            }}
                        >
                            <input className="w-full rounded border px-3 py-2" value={form.data.horario} onChange={(e) => form.setData('horario', e.target.value)} />
                            <input className="w-full rounded border px-3 py-2" value={String(form.data.projeto_id)} onChange={(e) => form.setData('projeto_id', Number(e.target.value))} />
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" className="w-full" onClick={() => setIsEditing(false)}>Cancelar</Button>
                                <Button type="submit" className="w-full" disabled={form.processing}>Salvar</Button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="space-y-3">
                    {grupo.associados.map((associado) => (
                        <div key={associado.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                            <div>
                                <p className="font-medium">{associado.nome_completo}</p>
                                <p className="text-sm text-gray-600">{associado.email ?? '-'}</p>
                            </div>
                            <Link href={detalhesAssociado({ associado: associado.id }).url}>
                                <Button variant="outline" size="sm">Ver perfil</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

DetalhesGrupo.layout = {
    breadcrumbs: [
        { title: 'Cadastros', href: cadastros() },
        { title: 'Detalhes do Grupo', href: '' },
    ],
};
