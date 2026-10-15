import { describe, expect, it } from 'vitest';
import { CartaoVacina } from '../CartaoVacina';

describe('CartaoVacina (ConcreteProduct)', () => {
  it('deve instanciar um CartaoVacina com dados válidos', () => {
    const dataMock = new Date('2024-03-10T14:30:00Z');
    const cartao = new CartaoVacina({
      id: 'vac-101',
      dataRegistro: dataMock,
      imunobiologico: 'Covid-19 Bivalente',
      fabricante: 'Pfizer',
      lote: 'FP8723',
      dose: 'Reforço',
      estabelecimento: 'UBS 01 Asa Sul',
      vacinador: 'Enf. Maria Oliveira',
      codigoCNES: '0010456',
    });

    expect(cartao.id).toBe('vac-101');
    expect(cartao.imunobiologico).toBe('Covid-19 Bivalente');
    expect(cartao.fabricante).toBe('Pfizer');
    expect(cartao.lote).toBe('FP8723');
    expect(cartao.dose).toBe('Reforço');
    expect(cartao.tipo).toBe('VACINA');
    expect(cartao.getCategoria()).toBe('Vacina');
  });

  it('deve gerar resumo amigável com imunobiológico, dose e lote', () => {
    const dataMock = new Date('2023-05-15T00:00:00Z');
    const cartao = new CartaoVacina({
      id: 'vac-102',
      dataRegistro: dataMock,
      imunobiologico: 'Febre Amarela',
      fabricante: 'Fiocruz',
      lote: '22VFA019Z',
      dose: 'Dose Única',
      estabelecimento: 'UBS 02',
    });

    const resumo = cartao.getResumo();
    expect(resumo).toContain('Febre Amarela');
    expect(resumo).toContain('Dose Única');
    expect(resumo).toContain('22VFA019Z');
  });

  it('deve retornar detalhes estruturados com todos os atributos', () => {
    const cartao = new CartaoVacina({
      id: 'vac-103',
      dataRegistro: '2024-01-01T10:00:00Z',
      imunobiologico: 'Influenza',
      fabricante: 'Butantan',
      lote: '230089A',
      dose: 'Anual',
      estabelecimento: 'Centro de Saúde Ceilândia',
      vacinador: 'Téc. Lucas Silva',
    });

    const detalhes = cartao.getDetalhes();
    expect(detalhes.id).toBe('vac-103');
    expect(detalhes.tipo).toBe('VACINA');
    expect(detalhes.categoria).toBe('Vacina');
    expect(detalhes.fabricante).toBe('Butantan');
    expect(detalhes.vacinador).toBe('Téc. Lucas Silva');
  });

  it('deve lançar erro se o ID for vazio', () => {
    expect(() => {
      new CartaoVacina({
        id: '',
        dataRegistro: new Date(),
        imunobiologico: 'Covid-19',
        fabricante: 'Pfizer',
        lote: 'LOTE1',
        dose: '1ª Dose',
        estabelecimento: 'UBS',
      });
    }).toThrow('ID do registro de vacina é obrigatório.');
  });

  it('deve lançar erro se o nome da vacina for vazio', () => {
    expect(() => {
      new CartaoVacina({
        id: 'vac-01',
        dataRegistro: new Date(),
        imunobiologico: '',
        fabricante: 'Pfizer',
        lote: 'LOTE1',
        dose: '1ª Dose',
        estabelecimento: 'UBS',
      });
    }).toThrow('Nome do imunobiológico / vacina é obrigatório.');
  });

  it('deve lançar erro se o lote for vazio', () => {
    expect(() => {
      new CartaoVacina({
        id: 'vac-01',
        dataRegistro: new Date(),
        imunobiologico: 'Covid-19',
        fabricante: 'Pfizer',
        lote: '',
        dose: '1ª Dose',
        estabelecimento: 'UBS',
      });
    }).toThrow('Lote da vacina é obrigatório para rastreabilidade.');
  });
});
