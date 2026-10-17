import { describe, expect, it } from 'vitest';
import { ReceitaMedicamento } from '../ReceitaMedicamento';

describe('ReceitaMedicamento (ConcreteProduct - Versão 3)', () => {
  it('deve instanciar um ReceitaMedicamento quando fornecidos dados válidos completos', () => {
    // Arrange
    const dataMock = new Date('2024-09-15T14:30:00Z');
    const dadosEntrada = {
      id: 'med-301',
      dataRegistro: dataMock,
      tipoReceita: 'Dispensação' as const,
      programaSaude: 'Farmácia Popular do Brasil',
      estabelecimento: 'Drogaria Raia - Asa Sul, Brasília/DF',
      profissionalPrescritor: 'Dr. Marcos Antônio Silva',
      registroProfissional: 'CRM 18.452/DF',
      codigoCNES: '0061234',
      numeroReceita: 'REC-2024-110589',
      statusDispensacao: 'Dispensado' as const,
      itens: [
        {
          nomeMedicamento: 'Losartana Potássica 50mg',
          principioAtivo: 'Losartana Potássica',
          concentracao: '50mg',
          formaFarmaceutica: 'Comprimido',
          posologia: '1 comprimido, 1x ao dia',
          quantidade: 30,
          unidade: 'comprimidos',
          viaAdministracao: 'Oral',
          duracaoTratamento: '30 dias',
        },
      ],
      observacoes: 'Uso contínuo.',
    };

    // Act
    const receita = new ReceitaMedicamento(dadosEntrada);

    // Assert
    expect(receita.id).toBe('med-301');
    expect(receita.tipo).toBe('MEDICAMENTO');
    expect(receita.getCategoria()).toBe('Medicamento / Farmácia Popular');
    expect(receita.tipoReceita).toBe('Dispensação');
    expect(receita.programaSaude).toBe('Farmácia Popular do Brasil');
    expect(receita.estabelecimento).toBe('Drogaria Raia - Asa Sul, Brasília/DF');
    expect(receita.profissionalPrescritor).toBe('Dr. Marcos Antônio Silva');
    expect(receita.registroProfissional).toBe('CRM 18.452/DF');
    expect(receita.codigoCNES).toBe('0061234');
    expect(receita.numeroReceita).toBe('REC-2024-110589');
    expect(receita.statusDispensacao).toBe('Dispensado');
    expect(receita.itens).toHaveLength(1);
    expect(receita.observacoes).toBe('Uso contínuo.');
  });

  it('deve aplicar valores padrão quando campos opcionais não forem fornecidos', () => {
    // Arrange
    const dadosMinimos = {
      id: 'med-302',
      dataRegistro: '2024-07-20T10:00:00Z',
      programaSaude: 'Farmácia Popular do Brasil',
      estabelecimento: 'Drogasil - Taguatinga/DF',
      statusDispensacao: 'Dispensado' as const,
    };

    // Act
    const receita = new ReceitaMedicamento(dadosMinimos);

    // Assert
    expect(receita.tipoReceita).toBe('Dispensação');
    expect(receita.profissionalPrescritor).toBe('Médico(a) Prescritor(a) SUS');
    expect(receita.registroProfissional).toBe('CRM não informado');
    expect(receita.itens).toEqual([]);
    expect(receita.numeroReceita).toBeUndefined();
    expect(receita.codigoCNES).toBeUndefined();
    expect(receita.observacoes).toBeUndefined();
  });

  it('deve gerar resumo amigável com nomes dos medicamentos, programa, status e data', () => {
    // Arrange
    const dataMock = new Date('2024-06-05T00:00:00Z');
    const receita = new ReceitaMedicamento({
      id: 'med-303',
      dataRegistro: dataMock,
      programaSaude: 'CBAF',
      estabelecimento: 'UBS 02 Asa Norte',
      statusDispensacao: 'Dispensado',
      itens: [
        {
          nomeMedicamento: 'Sinvastatina 20mg',
          principioAtivo: 'Sinvastatina',
          concentracao: '20mg',
          formaFarmaceutica: 'Comprimido',
          posologia: '1x ao dia',
          quantidade: 30,
          unidade: 'comprimidos',
        },
      ],
    });

    // Act
    const resumo = receita.getResumo();

    // Assert
    expect(resumo).toContain('Sinvastatina 20mg');
    expect(resumo).toContain('CBAF');
    expect(resumo).toContain('[Dispensado]');
    expect(resumo).toContain(dataMock.toLocaleDateString('pt-BR'));
  });

  it('deve exibir texto padrão no resumo quando não houver itens de medicamento', () => {
    // Arrange
    const receita = new ReceitaMedicamento({
      id: 'med-304',
      dataRegistro: new Date(),
      programaSaude: 'Farmácia Popular do Brasil',
      estabelecimento: 'Farmácia Credenciada',
      statusDispensacao: 'Pendente',
    });

    // Act
    const resumo = receita.getResumo();

    // Assert
    expect(resumo).toContain('Medicamento não especificado');
  });

  it('deve retornar detalhes estruturados completos através de getDetalhes', () => {
    // Arrange
    const receita = new ReceitaMedicamento({
      id: 'med-305',
      dataRegistro: '2024-03-10T12:00:00Z',
      tipoReceita: 'Prescrição',
      programaSaude: 'PNCA',
      estabelecimento: 'Centro de Saúde Samambaia/DF',
      profissionalPrescritor: 'Dra. Juliana Ramos',
      statusDispensacao: 'Dispensado',
      observacoes: 'Asma persistente leve.',
    });

    // Act
    const detalhes = receita.getDetalhes();

    // Assert
    expect(detalhes.id).toBe('med-305');
    expect(detalhes.tipo).toBe('MEDICAMENTO');
    expect(detalhes.categoria).toBe('Medicamento / Farmácia Popular');
    expect(detalhes.tipoReceita).toBe('Prescrição');
    expect(detalhes.programaSaude).toBe('PNCA');
    expect(detalhes.estabelecimento).toBe('Centro de Saúde Samambaia/DF');
    expect(detalhes.profissionalPrescritor).toBe('Dra. Juliana Ramos');
    expect(detalhes.observacoes).toBe('Asma persistente leve.');
    expect(detalhes.dataDispensacao).toBeDefined();
  });

  it('deve lançar erro quando o ID for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ReceitaMedicamento({
        id: '',
        dataRegistro: new Date(),
        programaSaude: 'Farmácia Popular',
        estabelecimento: 'Farmácia',
        statusDispensacao: 'Dispensado',
      });
    }).toThrow('ID do registro de medicamento é obrigatório.');
  });

  it('deve lançar erro quando o programa de saúde for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ReceitaMedicamento({
        id: 'med-306',
        dataRegistro: new Date(),
        programaSaude: '   ',
        estabelecimento: 'Farmácia',
        statusDispensacao: 'Dispensado',
      });
    }).toThrow('Programa de saúde é obrigatório para rastreabilidade.');
  });

  it('deve lançar erro quando o estabelecimento for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ReceitaMedicamento({
        id: 'med-307',
        dataRegistro: new Date(),
        programaSaude: 'Farmácia Popular',
        estabelecimento: '',
        statusDispensacao: 'Dispensado',
      });
    }).toThrow('Estabelecimento de dispensação é obrigatório.');
  });

  it('deve lançar erro quando o status da dispensação for vazio', () => {
    // Arrange & Act & Assert
    expect(() => {
      new ReceitaMedicamento({
        id: 'med-308',
        dataRegistro: new Date(),
        programaSaude: 'Farmácia Popular',
        estabelecimento: 'Farmácia',
        statusDispensacao: '' as unknown as 'Dispensado',
      });
    }).toThrow('Status da dispensação é obrigatório.');
  });
});
