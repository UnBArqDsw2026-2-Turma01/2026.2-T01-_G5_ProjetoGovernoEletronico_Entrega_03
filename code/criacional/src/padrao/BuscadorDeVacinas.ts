import { BuscadorDeHistorico } from './BuscadorDeHistorico';
import { CartaoVacina, type DadosVacinaInput } from './CartaoVacina';
import type { RegistroClinico } from './RegistroClinico';

/**
 * Criador Concreto (ConcreteCreator) no padrão GoF Factory Method.
 * 
 * Especializa o BuscadorDeHistorico implementando o Factory Method `criarRegistroClinico`
 * para converter dados brutos da RNDS em instâncias concretas de `CartaoVacina`.
 */
export class BuscadorDeVacinas extends BuscadorDeHistorico {
  /**
   * Implementação do Factory Method para a fatia de Imunizações/Vacinas.
   * Valida os campos recebidos e instancia o produto concreto `CartaoVacina`.
   */
  public override criarRegistroClinico(dadosBrutos: Record<string, unknown>): RegistroClinico {
    if (!dadosBrutos || typeof dadosBrutos !== 'object') {
      throw new Error('Dados brutos inválidos para criação do Cartão de Vacina.');
    }

    const payload: DadosVacinaInput = {
      id: String(dadosBrutos.id ?? `vac-${Date.now()}`),
      dataRegistro: dadosBrutos.dataRegistro ? new Date(String(dadosBrutos.dataRegistro)) : new Date(),
      imunobiologico: String(dadosBrutos.imunobiologico ?? dadosBrutos.nomeVacina ?? ''),
      fabricante: String(dadosBrutos.fabricante ?? 'Não informado'),
      lote: String(dadosBrutos.lote ?? ''),
      dose: String(dadosBrutos.dose ?? 'Dose Única'),
      descricaoPrevisao: dadosBrutos.descricaoPrevisao ? String(dadosBrutos.descricaoPrevisao) : undefined,
      estabelecimento: String(dadosBrutos.estabelecimento ?? 'UBS Central SUS'),
      vacinador: dadosBrutos.vacinador ? String(dadosBrutos.vacinador) : undefined,
      codigoCNES: dadosBrutos.codigoCNES ? String(dadosBrutos.codigoCNES) : undefined,
    };

    return new CartaoVacina(payload);
  }

  public override obterTipoSecao(): string {
    return 'Vacinas e Imunizações';
  }
}
