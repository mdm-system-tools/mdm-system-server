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
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Projeto {
    id: number;
    nome: string;
}

interface CreateGrupoModalProps {
    isOpen: boolean;
    onClose: () => void;
    projetos: Projeto[];
}

function CreateGrupoModal({ isOpen, onClose, projetos }: CreateGrupoModalProps) {
    const [successMessage, setSuccessMessage] = useState('');

    const horariosDisponiveis = [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
    ];

    const handleClose = () => {
        setSuccessMessage('');
        onClose();
    };

    const handleSuccess = () => {
        setSuccessMessage('Grupo criado com sucesso!');
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
                        action="/cadastros/grupos"
                        method="post"
                        resetOnSuccess
                        onSuccess={handleSuccess}
                    >
                        {({ errors, processing }) => (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Criar Grupo</DialogTitle>
                                    <DialogDescription>
                                        Preencha os dados para criar um novo grupo
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="projeto_id">
                                            Projeto *
                                        </Label>
                                        <Select
                                            name="projeto_id"
                                            defaultValue=""
                                            disabled={projetos.length === 0}
                                        >
                                            <SelectTrigger id="projeto_id">
                                                <SelectValue
                                                    placeholder={
                                                        projetos.length === 0
                                                            ? 'Nenhum projeto disponível'
                                                            : 'Selecione um projeto'
                                                    }
                                                />
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
                                        <Label htmlFor="horario">
                                            Horário *
                                        </Label>
                                        <Select
                                            name="horario"
                                            defaultValue=""
                                        >
                                            <SelectTrigger id="horario">
                                                <SelectValue placeholder="Selecione um horário" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {horariosDisponiveis.map(
                                                    (horario) => (
                                                        <SelectItem
                                                            key={horario}
                                                            value={horario}
                                                        >
                                                            {horario}h
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {errors.horario && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.horario}
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
                                        disabled={processing || projetos.length === 0}
                                        className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Criando...
                                            </>
                                        ) : (
                                            <>✓ Criar Grupo</>
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

export default CreateGrupoModal;

