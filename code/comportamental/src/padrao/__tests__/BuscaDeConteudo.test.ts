import { describe, expect, it } from "vitest";
import type { Conteudo } from "../../dominio/Conteudo";
import { BuscaDeConteudo } from "../BuscaDeConteudo";
import { PorCategoria } from "../conteudos/PorCategoria";
import { PorRelevancia } from "../conteudos/PorRelevancia";

const conteudos: readonly Conteudo[] = [
  { texto: "Artigo sobre vacinação", categoria: "Saúde", acessos: 12 },
  { texto: "Guia de alimentação", categoria: "Nutrição", acessos: 30 },
  { texto: "Prevenção de doenças", categoria: "Saúde", acessos: 20 },
];

describe("BuscaDeConteudo", () => {
  it("delega a busca para a estratégia de relevância selecionada", () => {
    const busca = new BuscaDeConteudo(new PorRelevancia());

    expect(busca.buscar(conteudos).map((item) => item.acessos)).toEqual([30, 20, 12]);
  });

  it("permite trocar a estratégia durante a execução", () => {
    const busca = new BuscaDeConteudo(new PorRelevancia());
    busca.definirCriterio(new PorCategoria());

    expect(busca.buscar(conteudos).map((item) => item.categoria)).toEqual(["Nutrição", "Saúde", "Saúde"]);
  });

  it("retorna uma lista vazia quando não há conteúdos", () => {
    const busca = new BuscaDeConteudo(new PorRelevancia());

    expect(busca.buscar([])).toEqual([]);
  });
});
