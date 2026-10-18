import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { UnidadeDeSaude } from "../../dominio/UnidadeDeSaude";
import { redeDeSaudeSimulada } from "../../dominio/redeDeSaudeSimulada";
import type { CriterioDeBusca } from "../../padrao/CriterioDeBusca";
import { PorCategoria } from "../../padrao/PorCategoria";
import { PorDistancia } from "../../padrao/PorDistancia";
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
    .map((item) => item.querySelector("h3")?.textContent ?? "");
}

describe("TelaRedeDeSaude", () => {
  it("mostra todos os estabelecimentos ordenados pelo primeiro critério", () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    const esperado = new PorNatureza().ordenar(redeDeSaudeSimulada).map((unidade) => unidade.nome);
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

    const esperado = new PorNomeDeTeste().ordenar(redeDeSaudeSimulada).map((unidade) => unidade.nome);
    expect(nomesNaTela()).toEqual(esperado);
    expect(screen.getByRole("combobox", { name: "Ordenar por" })).toHaveValue("nome");
  });

  it("ordena por distância usando a estratégia PorDistancia", async () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Ordenar por" }), "distancia");

    const esperado = new PorDistancia().ordenar(redeDeSaudeSimulada).map((unidade) => unidade.nome);
    expect(nomesNaTela()).toEqual(esperado);
  });

  it("ordena alfabeticamente por categoria usando a estratégia PorCategoria", async () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Ordenar por" }), "categoria");

    const esperado = new PorCategoria().ordenar(redeDeSaudeSimulada).map((unidade) => unidade.nome);
    expect(nomesNaTela()).toEqual(esperado);
  });

  it("filtra por categoria selecionada", async () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    await userEvent.click(screen.getByRole("button", { name: "Maternidade" }));

    const filtradas = redeDeSaudeSimulada.filter((unidade) => unidade.categoria === "Maternidade");
    expect(nomesNaTela()).toEqual(new PorNatureza().ordenar(filtradas).map((unidade) => unidade.nome));
    expect(screen.getByRole("button", { name: "Maternidade" })).toHaveAttribute("aria-pressed", "true");
  });

  it("pesquisa sem diferenciar acentos", async () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    await userEvent.type(screen.getByRole("searchbox", { name: "Pesquisar redes de saúde" }), "medicos");

    expect(nomesNaTela().length).toBeGreaterThan(0);
    expect(nomesNaTela().every((nome) => nome.toLocaleLowerCase("pt-BR").includes("especialidades"))).toBe(true);
  });

  it("mostra categoria, natureza, distância e dados de endereço do estabelecimento", () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    const hospital = screen.getByRole("heading", { name: "Hospital Regional da Asa Sul" }).closest("li");
    expect(hospital).not.toBeNull();
    expect(within(hospital as HTMLElement).getByText("Hospital")).toBeInTheDocument();
    expect(within(hospital as HTMLElement).getByText("Estadual")).toBeInTheDocument();
    expect(within(hospital as HTMLElement).getByText("4.8 km")).toBeInTheDocument();
    expect(within(hospital as HTMLElement).getByText("Asa Sul, Brasília – DF")).toBeInTheDocument();
  });

  it("apresenta todas as categorias informadas", () => {
    render(<TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />);

    [
      "Médicos Especialistas",
      "Hospital",
      "Unidade Básica de Saúde",
      "Maternidade",
      "Atenção Psicossocial",
      "Academia da Saúde",
      "Saúde Bucal",
      "Doenças Raras",
      "Transplante",
      "Serviços Hemoterápicos",
      "Atendimento Antiveneno",
    ].forEach((categoria) => {
      expect(screen.getByRole("button", { name: categoria })).toBeInTheDocument();
    });
  });
});
