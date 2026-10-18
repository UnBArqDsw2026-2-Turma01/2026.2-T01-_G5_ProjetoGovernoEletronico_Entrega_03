import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { conteudosSimulados } from "../../dominio/conteudosSimulados";
import { TelaBuscaDeConteudos } from "../TelaBuscaDeConteudos";

function titulosVisiveis(): string[] {
  return screen
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent ?? "");
}

describe("TelaBuscaDeConteudos", () => {
  it("exibe os conteúdos mockados por relevância no carregamento inicial", () => {
    render(<TelaBuscaDeConteudos conteudos={conteudosSimulados} />);

    expect(titulosVisiveis().slice(0, 3)).toEqual([
      "Doação de leite",
      "Acidente Vascular Cerebral – AVC",
      "Câncer de Pele",
    ]);
  });

  it("pesquisa por título e resumo sem diferenciar acentos", async () => {
    render(<TelaBuscaDeConteudos conteudos={conteudosSimulados} />);

    await userEvent.type(screen.getByRole("searchbox", { name: "Pesquisar conteúdos" }), "cancer");

    expect(titulosVisiveis()).toEqual(["Câncer de Pele"]);
  });

  it("filtra artigos pelo tema selecionado", async () => {
    render(<TelaBuscaDeConteudos conteudos={conteudosSimulados} />);

    await userEvent.click(screen.getByRole("button", { name: "Animais peçonhentos" }));

    expect(titulosVisiveis()).toEqual(["O que fazer em caso de picada de escorpião"]);
    expect(screen.getByRole("button", { name: "Animais peçonhentos" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("integra a estratégia PorCategoria ao seletor de ordenação", async () => {
    render(<TelaBuscaDeConteudos conteudos={conteudosSimulados} />);

    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Ordenar artigos" }), "categoria");

    const artigos = screen.getByRole("region", { name: "Artigos" });
    const titulos = within(artigos)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent ?? "");

    expect(titulos[0]).toBe("O que fazer em caso de picada de escorpião");
    expect(screen.getByRole("combobox", { name: "Ordenar artigos" })).toHaveValue("categoria");
  });

  it("permite limpar os filtros quando a pesquisa não encontra resultados", async () => {
    render(<TelaBuscaDeConteudos conteudos={conteudosSimulados} />);

    await userEvent.type(screen.getByRole("searchbox", { name: "Pesquisar conteúdos" }), "termo inexistente");
    expect(screen.getByRole("status")).toHaveTextContent("Nenhum conteúdo encontrado");
    await userEvent.click(screen.getByRole("button", { name: "Limpar filtros" }));

    expect(titulosVisiveis().length).toBe(conteudosSimulados.length);
  });
});
