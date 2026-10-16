import { BuscadorDeHistorico } from './BuscadorDeHistorico';
import { ReceitaMedicamento, type DadosMedicamentoInput, type ItemMedicamento } from './ReceitaMedicamento';
import type { RegistroClinico } from './RegistroClinico';

/**
 * Criador Concreto (ConcreteCreator) no padrão GoF Factory Method — Versão 3.
 *
 * Especializa o BuscadorDeHistorico implementando o Factory Method `criarRegistroClinico`
 * para converter dados brutos de dispensações farmacêuticas e prescrições da RNDS
 * em instâncias concretas de `ReceitaMedicamento`.
 */
export class BuscadorDeMedicamentos extends BuscadorDeHistorico {
  /**
   * Implementação do Factory Method para a fatia de Medicamentos e Farmácia Popular.
   * Valida a carga de dados brutos e instancia o produto concreto `ReceitaMedicamento`.
   *
   * @param dadosBrutos Objeto com dados clínicos de dispensação/prescrição provenientes da RNDS simulada
   * @returns Uma instância de ReceitaMedicamento implementando RegistroClinico
   */
  public override criarRegistroClinico(dadosBrutos: Record<string, unknown>): RegistroClinico {
    if (!dadosBrutos || typeof dadosBrutos !== 'object') {
      throw new Error('Dados brutos inválidos para criação do Registro de Medicamento.');
    }

    const payload: DadosMedicamentoInput = {
      id: String(dadosBrutos.id ?? `med-${Date.now()}`),
      dataRegistro: dadosBrutos.dataRegistro ? new Date(String(dadosBrutos.dataRegistro)) : new Date(),
      tipoReceita: (dadosBrutos.tipoReceita as DadosMedicamentoInput['tipoReceita']) ?? 'Dispensação',
      programaSaude: String(dadosBrutos.programaSaude ?? 'Farmácia Popular do Brasil'),
      estabelecimento: String(dadosBrutos.estabelecimento ?? 'Farmácia Credenciada SUS'),
      profissionalPrescritor: dadosBrutos.profissionalPrescritor ? String(dadosBrutos.profissionalPrescritor) : undefined,
      registroProfissional: dadosBrutos.registroProfissional ? String(dadosBrutos.registroProfissional) : undefined,
      codigoCNES: dadosBrutos.codigoCNES ? String(dadosBrutos.codigoCNES) : undefined,
      numeroReceita: dadosBrutos.numeroReceita ? String(dadosBrutos.numeroReceita) : undefined,
      statusDispensacao: (dadosBrutos.statusDispensacao as DadosMedicamentoInput['statusDispensacao']) ?? 'Dispensado',
      itens: Array.isArray(dadosBrutos.itens) ? (dadosBrutos.itens as ItemMedicamento[]) : [],
      observacoes: dadosBrutos.observacoes ? String(dadosBrutos.observacoes) : undefined,
    };

    return new ReceitaMedicamento(payload);
  }

  public override obterTipoSecao(): string {
    return 'Medicamentos e Farmácia Popular';
  }
}
