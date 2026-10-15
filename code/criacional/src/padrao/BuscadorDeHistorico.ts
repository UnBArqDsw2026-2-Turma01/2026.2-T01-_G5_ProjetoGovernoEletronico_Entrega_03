import type { RegistroClinico } from './RegistroClinico';

/**
 * Classe abstrata que representa o Criador (Creator) no padrão GoF Criacional Factory Method.
 * 
 * Ela declara o Factory Method abstrato `criarRegistroClinico`, delegando às subclasses concretas
 * a responsabilidade de decidir qual produto clínico concreto instanciar a partir dos dados recebidos da RNDS.
 */
export abstract class BuscadorDeHistorico {
  /**
   * Factory Method abstrato: cada subclasse concreta (BuscadorDeVacinas, BuscadorDeExames, etc.)
   * deve implementar este método para criar e retornar a sua instância específica de RegistroClinico.
   * 
   * @param dadosBrutos Objeto com dados clínicos provenientes da fonte de dados (ex: RNDS simulada)
   * @returns Uma instância que implementa RegistroClinico
   */
  public abstract criarRegistroClinico(dadosBrutos: Record<string, unknown>): RegistroClinico;

  /**
   * Operação central do Criador que depende do Factory Method.
   * Processa uma lista de dados clínicos brutos, delegando a instanciação de cada item
   * para o método fábrica implementado na subclasse.
   * 
   * @param colecaoBruta Lista de registros brutos
   * @returns Lista de instâncias de RegistroClinico criadas e validadas
   */
  public processarRegistros(colecaoBruta: Record<string, unknown>[]): RegistroClinico[] {
    if (!Array.isArray(colecaoBruta)) {
      throw new Error('A coleção de dados clínicos fornecida deve ser um array válido.');
    }

    return colecaoBruta.map((dadosItem) => this.criarRegistroClinico(dadosItem));
  }

  /**
   * Retorna o tipo de seção que este criador gerencia.
   */
  public abstract obterTipoSecao(): string;
}
