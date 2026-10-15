/**
 * Interface que representa o Produto Abstrato (Product) no padrão GoF Criacional Factory Method.
 * Define o contrato comum para todos os tipos de registros clínicos retornados pelo Meu SUS Digital / RNDS.
 */
export interface RegistroClinico {
  readonly id: string;
  readonly dataRegistro: Date;
  readonly tipo: 'VACINA' | 'EXAME' | 'MEDICAMENTO';

  /**
   * Retorna o nome amigável da categoria clínica do registro.
   */
  getCategoria(): string;

  /**
   * Retorna um resumo textual conciso do registro clínico para exibição em listas.
   */
  getResumo(): string;

  /**
   * Retorna os detalhes estruturados completos do registro clínico.
   */
  getDetalhes(): Record<string, unknown>;
}
