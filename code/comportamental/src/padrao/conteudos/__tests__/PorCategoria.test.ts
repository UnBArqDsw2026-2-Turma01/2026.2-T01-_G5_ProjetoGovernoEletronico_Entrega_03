import { describe, expect, it } from "vitest";
import type { Conteudo } from "../../../dominio/Conteudo";
import { PorCategoria } from "../PorCategoria";

const conteudos: readonly Conteudo[] = [
  { texto: "Artigo sobre vacinação", categoria: "Saúde", acessos: 12 },
  { texto: "Guia de alimentação", categoria: "Nutrição", acessos: 30 },
  { texto: "Prevenção de doenças", categoria: "Saúde", acessos: 20 },
];

describe("PorCategoria (conteúdos)", () => {
  it("ordena conteúdos alfabeticamente por categoria em português", () => {
    const resultado = new PorCategoria().ordenar(conteudos);

    expect(resultado.map((item) => item.categoria)).toEqual(["Nutrição", "Saúde", "Saúde"]);
  });

  it("retorna uma lista nova sem modificar a lista original", () => {
    const resultado = new PorCategoria().ordenar(conteudos);

    expect(resultado).not.toBe(conteudos);
    expect(conteudos.map((item) => item.categoria)).toEqual(["Saúde", "Nutrição", "Saúde"]);
  });

  it("retorna uma lista vazia para uma entrada vazia", () => {
    expect(new PorCategoria().ordenar([])).toEqual([]);
  });
});
