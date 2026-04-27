'use client';

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

interface FormData {
    projeto: string;
    horario: string;
}

interface FormErrors {
    [key: string]: string;
}

interface CreateGrupoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function CreateGrupoModal({ isOpen, onClose }: CreateGrupoModalProps) {
    const [formData, setFormData] = useState<FormData>({
        projeto: '',
        horario: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const mockProjetos = [
        { id: 'P1', name: 'Projeto A' },
        { id: 'P2', name: 'Projeto B' },
        { id: 'P3', name: 'Projeto C' },
        { id: 'P4', name: 'Projeto D' },
    ];

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

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.projeto) {
            newErrors.projeto = 'Projeto é obrigatório';
        }

        if (!formData.horario) {
            newErrors.horario = 'Horário é obrigatório';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: '',
            }));
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Cadastrando novo grupo:', formData);
            setSuccessMessage('Grupo criado com sucesso!');
            setIsSubmitting(false);

            setTimeout(() => {
                handleClose();
            }, 2000);
        }, 1000);
    };

    const handleClose = () => {
        setFormData({
            projeto: '',
            horario: '',
        });
        setErrors({});
        setSuccessMessage('');
        onClose();
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
                    <>
                        <DialogHeader>
                            <DialogTitle>Criar Grupo</DialogTitle>
                            <DialogDescription>
                                Preencha os dados para criar um novo grupo
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="projeto">Projeto *</Label>
                                <Select
                                    value={formData.projeto}
                                    onValueChange={(value) =>
                                        handleInputChange('projeto', value)
                                    }
                                >
                                    <SelectTrigger id="projeto">
                                        <SelectValue placeholder="Selecione um projeto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mockProjetos.map((projeto) => (
                                            <SelectItem
                                                key={projeto.id}
                                                value={projeto.id}
                                            >
                                                {projeto.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.projeto && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.projeto}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="horario">Horário *</Label>
                                <Select
                                    value={formData.horario}
                                    onValueChange={(value) =>
                                        handleInputChange('horario', value)
                                    }
                                >
                                    <SelectTrigger id="horario">
                                        <SelectValue placeholder="Selecione um horário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {horariosDisponiveis.map((horario) => (
                                            <SelectItem
                                                key={horario}
                                                value={horario}
                                            >
                                                {horario}h
                                            </SelectItem>
                                        ))}
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
                                className="flex-1"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                            >
                                {isSubmitting ? (
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
            </DialogContent>
        </Dialog>
    );
}

export default CreateGrupoModal;

