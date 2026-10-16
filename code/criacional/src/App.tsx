import { useMemo, useState } from 'react';
import { BuscadorDeVacinas } from './padrao/BuscadorDeVacinas';
import { BuscadorDeExames } from './padrao/BuscadorDeExames';
import type { CartaoVacina } from './padrao/CartaoVacina';
import type { ResultadoExame } from './padrao/ResultadoExame';
import { vacinasMock } from './dominio/vacinasMock';
import { examesMock } from './dominio/examesMock';
import './ui/meuSus.css';

type TelaAtiva = 'primeiraPagina' | 'detalheCarteira' | 'exames';
type AbaAtiva = 'documentos' | 'historico';

export function App() {
  const [telaAtual, setTelaAtual] = useState<TelaAtiva>('primeiraPagina');
  const [abaAtual, setAbaAtual] = useState<AbaAtiva>('documentos');
  const [mostrarDockGof, setMostrarDockGof] = useState<boolean>(true);
  const [logGof, setLogGof] = useState<string>(
    'Factory Method pronto: BuscadorDeVacinas (V1) e BuscadorDeExames (V2) ativos.'
  );

  // Instâncias dos Criadores Concretos (GoF Factory Method)
  const buscadorVacinas = useMemo(() => new BuscadorDeVacinas(), []);
  const buscadorExames = useMemo(() => new BuscadorDeExames(), []);

  // Listas de instâncias concretas criadas em lote pelo Factory Method (processarRegistros)
  const [vacinasInstanciadas, setVacinasInstanciadas] = useState<CartaoVacina[]>(() => {
    return buscadorVacinas.processarRegistros(vacinasMock) as CartaoVacina[];
  });

  const [examesInstanciados, setExamesInstanciados] = useState<ResultadoExame[]>(() => {
    return buscadorExames.processarRegistros(examesMock) as ResultadoExame[];
  });

  // Demonstração interativa do Factory Method em tempo de execução para Vacinas (V1)
  const handleAdicionarNovaVacina = () => {
    const doses = ['Dose Anual', 'Reforço', 'Dose Única'];
    const novas = [
      { nome: 'vacina dengue tetravalente', fab: 'TAKEDA PHARMA', lote: 'DEN9012' },
      { nome: 'vacina febre amarela (atenuada)', fab: 'FIOCRUZ', lote: 'FA8841Z' },
      { nome: 'vacina hepatite B (recombinante)', fab: 'BUTANTAN', lote: 'HB7720A' },
    ];
    const sorteio = novas[Math.floor(Math.random() * novas.length)];
    const doseSorteada = doses[Math.floor(Math.random() * doses.length)];

    const payload = {
      id: `vac-${Date.now()}`,
      dataRegistro: new Date().toISOString(),
      imunobiologico: sorteio.nome,
      fabricante: sorteio.fab,
      lote: sorteio.lote,
      dose: doseSorteada,
      estabelecimento: 'UBS 01 Asa Sul - Brasília/DF',
      vacinador: 'Enfermeiro(a)',
      codigoCNES: '0010456',
    };

    const novoRegistro = buscadorVacinas.criarRegistroClinico(payload) as CartaoVacina;
    setVacinasInstanciadas((prev) => [novoRegistro, ...prev]);
    setLogGof(
      `✓ [V1 Factory Method]: Instanciado "${novoRegistro.imunobiologico}" (${novoRegistro.dose}) via BuscadorDeVacinas.criarRegistroClinico()`
    );
  };

  // Demonstração interativa do Factory Method em tempo de execução para Exames (Versão 2)
  const handleAdicionarNovoExame = () => {
    const catalogoNovos = [
      {
        nome: 'Hemoglobina Glicada (HbA1c)',
        cat: 'Bioquímica Clínica',
        lab: 'LACEN/DF - Unidade Central',
        resp: 'Dra. Camila Vasconcelos',
        params: [
          { nome: 'HbA1c', resultado: '5.4', unidadeMedida: '%', valorReferencia: '< 5.7%', situacao: 'NORMAL' as const },
        ],
        laudo: 'Controle glicêmico dos últimos 90 dias dentro dos parâmetros normais.',
      },
      {
        nome: '25-Hidroxivitamina D (Vitamina D Total)',
        cat: 'Imunologia / Hormônios',
        lab: 'Laboratório Regional de Sobradinho - SES/DF',
        resp: 'Dr. Roberto Meireles',
        params: [
          { nome: 'Vitamina D (25-OH-D)', resultado: '34.2', unidadeMedida: 'ng/mL', valorReferencia: '20 a 60 ng/mL', situacao: 'NORMAL' as const },
        ],
        laudo: 'Nível sérico de vitamina D suficiente.',
      },
      {
        nome: 'Hormônio Tireoestimulante (TSH Ultra Sensível)',
        cat: 'Endocrinologia Laboratorial',
        lab: 'LACEN/DF - Núcleo de Patologia',
        resp: 'Dra. Amanda Fontes',
        params: [
          { nome: 'TSH', resultado: '2.15', unidadeMedida: 'µUI/mL', valorReferencia: '0.40 a 4.50 µUI/mL', situacao: 'NORMAL' as const },
        ],
        laudo: 'Função tireoidiana em eutireoidismo.',
      },
    ];

    const sorteio = catalogoNovos[Math.floor(Math.random() * catalogoNovos.length)];

    const payload = {
      id: `exm-${Date.now()}`,
      dataRegistro: new Date().toISOString(),
      nomeExame: sorteio.nome,
      categoriaExame: sorteio.cat,
      laboratorio: sorteio.lab,
      statusResultado: 'Liberado' as const,
      responsavelTecnico: sorteio.resp,
      numeroSolicitacao: `SOL-2024-${Math.floor(10000 + Math.random() * 90000)}`,
      codigoCNES: '0010456',
      parametros: sorteio.params,
      laudoConclusivo: sorteio.laudo,
    };

    const novoRegistro = buscadorExames.criarRegistroClinico(payload) as ResultadoExame;
    setExamesInstanciados((prev) => [novoRegistro, ...prev]);
    setLogGof(
      `✓ [V2 Factory Method]: Instanciado "${novoRegistro.nomeExame}" (${novoRegistro.categoriaExame}) via BuscadorDeExames.criarRegistroClinico()`
    );
  };

  return (
    <div className="meusus-layout">
      {/* 1. SIDEBAR LATERAL ESQUERDA (Oficial do Meu SUS Digital) */}
      <aside className="meusus-sidebar">
        <div>
          <div className="menu-header">
            <img
              src="/marcaMeuSusDigital.svg"
              alt="Marca Meu SUS Digital"
              className="logo"
            />
          </div>

          <ul className="meusus-menu-list">
            <li
              className={`meusus-menu-item ${telaAtual === 'primeiraPagina' || telaAtual === 'detalheCarteira' ? 'active' : ''}`}
              onClick={() => setTelaAtual('primeiraPagina')}
            >
              <svg width="22" height="22" viewBox="0 0 30 31" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.09 10.86C3.38 11.19 2.51 10.92 2.15 10.26C1.8 9.6 2.09 8.8 2.8 8.47L14.35 3.14C14.76 2.95 15.24 2.95 15.65 3.14L27.2 8.47C27.91 8.8 28.2 9.6 27.85 10.26C27.49 10.92 26.62 11.19 25.91 10.86L15 5.82L4.09 10.86ZM23.82 11.37L15.96 8.18C15.36 7.94 14.65 7.94 14.04 8.18L6.18 11.37C5.46 11.67 5 12.27 5 12.93V25.39C5 26.61 5 27.25 5.32 27.6C5.7 28 6.5 28 8.21 28H12V23.67C12 22.19 13.34 21 15 21C16.66 21 18 22.19 18 23.67V28H21.79C23.67 28 24.45 28 24.77 27.62C25 27.34 25 26.88 25 26.08V12.93C25 12.27 24.54 11.67 23.82 11.37Z"
                />
              </svg>
              <span>Vacinas (V1)</span>
            </li>

            <li
              className={`meusus-menu-item ${telaAtual === 'exames' ? 'active' : ''}`}
              onClick={() => setTelaAtual('exames')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2v6a2 2 0 0 0 2 2h6" />
                <path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10l6 6v6a2 2 0 0 1-2 2" />
                <path d="M6 18h12" />
                <path d="M6 14h12" />
                <path d="M6 10h6" />
                <path d="M9 22h6" />
              </svg>
              <span>Exames (V2)</span>
            </li>

            <li className="meusus-menu-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Dúvidas frequentes</span>
            </li>
          </ul>
        </div>

        <div className="bottom-box">
          <img src="/logo-govbr.svg" alt="Logo gov.br" className="logo-govbr" />
        </div>
      </aside>

      {/* 2. ÁREA DE CONTEÚDO */}
      <main className="meusus-content">
        {/* Banner GoF Didático */}
        {mostrarDockGof && (
          <div className="gof-dock">
            <div>
              <span className="gof-dock-tag">GoF Criacional</span>
              <strong>Factory Method:</strong> {logGof} | ({vacinasInstanciadas.length} Vacinas, {examesInstanciados.length} Exames)
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={handleAdicionarNovaVacina} className="gof-btn-action">
                ⚡ +Vacina (V1)
              </button>
              <button
                onClick={handleAdicionarNovoExame}
                className="gof-btn-action"
                style={{ backgroundColor: '#16A34A' }}
              >
                ⚡ +Exame (V2)
              </button>
              <button
                onClick={() => setMostrarDockGof(false)}
                style={{ background: 'none', border: 'none', color: '#166534', cursor: 'pointer' }}
                title="Fechar barra"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Header Superior Oficial (Olá, Usuário) */}
        <div className="meusus-top-header">
          <div className="box-welcome">
            Olá, <b>Usuário</b>
          </div>
          <div className="box-actions">
            <div className="box-card">
              <div className="box-info">
                <label>Usuário</label>
                <span>CPF: ***.325.000-**</span>
              </div>
              <div className="box-foto">
                <img src="/avatar-default.svg" alt="Avatar Usuário" />
              </div>
            </div>
            <button className="notification-btn" title="Notificações">
              <svg width="22" height="22" viewBox="0 0 18 21" fill="currentColor">
                <path d="M9 21c1.1 0 2-.9 2-2H7c0 1.1.9 2 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C4.64 3.36 3 5.92 3 9v6l-2 2v1h16v-1l-2-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TELA 1: PRIMEIRA PÁGINA (/vacinas)                       */}
        {/* ======================================================== */}
        {telaAtual === 'primeiraPagina' && (
          <div>
            <div className="meusus-subheader">
              <button className="meusus-btn-voltar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="meusus-subheader-title">Vacinas</span>
              <button className="meusus-btn-ajuda">Ajuda</button>
            </div>

            <div className="banner-carteira">
              <img
                src="/banner-carteira.svg"
                alt="Banner Carteira Nacional de Vacinação"
                onClick={() => setTelaAtual('detalheCarteira')}
              />
            </div>

            <div className="menu-horizontal">
              <button
                className={`btn-tab ${abaAtual === 'documentos' ? 'active' : ''}`}
                onClick={() => setAbaAtual('documentos')}
              >
                Documentos
              </button>
              <button
                className={`btn-tab ${abaAtual === 'historico' ? 'active' : ''}`}
                onClick={() => setAbaAtual('historico')}
              >
                Histórico de vacinas
              </button>
            </div>

            {abaAtual === 'documentos' && (
              <div>
                <div className="box-title">
                  <span>Documentos de vacinação</span>
                </div>

                <div className="box-certificado">
                  <span>Carteira nacional de vacinação</span>
                  <div className="btn-certificado" onClick={() => setTelaAtual('detalheCarteira')}>
                    <span>Suas vacinas</span>
                    <div className="certificado-icon">
                      <span>{vacinasInstanciadas.length} Vacinas</span>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#0070D1" strokeWidth="2.5">
                        <path d="M7 4l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {abaAtual === 'historico' && (
              <div className="vacinas-container">
                <div className="box-title" style={{ margin: '-1rem -1.5rem 1rem -1.5rem' }}>
                  <span>Histórico Geral RNDS ({vacinasInstanciadas.length} Registros)</span>
                </div>
                {vacinasInstanciadas.map((vacina) => (
                  <div key={vacina.id} className="card-vacina">
                    <div className="img-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m18 2 4 4-2 2-4-4 2-2Z" />
                        <path d="m17 7 3-3" />
                        <path d="M19 9 8.7 19.3c-.4.4-1 .4-1.4 0l-2.6-2.6c-.4-.4-.4-1 0-1.4L15 5" />
                        <path d="m9 11 4 4" />
                        <path d="m5 19-3 3" />
                        <path d="m14 4 6 6" />
                      </svg>
                    </div>
                    <div className="info-box">
                      <div className="line-info">
                        <span className="dose">{vacina.dose}</span>
                        <span className="data">{vacina.dataRegistro.toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="line-info">
                        <h4 className="title">{vacina.imunobiologico}</h4>
                      </div>
                      <div className="line-info">
                        <span className="inst">{vacina.fabricante}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TELA 2: SEGUNDA PÁGINA (Detalhe da Carteira de Vacinação) */}
        {/* ======================================================== */}
        {telaAtual === 'detalheCarteira' && (
          <div>
            <div className="meusus-subheader">
              <button className="meusus-btn-voltar" onClick={() => setTelaAtual('primeiraPagina')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="meusus-subheader-title">Carteira de vacinação</span>
              <button className="meusus-btn-ajuda" onClick={() => setTelaAtual('primeiraPagina')}>
                Fechar
              </button>
            </div>

            <div className="vacinas-container">
              {vacinasInstanciadas.map((vacina) => (
                <div key={vacina.id} className="card-vacina">
                  <div className="img-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m18 2 4 4-2 2-4-4 2-2Z" />
                      <path d="m17 7 3-3" />
                      <path d="M19 9 8.7 19.3c-.4.4-1 .4-1.4 0l-2.6-2.6c-.4-.4-.4-1 0-1.4L15 5" />
                      <path d="m9 11 4 4" />
                      <path d="m5 19-3 3" />
                      <path d="m14 4 6 6" />
                    </svg>
                  </div>
                  <div className="info-box">
                    <div className="line-info">
                      <span className="dose">{vacina.dose}</span>
                      <span className="data">{vacina.dataRegistro.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="line-info">
                      <h4 className="title">{vacina.imunobiologico}</h4>
                    </div>
                    <div className="line-info">
                      <span className="inst">{vacina.fabricante}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TELA 3: FATIA DE EXAMES LABORATORIAIS (Versão 2) */}
        {/* ======================================================== */}
        {telaAtual === 'exames' && (
          <div>
            <div className="meusus-subheader">
              <button className="meusus-btn-voltar" onClick={() => setTelaAtual('primeiraPagina')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="meusus-subheader-title">Exames Laboratoriais</span>
              <button className="meusus-btn-ajuda">Ajuda</button>
            </div>

            <div className="banner-exames-card">
              <div className="banner-exames-info">
                <h3>Rede Nacional de Dados em Saúde (RNDS)</h3>
                <p>
                  Resultados e laudos de exames processados pelo padrão <strong>Factory Method</strong> (BuscadorDeExames).
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '24px', fontWeight: 800 }}>{examesInstanciados.length}</span>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>Laudos Disponíveis</div>
              </div>
            </div>

            <div className="box-title" style={{ margin: '0 1.5rem 1rem 1.5rem' }}>
              <span>Laudos e Resultados Clínicos ({examesInstanciados.length})</span>
            </div>

            <div className="exames-container">
              {examesInstanciados.map((exame) => (
                <div key={exame.id} className="card-exame">
                  <div className="card-exame-header">
                    <div className="exame-icon-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18h12" />
                        <path d="M10 2v7.5L4.5 19.5A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-2.5L14 9.5V2" />
                        <path d="M8.5 2h7" />
                        <path d="M7 16h10" />
                      </svg>
                    </div>
                    <div className="exame-title-area">
                      <h4>{exame.nomeExame}</h4>
                      <div className="exame-subinfo">
                        <span className="badge-categoria">{exame.categoriaExame}</span>
                        <span>•</span>
                        <span>{exame.laboratorio}</span>
                      </div>
                    </div>
                    <span className={`badge-status ${exame.statusResultado === 'Liberado' ? 'liberado' : 'em-analise'}`}>
                      {exame.statusResultado}
                    </span>
                  </div>

                  <div className="exame-body">
                    <div className="exame-metadados">
                      <div>
                        <strong>Data de Coleta/Liberação:</strong> {exame.dataRegistro.toLocaleDateString('pt-BR')}
                      </div>
                      <div>
                        <strong>Solicitação:</strong> {exame.numeroSolicitacao ?? 'N/A'}
                      </div>
                      <div>
                        <strong>Responsável:</strong> {exame.responsavelTecnico}
                      </div>
                      <div>
                        <strong>Metodologia:</strong> {exame.metodologia}
                      </div>
                    </div>

                    {exame.laudoConclusivo && (
                      <div className="exame-laudo-box">
                        <strong>Parecer Técnico:</strong> {exame.laudoConclusivo}
                      </div>
                    )}

                    {exame.parametros && exame.parametros.length > 0 && (
                      <table className="parametros-table">
                        <thead>
                          <tr>
                            <th>Parâmetro</th>
                            <th>Resultado</th>
                            <th>Unidade</th>
                            <th>Valor de Referência</th>
                            <th>Situação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exame.parametros.map((param, idx) => (
                            <tr key={idx}>
                              <td><strong>{param.nome}</strong></td>
                              <td>{param.resultado}</td>
                              <td>{param.unidadeMedida ?? '-'}</td>
                              <td>{param.valorReferencia ?? '-'}</td>
                              <td>
                                <span className={param.situacao === 'NORMAL' ? 'badge-parametro-normal' : 'badge-parametro-alterado'}>
                                  {param.situacao ?? 'NORMAL'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rodapé Acadêmico Institucional */}
        <footer className="meusus-footer">
          <p>
            Desenvolvido para fins didáticos na disciplina de <strong>Arquitetura e Desenho de Software (2026.2)</strong> •{' '}
            Universidade de Brasília (UnB - FGA)
          </p>
          <p className="meusus-footer-sub">
            Grupo 05 • Meu SUS Digital • SubEquipe 01: GoF Criacional (Factory Method - Versão 2)
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
