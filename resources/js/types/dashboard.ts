import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { home } from '@/routes';

export interface Local {
    id: number;
    logradouro: string;
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
    grupos?: Grupo[];
}

export interface Reuniao {
    id: number;
    data_marcada: string;
    horario_inicio: string;
    projeto_id: number;
    local_id: number | null;
    projeto: Projeto;
    local: Local | null;
}

export interface DashboardProps {
    totalProjetos: number;
    totalAssociados: number;
    totalConcluidas: number;
    reunioesMes: Reuniao[];
    projetosComReuniao: Projeto[];
}
