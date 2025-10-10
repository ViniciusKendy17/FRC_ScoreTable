export interface Partida {
    tipo_partida: Tipo_partida,
    azul_pontos: number,
    vermelho_pontos: number,
    status: Status,
    vencedor: Vencedor,
    alianca_vermelha_id: number,
    alianca_azul_id: number,
    horario: Date
}

export enum Tipo_partida {
    treino = "treino",
    qualificatorias = "qualificatorias",
    eliminatorias = "eliminatorias"
}

export enum Status {
    agendada = "agendada",
    em_progresso = "em_progresso",
    finalizada = "finalizada",
}

export enum Vencedor {
    azul = "azul",
    vermelho = "vermelho",
    empate = "empate"
}