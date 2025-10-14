
export enum Cor {
    azul = "azul",
    vermelho = "vermelho"
}

export interface Alianca {
    color: Cor,
    time1: number,
    time2: number,
    time3:number,
    partida_id: number | null
    auto_pontos: number,
    teleop_pontos: number,
    faltas_pontos: number,
    total_pontos: number,
    total_rp: number
}
