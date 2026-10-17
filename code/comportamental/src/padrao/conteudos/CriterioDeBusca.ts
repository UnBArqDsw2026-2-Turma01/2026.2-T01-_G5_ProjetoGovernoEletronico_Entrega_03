import type { Conteudo } from "../../dominio/Conteudo";

export interface CriterioDeBusca {
  ordenar(conteudos: readonly Conteudo[]): Conteudo[];
}
