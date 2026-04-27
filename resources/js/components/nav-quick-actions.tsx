import { Link } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

export type QuickActionItem = {
    title: string;
    icon: LucideIcon;
    onClick?: () => void;
    href?: string;
};

export function NavQuickActions({ items = [] }: { items: QuickActionItem[] }) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.href ? (
                            <SidebarMenuButton
                                asChild
                                tooltip={{ children: item.title }}
                                className="cursor-pointer"
                            >
                                <Link href={item.href} prefetch>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        ) : (
                            <SidebarMenuButton
                                onClick={item.onClick}
                                tooltip={{ children: item.title }}
                                className="cursor-pointer"
                            >
                                <item.icon />
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}


