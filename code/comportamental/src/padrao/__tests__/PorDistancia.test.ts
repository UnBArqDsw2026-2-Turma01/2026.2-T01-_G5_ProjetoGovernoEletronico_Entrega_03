import { describe, expect, it } from "vitest";
import type { UnidadeDeSaude } from "../../dominio/UnidadeDeSaude";
import { PorDistancia } from "../PorDistancia";

const estabelecimentos: readonly UnidadeDeSaude[] = [
  { id: "1", nome: "Hospital A", distanciaKm: 4, natureza: "estadual", categoria: "Hospital" },
  { id: "2", nome: "UBS B", distanciaKm: 2, natureza: "municipal", categoria: "UBS" },
  { id: "3", nome: "Hospital C", distanciaKm: 1, natureza: "publica", categoria: "Hospital" },
];

describe("PorDistancia", () => {
  it("ordena estabelecimentos por distância crescente", () => {
    const resultado = new PorDistancia().ordenar(estabelecimentos);

    expect(resultado.map((item) => item.id)).toEqual(["3", "2", "1"]);
  });

  it("retorna uma lista nova sem modificar a lista original", () => {
    const resultado = new PorDistancia().ordenar(estabelecimentos);

    expect(resultado).not.toBe(estabelecimentos);
    expect(estabelecimentos.map((item) => item.id)).toEqual(["1", "2", "3"]);
  });

  it("retorna uma lista vazia para uma entrada vazia", () => {
    expect(new PorDistancia().ordenar([])).toEqual([]);
  });
});
