// Autoria: Victor Leandro (@Afrontoso) — montagem da árvore do painel (commit 7e67564)
import { CartaoDeAtalho } from '../padrao/CartaoDeAtalho'
import { Dashboard } from '../padrao/Dashboard'
import { Secao } from '../padrao/Secao'

/**
 * Monta a árvore do painel inicial do Meu SUS Digital com dados simulados.
 * As seções e os cartões seguem o fluxograma da Entrega 2 (SubEquipe 02);
 * nenhum dado vem de APIs reais.
 */
export function criarPainelSimulado(): Dashboard {
  const maisServicos = new Secao(
    'mais-servicos',
    'Mais serviços',
    'Outros serviços clínicos disponíveis',
  )
  maisServicos.adicionar(
    new CartaoDeAtalho('dignidade-menstrual', 'Dignidade Menstrual', '🌸', '/dignidade-menstrual'),
  )
  maisServicos.adicionar(new CartaoDeAtalho('rede-de-saude', 'Rede de Saúde', '🏥', '/rede-de-saude'))
  maisServicos.adicionar(
    new CartaoDeAtalho('atendimentos-internacao', 'Atendimentos e Internação', '🛏️', '/atendimentos'),
  )

  const minhaSaude = new Secao('minha-saude', 'Minha Saúde', 'Registros e serviços clínicos')
  minhaSaude.adicionar(new CartaoDeAtalho('vacinas', 'Vacinas', '💉', '/vacinas'))
  minhaSaude.adicionar(new CartaoDeAtalho('exames', 'Exames', '🧪', '/exames'))
  minhaSaude.adicionar(new CartaoDeAtalho('medicamentos', 'Medicamentos', '💊', '/medicamentos'))
  minhaSaude.adicionar(
    new CartaoDeAtalho('medicos-especialistas', 'Médicos Especialistas', '🩺', '/especialistas'),
  )
  minhaSaude.adicionar(new CartaoDeAtalho('agendamentos', 'Agendamentos', '📅', '/agendamentos'))
  minhaSaude.adicionar(maisServicos)

  const miniApps = new Secao('mini-apps', 'Mini apps', 'Aplicativos integrados de saúde')
  miniApps.adicionar(new CartaoDeAtalho('hemovida', 'Hemovida', '🩸', '/mini-apps/hemovida'))
  miniApps.adicionar(
    new CartaoDeAtalho('caderneta-crianca', 'Caderneta da Criança', '👶', '/mini-apps/caderneta'),
  )
  miniApps.adicionar(new CartaoDeAtalho('peso-saudavel', 'Peso Saudável', '⚖️', '/mini-apps/peso'))
  miniApps.adicionar(new CartaoDeAtalho('acolhe-mais', 'Acolhe Mais+', '💬', '/mini-apps/acolhe'))

  const painel = new Dashboard('painel-inicio', 'Meu SUS Digital')
  painel.adicionarSecao(minhaSaude)
  painel.adicionarSecao(miniApps)

  return painel
}
