import type { Conteudo } from "../../dominio/Conteudo";
import type { CriterioDeBusca } from "./CriterioDeBusca";

const COMPARADOR_DE_CATEGORIA = new Intl.Collator("pt-BR", {
  sensitivity: "base",
  usage: "sort",
});

export class PorCategoria implements CriterioDeBusca {
  ordenar(conteudos: readonly Conteudo[]): Conteudo[] {
    return [...conteudos].sort((a, b) =>
      COMPARADOR_DE_CATEGORIA.compare(a.categoria, b.categoria),
    );
  }
}
