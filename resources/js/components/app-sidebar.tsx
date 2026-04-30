import { Link } from '@inertiajs/react';
import { LayoutGrid, Phone, History, FileText, Users2 } from 'lucide-react';

import AppLogo from '@/components/app-logo';
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
import { cadastros, dashboard, historicoChamadas, chamadas } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const getFuncionarios = () => {
    console.log('buscando funcionários');
};

const quickActionItems: QuickActionItem[] = [
    {
        title: 'Chamada',
        icon: Phone,
        href: chamadas().url,
    },
    {
        title: 'Histórico de Chamada',
        icon: History,
        href: historicoChamadas().url,
    },
    {
        title: 'Lista de Cadastros',
        icon: FileText,
        href: cadastros().url,
    },
    //{
    //    title: 'Gerenciamento de Funcionários',
    //    icon: Users2,
    //    onClick: getFuncionarios,
    //},
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
