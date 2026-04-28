'use client';

import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

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

interface CreateChamadaModalProps {
    isOpen: boolean;
    onClose: () => void;
    projetos: Array<{
        id: number;
        nome: string;
    }>;
}


export default function CreateChamadaModal({
    isOpen,
    onClose,
    projetos,
}: CreateChamadaModalProps) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        projeto_id: '',
        data_marcada: '',
        horario_inicio: '',
        nome: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        regiao: '',
    });

    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData(field, value);
        clearErrors(field);
    };


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/chamadas', {
            preserveScroll: true,
            onSuccess: () => {
                handleClose();
            },
            onError: () => {
                // Erros são automaticamente populados no objeto `errors` do useForm
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-md">
                <>
                        <DialogHeader>
                            <DialogTitle>Criar Reunião</DialogTitle>
                            <DialogDescription>
                                Preencha os dados para criar uma nova reunião e
                                gerar chamadas
                            </DialogDescription>
                        </DialogHeader>

                        {errors.projeto_id && (
                            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                {errors.projeto_id}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="projeto_id">Projeto *</Label>
                                <Select
                                    value={data.projeto_id}
                                    onValueChange={(value) =>
                                        handleInputChange('projeto_id', value)
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
                                <Label htmlFor="horario_inicio">Hora *</Label>
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
                                <Label htmlFor="logradouro">Endereço *</Label>
                                <Input
                                    id="logradouro"
                                    placeholder="Rua/Avenida"
                                    value={data.logradouro}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'logradouro',
                                            e.target.value,
                                        )
                                    }
                                    className={
                                        errors.logradouro
                                            ? 'border-red-500'
                                            : ''
                                    }
                                />
                                {errors.logradouro && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.logradouro}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="numero">Número *</Label>
                                    <Input
                                        id="numero"
                                        placeholder="Nº"
                                        value={data.numero}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'numero',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.numero
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.numero && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.numero}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="bairro">Bairro *</Label>
                                    <Input
                                        id="bairro"
                                        placeholder="Bairro"
                                        value={data.bairro}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'bairro',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.bairro
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.bairro && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.bairro}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="cidade">Cidade *</Label>
                                <Input
                                    id="cidade"
                                    placeholder="Cidade"
                                    value={data.cidade}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'cidade',
                                            e.target.value,
                                        )
                                    }
                                    className={
                                        errors.cidade ? 'border-red-500' : ''
                                    }
                                />
                                {errors.cidade && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.cidade}
                                    </p>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                className="flex-1"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                            >
                                {processing ? (
                                    <>
                                        <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Criando...
                                    </>
                                ) : (
                                    <>✓ Criar Reunião</>
                                )}
                            </Button>
                        </form>
                    </>
            </DialogContent>
        </Dialog>
    );
}

