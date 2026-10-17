import { useMemo, useState } from "react";
import type { UnidadeDeSaude } from "../dominio/UnidadeDeSaude";
import { BuscaDeEstabelecimentos } from "../padrao/BuscaDeEstabelecimentos";
import type { Natureza } from "../padrao/PorNatureza";
import type { ListaDeCriterios } from "./criteriosDisponiveis";
import "./TelaBuscaDeConteudos.css";
import "./TelaRedeDeSaude.css";

const CATEGORIAS = [
  "Todas",
  "Médicos Especialistas",
  "Hospital",
  "Unidade Básica de Saúde",
  "Maternidade",
  "Atenção Psicossocial",
  "Academia da Saúde",
  "Saúde Bucal",
  "Doenças Raras",
  "Transplante",
  "Serviços Hemoterápicos",
  "Atendimento Antiveneno",
] as const;

type CategoriaAtiva = (typeof CATEGORIAS)[number];

const ROTULO_DA_NATUREZA: Record<Natureza, string> = {
  municipal: "Municipal",
  estadual: "Estadual",
  publica: "Pública",
  privada: "Privada",
};

interface TelaRedeDeSaudeProps {
  estabelecimentos: readonly UnidadeDeSaude[];
  criterios: ListaDeCriterios;
}

function normalizar(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function IconeBusca() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.7" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function IconeUsuario() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="9" r="6" />
      <path d="M4.5 27c.4-6.3 4.8-10 11.5-10s11.1 3.7 11.5 10" />
    </svg>
  );
}

function IconeSino() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      <path d="M12 2v2" />
    </svg>
  );
}

function IconeVoltar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function IconeUnidadeDeSaude() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path className="icone-unidade__predio" d="M27 100V39a7 7 0 0 1 7-7h52a7 7 0 0 1 7 7v61Z" />
      <path className="icone-unidade__detalhe" d="M48 100V79a12 12 0 0 1 24 0v21M43 49h7m20 0h7M43 62h7m20 0h7" />
      <path className="icone-unidade__cruz" d="M60 10v20M50 20h20" />
      <path className="icone-unidade__base" d="M19 100h82" />
    </svg>
  );
}

function simboloDaCategoria(categoria: string): string {
  const simbolos: Record<string, string> = {
    "Médicos Especialistas": "MED",
    Hospital: "+",
    "Unidade Básica de Saúde": "UBS",
    Maternidade: "♡",
    "Atenção Psicossocial": "AP",
    "Academia da Saúde": "↗",
    "Saúde Bucal": "SB",
    "Doenças Raras": "DR",
    Transplante: "♡",
    "Serviços Hemoterápicos": "●",
    "Atendimento Antiveneno": "AV",
  };

  return simbolos[categoria] ?? "+";
}

