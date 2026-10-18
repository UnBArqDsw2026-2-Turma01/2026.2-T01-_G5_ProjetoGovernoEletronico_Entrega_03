/**
 * @vitest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import '../../setupTests';
import { App } from '../../App';

describe('App (Integração de Interface - Meu SUS Digital)', () => {
  afterEach(() => {
    cleanup();
  });

  it('deve renderizar a aplicação e exibir o painel do paciente', () => {
    // Arrange
    render(<App />);

    // Assert inicial: Layout principal e cabeçalho visíveis
    expect(screen.getByText('Minha Saúde')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getAllByText('Usuário').length).toBeGreaterThan(0);
  });

  it('deve permitir interagir com os botões de ação do Dock GoF Criacional', async () => {
    // Arrange
    const usuario = userEvent.setup();
    render(<App />);

    // Act: Clica no botão de ação de Exames no Dock GoF
    const botaoExameDock = screen.getByRole('button', { name: /⚡ \+Exame \(V2\)/i });
    await usuario.click(botaoExameDock);

    // Assert: Valida se as ocorrências do Factory Method estão visíveis
    expect(screen.getAllByText(/Factory Method/i).length).toBeGreaterThan(0);
  });
});
