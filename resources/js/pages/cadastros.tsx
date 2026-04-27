import { Head, usePage } from '@inertiajs/react';
import { ChevronLeft, Search, Settings } from 'lucide-react';
import { useState } from 'react';

import CreateAssociadoModal from '@/components/create-associado-modal';
import CreateGrupoModal from '@/components/create-grupo-modal';
import CreateProjetoModal from '@/components/create-projeto-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cadastros } from '@/routes';


interface ListItemProps {
    id: string;
    name: string;
    subtitle: string;
    color: string;
}

function ListItem({ id, name, subtitle, color }: ListItemProps) {
    const bgColor = {
        purple: 'bg-purple-200 text-purple-700',
        blue: 'bg-blue-200 text-blue-700',
        green: 'bg-green-200 text-green-700',
        pink: 'bg-pink-200 text-pink-700',
    }[color] || 'bg-purple-200 text-purple-700';

    return (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
            <div className={`flex size-12 items-center justify-center rounded-lg font-semibold ${bgColor}`}>
                {id}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                →
            </button>
        </div>
    );
}

interface TabContentProps {
    items: Array<any>;
    type: 'associados' | 'grupos' | 'projetos';
    onAddClick?: () => void;
}

function TabContent({ items, type, onAddClick }: TabContentProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const colorMap = ['purple', 'blue', 'green', 'pink'];

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="pesquisar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="size-4" />
                    Filtros
                </Button>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
                <Button className="gap-2" onClick={onAddClick}>
                    <span>+</span>
                    Adicionar
                </Button>
            </div>

            {/* List */}
            <div className="space-y-2">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => {
                        if (type === 'associados') {
                            return (
                                <ListItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    subtitle={item.number}
                                    color={colorMap[index % 4]}
                                />
                            );
                        }

                        if (type === 'grupos') {
                            return (
                                <ListItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    subtitle={`${item.members} membros`}
                                    color={colorMap[index % 4]}
                                />
                            );
                        }

                        if (type === 'projetos') {
                            return (
                                <ListItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    subtitle={item.status}
                                    color={colorMap[index % 4]}
                                />
                            );
                        }

                        return null;
                    })
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                            Nenhum resultado encontrado
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Cadastros() {
    const { associados, grupos, projetos } = usePage<any>().props;
    const [activeTab, setActiveTab] = useState('associados');
    const [isCreateAssociadoModalOpen, setIsCreateAssociadoModalOpen] =
        useState(false);
    const [isCreateGrupoModalOpen, setIsCreateGrupoModalOpen] = useState(false);
    const [isCreateProjetoModalOpen, setIsCreateProjetoModalOpen] =
        useState(false);

    // Transform API data to frontend format
    const formattedAssociados = associados.map((a: any) => ({
        id: a.id,
        name: a.nome_completo,
        number: a.numero_inscricao,
    }));

    const formattedGrupos = grupos.map((g: any) => ({
        id: g.id,
        name: `Grupo - ${g.projeto?.nome || 'Sem Projeto'}`,
        members: 0, // Will be calculated from associados
    }));

    const formattedProjetos = projetos.map((p: any) => ({
        id: p.id,
        name: p.nome,
        status: p.status ? 'Ativo' : 'Inativo',
    }));

    return (
        <>
            <Head title="Lista de Cadastros" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button className="rounded-lg hover:bg-gray-100 p-2 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Lista de cadastros
                    </h1>
                </div>

                {/* Tabs */}
                <div className="space-y-4">
                    {/* Tab Buttons */}
                    <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700">
                        {['associados', 'grupos', 'projetos'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'associados' && (
                            <TabContent
                                items={formattedAssociados}
                                type="associados"
                                onAddClick={() =>
                                    setIsCreateAssociadoModalOpen(true)
                                }
                            />
                        )}
                        {activeTab === 'grupos' && (
                            <TabContent
                                items={formattedGrupos}
                                type="grupos"
                                onAddClick={() =>
                                    setIsCreateGrupoModalOpen(true)
                                }
                            />
                        )}
                        {activeTab === 'projetos' && (
                            <TabContent
                                items={formattedProjetos}
                                type="projetos"
                                onAddClick={() =>
                                    setIsCreateProjetoModalOpen(true)
                                }
                            />
                        )}
                    </div>
                </div>

                {/* Create Associado Modal */}
                <CreateAssociadoModal
                    isOpen={isCreateAssociadoModalOpen}
                    onClose={() => setIsCreateAssociadoModalOpen(false)}
                />

                {/* Create Grupo Modal */}
                <CreateGrupoModal
                    isOpen={isCreateGrupoModalOpen}
                    onClose={() => setIsCreateGrupoModalOpen(false)}
                />

                {/* Create Projeto Modal */}
                <CreateProjetoModal
                    isOpen={isCreateProjetoModalOpen}
                    onClose={() => setIsCreateProjetoModalOpen(false)}
                />
            </div>
        </>
    );
}

Cadastros.layout = {
    breadcrumbs: [
        {
            title: 'Lista de cadastros',
            href: cadastros.url(),
        },
    ],
};


