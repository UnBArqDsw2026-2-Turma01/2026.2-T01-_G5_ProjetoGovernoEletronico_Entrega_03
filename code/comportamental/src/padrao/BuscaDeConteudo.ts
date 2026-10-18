import type { Conteudo } from "../dominio/Conteudo";
import type { CriterioDeBusca } from "./conteudos/CriterioDeBusca";

export class BuscaDeConteudos {
  private criterio: CriterioDeBusca;

  constructor(criterioInicial: CriterioDeBusca) {
    this.criterio = criterioInicial;
  }

  definirCriterio(criterio: CriterioDeBusca): void {
    this.criterio = criterio;
  }

  buscar<T extends Conteudo>(conteudos: readonly T[]): T[] {
    return this.criterio.ordenar(conteudos) as T[];
  }
}

export { BuscaDeConteudos as BuscaDeConteudo };
