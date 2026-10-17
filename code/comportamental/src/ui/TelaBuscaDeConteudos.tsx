import { useMemo, useState } from "react";
import type { ArtigoDeConteudo } from "../dominio/ArtigoDeConteudo";
import { BuscaDeConteudos } from "../padrao/BuscaDeConteudo";
import { PorCategoria } from "../padrao/conteudos/PorCategoria";
import { PorRelevancia } from "../padrao/conteudos/PorRelevancia";
import "./TelaBuscaDeConteudos.css";

const CATEGORIAS = [
  "Todas",
  "Animais peçonhentos",
  "Atenção e cuidado",
  "Doenças",
  "Doenças contagiosas",
  "Saúde da família",
] as const;

type Ordenacao = "relevancia" | "categoria";

interface TelaBuscaDeConteudosProps {
  conteudos: readonly ArtigoDeConteudo[];
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

export function TelaBuscaDeConteudos({ conteudos }: TelaBuscaDeConteudosProps) {
  const [termo, setTermo] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<(typeof CATEGORIAS)[number]>("Todas");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevancia");
  const mecanismoDeBusca = useMemo(
    () => new BuscaDeConteudos(new PorRelevancia()),
    [],
  );

  const resultados = useMemo(() => {
    const consulta = normalizar(termo);
    const filtrados = conteudos.filter((conteudo) => {
      const correspondeCategoria =
        categoriaAtiva === "Todas" || conteudo.tema === categoriaAtiva;
      const textoPesquisavel = normalizar(
        [
          conteudo.titulo,
          conteudo.categoria,
          conteudo.tema,
          conteudo.resumo,
          conteudo.texto,
          ...conteudo.tags,
        ].join(" "),
      );
      return correspondeCategoria && (!consulta || textoPesquisavel.includes(consulta));
    });

    mecanismoDeBusca.definirCriterio(
      ordenacao === "categoria" ? new PorCategoria() : new PorRelevancia(),
    );
    return mecanismoDeBusca.buscar(filtrados);
  }, [categoriaAtiva, conteudos, mecanismoDeBusca, ordenacao, termo]);

  function voltar() {
    if (window.history.length > 1) window.history.back();
  }

  return (
    <div className="pagina-conteudos">
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
        <h1>Conteúdo</h1>
      </div>

      <main className="conteudos-main">
        <label className="campo-pesquisa">
          <span className="visualmente-oculto">Pesquisar conteúdos</span>
          <input
            type="search"
            placeholder="Pesquisar"
            value={termo}
            onChange={(evento) => setTermo(evento.target.value)}
          />
          <span className="campo-pesquisa__icone"><IconeBusca /></span>
        </label>

        <section className="secao-categorias" aria-labelledby="titulo-categorias">
          <h2 id="titulo-categorias">Categorias</h2>
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

        <section className="secao-artigos" aria-labelledby="titulo-artigos">
          <div className="cabecalho-artigos">
            <h2 id="titulo-artigos">Artigos</h2>
            <label className="controle-ordenacao">
              <span>Ordenar por</span>
              <select
                aria-label="Ordenar artigos"
                value={ordenacao}
                onChange={(evento) => setOrdenacao(evento.target.value as Ordenacao)}
              >
                <option value="relevancia">Mais relevantes</option>
                <option value="categoria">Categoria (A–Z)</option>
              </select>
            </label>
          </div>

          {resultados.length > 0 ? (
            <div className="grade-artigos" aria-live="polite">
              {resultados.map((artigo) => (
                <article className="cartao-artigo" key={artigo.id}>
                  <div className="cartao-artigo__corpo">
                    <p className="cartao-artigo__categoria">{artigo.categoria}</p>
                    <h3>{artigo.titulo}</h3>
                    <div className="cartao-artigo__tags">
                      {artigo.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <p className="cartao-artigo__resumo">{artigo.resumo}</p>
                  </div>
                  <img
                    className="cartao-artigo__imagem"
                    src={artigo.imagem}
                    alt={artigo.altImagem}
                    loading="lazy"
                  />
                </article>
              ))}
            </div>
          ) : (
            <div className="estado-vazio" role="status">
              <strong>Nenhum conteúdo encontrado</strong>
              <p>Tente pesquisar outro termo ou escolha uma categoria diferente.</p>
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
