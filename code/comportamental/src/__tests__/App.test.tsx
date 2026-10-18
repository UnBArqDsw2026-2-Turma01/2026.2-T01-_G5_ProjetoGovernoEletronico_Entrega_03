import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("navegação principal", () => {
  it("permite alternar entre Minha saúde e Conteúdos pela sidebar", async () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Rede de Saúde" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Minha saúde" })).toHaveAttribute("aria-current", "page");

    await userEvent.click(screen.getByRole("button", { name: "Conteúdos" }));
    expect(screen.getByRole("heading", { name: "Conteúdo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Conteúdos" })).toHaveAttribute("aria-current", "page");

    await userEvent.click(screen.getByRole("button", { name: "Minha saúde" }));
    expect(screen.getByRole("heading", { name: "Rede de Saúde" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Minha saúde" })).toHaveAttribute("aria-current", "page");
  });
});
