import { ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';

interface TabsProps {
    children: ReactNode;
    defaultValue: string;
    className?: string;
}

export function Tabs({ children, defaultValue, className }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <div className={className}>
            {Array.isArray(children)
                ? children.map((child: any) => {
                    if (child?.type?.displayName === 'TabsList') {
                        return { ...child, props: { ...child.props, activeTab, setActiveTab } };
                    }

                    return child;
                })
                : children}
            {Array.isArray(children)
                ? children.map((child: any) => {
                    if (child?.type?.displayName === 'TabsContent' && child.props.value === activeTab) {
                        return child;
                    }

                    return null;
                })
                : null}
        </div>
    );
}

interface TabsListProps {
    children: ReactNode;
    className?: string;
    activeTab?: string;
    setActiveTab?: (value: string) => void;
}

function TabsList({ children, className, activeTab, setActiveTab }: TabsListProps) {
    return (
        <div className={cn('flex gap-0 border-b border-gray-200 dark:border-gray-700', className)}>
            {Array.isArray(children)
                ? children.map((child: any, index) => {
                    if (child?.type?.displayName === 'TabsTrigger') {
                        return {
                            ...child,
                            props: {
                                ...child.props,
                                isActive: child.props.value === activeTab,
                                onClick: () => setActiveTab?.(child.props.value),
                            },
                        };
                    }

                    return child;
                })
                : children}
        </div>
    );
}

TabsList.displayName = 'TabsList';

interface TabsTriggerProps {
    children: ReactNode;
    value: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

function TabsTrigger({ children, value, isActive, onClick, className }: TabsTriggerProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
                isActive
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
                className,
            )}
        >
            {children}
        </button>
    );
}

TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps {
    children: ReactNode;
    value: string;
    className?: string;
}

function TabsContent({ children, value, className }: TabsContentProps) {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    );
}

TabsContent.displayName = 'TabsContent';

export { TabsList, TabsTrigger, TabsContent };