export function TelaRedeDeSaude({ estabelecimentos, criterios }: TelaRedeDeSaudeProps) {
  const [termo, setTermo] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaAtiva>("Todas");
  const [idDoCriterio, setIdDoCriterio] = useState(criterios[0].id);
  const mecanismoDeBusca = useMemo(
    () => new BuscaDeEstabelecimentos(criterios[0].criterio),
    [criterios],
  );

  const resultado = useMemo(() => {
    const consulta = normalizar(termo);
    const filtrados = estabelecimentos.filter((unidade) => {
      const correspondeCategoria =
        categoriaAtiva === "Todas" || unidade.categoria === categoriaAtiva;
      const textoPesquisavel = normalizar(
        [
          unidade.nome,
          unidade.categoria,
          ROTULO_DA_NATUREZA[unidade.natureza],
          unidade.endereco ?? "",
          unidade.descricao ?? "",
          unidade.telefone ?? "",
          unidade.horario ?? "",
        ].join(" "),
      );
      return correspondeCategoria && (!consulta || textoPesquisavel.includes(consulta));
    });

    const criterioSelecionado = criterios.find((criterio) => criterio.id === idDoCriterio);
    mecanismoDeBusca.definirCriterio(criterioSelecionado?.criterio ?? criterios[0].criterio);
    return mecanismoDeBusca.buscar(filtrados);
  }, [categoriaAtiva, criterios, estabelecimentos, idDoCriterio, mecanismoDeBusca, termo]);

  function aoTrocarCriterio(id: string) {
    const opcao = criterios.find((criterio) => criterio.id === id);
    if (opcao) setIdDoCriterio(opcao.id);
  }

  function voltar() {
    if (window.history.length > 1) window.history.back();
  }

  return (
    <div className="pagina-conteudos pagina-rede-saude">
      <header className="barra-superior">
        <p className="barra-superior__saudacao">
          Olá, <strong>Usuário</strong>
        </p>
        <div className="barra-superior__acoes">
          <div className="cartao-perfil" aria-label="Perfil de demonstração">
            <div className="cartao-perfil__texto">
              <strong>USUÁRIO DEMONSTRAÇÃO</strong>
              <span>Perfil de demonstração</span>
            </div>
            <span className="cartao-perfil__icone"><IconeUsuario /></span>
          </div>
          <span className="botao-sino" role="img" aria-label="Notificações">
            <IconeSino />
          </span>
        </div>
      </header>

      <div className="barra-pagina">
        <button className="botao-voltar" type="button" onClick={voltar} aria-label="Voltar">
          <IconeVoltar />
        </button>
        <h1>Rede de Saúde</h1>
      </div>

      <main className="conteudos-main">
        <label className="campo-pesquisa">
          <span className="visualmente-oculto">Pesquisar redes de saúde</span>
          <input
            type="search"
            placeholder="Pesquisar unidades, serviços ou especialidades"
            value={termo}
            onChange={(evento) => setTermo(evento.target.value)}
          />
          <span className="campo-pesquisa__icone"><IconeBusca /></span>
        </label>

        <section className="secao-categorias" aria-labelledby="titulo-categorias-rede">
          <h2 id="titulo-categorias-rede">Categorias</h2>
          <div className="lista-categorias" aria-label="Filtrar por categoria">
            {CATEGORIAS.map((categoria) => (
              <button
                key={categoria}
                className={`botao-categoria${categoriaAtiva === categoria ? " is-ativo" : ""}`}
                type="button"
                aria-pressed={categoriaAtiva === categoria}
                onClick={() => setCategoriaAtiva(categoria)}
              >
                <span>{categoria}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="secao-artigos secao-redes" aria-labelledby="titulo-lista-redes">
          <div className="cabecalho-artigos">
            <div className="cabecalho-redes__titulos">
              <h2 id="titulo-lista-redes">Unidades e serviços de saúde</h2>
              <p>Dados demonstrativos · distâncias simuladas</p>
            </div>
            <label className="controle-ordenacao">
              <span>Ordenar por</span>
              <select
                aria-label="Ordenar por"
                value={idDoCriterio}
                onChange={(evento) => aoTrocarCriterio(evento.target.value)}
              >
                {criterios.map((criterio) => (
                  <option key={criterio.id} value={criterio.id}>
                    {criterio.rotulo}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {resultado.length > 0 ? (
            <ol className="grade-redes" aria-label="Estabelecimentos" aria-live="polite">
              {resultado.map((unidade) => (
                <li className="cartao-rede" key={unidade.id}>
                  <div className="cartao-rede__corpo">
                    <p className="cartao-rede__categoria">{unidade.categoria}</p>
                    <h3><strong>{unidade.nome}</strong></h3>
                    <div className="cartao-rede__tags">
                      <span>{ROTULO_DA_NATUREZA[unidade.natureza]}</span>
                      <span>{unidade.distanciaKm.toFixed(1)} km</span>
                    </div>
                    <p className="cartao-rede__descricao">
                      {unidade.descricao ?? "Serviço de saúde disponível para a comunidade."}
                    </p>
                    {unidade.endereco && (
                      <p className="cartao-rede__endereco">
                        <span aria-hidden="true">⌖</span> {unidade.endereco}
                      </p>
                    )}
                  </div>
                  <div className="cartao-rede__ilustracao" aria-hidden="true">
                    <span className="cartao-rede__simbolo">{simboloDaCategoria(unidade.categoria)}</span>
                    <IconeUnidadeDeSaude />
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="estado-vazio" role="status">
              <strong>Nenhuma unidade ou serviço encontrado</strong>
              <p>Tente outro termo ou selecione uma categoria diferente.</p>
              <button
                type="button"
                onClick={() => {
                  setTermo("");
                  setCategoriaAtiva("Todas");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
