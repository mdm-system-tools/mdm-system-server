import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cadastros, detalhesGrupo } from '@/routes';
import type { DetalhesProjetoProps } from '@/types/detalhes';

export default function DetalhesProjeto({ projeto }: DetalhesProjetoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const totalAssociados = useMemo(
        () =>
            projeto.grupos.reduce(
                (acc, grupo) => acc + grupo.associados.length,
                0,
            ),
        [projeto.grupos],
    );

    const form = useForm({
        nome: projeto.nome,
        regiao: projeto.regiao,
        valor: String(projeto.valor),
        status: projeto.status ? 1 : 0,
    });

    return (
        <>
            <Head title="Detalhes do Projeto" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center gap-3">
                    <Link
                        href={cadastros()}
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detalhes do Projeto
                    </h1>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    {!isEditing ? (
                        <>
                            <p className="text-xl font-semibold">
                                {projeto.nome}
                            </p>
                            <p className="text-sm text-gray-600">
                                Região: {projeto.regiao}
                            </p>
                            <p className="text-sm text-gray-600">
                                Orçamento: R$ {Number(projeto.valor).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                                Status: {projeto.status ? 'Ativo' : 'Inativo'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Grupos: {projeto.grupos_count}
                            </p>
                            <p className="text-sm text-gray-600">
                                Associados: {totalAssociados}
                            </p>
                            <Button
                                className="mt-4"
                                variant="outline"
                                onClick={() => setIsEditing(true)}
                            >
                                Editar
                            </Button>
                        </>
                    ) : (
                        <form
                            className="space-y-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                form.patch(`/projetos/${projeto.id}`, {
                                    onSuccess: () => setIsEditing(false),
                                });
                            }}
                        >
                            <input
                                className="w-full rounded border px-3 py-2"
                                value={form.data.nome}
                                onChange={(e) =>
                                    form.setData('nome', e.target.value)
                                }
                            />
                            <input
                                className="w-full rounded border px-3 py-2"
                                value={form.data.regiao}
                                onChange={(e) =>
                                    form.setData('regiao', e.target.value)
                                }
                            />
                            <input
                                className="w-full rounded border px-3 py-2"
                                value={form.data.valor}
                                onChange={(e) =>
                                    form.setData('valor', e.target.value)
                                }
                            />
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={form.processing}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="space-y-3">
                    {projeto.grupos.map((grupo) => (
                        <div
                            key={grupo.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                        >
                            <div>
                                <p className="font-medium">Grupo #{grupo.id}</p>
                                <p className="text-sm text-gray-600">
                                    Horário: {grupo.horario}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Associados: {grupo.associados.length}
                                </p>
                            </div>
                            <Link href={detalhesGrupo({ grupo: grupo.id }).url}>
                                <Button variant="outline" size="sm">
                                    Ver grupo
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

DetalhesProjeto.layout = {
    breadcrumbs: [
        { title: 'Cadastros', href: cadastros() },
        { title: 'Detalhes do Projeto', href: '' },
    ],
};
