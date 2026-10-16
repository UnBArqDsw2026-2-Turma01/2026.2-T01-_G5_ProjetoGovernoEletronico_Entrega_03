import type { RegistroClinico } from './RegistroClinico';

export interface ParametroExame {
  nome: string;
  resultado: string;
  unidadeMedida?: string;
  valorReferencia?: string;
  situacao?: 'NORMAL' | 'ALTERADO' | 'CRITICO';
}

export interface DadosExameInput {
  id: string;
  dataRegistro: Date | string;
  nomeExame: string;
  categoriaExame?: string;
  laboratorio: string;
  metodologia?: string;
  statusResultado: 'Liberado' | 'Em Análise' | 'Concluído';
  responsavelTecnico?: string;
  numeroSolicitacao?: string;
  codigoCNES?: string;
  parametros?: ParametroExame[];
  laudoConclusivo?: string;
}

/**
 * Produto Concreto (ConcreteProduct) no padrão GoF Factory Method.
 * Representa um laudo / resultado individual de exame laboratorial no Meu SUS Digital proveniente da RNDS.
 */
export class ResultadoExame implements RegistroClinico {
  public readonly id: string;
  public readonly dataRegistro: Date;
  public readonly tipo = 'EXAME' as const;

  public readonly nomeExame: string;
  public readonly categoriaExame: string;
  public readonly laboratorio: string;
  public readonly metodologia: string;
  public readonly statusResultado: 'Liberado' | 'Em Análise' | 'Concluído';
  public readonly responsavelTecnico: string;
  public readonly numeroSolicitacao?: string;
  public readonly codigoCNES?: string;
  public readonly parametros: ParametroExame[];
  public readonly laudoConclusivo?: string;

  constructor(dados: DadosExameInput) {
    if (!dados.id || dados.id.trim() === '') {
      throw new Error('ID do registro de exame é obrigatório.');
    }
    if (!dados.nomeExame || dados.nomeExame.trim() === '') {
      throw new Error('Nome do exame laboratorial é obrigatório.');
    }
    if (!dados.laboratorio || dados.laboratorio.trim() === '') {
      throw new Error('Laboratório executor é obrigatório para rastreabilidade.');
    }
    if (!dados.statusResultado || dados.statusResultado.trim() === '') {
      throw new Error('Status do resultado do exame é obrigatório.');
    }

    this.id = dados.id;
    this.dataRegistro = dados.dataRegistro instanceof Date ? dados.dataRegistro : new Date(dados.dataRegistro);
    this.nomeExame = dados.nomeExame;
    this.categoriaExame = dados.categoriaExame || 'Patologia Clínica';
    this.laboratorio = dados.laboratorio;
    this.metodologia = dados.metodologia || 'Automatizada / Padrão RNDS';
    this.statusResultado = dados.statusResultado;
    this.responsavelTecnico = dados.responsavelTecnico || 'Biomédico / Bioquímico Responsável';
    this.numeroSolicitacao = dados.numeroSolicitacao;
    this.codigoCNES = dados.codigoCNES;
    this.parametros = dados.parametros ?? [];
    this.laudoConclusivo = dados.laudoConclusivo;
  }

  public getCategoria(): string {
    return 'Exame Laboratorial';
  }

  public getResumo(): string {
    const dataFormatada = this.dataRegistro.toLocaleDateString('pt-BR');
    return `${this.nomeExame} - ${this.laboratorio} [${this.statusResultado}] (${dataFormatada})`;
  }

  public getDetalhes(): Record<string, unknown> {
    return {
      id: this.id,
      tipo: this.tipo,
      categoria: this.getCategoria(),
      nomeExame: this.nomeExame,
      categoriaExame: this.categoriaExame,
      laboratorio: this.laboratorio,
      metodologia: this.metodologia,
      statusResultado: this.statusResultado,
      responsavelTecnico: this.responsavelTecnico,
      numeroSolicitacao: this.numeroSolicitacao,
      codigoCNES: this.codigoCNES,
      parametros: this.parametros,
      laudoConclusivo: this.laudoConclusivo,
      dataLiberacao: this.dataRegistro.toISOString(),
    };
  }
}
