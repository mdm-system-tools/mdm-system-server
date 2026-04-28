'use client';

import { Form } from '@inertiajs/react';
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


interface CreateProjetoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function CreateProjetoModal({ isOpen, onClose }: CreateProjetoModalProps) {
    const [successMessage, setSuccessMessage] = useState('');

    const regioes = [
        'São Paulo',
        'Rio de Janeiro',
        'Minas Gerais',
        'Bahia',
        'Paraná',
        'Santa Catarina',
        'Rio Grande do Sul',
        'Brasília',
        'Amazonas',
        'Pará',
    ];

    const handleClose = () => {
        setSuccessMessage('');
        onClose();
    };

    const handleSuccess = () => {
        setSuccessMessage('Projeto criado com sucesso!');
        setTimeout(() => {
            handleClose();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-md">
                {successMessage ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-12">
                        <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="size-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <p className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                            {successMessage}
                        </p>
                    </div>
                ) : (
                    <Form
                        action="/cadastros/projetos"
                        method="post"
                        resetOnSuccess
                        onSuccess={handleSuccess}
                    >
                        {({ errors, processing }) => (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Criar Projeto</DialogTitle>
                                    <DialogDescription>
                                        Preencha os dados para criar um novo projeto
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="nome">Nome *</Label>
                                        <Input
                                            id="nome"
                                            name="nome"
                                            placeholder="Digite o nome do projeto"
                                            className={
                                                errors.nome
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors.nome && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.nome}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="regiao">
                                            Região *
                                        </Label>
                                        <Select
                                            name="regiao"
                                            defaultValue=""
                                        >
                                            <SelectTrigger id="regiao">
                                                <SelectValue placeholder="Selecione uma região" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {regioes.map((regiao) => (
                                                    <SelectItem
                                                        key={regiao}
                                                        value={regiao}
                                                    >
                                                        {regiao}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.regiao && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.regiao}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="valor">
                                            Valor (R$) *
                                        </Label>
                                        <Input
                                            id="valor"
                                            name="valor"
                                            placeholder="R$ 0,00"
                                            type="text"
                                            className={
                                                errors.valor
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors.valor && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.valor}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleClose}
                                        disabled={processing}
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
                                            <>✓ Criar Projeto</>
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default CreateProjetoModal;
