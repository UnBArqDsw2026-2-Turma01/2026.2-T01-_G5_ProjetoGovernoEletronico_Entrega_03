import { describe, expect, it } from 'vitest';
import { BuscadorDeHistorico } from '../BuscadorDeHistorico';
import { BuscadorDeMedicamentos } from '../BuscadorDeMedicamentos';
import { ReceitaMedicamento } from '../ReceitaMedicamento';
import { medicamentosMock } from '../../dominio/medicamentosMock';

describe('BuscadorDeMedicamentos (ConcreteCreator & Factory Method - Versão 3)', () => {
  it('deve herdar da classe abstrata BuscadorDeHistorico', () => {
    // Arrange & Act
    const buscador = new BuscadorDeMedicamentos();

    // Assert
    expect(buscador).toBeInstanceOf(BuscadorDeHistorico);
  });

  it('deve instanciar um ReceitaMedicamento concreto via Factory Method criarRegistroClinico', () => {
    // Arrange
    const buscador = new BuscadorDeMedicamentos();
    const dadosBrutos = {
      id: 'med-teste-01',
      tipoReceita: 'Dispensação',
      programaSaude: 'Farmácia Popular do Brasil',
      estabelecimento: 'Drogaria Raia - Brasília/DF',
      profissionalPrescritor: 'Dr. Marcos Silva',
      statusDispensacao: 'Dispensado',
      dataRegistro: '2024-09-15T14:30:00Z',
      itens: [
        {
          nomeMedicamento: 'Losartana Potássica 50mg',
          principioAtivo: 'Losartana Potássica',
          concentracao: '50mg',
          formaFarmaceutica: 'Comprimido',
          posologia: '1x ao dia',
          quantidade: 30,
          unidade: 'comprimidos',
        },
      ],
    };

    // Act
    const registro = buscador.criarRegistroClinico(dadosBrutos);

    // Assert
    expect(registro).toBeInstanceOf(ReceitaMedicamento);
    expect(registro.tipo).toBe('MEDICAMENTO');
    expect(registro.getCategoria()).toBe('Medicamento / Farmácia Popular');
    expect(registro.getResumo()).toContain('Losartana Potássica 50mg');
    expect(registro.getResumo()).toContain('Farmácia Popular do Brasil');
    expect((registro as ReceitaMedicamento).itens).toHaveLength(1);
  });

  it('deve processar uma lista de medicamentos em lote via processarRegistros herdado da classe base', () => {
    // Arrange
    const buscador = new BuscadorDeMedicamentos();

    // Act
    const listaCriada = buscador.processarRegistros(medicamentosMock);

    // Assert
    expect(listaCriada).toHaveLength(medicamentosMock.length);
    listaCriada.forEach((item) => {
      expect(item).toBeInstanceOf(ReceitaMedicamento);
      expect(item.tipo).toBe('MEDICAMENTO');
      expect(item.getCategoria()).toBe('Medicamento / Farmácia Popular');
      expect(item.getResumo()).toBeDefined();
    });
  });

  it('deve lançar erro ao receber dados brutos nulos ou inválidos', () => {
    // Arrange
    const buscador = new BuscadorDeMedicamentos();

    // Act & Assert
    // @ts-expect-error teste com payload nulo
    expect(() => buscador.criarRegistroClinico(null)).toThrow(
      'Dados brutos inválidos para criação do Registro de Medicamento.'
    );
  });

  it('deve retornar o nome amigável da seção clínica ("Medicamentos e Farmácia Popular")', () => {
    // Arrange
    const buscador = new BuscadorDeMedicamentos();

    // Act
    const secao = buscador.obterTipoSecao();

    // Assert
    expect(secao).toBe('Medicamentos e Farmácia Popular');
  });

  it('deve preencher valores padrão quando dados brutos omitirem identificador e estabelecimento', () => {
    // Arrange
    const buscador = new BuscadorDeMedicamentos();
    const dadosParciais = {
      itens: [
        {
          nomeMedicamento: 'Metformina 850mg',
          principioAtivo: 'Cloridrato de Metformina',
          concentracao: '850mg',
          formaFarmaceutica: 'Comprimido',
          posologia: '2x ao dia',
          quantidade: 60,
          unidade: 'comprimidos',
        },
      ],
    };

    // Act
    const registro = buscador.criarRegistroClinico(dadosParciais) as ReceitaMedicamento;

    // Assert
    expect(registro.id).toMatch(/^med-/);
    expect(registro.programaSaude).toContain('Farmácia Popular');
    expect(registro.estabelecimento).toContain('Farmácia Credenciada');
    expect(registro.statusDispensacao).toBe('Dispensado');
    expect(registro.tipo).toBe('MEDICAMENTO');
    expect(registro.itens).toHaveLength(1);
  });

  it('deve processar corretamente receita com múltiplos itens de medicamento', () => {
    // Arrange
    const buscador = new BuscadorDeMedicamentos();
    const dadosComMultiplosItens = {
      id: 'med-multi-01',
      programaSaude: 'Farmácia Popular do Brasil',
      estabelecimento: 'Drogaria Brasília/DF',
      statusDispensacao: 'Dispensado',
      itens: [
        {
          nomeMedicamento: 'Losartana Potássica 50mg',
          principioAtivo: 'Losartana Potássica',
          concentracao: '50mg',
          formaFarmaceutica: 'Comprimido',
          posologia: '1x ao dia',
          quantidade: 30,
          unidade: 'comprimidos',
        },
        {
          nomeMedicamento: 'Hidroclorotiazida 25mg',
          principioAtivo: 'Hidroclorotiazida',
          concentracao: '25mg',
          formaFarmaceutica: 'Comprimido',
          posologia: '1x ao dia',
          quantidade: 30,
          unidade: 'comprimidos',
        },
      ],
    };

    // Act
    const registro = buscador.criarRegistroClinico(dadosComMultiplosItens) as ReceitaMedicamento;

    // Assert
    expect(registro.itens).toHaveLength(2);
    expect(registro.getResumo()).toContain('Losartana Potássica 50mg');
    expect(registro.getResumo()).toContain('Hidroclorotiazida 25mg');
  });
});
