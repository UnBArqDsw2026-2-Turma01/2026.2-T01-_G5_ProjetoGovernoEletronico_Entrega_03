/**
 * @vitest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import '../../setupTests';
import { App } from '../../App';

describe('V4 - Seletor Dinâmico, Roteamento e Hub Minha Saúde (Nicole Jovita)', () => {
  afterEach(() => {
    cleanup();
  });

  it('1. deve navegar do Hub "Minha Saúde" para a Carteira de Vacinação ao clicar no card de Vacinas', async () => {
    const usuario = userEvent.setup();
    render(<App />);

    const cardVacinas = screen.getByText('Vacinas');
    await usuario.click(cardVacinas);

    expect(screen.getByText(/Carteira nacional de vacinação/i)).toBeInTheDocument();
  });

  it('2. deve navegar do Hub "Minha Saúde" para os Laudos de Exames ao clicar no card de Exames', async () => {
    const usuario = userEvent.setup();
    render(<App />);

    const cardExames = screen.getByText('Exames');
    await usuario.click(cardExames);

    expect(screen.getByText(/Exames laboratoriais/i)).toBeInTheDocument();
  });

  it('3. deve navegar do Hub "Minha Saúde" para Receitas e Medicamentos ao clicar no card de Medicamentos', async () => {
    const usuario = userEvent.setup();
    render(<App />);

    const cardMedicamentos = screen.getByText('Medicamentos');
    await usuario.click(cardMedicamentos);

    expect(screen.getAllByText(/Farmácia Popular|Medicamento|Receita/i).length).toBeGreaterThan(0);
  });

  it('4. deve permitir retornar ao Início (Hub Minha Saúde) a partir de qualquer tela de serviço', async () => {
    const usuario = userEvent.setup();
    render(<App />);

    // Navega para exames
    await usuario.click(screen.getByText('Exames'));
    expect(screen.getByText(/Exames laboratoriais/i)).toBeInTheDocument();

    // Retorna para o início clicando na Sidebar
    const itemInicio = screen.getByText('Início');
    await usuario.click(itemInicio);

    expect(screen.getByText('Minha Saúde')).toBeInTheDocument();
  });

  it('5. deve instanciar dinamicamente uma nova Vacina via Factory Method V1 no Dock GoF', async () => {
    const usuario = userEvent.setup();
    render(<App />);

    const botaoVacina = screen.getByRole('button', { name: /⚡ \+Vacina \(V1\)/i });
    await usuario.click(botaoVacina);

    expect(screen.getAllByText(/BuscadorDeVacinas/i).length).toBeGreaterThan(0);
  });

  it('6. deve instanciar dinamicamente um novo Exame via Factory Method V2 no Dock GoF', async () => {
    const usuario = userEvent.setup();
    render(<App />);

    const botaoExame = screen.getByRole('button', { name: /⚡ \+Exame \(V2\)/i });
    await usuario.click(botaoExame);

    expect(screen.getAllByText(/BuscadorDeExames/i).length).toBeGreaterThan(0);
  });

  it('7. deve instanciar dinamicamente um novo Medicamento via Factory Method V3 no Dock GoF', async () => {
    const usuario = userEvent.setup();
    render(<App />);

    const botaoMedicamento = screen.getByRole('button', { name: /⚡ \+Medicamento \(V3\)/i });
    await usuario.click(botaoMedicamento);

    expect(screen.getAllByText(/BuscadorDeMedicamentos/i).length).toBeGreaterThan(0);
  });

  it('8. deve renderizar os itens secundários do menu lateral com a classe "disabled"', () => {
    render(<App />);

    const itemAplicacoes = screen.getByText('Aplicações').closest('li');
    const itemPerfil = screen.getByText('Meu perfil').closest('li');

    expect(itemAplicacoes).toHaveClass('disabled');
    expect(itemPerfil).toHaveClass('disabled');
  });
});