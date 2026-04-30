import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, MapPin, Pencil } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { chamadas } from '@/routes';
import type { ChamadasProps, Reuniao, GrupoReuniao } from '@/types/chamadas';

function GrupoRow({
    grupo,
    reuniaoId,
}: {
    grupo: GrupoReuniao;
    reuniaoId: number;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            <span className="text-sm text-gray-700 dark:text-gray-300">
                {grupo.horario}
            </span>
            {grupo.concluida ? (
                <Button
                    size="sm"
                    variant="secondary"
                    disabled
                    className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                >
                    Concluída
                </Button>
            ) : (
                <Link
                    href={`/chamadas/${reuniaoId}/grupo/${grupo.id}/tomar`}
                    className="inline-flex"
                >
                    <Button size="sm" variant="default" className="gap-2">
                        <span>&#9654;</span>
                        Iniciar
                    </Button>
                </Link>
            )}
        </div>
    );
}

function ReuniaoCard({
    reuniao,
    onEdit,
}: {
    reuniao: Reuniao;
    onEdit: (reuniao: Reuniao) => void;
}) {
    const gruposConcluidos = reuniao.grupos?.filter((g) => g.concluida).length || 0;
    const totalGrupos = reuniao.grupos?.length || 0;
    const isConcluida = reuniao.concluida;

    return (
        <div className={`rounded-lg border p-4 ${isConcluida ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'}`}>
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {reuniao.projeto.nome}
                        {isConcluida && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Concluída
                            </span>
                        )}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {gruposConcluidos}/{totalGrupos} grupos concluídos
                    </p>
                </div>
                {!isConcluida && (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="gap-2"
                        onClick={() => onEdit(reuniao)}
                    >
                        <Pencil className="size-4" />
                        Editar
                    </Button>
                )}
            </div>

            <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                     <Calendar className="size-4" />
                     {(() => {
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
                 </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    <span>
                         {reuniao.local
                            ? `${reuniao.local.logradouro} - ${reuniao.local.bairro}, ${reuniao.local.cidade}`
                            : 'Local não definido'}
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Clock className="size-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Grupos ({totalGrupos})
                    </p>
                </div>
                <div className="space-y-2">
                    {reuniao.grupos?.map((grupo) => (
                        <GrupoRow
                            key={grupo.id}
                            grupo={grupo}
                            reuniaoId={reuniao.id}
                        />
                    ))}
                    {(!reuniao.grupos || reuniao.grupos.length === 0) && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Nenhum grupo cadastrado para este projeto
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Chamadas({ reunioes = [], projetos = [], flash }: ChamadasProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingReuniao, setEditingReuniao] = useState<Reuniao | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        projeto_id: '',
        data_marcada: '',
        local: {
            logradouro: '',
            bairro: '',
            cidade: '',
        },
    });

    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        errors: editErrors,
        reset: editReset,
    } = useForm({
        projeto_id: '',
        data_marcada: '',
        local: {
            logradouro: '',
            bairro: '',
            cidade: '',
        },
    });

    const filteredReuniones = reunioes.filter((reuniao) =>
        reuniao.projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleInputChange = (field: string, value: string) => {
        setData(field as keyof typeof data, value);
    };

    const handleLocalChange = (field: string, value: string) => {
        setData('local', {
            ...data.local,
            [field]: value,
        } as any);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/chamadas', {
            preserveScroll: true,
            onSuccess: () => {
                handleCloseModal();
            },
        });
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        reset();
    };

    const handleOpenEditModal = (reuniao: Reuniao) => {
        setEditingReuniao(reuniao);

        setEditData({
            projeto_id: reuniao.projeto_id.toString(),
            data_marcada: reuniao.data_marcada || '',
            local: {
                logradouro: reuniao.local?.logradouro || '',
                bairro: reuniao.local?.bairro || '',
                cidade: reuniao.local?.cidade || '',
            },
        });
    };

    const handleCloseEditModal = () => {
        setEditingReuniao(null);
        editReset();
    };

    const handleEditInputChange = (field: string, value: string) => {
        setEditData(field as keyof typeof editData, value);
    };

    const handleEditLocalChange = (field: string, value: string) => {
        setEditData('local', {
            ...editData.local,
            [field]: value,
        } as any);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingReuniao) return;
        put(`/chamadas/${editingReuniao.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                handleCloseEditModal();
            },
        });
    };

    return (
        <>
            <Head title="Chamadas" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
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
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="gap-2"
                    >
                        <span>+</span>
                        Criar Reunião
                    </Button>
                </div>

                <div className="flex gap-3">
                    <Input
                        placeholder="Pesquisar por projeto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                </div>

                <div className="space-y-4">
                    {filteredReuniones.length > 0 ? (
                        filteredReuniones.map((reuniao) => (
                            <ReuniaoCard
                                key={reuniao.id}
                                reuniao={reuniao}
                                onEdit={handleOpenEditModal}
                            />
                        ))
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-gray-500 dark:text-gray-400">
                                Nenhuma chamada agendada
                            </p>
                        </div>
                    )}
                </div>

                <Dialog
                    open={isCreateModalOpen}
                    onOpenChange={(open) => !open && handleCloseModal()}
                >
                    <DialogContent className="max-w-md">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Criar Reunião</DialogTitle>
                                 <DialogDescription>
                                     Preencha os dados para criar uma nova
                                     reunião
                                 </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="projeto_id">
                                        Projeto *
                                    </Label>
                                    <Select
                                        value={data.projeto_id}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                'projeto_id',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger id="projeto_id">
                                            <SelectValue placeholder="Selecione um projeto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projetos.map((projeto) => (
                                                <SelectItem
                                                    key={projeto.id}
                                                    value={projeto.id.toString()}
                                                >
                                                    {projeto.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.projeto_id && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.projeto_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="data_marcada">Data *</Label>
                                    <Input
                                        id="data_marcada"
                                        type="date"
                                        value={data.data_marcada}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'data_marcada',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.data_marcada
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.data_marcada && (
                                         <p className="mt-1 text-sm text-red-500">
                                             {errors.data_marcada}
                                         </p>
                                     )}
                                 </div>

                                 <div>
                                     <Label htmlFor="logradouro">
                                          Endereço *
                                      </Label>
                                    <Input
                                        id="logradouro"
                                        placeholder="Rua/Avenida"
                                        value={data.local.logradouro}
                                        onChange={(e) =>
                                            handleLocalChange(
                                                'logradouro',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors['local.logradouro']
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors['local.logradouro'] && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors['local.logradouro']}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="bairro">Bairro *</Label>
                                        <Input
                                            id="bairro"
                                            placeholder="Bairro"
                                            value={data.local.bairro}
                                            onChange={(e) =>
                                                handleLocalChange(
                                                    'bairro',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors['local.bairro']
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors['local.bairro'] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors['local.bairro']}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="cidade">Cidade *</Label>
                                        <Input
                                            id="cidade"
                                            placeholder="Cidade"
                                            value={data.local.cidade}
                                            onChange={(e) =>
                                                handleLocalChange(
                                                    'cidade',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors['local.cidade']
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors['local.cidade'] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors['local.cidade']}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseModal}
                                    className="flex-1"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    {processing
                                         ? 'Criando...'
                                         : '✓ Criar Reunião'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={editingReuniao !== null}
                    onOpenChange={(open) => !open && handleCloseEditModal()}
                >
                    <DialogContent className="max-w-md">
                        <form onSubmit={handleEditSubmit}>
                            <DialogHeader>
                                <DialogTitle>Editar Reunião</DialogTitle>
                                 <DialogDescription>
                                     Edite os dados da reunião abaixo
                                 </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="edit_projeto_id">
                                        Projeto *
                                    </Label>
                                    <Select
                                        value={editData.projeto_id}
                                        onValueChange={(value) =>
                                            handleEditInputChange(
                                                'projeto_id',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger id="edit_projeto_id">
                                            <SelectValue placeholder="Selecione um projeto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projetos.map((projeto) => (
                                                <SelectItem
                                                    key={projeto.id}
                                                    value={projeto.id.toString()}
                                                >
                                                    {projeto.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {editErrors.projeto_id && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {editErrors.projeto_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="edit_data_marcada">
                                        Data *
                                    </Label>
                                    <Input
                                        id="edit_data_marcada"
                                        type="date"
                                        value={editData.data_marcada}
                                        onChange={(e) =>
                                            handleEditInputChange(
                                                'data_marcada',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            editErrors.data_marcada
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {editErrors.data_marcada && (
                                         <p className="mt-1 text-sm text-red-500">
                                             {editErrors.data_marcada}
                                         </p>
                                     )}
                                 </div>

                                 <div>
                                     <Label htmlFor="edit_logradouro">
                                          Endereço *
                                      </Label>
                                    <Input
                                        id="edit_logradouro"
                                        placeholder="Rua/Avenida"
                                        value={editData.local.logradouro}
                                        onChange={(e) =>
                                            handleEditLocalChange(
                                                'logradouro',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            editErrors['local.logradouro']
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {editErrors['local.logradouro'] && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {editErrors['local.logradouro']}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="edit_bairro">
                                            Bairro *
                                        </Label>
                                        <Input
                                            id="edit_bairro"
                                            placeholder="Bairro"
                                            value={editData.local.bairro}
                                            onChange={(e) =>
                                                handleEditLocalChange(
                                                    'bairro',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                editErrors['local.bairro']
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {editErrors['local.bairro'] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {editErrors['local.bairro']}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="edit_cidade">
                                            Cidade *
                                        </Label>
                                        <Input
                                            id="edit_cidade"
                                            placeholder="Cidade"
                                            value={editData.local.cidade}
                                            onChange={(e) =>
                                                handleEditLocalChange(
                                                    'cidade',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                editErrors['local.cidade']
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {editErrors['local.cidade'] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {editErrors['local.cidade']}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseEditModal}
                                    className="flex-1"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    {editProcessing
                                         ? 'Salvando...'
                                         : '✓ Salvar Alterações'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default Chamadas;

Chamadas.layout = {
    breadcrumbs: [
        {
            title: 'Chamadas',
            href: chamadas(),
        },
    ],
};
