export interface Local {
    id: number;
    logradouro: string;
    bairro: string;
    cidade: string;
}

export interface GrupoProjeto {
    id: number;
    projeto_id: number;
    horario: string;
}

export interface GrupoReuniao {
    id: number;
    horario: string;
    concluida: boolean;
}

export interface Projeto {
    id: number;
    nome: string;
    grupos: GrupoProjeto[];
}

export interface Reuniao {
    id: number;
    data_marcada: string;
    horario_inicio: string;
    projeto_id: number;
    local_id: number | null;
    projeto: Projeto;
    local: Local | null;
    grupos: GrupoReuniao[];
    concluida: boolean;
}

export interface ChamadasProps {
    reunioes?: Reuniao[];
    projetos?: Array<{
        id: number;
        nome: string;
        grupos?: GrupoProjeto[];
    }>;
    flash?: {
        success?: string;
        error?: string;
    };
}
