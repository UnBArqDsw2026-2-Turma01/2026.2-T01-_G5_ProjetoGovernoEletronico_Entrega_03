import type { RegistroClinico } from './RegistroClinico';

export interface DadosVacinaInput {
  id: string;
  dataRegistro: Date | string;
  imunobiologico: string;
  fabricante: string;
  lote: string;
  dose: string;
  estabelecimento: string;
  descricaoPrevisao?: string;
  vacinador?: string;
  codigoCNES?: string;
}

/**
 * Produto Concreto (ConcreteProduct) no padrão GoF Factory Method.
 * Representa um registro individual de imunização / Cartão de Vacinação Digital no Meu SUS Digital.
 */
export class CartaoVacina implements RegistroClinico {
  public readonly id: string;
  public readonly dataRegistro: Date;
  public readonly tipo = 'VACINA' as const;

  public readonly imunobiologico: string;
  public readonly fabricante: string;
  public readonly lote: string;
  public readonly dose: string;
  public readonly estabelecimento: string;
  public readonly descricaoPrevisao?: string;
  public readonly vacinador: string;
  public readonly codigoCNES?: string;

  constructor(dados: DadosVacinaInput) {
    if (!dados.id || dados.id.trim() === '') {
      throw new Error('ID do registro de vacina é obrigatório.');
    }
    if (!dados.imunobiologico || dados.imunobiologico.trim() === '') {
      throw new Error('Nome do imunobiológico / vacina é obrigatório.');
    }
    if (!dados.lote || dados.lote.trim() === '') {
      throw new Error('Lote da vacina é obrigatório para rastreabilidade.');
    }
    if (!dados.dose || dados.dose.trim() === '') {
      throw new Error('Identificação da dose é obrigatória.');
    }

    this.id = dados.id;
    this.dataRegistro = dados.dataRegistro instanceof Date ? dados.dataRegistro : new Date(dados.dataRegistro);
    this.imunobiologico = dados.imunobiologico;
    this.fabricante = dados.fabricante || 'Fabricante não informado';
    this.lote = dados.lote;
    this.dose = dados.dose;
    this.estabelecimento = dados.estabelecimento || 'Estabelecimento de Saúde SUS';
    this.descricaoPrevisao = dados.descricaoPrevisao;
    this.vacinador = dados.vacinador || 'Profissional de Saúde Autorizado';
    this.codigoCNES = dados.codigoCNES;
  }

  public getCategoria(): string {
    return 'Vacina';
  }

  public getResumo(): string {
    const dataFormatada = this.dataRegistro.toLocaleDateString('pt-BR');
    return `${this.imunobiologico} (${this.dose}) - Aplicada em ${dataFormatada} [Lote: ${this.lote}]`;
  }

  public getDetalhes(): Record<string, unknown> {
    return {
      id: this.id,
      tipo: this.tipo,
      categoria: this.getCategoria(),
      imunobiologico: this.imunobiologico,
      fabricante: this.fabricante,
      dose: this.dose,
      lote: this.lote,
      estabelecimento: this.estabelecimento,
      vacinador: this.vacinador,
      dataAplicacao: this.dataRegistro.toISOString(),
      codigoCNES: this.codigoCNES,
    };
  }
}
