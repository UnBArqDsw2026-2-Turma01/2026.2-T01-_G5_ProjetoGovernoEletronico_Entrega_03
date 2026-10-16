import { BuscadorDeHistorico } from './BuscadorDeHistorico';
import { ResultadoExame, type DadosExameInput, type ParametroExame } from './ResultadoExame';
import type { RegistroClinico } from './RegistroClinico';

/**
 * Criador Concreto (ConcreteCreator) no padrão GoF Factory Method.
 * 
 * Especializa o BuscadorDeHistorico implementando o Factory Method `criarRegistroClinico`
 * para converter dados brutos de laudos laboratoriais da RNDS em instâncias de `ResultadoExame`.
 */
export class BuscadorDeExames extends BuscadorDeHistorico {
  /**
   * Implementação do Factory Method para a fatia de Exames Laboratoriais.
   * Valida a carga de dados brutos e instancia o produto concreto `ResultadoExame`.
   */
  public override criarRegistroClinico(dadosBrutos: Record<string, unknown>): RegistroClinico {
    if (!dadosBrutos || typeof dadosBrutos !== 'object') {
      throw new Error('Dados brutos inválidos para criação do Resultado de Exame.');
    }

    const payload: DadosExameInput = {
      id: String(dadosBrutos.id ?? `exm-${Date.now()}`),
      dataRegistro: dadosBrutos.dataRegistro ? new Date(String(dadosBrutos.dataRegistro)) : new Date(),
      nomeExame: String(dadosBrutos.nomeExame ?? dadosBrutos.descricaoExame ?? ''),
      categoriaExame: String(dadosBrutos.categoriaExame ?? 'Patologia Clínica'),
      laboratorio: String(dadosBrutos.laboratorio ?? 'Laboratório Central de Saúde Pública (LACEN/SUS)'),
      metodologia: dadosBrutos.metodologia ? String(dadosBrutos.metodologia) : undefined,
      statusResultado: (dadosBrutos.statusResultado as DadosExameInput['statusResultado']) ?? 'Liberado',
      responsavelTecnico: dadosBrutos.responsavelTecnico ? String(dadosBrutos.responsavelTecnico) : undefined,
      numeroSolicitacao: dadosBrutos.numeroSolicitacao ? String(dadosBrutos.numeroSolicitacao) : undefined,
      codigoCNES: dadosBrutos.codigoCNES ? String(dadosBrutos.codigoCNES) : undefined,
      parametros: Array.isArray(dadosBrutos.parametros) ? (dadosBrutos.parametros as ParametroExame[]) : [],
      laudoConclusivo: dadosBrutos.laudoConclusivo ? String(dadosBrutos.laudoConclusivo) : undefined,
    };

    return new ResultadoExame(payload);
  }

  public override obterTipoSecao(): string {
    return 'Exames Laboratoriais';
  }
}
