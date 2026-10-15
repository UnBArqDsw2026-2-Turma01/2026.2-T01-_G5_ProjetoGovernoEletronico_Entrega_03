import { describe, expect, it } from 'vitest';
import { BuscadorDeHistorico } from '../BuscadorDeHistorico';
import { BuscadorDeExames } from '../BuscadorDeExames';
import { ResultadoExame } from '../ResultadoExame';
import { examesMock } from '../../dominio/examesMock';

describe('BuscadorDeExames (ConcreteCreator & Factory Method - Versão 2)', () => {
  it('deve herdar da classe abstrata BuscadorDeHistorico', () => {
    // Arrange & Act
    const buscador = new BuscadorDeExames();

    // Assert
    expect(buscador).toBeInstanceOf(BuscadorDeHistorico);
  });

  it('deve instanciar um ResultadoExame concreto via Factory Method criarRegistroClinico', () => {
    // Arrange
    const buscador = new BuscadorDeExames();
    const dadosBrutos = {
      id: 'exm-teste-01',
      nomeExame: 'Glicemia de Jejum',
      categoriaExame: 'Bioquímica Clínica',
      laboratorio: 'LACEN/DF',
      statusResultado: 'Liberado',
      responsavelTecnico: 'Dr. Roberto Meireles',
      dataRegistro: '2024-04-10T08:00:00Z',
      parametros: [
        { nome: 'Glicose', resultado: '85', unidadeMedida: 'mg/dL', valorReferencia: '70-99', situacao: 'NORMAL' },
      ],
    };

    // Act
    const registro = buscador.criarRegistroClinico(dadosBrutos);

    // Assert
    expect(registro).toBeInstanceOf(ResultadoExame);
    expect(registro.tipo).toBe('EXAME');
    expect(registro.getCategoria()).toBe('Exame Laboratorial');
    expect(registro.getResumo()).toContain('Glicemia de Jejum');
    expect(registro.getResumo()).toContain('LACEN/DF');
    expect((registro as ResultadoExame).parametros).toHaveLength(1);
  });

  it('deve processar uma lista de exames em lote via processarRegistros herdado da classe base', () => {
    // Arrange
    const buscador = new BuscadorDeExames();

    // Act
    const listaCriada = buscador.processarRegistros(examesMock);

    // Assert
    expect(listaCriada).toHaveLength(examesMock.length);
    listaCriada.forEach((item) => {
      expect(item).toBeInstanceOf(ResultadoExame);
      expect(item.tipo).toBe('EXAME');
      expect(item.getCategoria()).toBe('Exame Laboratorial');
      expect(item.getResumo()).toBeDefined();
    });
  });

  it('deve lançar erro ao receber dados brutos nulos ou inválidos', () => {
    // Arrange
    const buscador = new BuscadorDeExames();

    // Act & Assert
    // @ts-expect-error teste com payload nulo
    expect(() => buscador.criarRegistroClinico(null)).toThrow(
      'Dados brutos inválidos para criação do Resultado de Exame.'
    );
  });

  it('deve retornar o nome amigável da seção clínica ("Exames Laboratoriais")', () => {
    // Arrange
    const buscador = new BuscadorDeExames();

    // Act
    const secao = buscador.obterTipoSecao();

    // Assert
    expect(secao).toBe('Exames Laboratoriais');
  });

  it('deve preencher valores padrão quando dados brutos omitirem identificador e laboratório', () => {
    // Arrange
    const buscador = new BuscadorDeExames();
    const dadosParciais = {
      nomeExame: 'Exame de Urina Tipo 1',
    };

    // Act
    const registro = buscador.criarRegistroClinico(dadosParciais) as ResultadoExame;

    // Assert
    expect(registro.id).toMatch(/^exm-/);
    expect(registro.laboratorio).toContain('Laboratório Central');
    expect(registro.statusResultado).toBe('Liberado');
    expect(registro.tipo).toBe('EXAME');
  });
});
