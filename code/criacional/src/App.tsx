import { useMemo, useState } from 'react';
import { BuscadorDeVacinas } from './padrao/BuscadorDeVacinas';
import { BuscadorDeExames } from './padrao/BuscadorDeExames';
import { BuscadorDeMedicamentos } from './padrao/BuscadorDeMedicamentos';
import type { CartaoVacina } from './padrao/CartaoVacina';
import type { ResultadoExame } from './padrao/ResultadoExame';
import type { ReceitaMedicamento } from './padrao/ReceitaMedicamento';
import { vacinasMock } from './dominio/vacinasMock';
import { examesMock } from './dominio/examesMock';
import { medicamentosMock } from './dominio/medicamentosMock';
import './ui/meuSus.css';

type TelaAtiva = 'inicio' | 'vacinas' | 'detalheCarteira' | 'exames' | 'medicamentos';
type AbaAtiva = 'documentos' | 'historico';

export function App() {
  const [telaAtual, setTelaAtual] = useState<TelaAtiva>('inicio');
  const [abaAtual, setAbaAtual] = useState<AbaAtiva>('documentos');
  const [mostrarDockGof, setMostrarDockGof] = useState<boolean>(true);
  const [logGof, setLogGof] = useState<string>(
    'Factory Method V4 Final: BuscadorDeVacinas (V1), BuscadorDeExames (V2) e BuscadorDeMedicamentos (V3) ativos.'
  );

  // Instâncias dos Criadores Concretos (GoF Factory Method)
  const buscadorVacinas = useMemo(() => new BuscadorDeVacinas(), []);
  const buscadorExames = useMemo(() => new BuscadorDeExames(), []);
  const buscadorMedicamentos = useMemo(() => new BuscadorDeMedicamentos(), []);

  // Listas de instâncias concretas criadas em lote pelo Factory Method (processarRegistros)
  const [vacinasInstanciadas, setVacinasInstanciadas] = useState<CartaoVacina[]>(() => {
    return buscadorVacinas.processarRegistros(vacinasMock) as CartaoVacina[];
  });

  const [examesInstanciados, setExamesInstanciados] = useState<ResultadoExame[]>(() => {
    return buscadorExames.processarRegistros(examesMock) as ResultadoExame[];
  });

  const [medicamentosInstanciados, setMedicamentosInstanciados] = useState<ReceitaMedicamento[]>(() => {
    return buscadorMedicamentos.processarRegistros(medicamentosMock) as ReceitaMedicamento[];
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

  // Demonstração interativa do Factory Method em tempo de execução para Medicamentos (Versão 3)
  const handleAdicionarNovoMedicamento = () => {
    const catalogoNovos = [
      {
        nome: 'Enalapril 10mg',
        principio: 'Maleato de Enalapril',
        conc: '10mg',
        forma: 'Comprimido',
        poso: '1 comprimido, 1x ao dia',
        qtd: 30,
        prog: 'Farmácia Popular do Brasil',
        estab: 'Drogaria Raia - Plano Piloto/DF',
        med: 'Dr. Pedro Henrique Alves',
        crm: 'CRM 20.115/DF',
      },
      {
        nome: 'Anlodipino 5mg',
        principio: 'Besilato de Anlodipino',
        conc: '5mg',
        forma: 'Comprimido',
        poso: '1 comprimido, 1x ao dia, pela manhã',
        qtd: 30,
        prog: 'Componente Básico da Assistência Farmacêutica (CBAF)',
        estab: 'UBS 04 Ceilândia - Brasília/DF',
        med: 'Dra. Fernanda Souza',
        crm: 'CRM 23.001/DF',
      },
      {
        nome: 'Omeprazol 20mg',
        principio: 'Omeprazol',
        conc: '20mg',
        forma: 'Cápsula',
        poso: '1 cápsula, 1x ao dia, em jejum',
        qtd: 30,
        prog: 'Farmácia Popular do Brasil',
        estab: 'Drogasil - Águas Claras/DF',
        med: 'Dr. Ricardo Moura',
        crm: 'CRM 17.890/DF',
      },
    ];

    const sorteio = catalogoNovos[Math.floor(Math.random() * catalogoNovos.length)];

    const payload = {
      id: `med-${Date.now()}`,
      dataRegistro: new Date().toISOString(),
      tipoReceita: 'Dispensação' as const,
      programaSaude: sorteio.prog,
      estabelecimento: sorteio.estab,
      profissionalPrescritor: sorteio.med,
      registroProfissional: sorteio.crm,
      codigoCNES: '0061234',
      numeroReceita: `REC-2024-${Math.floor(10000 + Math.random() * 90000)}`,
      statusDispensacao: 'Dispensado' as const,
      itens: [
        {
          nomeMedicamento: sorteio.nome,
          principioAtivo: sorteio.principio,
          concentracao: sorteio.conc,
          formaFarmaceutica: sorteio.forma,
          posologia: sorteio.poso,
          quantidade: sorteio.qtd,
          unidade: 'comprimidos',
          viaAdministracao: 'Oral',
          duracaoTratamento: '30 dias (uso contínuo)',
        },
      ],
    };

    const novoRegistro = buscadorMedicamentos.criarRegistroClinico(payload) as ReceitaMedicamento;
    setMedicamentosInstanciados((prev) => [novoRegistro, ...prev]);
    setLogGof(
      `✓ [V3 Factory Method]: Instanciado "${novoRegistro.itens[0]?.nomeMedicamento}" (${novoRegistro.programaSaude}) via BuscadorDeMedicamentos.criarRegistroClinico()`
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
              className={`meusus-menu-item ${telaAtual === 'inicio' ? 'active' : ''}`}
              onClick={() => setTelaAtual('inicio')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span>Início</span>
            </li>

            <li className="meusus-menu-item disabled">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Aplicações</span>
            </li>

            <li className="meusus-menu-item disabled">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span>Minha saúde</span>
            </li>

            <li className="meusus-menu-item disabled">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Conteúdos</span>
            </li>

            <li className="meusus-menu-item disabled">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Meu perfil</span>
            </li>

            <li className="meusus-menu-item disabled">
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

      {/* 2. ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="meusus-content">
        {/* Banner GoF Didático */}
        {mostrarDockGof && (
          <div className="gof-dock">
            <div>
              <span className="gof-dock-tag">GoF Criacional</span>
              <strong>Factory Method:</strong> {logGof} | ({vacinasInstanciadas.length} Vacinas, {examesInstanciados.length} Exames, {medicamentosInstanciados.length} Medicamentos)
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
                onClick={handleAdicionarNovoMedicamento}
                className="gof-btn-action"
                style={{ backgroundColor: '#7C3AED' }}
              >
                ⚡ +Medicamento (V3)
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
                <span>CPF: ***.000.000-**</span>
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
        {/* TELA 0: INÍCIO (DASHBOARD MINHA SAÚDE)                     */}
        {/* ======================================================== */}
        {telaAtual === 'inicio' && (
          <div className="dashboard-container">
            <h2 className="dashboard-title">Minha Saúde</h2>
            <div className="minha-saude-grid">
              {/* CARD VACINAS */}
              <div className="card-servico-fatia" onClick={() => setTelaAtual('vacinas')}>
                <div className="icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m18 2 4 4-2 2-4-4 2-2Z" />
                    <path d="m17 7 3-3" />
                    <path d="M19 9 8.7 19.3c-.4.4-1 .4-1.4 0l-2.6-2.6c-.4-.4-.4-1 0-1.4L15 5" />
                    <path d="m9 11 4 4" />
                    <path d="m5 19-3 3" />
                  </svg>
                </div>
                <span>Vacinas</span>
              </div>

              {/* CARD EXAMES */}
              <div className="card-servico-fatia" onClick={() => setTelaAtual('exames')}>
                <div className="icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18h12" />
                    <path d="M10 2v7.5L4.5 19.5A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-2.5L14 9.5V2" />
                    <path d="M8.5 2h7" />
                  </svg>
                </div>
                <span>Exames</span>
              </div>

              {/* CARD MEDICAMENTOS */}
              <div className="card-servico-fatia" onClick={() => setTelaAtual('medicamentos')}>
                <div className="icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
                    <circle cx="17" cy="17" r="3" />
                  </svg>
                </div>
                <span>Medicamentos</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TELA 1: PRIMEIRA PÁGINA (/vacinas)                       */}
        {/* ======================================================== */}
        {telaAtual === 'vacinas' && (
          <div>
            <div className="meusus-subheader">
              <button className="meusus-btn-voltar" onClick={() => setTelaAtual('inicio')}>
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
              <button className="meusus-btn-voltar" onClick={() => setTelaAtual('vacinas')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="meusus-subheader-title">Carteira de vacinação</span>
              <button className="meusus-btn-ajuda" onClick={() => setTelaAtual('vacinas')}>
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
              <button className="meusus-btn-voltar" onClick={() => setTelaAtual('inicio')}>
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

        {/* ======================================================== */}
        {/* TELA 4: FATIA DE MEDICAMENTOS / FARMÁCIA POPULAR (Versão 3) */}
        {/* ======================================================== */}
        {telaAtual === 'medicamentos' && (
          <div>
            <div className="meusus-subheader">
              <button className="meusus-btn-voltar" onClick={() => setTelaAtual('inicio')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="meusus-subheader-title">Medicamentos e Farmácia Popular</span>
              <button className="meusus-btn-ajuda">Ajuda</button>
            </div>

            <div className="banner-medicamentos-card">
              <div className="banner-medicamentos-info">
                <h3>Farmácia Popular e Assistência Farmacêutica SUS</h3>
                <p>
                  Dispensações e prescrições processadas pelo padrão <strong>Factory Method</strong> (BuscadorDeMedicamentos).
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '24px', fontWeight: 800 }}>{medicamentosInstanciados.length}</span>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>Receitas Registradas</div>
              </div>
            </div>

            <div className="box-title" style={{ margin: '0 1.5rem 1rem 1.5rem' }}>
              <span>Dispensações e Prescrições ({medicamentosInstanciados.length})</span>
            </div>

            <div className="medicamentos-container">
              {medicamentosInstanciados.map((receita) => (
                <div key={receita.id} className="card-medicamento">
                  <div className="card-medicamento-header">
                    <div className="medicamento-icon-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
                        <circle cx="17" cy="17" r="3" />
                        <path d="M17 14v6" />
                        <path d="M14 17h6" />
                      </svg>
                    </div>
                    <div className="medicamento-title-area">
                      <h4>{receita.itens.length > 0 ? receita.itens.map((i) => i.nomeMedicamento).join(', ') : 'Receita sem itens'}</h4>
                      <div className="medicamento-subinfo">
                        <span className="badge-programa">{receita.programaSaude}</span>
                        <span>•</span>
                        <span>{receita.tipoReceita}</span>
                      </div>
                    </div>
                    <span className={`badge-dispensacao ${receita.statusDispensacao === 'Dispensado' ? 'dispensado' : receita.statusDispensacao === 'Pendente' ? 'pendente' : 'cancelado'}`}>
                      {receita.statusDispensacao}
                    </span>
                  </div>

                  <div className="medicamento-body">
                    <div className="medicamento-metadados">
                      <div>
                        <strong>Data da Dispensação:</strong> {receita.dataRegistro.toLocaleDateString('pt-BR')}
                      </div>
                      <div>
                        <strong>Receita:</strong> {receita.numeroReceita ?? 'N/A'}
                      </div>
                      <div>
                        <strong>Prescritor:</strong> {receita.profissionalPrescritor} ({receita.registroProfissional})
                      </div>
                      <div>
                        <strong>Estabelecimento:</strong> {receita.estabelecimento}
                      </div>
                    </div>

                    {receita.observacoes && (
                      <div className="medicamento-obs-box">
                        <strong>Observações Clínicas:</strong> {receita.observacoes}
                      </div>
                    )}

                    {receita.itens && receita.itens.length > 0 && (
                      <table className="itens-medicamento-table">
                        <thead>
                          <tr>
                            <th>Medicamento</th>
                            <th>Concentração</th>
                            <th>Forma</th>
                            <th>Posologia</th>
                            <th>Qtd.</th>
                            <th>Via</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receita.itens.map((item, idx) => (
                            <tr key={idx}>
                              <td><strong>{item.nomeMedicamento}</strong><br /><span style={{ fontSize: '10px', color: '#787579' }}>{item.principioAtivo}</span></td>
                              <td>{item.concentracao}</td>
                              <td>{item.formaFarmaceutica}</td>
                              <td>{item.posologia}</td>
                              <td>{item.quantidade} {item.unidade}</td>
                              <td>{item.viaAdministracao ?? 'Oral'}</td>
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
            Grupo 05 • Meu SUS Digital • SubEquipe 01: GoF Criacional (Factory Method)
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
