import type { UnidadeDeSaude } from "../dominio/UnidadeDeSaude";
import type { CriterioDeBusca } from "./CriterioDeBusca";

export type Natureza = UnidadeDeSaude["natureza"];

export const ORDEM_PADRAO: readonly Natureza[] = ["municipal", "estadual", "publica", "privada"];

export class PorNatureza implements CriterioDeBusca {
  private readonly ordemDeNatureza: readonly Natureza[];

  constructor(ordemDeNatureza: readonly Natureza[] = ORDEM_PADRAO) {
    this.ordemDeNatureza = ordemDeNatureza;
  }

  ordenar(estabelecimentos: readonly UnidadeDeSaude[]): UnidadeDeSaude[] {
    return [...estabelecimentos].sort(
      (a, b) => this.prioridade(a) - this.prioridade(b) || a.distanciaKm - b.distanciaKm,
    );
  }

  private prioridade(unidade: UnidadeDeSaude): number {
    const posicao = this.ordemDeNatureza.indexOf(unidade.natureza);
    return posicao === -1 ? this.ordemDeNatureza.length : posicao;
  }
}
