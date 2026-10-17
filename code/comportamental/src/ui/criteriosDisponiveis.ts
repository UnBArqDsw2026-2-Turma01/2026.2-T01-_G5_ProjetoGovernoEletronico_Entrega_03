import type { CriterioDeBusca } from "../padrao/CriterioDeBusca";
import { PorNatureza } from "../padrao/PorNatureza";

export interface OpcaoDeCriterio {
  id: string;
  rotulo: string;
  criterio: CriterioDeBusca;
}

export type ListaDeCriterios = readonly [OpcaoDeCriterio, ...OpcaoDeCriterio[]];

export const criteriosDisponiveis: ListaDeCriterios = [
  { id: "natureza", rotulo: "Natureza", criterio: new PorNatureza() },
];
