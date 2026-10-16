import type { UnidadeDeSaude } from "../dominio/UnidadeDeSaude";
import type { CriterioDeBusca } from "./CriterioDeBusca";

export class BuscaDeEstabelecimentos {
  private criterio: CriterioDeBusca;

  constructor(criterioInicial: CriterioDeBusca) {
    this.criterio = criterioInicial;
  }

  definirCriterio(criterio: CriterioDeBusca): void {
    this.criterio = criterio;
  }

  buscar(estabelecimentos: readonly UnidadeDeSaude[]): UnidadeDeSaude[] {
    return this.criterio.ordenar(estabelecimentos);
  }
}
