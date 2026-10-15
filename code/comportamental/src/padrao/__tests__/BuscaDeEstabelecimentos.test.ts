import { describe, expect, it, vi } from "vitest";
import type { UnidadeDeSaude } from "../../dominio/UnidadeDeSaude";
import { estabelecimentosSimulados } from "../../dominio/estabelecimentosSimulados";
import { BuscaDeEstabelecimentos } from "../BuscaDeEstabelecimentos";
import type { CriterioDeBusca } from "../CriterioDeBusca";

class CriterioFixo implements CriterioDeBusca {
  private readonly resultado: UnidadeDeSaude[];

  constructor(resultado: UnidadeDeSaude[]) {
    this.resultado = resultado;
  }

  ordenar(): UnidadeDeSaude[] {
    return this.resultado;
  }
}

class CriterioPorDistanciaDeTeste implements CriterioDeBusca {
  ordenar(estabelecimentos: readonly UnidadeDeSaude[]): UnidadeDeSaude[] {
    return [...estabelecimentos].sort((a, b) => a.distanciaKm - b.distanciaKm);
  }
}

describe("BuscaDeEstabelecimentos", () => {
  it("delega a ordenação ao critério atual", () => {
    const resultadoEsperado = [estabelecimentosSimulados[2]];
    const busca = new BuscaDeEstabelecimentos(new CriterioFixo(resultadoEsperado));

    expect(busca.buscar(estabelecimentosSimulados)).toBe(resultadoEsperado);
  });

  it("troca de estratégia em tempo de execução", () => {
    const resultadoA = [estabelecimentosSimulados[0]];
    const resultadoB = [estabelecimentosSimulados[1], estabelecimentosSimulados[3]];
    const busca = new BuscaDeEstabelecimentos(new CriterioFixo(resultadoA));

    expect(busca.buscar(estabelecimentosSimulados)).toBe(resultadoA);

    busca.definirCriterio(new CriterioFixo(resultadoB));

    expect(busca.buscar(estabelecimentosSimulados)).toBe(resultadoB);
  });

  it("não altera a lista original de estabelecimentos", () => {
    const original = [...estabelecimentosSimulados];
    const busca = new BuscaDeEstabelecimentos(new CriterioFixo([]));

    busca.buscar(estabelecimentosSimulados);

    expect(estabelecimentosSimulados).toEqual(original);
  });

  it("repassa a mesma lista recebida para a estratégia, sem cópias intermediárias", () => {
    const criterio: CriterioDeBusca = { ordenar: vi.fn().mockReturnValue([]) };
    const busca = new BuscaDeEstabelecimentos(criterio);

    busca.buscar(estabelecimentosSimulados);

    expect(criterio.ordenar).toHaveBeenCalledOnce();
    expect(criterio.ordenar).toHaveBeenCalledWith(estabelecimentosSimulados);
  });

  it("retorna lista vazia quando não há estabelecimentos", () => {
    const busca = new BuscaDeEstabelecimentos(new CriterioPorDistanciaDeTeste());

    expect(busca.buscar([])).toEqual([]);
  });

  it("ordena corretamente com uma estratégia concreta real (distância)", () => {
    const busca = new BuscaDeEstabelecimentos(new CriterioPorDistanciaDeTeste());

    const resultado = busca.buscar(estabelecimentosSimulados);

    expect(resultado.map((u) => u.id)).toEqual(["3", "1", "2", "4"]);
  });

  it("usa o critério passado no construtor antes de qualquer troca", () => {
    const busca = new BuscaDeEstabelecimentos(new CriterioPorDistanciaDeTeste());

    expect(busca.buscar(estabelecimentosSimulados)[0]?.id).toBe("3");
  });
});
