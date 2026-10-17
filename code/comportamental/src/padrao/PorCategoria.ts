import type { UnidadeDeSaude } from "../dominio/UnidadeDeSaude";
import type { CriterioDeBusca } from "./CriterioDeBusca";

const COMPARADOR_DE_CATEGORIA = new Intl.Collator("pt-BR", {
  sensitivity: "base",
  usage: "sort",
});

export class PorCategoria implements CriterioDeBusca {
  ordenar(estabelecimentos: readonly UnidadeDeSaude[]): UnidadeDeSaude[] {
    return [...estabelecimentos].sort(
      (a, b) =>
        COMPARADOR_DE_CATEGORIA.compare(a.categoria, b.categoria) ||
        a.distanciaKm - b.distanciaKm,
    );
  }
}
