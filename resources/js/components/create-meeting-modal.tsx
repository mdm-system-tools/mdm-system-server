import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
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

type CreateMeetingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    projects: Array<{ id: number; name: string }>;
};

// Simple calendar component
function Calendar({
    selectedDate,
    onDateChange,
}: {
    selectedDate: Date | null;
    onDateChange: (date: Date) => void;
}) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthName = currentDate.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
    });

    const handlePreviousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
        );
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
        );
        onDateChange(newDate);
    };

    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startingDayOfWeek = firstDayOfMonth(currentDate);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
        days.push(i);
    }

    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    const isDateSelected = (day: number | null) => {
        if (!day || !selectedDate) {
            return false;
        }

        return (
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
        );
    };

    const isToday = (day: number | null) => {
        if (!day) {
            return false;
        }

        const today = new Date();

        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={handlePreviousMonth}
                    className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <ChevronLeft className="size-5" />
                </button>
                <h3 className="text-center font-semibold capitalize text-gray-900 dark:text-white">
                    {monthName}
                </h3>
                <button
                    onClick={handleNextMonth}
                    className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <ChevronRight className="size-5" />
                </button>
            </div>

            {/* Day names */}
            <div className="mb-2 grid grid-cols-7 gap-1">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="space-y-1">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-1">
                        {week.map((day, dayIndex) => (
                            <button
                                key={dayIndex}
                                onClick={() => day && handleDateClick(day)}
                                disabled={!day}
                                className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                                    !day
                                        ? 'cursor-default text-gray-300 dark:text-gray-700'
                                        : isDateSelected(day)
                                          ? 'bg-blue-500 text-white'
                                          : isToday(day)
                                            ? 'border border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function CreateMeetingModal({
    isOpen,
    onClose,
    projects = [],
}: CreateMeetingModalProps) {
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [address, setAddress] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    const formattedDate = useMemo(() => {
        if (!selectedDate) {
            return 'Selecione uma data';
        }

        return selectedDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }, [selectedDate]);

    const handleSubmit = () => {
        if (!selectedProject || !selectedDate || !address.trim()) {
            alert('Por favor, preencha todos os campos');

            return;
        }

        console.log('Criando reunião:', {
            projectId: selectedProject,
            date: selectedDate.toISOString(),
            address: address,
        });

        // Reset form
        setSelectedProject('');
        setSelectedDate(null);
        setAddress('');
        setShowCalendar(false);
        onClose();
    };

    const handleClose = () => {
        setSelectedProject('');
        setSelectedDate(null);
        setAddress('');
        setShowCalendar(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Criar Reunião</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes da nova reunião
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Project Select */}
                    <div className="space-y-2">
                        <Label htmlFor="project">Projeto</Label>
                        <Select value={selectedProject} onValueChange={setSelectedProject}>
                            <SelectTrigger id="project">
                                <SelectValue placeholder="Selecione um projeto" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((project) => (
                                    <SelectItem
                                        key={project.id}
                                        value={String(project.id)}
                                    >
                                        {project.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Field */}
                    <div className="space-y-2">
                        <Label>Data</Label>
                        <button
                            onClick={() => setShowCalendar(!showCalendar)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                        >
                            {formattedDate}
                        </button>

                        {showCalendar && (
                            <Calendar
                                selectedDate={selectedDate}
                                onDateChange={(date) => {
                                    setSelectedDate(date);
                                    setShowCalendar(false);
                                }}
                            />
                        )}
                    </div>

                    {/* Address Input */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                            id="address"
                            placeholder="Digite o endereço"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            className="flex-1"
                            onClick={handleSubmit}
                        >
                            Criar Reunião
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}






