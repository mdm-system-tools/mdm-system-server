'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface ComprovanteModalProps {
    isOpen: boolean;
    onClose: () => void;
    comprovante?: {
        mes: string;
        data: string;
        valor: string;
        arquivo: string;
    };
}

export default function ComprovanteModal({
    isOpen,
    onClose,
    comprovante,
}: ComprovanteModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Comprovante de Pagamento</DialogTitle>
                </DialogHeader>

                {comprovante && (
                    <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center py-6">
                            <div className="flex size-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
                                <svg
                                    className="size-8 text-gray-600 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {comprovante.arquivo}
                            </p>
                        </div>

                        <div className="space-y-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Pagamento do Mês:
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {comprovante.mes}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Data do Pagamento:
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {comprovante.data}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Valor
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {comprovante.valor}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                            >
                                baixar PDF
                            </Button>
                            <Button className="flex-1">
                                Compatilhar
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}


