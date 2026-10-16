/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '../../setupTests';
import { App } from '../../App';

describe('App (Integração de Interface - Meu SUS Digital)', () => {
  afterEach(() => {
    cleanup();
  });

  it('deve renderizar a aplicação e permitir navegação para a fatia de Exames (V2)', () => {
    // Arrange
    render(<App />);

    // Assert inicial: Tela de vacinas ativa
    expect(screen.getByText('Vacinas (V1)')).toBeDefined();
    expect(screen.getByText('Carteira nacional de vacinação')).toBeDefined();

    // Act: Clica no menu lateral de Exames
    const botaoMenuExames = screen.getByText('Exames (V2)');
    fireEvent.click(botaoMenuExames);

    // Assert: Tela de exames deve estar visível com dados processados pelo Factory Method
    expect(screen.getByText('Exames Laboratoriais')).toBeDefined();
    expect(screen.getByText('Hemograma Completo com Contagem de Plaquetas')).toBeDefined();
    expect(screen.getByText('Glicemia de Jejum')).toBeDefined();
    expect(screen.getAllByText('Laboratório Central de Saúde Pública do DF (LACEN/DF)').length).toBeGreaterThan(0);
  });

  it('deve instanciar dinamicamente um novo exame via Factory Method ao clicar no botão do Dock GoF', () => {
    // Arrange
    render(<App />);

    // Act: Navega para a aba de exames
    const botaoMenuExames = screen.getByText('Exames (V2)');
    fireEvent.click(botaoMenuExames);

    // Act: Dispara o Factory Method interativo no Dock GoF
    const botaoAdicionarExame = screen.getByText('⚡ +Exame (V2)');
    fireEvent.click(botaoAdicionarExame);

    // Assert: Dock deve registrar o disparo do Factory Method do BuscadorDeExames
    expect(screen.getByText(/✓ \[V2 Factory Method\]: Instanciado/i)).toBeDefined();
  });
});
