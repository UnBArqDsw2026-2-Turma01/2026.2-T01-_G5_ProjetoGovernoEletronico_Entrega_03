import type { UnidadeDeSaude } from "../dominio/UnidadeDeSaude";
import type { CriterioDeBusca } from "./CriterioDeBusca";

export class PorDistancia implements CriterioDeBusca {
  ordenar(estabelecimentos: readonly UnidadeDeSaude[]): UnidadeDeSaude[] {
    return [...estabelecimentos].sort((a, b) => a.distanciaKm - b.distanciaKm);
  }
}
