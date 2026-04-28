import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface AdicionarPagamentoModalProps {
    isOpen: boolean;
    onClose: () => void;
    mesAberto?: string;
}

export default function AdicionarPagamentoModal({
    isOpen,
    onClose,
    mesAberto,
}: AdicionarPagamentoModalProps) {
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setArquivo(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!arquivo) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Enviando comprovante:', arquivo);
            setArquivo(null);
            setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Pagamento</DialogTitle>
                    <DialogDescription>
                        {mesAberto || 'Envie o comprovante de pagamento'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                        <label className="flex flex-col items-center justify-center cursor-pointer">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 mb-3">
                                <svg
                                    className="size-6 text-blue-600 dark:text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Clique para enviar um arquivo
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*,.pdf"
                            />
                        </label>

                        {arquivo && (
                            <div className="mt-4">
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                    ✓ Arquivo selecionado: {arquivo.name}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={handleSubmit}
                            disabled={!arquivo || isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : 'Adicionar'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}


