export interface Local {
    id: number;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
}

export interface Grupo {
    id: number;
    projeto_id: number;
    horario: string;
}

export interface Projeto {
    id: number;
    nome: string;
    grupos: Grupo[];
}

export interface Reuniao {
    id: number;
    data_marcada: string;
    horario_inicio: string;
    projeto_id: number;
    local_id: number;
    projeto: Projeto;
    local: Local;
}

export interface ChamadasProps {
    reunioes?: Reuniao[];
    projetos?: Array<{
        id: number;
        nome: string;
        grupos?: Grupo[];
    }>;
    flash?: {
        success?: string;
        error?: string;
    };
}
