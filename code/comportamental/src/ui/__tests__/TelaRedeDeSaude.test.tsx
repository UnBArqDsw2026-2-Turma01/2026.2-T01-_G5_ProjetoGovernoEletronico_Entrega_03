import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { UnidadeDeSaude } from "../../dominio/UnidadeDeSaude";
import { redeDeSaudeSimulada } from "../../dominio/redeDeSaudeSimulada";
import type { CriterioDeBusca } from "../../padrao/CriterioDeBusca";
import { PorNatureza } from "../../padrao/PorNatureza";
import { TelaRedeDeSaude } from "../TelaRedeDeSaude";
import { criteriosDisponiveis, type ListaDeCriterios } from "../criteriosDisponiveis";

class PorNomeDeTeste implements CriterioDeBusca {
  ordenar(estabelecimentos: readonly UnidadeDeSaude[]): UnidadeDeSaude[] {
    return [...estabelecimentos].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }
}

function nomesNaTela(): string[] {
  const lista = screen.getByRole("list", { name: "Estabelecimentos" });
  return within(lista)
    .getAllByRole("listitem")
    .map((item) => item.querySelector("strong")?.textContent ?? "");
}

describe("TelaRedeDeSaude", () => {
  it("mostra todos os estabelecimentos ordenados pelo primeiro critério", () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    const esperado = new PorNatureza().ordenar(redeDeSaudeSimulada).map((u) => u.nome);
    expect(nomesNaTela()).toEqual(esperado);
    expect(screen.getByRole("combobox", { name: "Ordenar por" })).toHaveValue("natureza");
  });

  it("reordena a lista quando o critério é trocado no seletor", async () => {
    const criterios: ListaDeCriterios = [
      { id: "natureza", rotulo: "Natureza", criterio: new PorNatureza() },
      { id: "nome", rotulo: "Nome", criterio: new PorNomeDeTeste() },
    ];
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criterios} />);

    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Ordenar por" }), "nome");

    const esperado = new PorNomeDeTeste().ordenar(redeDeSaudeSimulada).map((u) => u.nome);
    expect(nomesNaTela()).toEqual(esperado);
    expect(screen.getByRole("combobox", { name: "Ordenar por" })).toHaveValue("nome");
  });

  it("mostra categoria, natureza e distância de cada estabelecimento", () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    expect(screen.getByText("Hospital · Estadual · 4.8 km")).toBeInTheDocument();
  });
});
