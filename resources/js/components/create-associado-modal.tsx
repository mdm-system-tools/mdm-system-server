'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    nomeCompleto: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    genero: string;
    grupo: string;
    email: string;
    celular: string;
    telefoneFIxo: string;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
}

interface FormErrors {
    [key: string]: string;
}

interface CreateAssociadoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function CreateAssociadoModal({
    isOpen,
    onClose,
}: CreateAssociadoModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        nomeCompleto: '',
        cpf: '',
        rg: '',
        dataNascimento: '',
        genero: '',
        grupo: '',
        email: '',
        celular: '',
        telefoneFIxo: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateStep1 = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.nomeCompleto.trim()) {
            newErrors.nomeCompleto = 'Nome completo é obrigatório';
        }

        if (!formData.cpf.trim()) {
            newErrors.cpf = 'CPF é obrigatório';
        } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
            newErrors.cpf = 'CPF inválido (formato: XXX.XXX.XXX-XX)';
        }

        if (!formData.dataNascimento) {
            newErrors.dataNascimento = 'Data de nascimento é obrigatória';
        }

        if (!formData.genero) {
            newErrors.genero = 'Gênero é obrigatório';
        }

        if (!formData.grupo) {
            newErrors.grupo = 'Grupo é obrigatório';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.celular.trim()) {
            newErrors.celular = 'Celular é obrigatório';
        } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.celular)) {
            newErrors.celular = 'Celular inválido (formato: (XX) XXXXX-XXXX)';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.cep.trim()) {
            newErrors.cep = 'CEP é obrigatório';
        } else if (!/^\d{5}-\d{3}$/.test(formData.cep)) {
            newErrors.cep = 'CEP inválido (formato: XXXXX-XXX)';
        }

        if (!formData.rua.trim()) {
            newErrors.rua = 'Rua/Avenida é obrigatória';
        }

        if (!formData.numero.trim()) {
            newErrors.numero = 'Número é obrigatório';
        }

        if (!formData.bairro.trim()) {
            newErrors.bairro = 'Bairro é obrigatório';
        }

        if (!formData.cidade.trim()) {
            newErrors.cidade = 'Cidade é obrigatória';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
            setErrors({});
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
            setErrors({});
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const handleInputChange = (
        field: keyof FormData,
        value: string,
    ) => {
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

    const formatCPF = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 3) {
            return cleaned;
        }

        if (cleaned.length <= 6) {
            return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
        }

        if (cleaned.length <= 9) {
            return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
        }

        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
    };

    const formatCelular = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 2) {
            return `(${cleaned}`;
        }

        if (cleaned.length <= 7) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        }

        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    };

    const formatCEP = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 5) {
            return cleaned;
        }

        return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
    };

    const handleSubmit = async () => {
        if (!validateStep3()) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Cadastrando novo associado:', formData);
            setSuccessMessage('Associado criado com sucesso!');
            setIsSubmitting(false);

            setTimeout(() => {
                handleClose();
            }, 2000);
        }, 1000);
    };

    const handleClose = () => {
        setCurrentStep(1);
        setFormData({
            nomeCompleto: '',
            cpf: '',
            rg: '',
            dataNascimento: '',
            genero: '',
            grupo: '',
            email: '',
            celular: '',
            telefoneFIxo: '',
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
        });
        setErrors({});
        setSuccessMessage('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                            <DialogTitle>Cadastro de Associado</DialogTitle>
                            <DialogDescription>
                                Passo {currentStep} de 3
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex gap-2">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`h-2 flex-1 rounded-full ${
                                        step <= currentStep
                                            ? 'bg-blue-500'
                                            : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                />
                            ))}
                        </div>

                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="nomeCompleto">
                                        Nome Completo *
                                    </Label>
                                    <Input
                                        id="nomeCompleto"
                                        placeholder="Digite o nome completo"
                                        value={formData.nomeCompleto}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'nomeCompleto',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.nomeCompleto
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.nomeCompleto && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.nomeCompleto}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="cpf">CPF *</Label>
                                        <Input
                                            id="cpf"
                                            placeholder="000.000.000-00"
                                            value={formData.cpf}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'cpf',
                                                    formatCPF(
                                                        e.target.value,
                                                    ),
                                                )
                                            }
                                            className={
                                                errors.cpf
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors.cpf && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.cpf}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="rg">RG</Label>
                                        <Input
                                            id="rg"
                                            placeholder="Digite o RG"
                                            value={formData.rg}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'rg',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="dataNascimento">
                                        Data de Nascimento *
                                    </Label>
                                    <Input
                                        id="dataNascimento"
                                        type="date"
                                        value={formData.dataNascimento}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'dataNascimento',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.dataNascimento
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.dataNascimento && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.dataNascimento}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="genero">
                                            Gênero *
                                        </Label>
                                        <Select
                                            value={formData.genero}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    'genero',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger id="genero">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="masculino">
                                                    Masculino
                                                </SelectItem>
                                                <SelectItem value="feminino">
                                                    Feminino
                                                </SelectItem>
                                                <SelectItem value="outro">
                                                    Outro
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.genero && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.genero}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="grupo">Grupo *</Label>
                                        <Select
                                            value={formData.grupo}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    'grupo',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger id="grupo">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="grupo-a">
                                                    Grupo A
                                                </SelectItem>
                                                <SelectItem value="grupo-b">
                                                    Grupo B
                                                </SelectItem>
                                                <SelectItem value="grupo-c">
                                                    Grupo C
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.grupo && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.grupo}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="exemplo@gmail.com"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.email
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="celular">Celular *</Label>
                                    <Input
                                        id="celular"
                                        placeholder="(00) 00000-0000"
                                        value={formData.celular}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'celular',
                                                formatCelular(
                                                    e.target.value,
                                                ),
                                            )
                                        }
                                        className={
                                            errors.celular
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.celular && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.celular}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="telefoneFIxo">
                                        Telefone Fixo
                                    </Label>
                                    <Input
                                        id="telefoneFIxo"
                                        placeholder="(00) 0000-0000"
                                        value={formData.telefoneFIxo}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'telefoneFIxo',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="cep">CEP *</Label>
                                    <Input
                                        id="cep"
                                        placeholder="00000-000"
                                        value={formData.cep}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'cep',
                                                formatCEP(e.target.value),
                                            )
                                        }
                                        className={
                                            errors.cep ? 'border-red-500' : ''
                                        }
                                    />
                                    {errors.cep && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.cep}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="rua">
                                        Rua/Avenida *
                                    </Label>
                                    <Input
                                        id="rua"
                                        placeholder="Digite o nome da rua"
                                        value={formData.rua}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'rua',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.rua ? 'border-red-500' : ''
                                        }
                                    />
                                    {errors.rua && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.rua}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="numero">
                                            Número *
                                        </Label>
                                        <Input
                                            id="numero"
                                            placeholder="Nº"
                                            value={formData.numero}
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
                                        <Label htmlFor="complemento">
                                            Complemento
                                        </Label>
                                        <Input
                                            id="complemento"
                                            placeholder="Apto, bloco etc."
                                            value={formData.complemento}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'complemento',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="bairro">Bairro *</Label>
                                    <Input
                                        id="bairro"
                                        placeholder="Digite o bairro"
                                        value={formData.bairro}
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

                                <div>
                                    <Label htmlFor="cidade">Cidade *</Label>
                                    <Input
                                        id="cidade"
                                        placeholder="Digite a cidade"
                                        value={formData.cidade}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'cidade',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.cidade
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.cidade && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.cidade}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="gap-2"
                            >
                                <ChevronLeft className="size-4" />
                                Anterior
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    className="ml-auto gap-2"
                                >
                                    Próximo
                                    <ChevronRight className="size-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="ml-auto gap-2 bg-green-600 hover:bg-green-700"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Finalizando...
                                        </>
                                    ) : (
                                        <>✓ Finalizar Cadastro</>
                                    )}
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default CreateAssociadoModal;

