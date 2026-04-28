import { router } from '@inertiajs/react';
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
    numero_inscricao: string;
    nome_completo: string;
    cpf: string;
    rg: string;
    estado_civil: string;
    data_nascimento: string;
    email: string;
    celular: string;
    telefone?: string;
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
        numero_inscricao: '',
        nome_completo: '',
        cpf: '',
        rg: '',
        estado_civil: '',
        data_nascimento: '',
        email: '',
        celular: '',
        telefone: '',
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
    const [errorMessage, setErrorMessage] = useState('');

    const estadosCivis = [
        'Solteiro(a)',
        'Casado(a)',
        'Divorciado(a)',
        'Viúvo(a)',
        'Separado(a)',
    ];

    const validateStep1 = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.numero_inscricao.trim()) {
            newErrors.numero_inscricao = 'Número de inscrição é obrigatório';
        } else if (!/^\d+$/.test(formData.numero_inscricao)) {
            newErrors.numero_inscricao = 'Deve conter apenas números';
        }

        if (!formData.nome_completo.trim()) {
            newErrors.nome_completo = 'Nome completo é obrigatório';
        }

        if (!formData.cpf.trim()) {
            newErrors.cpf = 'CPF é obrigatório';
        } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
            newErrors.cpf = 'CPF inválido (formato: XXX.XXX.XXX-XX)';
        }

        if (!formData.data_nascimento) {
            newErrors.data_nascimento = 'Data de nascimento é obrigatória';
        }

        if (!formData.estado_civil) {
            newErrors.estado_civil = 'Estado civil é obrigatório';
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
        setErrorMessage('');

        try {
            const payload = {
                numero_inscricao: parseInt(formData.numero_inscricao),
                nome_completo: formData.nome_completo,
                cpf: formData.cpf,
                rg: formData.rg || null,
                estado_civil: formData.estado_civil,
                data_nascimento: formData.data_nascimento,
                email: formData.email,
                celular: formData.celular,
                telefone: formData.telefone || null,
                cep: formData.cep,
                logradouro: formData.rua,
                numero: formData.numero,
                bairro: formData.bairro,
                cidade: formData.cidade,
            };

            router.post('/cadastros/associados', payload, {
                onSuccess: () => {
                    setSuccessMessage('Associado criado com sucesso!');
                    setIsSubmitting(false);

                    setTimeout(() => {
                        handleClose();
                    }, 1200);
                },
                onError: () => {
                    setErrorMessage('Confira os dados e tente novamente.');
                    setIsSubmitting(false);
                },
            });
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Erro ao criar associado',
            );
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setCurrentStep(1);
        setFormData({
            numero_inscricao: '',
            nome_completo: '',
            cpf: '',
            rg: '',
            estado_civil: '',
            data_nascimento: '',
            email: '',
            celular: '',
            telefone: '',
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
        });
        setErrors({});
        setSuccessMessage('');
        setErrorMessage('');
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

                        {errorMessage && (
                            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                {errorMessage}
                            </div>
                        )}

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
                                    <Label htmlFor="numero_inscricao">
                                        Número de Inscrição *
                                    </Label>
                                    <Input
                                        id="numero_inscricao"
                                        placeholder="Digite o número"
                                        value={formData.numero_inscricao}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'numero_inscricao',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.numero_inscricao
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.numero_inscricao && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.numero_inscricao}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="nome_completo">
                                        Nome Completo *
                                    </Label>
                                    <Input
                                        id="nome_completo"
                                        placeholder="Digite o nome completo"
                                        value={formData.nome_completo}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'nome_completo',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.nome_completo
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.nome_completo && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.nome_completo}
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

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="data_nascimento">
                                            Data de Nascimento *
                                        </Label>
                                        <Input
                                            id="data_nascimento"
                                            type="date"
                                            value={formData.data_nascimento}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'data_nascimento',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.data_nascimento
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors.data_nascimento && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.data_nascimento}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="estado_civil">
                                            Estado Civil *
                                        </Label>
                                        <Select
                                            value={formData.estado_civil}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    'estado_civil',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger id="estado_civil">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {estadosCivis.map((estado) => (
                                                    <SelectItem
                                                        key={estado}
                                                        value={estado}
                                                    >
                                                        {estado}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.estado_civil && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.estado_civil}
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
                                    <Label htmlFor="telefone">
                                        Telefone Fixo
                                    </Label>
                                    <Input
                                        id="telefone"
                                        placeholder="(00) 0000-0000"
                                        value={formData.telefone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'telefone',
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

