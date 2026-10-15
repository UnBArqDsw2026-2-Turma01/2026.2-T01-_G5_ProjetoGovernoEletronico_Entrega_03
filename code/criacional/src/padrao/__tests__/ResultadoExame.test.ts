import { describe, expect, it } from 'vitest';
import { ResultadoExame } from '../ResultadoExame';

describe('ResultadoExame (ConcreteProduct - Versão 2)', () => {
  it('deve instanciar um ResultadoExame quando fornecidos dados válidos completos', () => {
    // Arrange
    const dataMock = new Date('2024-08-10T08:30:00Z');
    const dadosEntrada = {
      id: 'exm-201',
      dataRegistro: dataMock,
      nomeExame: 'Hemograma Completo',
      categoriaExame: 'Hematologia',
      laboratorio: 'LACEN/DF',
      metodologia: 'Citometria de Fluxo',
      statusResultado: 'Liberado' as const,
      responsavelTecnico: 'Dra. Camila Vasconcelos',
      numeroSolicitacao: 'SOL-12345',
      codigoCNES: '0010456',
      parametros: [
        { nome: 'Hemoglobina', resultado: '15.2', unidadeMedida: 'g/dL', valorReferencia: '13.5 a 17.5', situacao: 'NORMAL' as const },
      ],
      laudoConclusivo: 'Exame sem alterações significativas.',
    };

    // Act
    const exame = new ResultadoExame(dadosEntrada);

    // Assert
    expect(exame.id).toBe('exm-201');
    expect(exame.tipo).toBe('EXAME');
    expect(exame.getCategoria()).toBe('Exame Laboratorial');
    expect(exame.nomeExame).toBe('Hemograma Completo');
    expect(exame.categoriaExame).toBe('Hematologia');
    expect(exame.laboratorio).toBe('LACEN/DF');
    expect(exame.metodologia).toBe('Citometria de Fluxo');
    expect(exame.statusResultado).toBe('Liberado');
    expect(exame.responsavelTecnico).toBe('Dra. Camila Vasconcelos');
    expect(exame.numeroSolicitacao).toBe('SOL-12345');
    expect(exame.codigoCNES).toBe('0010456');
    expect(exame.parametros).toHaveLength(1);
    expect(exame.laudoConclusivo).toBe('Exame sem alterações significativas.');
  });

  it('deve aplicar valores padrão quando campos opcionais não forem fornecidos', () => {
    // Arrange
    const dadosMinimos = {
      id: 'exm-202',
      dataRegistro: '2024-06-01T10:00:00Z',
      nomeExame: 'Glicemia de Jejum',
      laboratorio: 'Laboratório Central',
      statusResultado: 'Liberado' as const,
    };

    // Act
    const exame = new ResultadoExame(dadosMinimos);

    // Assert
    expect(exame.categoriaExame).toBe('Patologia Clínica');
    expect(exame.metodologia).toBe('Automatizada / Padrão RNDS');
    expect(exame.responsavelTecnico).toBe('Biomédico / Bioquímico Responsável');
    expect(exame.parametros).toEqual([]);
    expect(exame.numeroSolicitacao).toBeUndefined();
    expect(exame.codigoCNES).toBeUndefined();
  });

  it('deve gerar resumo amigável com nome do exame, laboratório, status e data', () => {
    // Arrange
    const dataMock = new Date('2024-05-15T00:00:00Z');
    const exame = new ResultadoExame({
      id: 'exm-203',
      dataRegistro: dataMock,
      nomeExame: 'Lipidograma Completo',
      laboratorio: 'SES/DF',
      statusResultado: 'Liberado',
    });

    // Act
    const resumo = exame.getResumo();

    // Assert
    expect(resumo).toContain('Lipidograma Completo');
    expect(resumo).toContain('SES/DF');
    expect(resumo).toContain('[Liberado]');
    expect(resumo).toContain(dataMock.toLocaleDateString('pt-BR'));
  });

  it('deve retornar detalhes estruturados completos através de getDetalhes', () => {
    // Arrange
    const exame = new ResultadoExame({
      id: 'exm-204',
      dataRegistro: '2024-02-10T12:00:00Z',
      nomeExame: 'RT-PCR COVID-19',
      laboratorio: 'LACEN/DF',
      statusResultado: 'Liberado',
      responsavelTecnico: 'Dr. Fernando Albuquerque',
      laudoConclusivo: 'Não reagente',
    });

    // Act
    const detalhes = exame.getDetalhes();

    // Assert
    expect(detalhes.id).toBe('exm-204');
    expect(detalhes.tipo).toBe('EXAME');
    expect(detalhes.categoria).toBe('Exame Laboratorial');
    expect(detalhes.nomeExame).toBe('RT-PCR COVID-19');
    expect(detalhes.laboratorio).toBe('LACEN/DF');
    expect(detalhes.responsavelTecnico).toBe('Dr. Fernando Albuquerque');
    expect(detalhes.laudoConclusivo).toBe('Não reagente');
    expect(detalhes.dataLiberacao).toBeDefined();
  });

  it('deve lançar erro quando o ID for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ResultadoExame({
        id: '',
        dataRegistro: new Date(),
        nomeExame: 'Hemograma',
        laboratorio: 'LACEN',
        statusResultado: 'Liberado',
      });
    }).toThrow('ID do registro de exame é obrigatório.');
  });

  it('deve lançar erro quando o nome do exame for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ResultadoExame({
        id: 'exm-205',
        dataRegistro: new Date(),
        nomeExame: '   ',
        laboratorio: 'LACEN',
        statusResultado: 'Liberado',
      });
    }).toThrow('Nome do exame laboratorial é obrigatório.');
  });

  it('deve lançar erro quando o laboratório for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ResultadoExame({
        id: 'exm-206',
        dataRegistro: new Date(),
        nomeExame: 'Hemograma',
        laboratorio: '',
        statusResultado: 'Liberado',
      });
    }).toThrow('Laboratório executor é obrigatório para rastreabilidade.');
  });

  it('deve lançar erro quando o status do resultado for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ResultadoExame({
        id: 'exm-207',
        dataRegistro: new Date(),
        nomeExame: 'Hemograma',
        laboratorio: 'LACEN',
        statusResultado: '' as unknown as 'Liberado',
      });
    }).toThrow('Status do resultado do exame é obrigatório.');
  });
});
