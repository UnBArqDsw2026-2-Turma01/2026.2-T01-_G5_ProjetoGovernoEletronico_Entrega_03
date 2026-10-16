import type { RegistroClinico } from './RegistroClinico';

export interface ItemMedicamento {
  nomeMedicamento: string;
  principioAtivo: string;
  concentracao: string;
  formaFarmaceutica: string;
  posologia: string;
  quantidade: number;
  unidade: string;
  viaAdministracao?: string;
  duracaoTratamento?: string;
}

export interface DadosMedicamentoInput {
  id: string;
  dataRegistro: Date | string;
  tipoReceita: 'Dispensação' | 'Prescrição' | 'Receituário';
  programaSaude: string;
  estabelecimento: string;
  profissionalPrescritor?: string;
  registroProfissional?: string;
  codigoCNES?: string;
  numeroReceita?: string;
  statusDispensacao: 'Dispensado' | 'Pendente' | 'Cancelado' | 'Parcial';
  itens?: ItemMedicamento[];
  observacoes?: string;
}

/**
 * Produto Concreto (ConcreteProduct) no padrão GoF Factory Method — Versão 3.
 * Representa uma dispensação ou prescrição de medicamento do Programa Farmácia Popular
 * e de outros programas de assistência farmacêutica do SUS, proveniente da RNDS.
 */
export class ReceitaMedicamento implements RegistroClinico {
  public readonly id: string;
  public readonly dataRegistro: Date;
  public readonly tipo = 'MEDICAMENTO' as const;

  public readonly tipoReceita: 'Dispensação' | 'Prescrição' | 'Receituário';
  public readonly programaSaude: string;
  public readonly estabelecimento: string;
  public readonly profissionalPrescritor: string;
  public readonly registroProfissional: string;
  public readonly codigoCNES?: string;
  public readonly numeroReceita?: string;
  public readonly statusDispensacao: 'Dispensado' | 'Pendente' | 'Cancelado' | 'Parcial';
  public readonly itens: ItemMedicamento[];
  public readonly observacoes?: string;

  constructor(dados: DadosMedicamentoInput) {
    if (!dados.id || dados.id.trim() === '') {
      throw new Error('ID do registro de medicamento é obrigatório.');
    }
    if (!dados.programaSaude || dados.programaSaude.trim() === '') {
      throw new Error('Programa de saúde é obrigatório para rastreabilidade.');
    }
    if (!dados.estabelecimento || dados.estabelecimento.trim() === '') {
      throw new Error('Estabelecimento de dispensação é obrigatório.');
    }
    if (!dados.statusDispensacao || dados.statusDispensacao.trim() === '') {
      throw new Error('Status da dispensação é obrigatório.');
    }

    this.id = dados.id;
    this.dataRegistro = dados.dataRegistro instanceof Date ? dados.dataRegistro : new Date(dados.dataRegistro);
    this.tipoReceita = dados.tipoReceita || 'Dispensação';
    this.programaSaude = dados.programaSaude;
    this.estabelecimento = dados.estabelecimento;
    this.profissionalPrescritor = dados.profissionalPrescritor || 'Médico(a) Prescritor(a) SUS';
    this.registroProfissional = dados.registroProfissional || 'CRM não informado';
    this.codigoCNES = dados.codigoCNES;
    this.numeroReceita = dados.numeroReceita;
    this.statusDispensacao = dados.statusDispensacao;
    this.itens = dados.itens ?? [];
    this.observacoes = dados.observacoes;
  }

  public getCategoria(): string {
    return 'Medicamento / Farmácia Popular';
  }

  public getResumo(): string {
    const dataFormatada = this.dataRegistro.toLocaleDateString('pt-BR');
    const nomesPrincipais = this.itens.length > 0
      ? this.itens.map((item) => item.nomeMedicamento).join(', ')
      : 'Medicamento não especificado';
    return `${nomesPrincipais} - ${this.programaSaude} [${this.statusDispensacao}] (${dataFormatada})`;
  }

  public getDetalhes(): Record<string, unknown> {
    return {
      id: this.id,
      tipo: this.tipo,
      categoria: this.getCategoria(),
      tipoReceita: this.tipoReceita,
      programaSaude: this.programaSaude,
      estabelecimento: this.estabelecimento,
      profissionalPrescritor: this.profissionalPrescritor,
      registroProfissional: this.registroProfissional,
      codigoCNES: this.codigoCNES,
      numeroReceita: this.numeroReceita,
      statusDispensacao: this.statusDispensacao,
      itens: this.itens,
      observacoes: this.observacoes,
      dataDispensacao: this.dataRegistro.toISOString(),
    };
  }
}
