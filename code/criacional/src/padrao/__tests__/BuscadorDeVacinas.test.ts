import { describe, expect, it } from 'vitest';
import { BuscadorDeHistorico } from '../BuscadorDeHistorico';
import { BuscadorDeVacinas } from '../BuscadorDeVacinas';
import { CartaoVacina } from '../CartaoVacina';
import { vacinasMock } from '../../dominio/vacinasMock';

describe('BuscadorDeVacinas (ConcreteCreator & Factory Method)', () => {
  it('deve herdar de BuscadorDeHistorico', () => {
    const buscador = new BuscadorDeVacinas();
    expect(buscador).toBeInstanceOf(BuscadorDeHistorico);
  });

  it('deve criar uma instância concreta de CartaoVacina via Factory Method', () => {
    const buscador = new BuscadorDeVacinas();
    const dados = {
      id: 'vac-teste-1',
      imunobiologico: 'Tríplice Viral',
      fabricante: 'Bio-Manguinhos',
      lote: '24TR01',
      dose: '1ª Dose',
      estabelecimento: 'UBS Brasília',
      dataRegistro: '2024-02-01T08:00:00Z',
    };

    const registro = buscador.criarRegistroClinico(dados);

    expect(registro).toBeInstanceOf(CartaoVacina);
    expect(registro.tipo).toBe('VACINA');
    expect(registro.getCategoria()).toBe('Vacina');
    expect(registro.getResumo()).toContain('Tríplice Viral');
  });

  it('deve processar uma lista em lote via processarRegistros herdado da classe base', () => {
    const buscador = new BuscadorDeVacinas();
    const listaCriada = buscador.processarRegistros(vacinasMock);

    expect(listaCriada).toHaveLength(vacinasMock.length);
    listaCriada.forEach((item) => {
      expect(item).toBeInstanceOf(CartaoVacina);
      expect(item.tipo).toBe('VACINA');
      expect(item.getResumo()).toBeDefined();
    });
  });

  it('deve lançar erro ao tentar criar vacina com objeto nulo ou indefinido', () => {
    const buscador = new BuscadorDeVacinas();
    // @ts-expect-error teste com tipo inválido
    expect(() => buscador.criarRegistroClinico(null)).toThrow(
      'Dados brutos inválidos para criação do Cartão de Vacina.'
    );
  });

  it('deve retornar o nome correto da seção', () => {
    const buscador = new BuscadorDeVacinas();
    expect(buscador.obterTipoSecao()).toBe('Vacinas e Imunizações');
  });
});
