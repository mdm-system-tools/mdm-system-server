export interface CadastrosProps {
    associados: Array<{
        id: number | string;
        nome_completo: string;
        numero_inscricao: string;
        status: boolean;
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

export interface CadastrosListItem {
    id: number | string;
    name: string;
    number?: string;
    members?: number;
    status?: boolean;
}

export interface ListItemProps {
    id: string | number;
    name: string;
    subtitle: string;
    color: string;
    href: string;
    isInactive?: boolean;
}
