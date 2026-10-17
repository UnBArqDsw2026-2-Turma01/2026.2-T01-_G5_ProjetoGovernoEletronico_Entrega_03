import type { CriterioDeBusca } from "../padrao/CriterioDeBusca";
import { PorCategoria } from "../padrao/PorCategoria";
import { PorDistancia } from "../padrao/PorDistancia";
import { PorNatureza } from "../padrao/PorNatureza";

export interface OpcaoDeCriterio {
  id: string;
  rotulo: string;
  criterio: CriterioDeBusca;
}

export type ListaDeCriterios = readonly [OpcaoDeCriterio, ...OpcaoDeCriterio[]];

export const criteriosDisponiveis: ListaDeCriterios = [
  { id: "natureza", rotulo: "Natureza", criterio: new PorNatureza() },
  { id: "distancia", rotulo: "Menor distância", criterio: new PorDistancia() },
  { id: "categoria", rotulo: "Categoria (A–Z)", criterio: new PorCategoria() },
];
