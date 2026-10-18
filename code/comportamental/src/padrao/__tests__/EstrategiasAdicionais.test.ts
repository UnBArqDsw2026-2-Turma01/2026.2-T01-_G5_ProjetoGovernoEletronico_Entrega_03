import { describe, expect, it } from "vitest";
import type { UnidadeDeSaude } from "../../dominio/UnidadeDeSaude";
import type { Conteudo } from "../../dominio/Conteudo";
import { BuscaDeConteudo } from "../BuscaDeConteudo";
import { PorCategoria as PorCategoriaDeConteudo } from "../conteudos/PorCategoria";
import { PorRelevancia } from "../conteudos/PorRelevancia";
import { PorCategoria as PorCategoriaDeEstabelecimento } from "../PorCategoria";
import { PorDistancia } from "../PorDistancia";

const estabelecimentos: readonly UnidadeDeSaude[] = [
  { id: "1", nome: "Hospital A", distanciaKm: 4, natureza: "estadual", categoria: "Hospital" },
  { id: "2", nome: "UBS B", distanciaKm: 2, natureza: "municipal", categoria: "UBS" },
  { id: "3", nome: "Hospital C", distanciaKm: 1, natureza: "publica", categoria: "Hospital" },
];

const conteudos: readonly Conteudo[] = [
  { texto: "Artigo sobre vacinação", categoria: "Saúde", acessos: 12 },
  { texto: "Guia de alimentação", categoria: "Nutrição", acessos: 30 },
  { texto: "Prevenção de doenças", categoria: "Saúde", acessos: 20 },
];

describe("estratégias adicionais para estabelecimentos", () => {
  it("ordena por distância crescente sem modificar a lista original", () => {
    const resultado = new PorDistancia().ordenar(estabelecimentos);

    expect(resultado.map((item) => item.id)).toEqual(["3", "2", "1"]);
    expect(resultado).not.toBe(estabelecimentos);
    expect(estabelecimentos.map((item) => item.id)).toEqual(["1", "2", "3"]);
  });

  it("ordena por categoria em português e desempata pela menor distância", () => {
    const resultado = new PorCategoriaDeEstabelecimento().ordenar(estabelecimentos);

    expect(resultado.map((item) => item.id)).toEqual(["3", "1", "2"]);
  });

  it("retorna uma lista vazia para uma entrada vazia", () => {
    expect(new PorDistancia().ordenar([])).toEqual([]);
    expect(new PorCategoriaDeEstabelecimento().ordenar([])).toEqual([]);
  });
});

describe("estratégias de busca de conteúdo", () => {
  it("ordena por relevância, usando acessos decrescentes", () => {
    const resultado = new PorRelevancia().ordenar(conteudos);

    expect(resultado.map((item) => item.acessos)).toEqual([30, 20, 12]);
    expect(resultado).not.toBe(conteudos);
    expect(conteudos.map((item) => item.acessos)).toEqual([12, 30, 20]);
  });

  it("ordena conteúdos alfabeticamente por categoria em português", () => {
    const resultado = new PorCategoriaDeConteudo().ordenar(conteudos);

    expect(resultado.map((item) => item.categoria)).toEqual(["Nutrição", "Saúde", "Saúde"]);
  });

  it("delega a busca e permite trocar a estratégia durante a execução", () => {
    const busca = new BuscaDeConteudo(new PorRelevancia());

    expect(busca.buscar(conteudos).map((item) => item.acessos)).toEqual([30, 20, 12]);

    busca.definirCriterio(new PorCategoriaDeConteudo());

    expect(busca.buscar(conteudos).map((item) => item.categoria)).toEqual(["Nutrição", "Saúde", "Saúde"]);
  });

  it("retorna uma lista vazia para uma entrada vazia", () => {
    expect(new PorRelevancia().ordenar([])).toEqual([]);
    expect(new BuscaDeConteudo(new PorRelevancia()).buscar([])).toEqual([]);
  });
});
