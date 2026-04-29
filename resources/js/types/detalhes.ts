// --- Tipos Auxiliares e Enums ---
export type Tab = 'informacoes' | 'dependentes' | 'pagamentos';

// --- Interfaces de Entidades Base ---
export interface Projeto {
    id: number;
    nome: string;
    regiao?: string;
    valor?: number;
    status?: boolean;
    grupos_count?: number;
}

export interface Grupo {
    id: number;
    horario: string;
    projeto_id?: number;
    associados_count?: number;
    projeto: Projeto | null;
    associados?: Partial<Associado>[];
}

export interface Dependente {
    id: number;
    nome_completo: string;
    cpf: string;
    rg: string;
    certidao: string | null;
}

export interface Pagamento {
    id: number;
    data_pagamento: string | null;
    status: string;
    divida?: {
        id: number;
        valor: string | number;
        data_divida: string;
    } | null;
}

export interface Associado {
    id: number;
    nome_completo: string;
    numero_inscricao: string;
    cpf: string;
    rg: string | null;
    estado_civil: string;
    email: string | null;
    celular?: string;
    status: boolean;
    grupo: Grupo | null;
    dependentes: Dependente[];
    pagamentos: Pagamento[];
}

export interface Chamada {
    id: number;
    numero_inscricao: string;
    reuniao_id: number;
    presenca: boolean;
    justificativa: string | null;
    created_at: string;
    associado: Pick<Associado, 'id' | 'nome_completo' | 'numero_inscricao' | 'email' | 'celular'>;
    reuniao: {
        id: number;
        data_marcada: string;
        horario_inicio: string;
        horario_fim: string;
        projeto: Projeto;
        chamada: Array<{
            id: number;
            presenca: boolean;
            associado: { nome_completo: string };
        }>;
    };
    chamada_count?: number;
}

// --- Interfaces de Props (Componentes) ---

export interface DetalhesAssociadoProps {
    associado: Associado;
    grupos: Grupo[]; // Lista para o select de atribuição
}

export interface DetalhesGrupoProps {
    grupo: Grupo;
}

export interface DetalhesProjetoProps {
    projeto: Projeto & {
        grupos: Array<{
            id: number;
            horario: string;
            associados: Array<{ id: number }>;
        }>;
    };
}

export interface DetalhesChamadaProps {
    chamada: Chamada;
}
