import { useState } from "react";
import { conteudosSimulados } from "./dominio/conteudosSimulados";
import { redeDeSaudeSimulada } from "./dominio/redeDeSaudeSimulada";
import { Sidebar, type PaginaAtiva } from "./ui/Sidebar";
import { TelaBuscaDeConteudos } from "./ui/TelaBuscaDeConteudos";
import { TelaRedeDeSaude } from "./ui/TelaRedeDeSaude";
import { criteriosDisponiveis } from "./ui/criteriosDisponiveis";
import "./App.css";

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState<PaginaAtiva>("minha-saude");

  return (
    <div className="aplicacao">
      <Sidebar paginaAtiva={paginaAtiva} onSelecionarPagina={setPaginaAtiva} />
      <div className="aplicacao__conteudo" id="conteudo-principal">
        {paginaAtiva === "conteudos" ? (
          <TelaBuscaDeConteudos conteudos={conteudosSimulados} />
        ) : (
          <TelaRedeDeSaude
            estabelecimentos={redeDeSaudeSimulada}
            criterios={criteriosDisponiveis}
          />
        )}
      </div>
    </div>
  );
}

export default App;
