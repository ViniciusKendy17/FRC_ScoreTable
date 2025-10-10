
export enum Cor {
    azul = "azul",
    vermelho = "vermelho"
}

export interface Alianca {
    color: Cor,
    time1: number,
    time2: number,
    auto_pontos: number,
    teleop_pontos: number,
    faltas_pontos: number,
    total_pontos: number,
    total_rp: number
}
