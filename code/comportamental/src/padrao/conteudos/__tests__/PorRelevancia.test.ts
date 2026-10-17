import { describe, expect, it } from "vitest";
import type { Conteudo } from "../../../dominio/Conteudo";
import { PorRelevancia } from "../PorRelevancia";

const conteudos: readonly Conteudo[] = [
  { texto: "Artigo sobre vacinação", categoria: "Saúde", acessos: 12 },
  { texto: "Guia de alimentação", categoria: "Nutrição", acessos: 30 },
  { texto: "Prevenção de doenças", categoria: "Saúde", acessos: 20 },
];

describe("PorRelevancia", () => {
  it("ordena conteúdos por número de acessos decrescente", () => {
    const resultado = new PorRelevancia().ordenar(conteudos);

    expect(resultado.map((item) => item.acessos)).toEqual([30, 20, 12]);
  });

  it("retorna uma lista nova sem modificar a lista original", () => {
    const resultado = new PorRelevancia().ordenar(conteudos);

    expect(resultado).not.toBe(conteudos);
    expect(conteudos.map((item) => item.acessos)).toEqual([12, 30, 20]);
  });

  it("retorna uma lista vazia para uma entrada vazia", () => {
    expect(new PorRelevancia().ordenar([])).toEqual([]);
  });
});
