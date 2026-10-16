import type { UnidadeDeSaude } from "../dominio/UnidadeDeSaude";

export interface CriterioDeBusca {
  ordenar(estabelecimentos: readonly UnidadeDeSaude[]): UnidadeDeSaude[];
}
