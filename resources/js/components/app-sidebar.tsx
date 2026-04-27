import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Phone, History, FileText, Users2 } from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavQuickActions } from '@/components/nav-quick-actions';
import type { QuickActionItem } from '@/components/nav-quick-actions';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cadastros, dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

// Quick action functions
const getChamadas = () => {
    console.log('buscando chamadas');
};

const getHistoricoChamadas = () => {
    console.log('buscando histórico de chamadas');
};

const getFuncionarios = () => {
    console.log('buscando funcionários');
};

const quickActionItems: QuickActionItem[] = [
    {
        title: 'Chamada',
        icon: Phone,
        onClick: getChamadas,
    },
    {
        title: 'Histórico de Chamada',
        icon: History,
        onClick: getHistoricoChamadas,
    },
    {
        title: 'Lista de Cadastros',
        icon: FileText,
        href: cadastros().url,
    },
    {
        title: 'Gerenciamento de Funcionários',
        icon: Users2,
        onClick: getFuncionarios,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavQuickActions items={quickActionItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
