import type { Conteudo } from "../../dominio/Conteudo";
import type { CriterioDeBusca } from "./CriterioDeBusca";

export class PorRelevancia implements CriterioDeBusca {
  ordenar(conteudos: readonly Conteudo[]): Conteudo[] {
    return [...conteudos].sort((a, b) => b.acessos - a.acessos);
  }
}
