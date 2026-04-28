import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Search, Settings } from 'lucide-react';
import { useState } from 'react';

import CreateAssociadoModal from '@/components/create-associado-modal';
import CreateGrupoModal from '@/components/create-grupo-modal';
import CreateProjetoModal from '@/components/create-projeto-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    cadastros,
    detalhesAssociado,
    detalhesGrupo,
    detalhesProjeto,
    home,
} from '@/routes';

interface CadastrosProps {
    associados: Array<{
        id: number | string;
        nome_completo: string;
        numero_inscricao: string;
    }>;
    grupos: Array<{
        id: number | string;
        horario: string;
        associados_count?: number;
        projeto?: {
            nome: string;
        } | null;
    }>;
    projetos: Array<{
        id: number | string;
        nome: string;
        status: boolean;
    }>;
}

interface CadastrosListItem {
    id: number | string;
    name: string;
    number?: string;
    members?: number;
    status?: string;
}


interface ListItemProps {
    id: string | number;
    name: string;
    subtitle: string;
    color: string;
    href: string;
}

function ListItem({ id, name, subtitle, color, href }: ListItemProps) {
    const bgColor = {
        purple: 'bg-purple-200 text-purple-700',
        blue: 'bg-blue-200 text-blue-700',
        green: 'bg-green-200 text-green-700',
        pink: 'bg-pink-200 text-pink-700',
    }[color] || 'bg-purple-200 text-purple-700';

    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-700 dark:hover:bg-gray-800"
        >
            <div className={`flex size-12 items-center justify-center rounded-lg font-semibold ${bgColor}`}>
                {id}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
            <span className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300">
                →
            </span>
        </Link>
    );
}

interface TabContentProps {
    items: Array<CadastrosListItem>;
    type: 'associados' | 'grupos' | 'projetos';
    onAddClick?: () => void;
}

function TabContent({ items, type, onAddClick }: TabContentProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const colorMap = ['purple', 'blue', 'green', 'pink'];
    const getItemHref = (item: CadastrosListItem): string => {
        const id = Number(item.id);

        if (type === 'associados') {
            return detalhesAssociado({ associado: id }).url;
        }

        if (type === 'grupos') {
            return detalhesGrupo({ grupo: id }).url;
        }

        return detalhesProjeto({ projeto: id }).url;
    };

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
                                    subtitle={item.number ?? ''}
                                    color={colorMap[index % 4]}
                                    href={getItemHref(item)}
                                />
                            );
                        }

                        if (type === 'grupos') {
                            return (
                                <ListItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    subtitle={`${item.members ?? 0} membros`}
                                    color={colorMap[index % 4]}
                                    href={getItemHref(item)}
                                />
                            );
                        }

                        if (type === 'projetos') {
                            return (
                                <ListItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    subtitle={item.status ?? ''}
                                    color={colorMap[index % 4]}
                                    href={getItemHref(item)}
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

export default function Cadastros({ associados, grupos, projetos }: CadastrosProps) {
    const [activeTab, setActiveTab] = useState('associados');
    const [isCreateAssociadoModalOpen, setIsCreateAssociadoModalOpen] =
        useState(false);
    const [isCreateGrupoModalOpen, setIsCreateGrupoModalOpen] = useState(false);
    const [isCreateProjetoModalOpen, setIsCreateProjetoModalOpen] =
        useState(false);

    // Transform API data to frontend format
    const formattedAssociados = associados.map((a) => ({
        id: a.id,
        name: a.nome_completo,
        number: a.numero_inscricao,
    }));

    const formattedGrupos = grupos.map((g) => ({
        id: g.id,
        name: `Grupo - ${g.projeto?.nome || 'Sem Projeto'}`,
        members: g.associados_count ?? 0,
    }));

    const formattedProjetos = projetos.map((p) => ({
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
                    <Link href={home()} className="rounded-lg hover:bg-gray-100 p-2 dark:hover:bg-gray-800">
                        <ChevronLeft className="size-5 text-gray-700 dark:text-gray-300" />
                    </Link>
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
                    projetos={projetos.map((projeto) => ({
                        id: Number(projeto.id),
                        nome: projeto.nome,
                    }))}
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


