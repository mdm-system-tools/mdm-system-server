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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FormData {
    nome: string;
    regiao: string;
    valor: string;
}

interface FormErrors {
    [key: string]: string;
}

interface CreateProjetoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function CreateProjetoModal({ isOpen, onClose }: CreateProjetoModalProps) {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        regiao: '',
        valor: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }

        if (!formData.regiao) {
            newErrors.regiao = 'Região é obrigatória';
        }

        if (!formData.valor) {
            newErrors.valor = 'Valor é obrigatório';
        } else {
            const valor = parseFloat(formData.valor);

            if (isNaN(valor) || valor < 0 || valor > 200) {
                newErrors.valor =
                    'Valor deve estar entre R$ 0,00 e R$ 200,00';
            }
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

    const formatValor = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned === '') {
            return '';
        }

        const num = parseInt(cleaned, 10);

        if (num > 20000) {
            return '200.00';
        }

        return (num / 100).toFixed(2).replace('.', ',');
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Cadastrando novo projeto:', formData);
            setSuccessMessage('Projeto criado com sucesso!');
            setIsSubmitting(false);

            setTimeout(() => {
                handleClose();
            }, 2000);
        }, 1000);
    };

    const handleClose = () => {
        setFormData({
            nome: '',
            regiao: '',
            valor: '',
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
                                    placeholder="Digite o nome do projeto"
                                    value={formData.nome}
                                    onChange={(e) =>
                                        handleInputChange('nome', e.target.value)
                                    }
                                    className={
                                        errors.nome ? 'border-red-500' : ''
                                    }
                                />
                                {errors.nome && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.nome}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="regiao">Região *</Label>
                                <Select
                                    value={formData.regiao}
                                    onValueChange={(value) =>
                                        handleInputChange('regiao', value)
                                    }
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
                                <Label htmlFor="valor">Valor (R$) *</Label>
                                <Input
                                    id="valor"
                                    placeholder="R$ 0,00"
                                    value={formData.valor}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'valor',
                                            formatValor(e.target.value),
                                        )
                                    }
                                    className={
                                        errors.valor ? 'border-red-500' : ''
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
                                    <>✓ Criar Projeto</>
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default CreateProjetoModal;

