import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, MapPin } from 'lucide-react';
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
import type { ChamadasProps, Reuniao } from '@/types/chamadas';

function ReuniaoCard({ reuniao }: { reuniao: Reuniao }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    {reuniao.projeto.nome}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(reuniao.data_marcada) < new Date()
                        ? 'Concluída'
                        : 'Agendada'}
                </p>
            </div>

            <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="size-4" />
                    {new Date(reuniao.data_marcada).toLocaleDateString(
                        'pt-BR',
                        {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        },
                    )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="size-4" />
                    {reuniao.horario_inicio}
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    <span>
                        {reuniao.local.logradouro}, {reuniao.local.numero} -{' '}
                        {reuniao.local.bairro}, {reuniao.local.cidade}
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Grupos ({reuniao.projeto.grupos?.length || 0})
                </p>
                <div className="space-y-2">
                    {reuniao.projeto.grupos?.map((grupo) => (
                        <div
                            key={grupo.id}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                        >
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Grupo {grupo.horario}
                            </span>
                            <Button
                                size="sm"
                                variant="default"
                                className="gap-2"
                            >
                                <span>▶</span>
                                Iniciar
                            </Button>
                        </div>
                    ))}
                    {(!reuniao.projeto.grupos ||
                        reuniao.projeto.grupos.length === 0) && (
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

    const { data, setData, post, processing, errors, reset } = useForm({
        projeto_id: '',
        data_marcada: '',
        horario_inicio: '',
        local: {
            logradouro: '',
            numero: '',
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

    return (
        <>
            <Head title="Chamadas" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
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
                    {filteredReuniones.length > 0 ? (
                        filteredReuniones.map((reuniao) => (
                            <ReuniaoCard key={reuniao.id} reuniao={reuniao} />
                        ))
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-gray-500 dark:text-gray-400">
                                Nenhuma chamada agendada
                            </p>
                        </div>
                    )}
                </div>

                {/* Create Chamada Modal */}
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
                                    <Label htmlFor="horario_inicio">
                                        Horário *
                                    </Label>
                                    <Input
                                        id="horario_inicio"
                                        type="time"
                                        value={data.horario_inicio}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'horario_inicio',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.horario_inicio
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.horario_inicio && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.horario_inicio}
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
                                        <Label htmlFor="numero">Número *</Label>
                                        <Input
                                            id="numero"
                                            placeholder="Nº"
                                            value={data.local.numero}
                                            onChange={(e) =>
                                                handleLocalChange(
                                                    'numero',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors['local.numero']
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors['local.numero'] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors['local.numero']}
                                            </p>
                                        )}
                                    </div>

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
