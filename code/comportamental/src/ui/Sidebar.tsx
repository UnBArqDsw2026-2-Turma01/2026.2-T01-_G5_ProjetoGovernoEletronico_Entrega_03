import type { Dispatch, SetStateAction } from "react";
import "./Sidebar.css";

export type PaginaAtiva = "minha-saude" | "conteudos";

interface SidebarProps {
  paginaAtiva: PaginaAtiva;
  onSelecionarPagina: Dispatch<SetStateAction<PaginaAtiva>>;
}

type IconeMenu = "inicio" | "aplicacoes" | "saude" | "conteudos" | "perfil";

function IconeMenu({ tipo }: { tipo: IconeMenu }) {
  switch (tipo) {
    case "inicio":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 13.5 16 6l13 7.5M7 13v15h7v-9h5v9h6V13" />
        </svg>
      );
    case "aplicacoes":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="3" y="3" width="11" height="11" rx="2" />
          <rect x="18" y="3" width="11" height="11" rx="2" />
          <rect x="3" y="18" width="11" height="11" rx="2" />
          <rect x="18" y="18" width="11" height="11" rx="2" />
        </svg>
      );
    case "saude":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M11 2h10v9h9v10h-9v9H11v-9H2V11h9z" />
        </svg>
      );
    case "conteudos":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9 4h17a2 2 0 0 1 2 2v22H11a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2Z" />
          <path d="M7 9h13M13 15h9M13 20h9M11 28V8" />
        </svg>
      );
    case "perfil":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="9" r="7" />
          <path d="M4 27c0-5.5 4.5-9 12-9s12 3.5 12 9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        </svg>
      );
  }
}

function MarcaMeuSus() {
  return (
    <div className="marca-sus" aria-label="Meu SUS Digital">
      <span className="marca-sus__simbolo" aria-hidden="true">
        <span>SUS</span>
        <svg viewBox="0 0 34 34" aria-hidden="true">
          <path d="M12 1h10v11h11v10H22v11H12V22H1V12h11z" />
        </svg>
      </span>
      <span className="marca-sus__nome">
        <span>Meu</span>
        <strong>SUS</strong>
        <span>Digital</span>
      </span>
    </div>
  );
}

export function Sidebar({ paginaAtiva, onSelecionarPagina }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <a className="sidebar__marca" href="#conteudo-principal" aria-label="Meu SUS Digital, ir ao conteúdo principal">
        <MarcaMeuSus />
      </a>

      <nav className="sidebar__nav" aria-label="Seções do aplicativo">
        <button className="sidebar__item" type="button" disabled title="Seção demonstrativa não disponível">
          <span className="sidebar__icone"><IconeMenu tipo="inicio" /></span>
          <span>Início</span>
        </button>
        <button className="sidebar__item" type="button" disabled title="Seção demonstrativa não disponível">
          <span className="sidebar__icone"><IconeMenu tipo="aplicacoes" /></span>
          <span>Aplicações</span>
        </button>
        <button
          className={`sidebar__item${paginaAtiva === "minha-saude" ? " is-ativo" : ""}`}
          type="button"
          aria-current={paginaAtiva === "minha-saude" ? "page" : undefined}
          onClick={() => onSelecionarPagina("minha-saude")}
        >
          <span className="sidebar__icone"><IconeMenu tipo="saude" /></span>
          <span>Minha saúde</span>
        </button>
        <button
          className={`sidebar__item${paginaAtiva === "conteudos" ? " is-ativo" : ""}`}
          type="button"
          aria-current={paginaAtiva === "conteudos" ? "page" : undefined}
          onClick={() => onSelecionarPagina("conteudos")}
        >
          <span className="sidebar__icone"><IconeMenu tipo="conteudos" /></span>
          <span>Conteúdos</span>
        </button>
        <button className="sidebar__item" type="button" disabled title="Seção demonstrativa não disponível">
          <span className="sidebar__icone"><IconeMenu tipo="perfil" /></span>
          <span>Meu perfil</span>
        </button>
      </nav>
    </aside>
  );
}
