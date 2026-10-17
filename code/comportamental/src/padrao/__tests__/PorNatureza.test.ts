import { describe, expect, it } from "vitest";
import type { UnidadeDeSaude } from "../../dominio/UnidadeDeSaude";
import { redeDeSaudeSimulada } from "../../dominio/redeDeSaudeSimulada";
import { BuscaDeEstabelecimentos } from "../BuscaDeEstabelecimentos";
import { ORDEM_PADRAO, PorNatureza } from "../PorNatureza";

function unidade(id: string, natureza: UnidadeDeSaude["natureza"], distanciaKm: number): UnidadeDeSaude {
  return { id, nome: `Unidade ${id}`, distanciaKm, natureza, categoria: "UBS" };
}

describe("PorNatureza", () => {
  it("usa a ordem padrão municipal, estadual, publica e privada", () => {
    const lista = [
      unidade("privada", "privada", 1),
      unidade("publica", "publica", 1),
      unidade("estadual", "estadual", 1),
      unidade("municipal", "municipal", 1),
    ];

    const resultado = new PorNatureza().ordenar(lista);

    expect(resultado.map((u) => u.natureza)).toEqual([...ORDEM_PADRAO]);
  });

  it("desempata pela menor distância dentro da mesma natureza", () => {
    const lista = [
      unidade("longe", "municipal", 7.3),
      unidade("perto", "municipal", 3.4),
      unidade("meio", "municipal", 5),
    ];

    const resultado = new PorNatureza().ordenar(lista);

    expect(resultado.map((u) => u.id)).toEqual(["perto", "meio", "longe"]);
  });

  it("aceita outra ordem de prioridade pelo construtor", () => {
    const lista = [unidade("1", "municipal", 1), unidade("2", "privada", 2), unidade("3", "estadual", 3)];

    const resultado = new PorNatureza(["privada", "estadual", "municipal"]).ordenar(lista);

    expect(resultado.map((u) => u.id)).toEqual(["2", "3", "1"]);
  });

  it("coloca no fim, por distância, as naturezas que não estão na ordem informada", () => {
    const lista = [unidade("1", "municipal", 5), unidade("2", "privada", 9), unidade("3", "estadual", 1)];

    const resultado = new PorNatureza(["privada"]).ordenar(lista);

    expect(resultado.map((u) => u.id)).toEqual(["2", "3", "1"]);
  });

  it("devolve uma lista nova, com os mesmos estabelecimentos, sem alterar a recebida", () => {
    const original = [...redeDeSaudeSimulada];

    const resultado = new PorNatureza().ordenar(redeDeSaudeSimulada);

    expect(resultado).not.toBe(redeDeSaudeSimulada);
    expect(redeDeSaudeSimulada).toEqual(original);
    expect([...resultado].sort((a, b) => a.id.localeCompare(b.id))).toEqual(
      [...original].sort((a, b) => a.id.localeCompare(b.id)),
    );
  });

  it("retorna lista vazia quando não há estabelecimentos", () => {
    expect(new PorNatureza().ordenar([])).toEqual([]);
  });

  it("funciona como estratégia do contexto BuscaDeEstabelecimentos", () => {
    const busca = new BuscaDeEstabelecimentos(new PorNatureza());

    const resultado = busca.buscar(redeDeSaudeSimulada);

    expect(resultado.map((u) => u.id)).toEqual(["6", "4", "9", "2", "7", "1", "5", "3", "10", "8"]);
  });
});
