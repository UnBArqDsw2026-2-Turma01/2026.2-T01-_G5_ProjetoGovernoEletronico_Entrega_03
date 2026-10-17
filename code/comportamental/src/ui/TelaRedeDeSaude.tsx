import { useState } from "react";
import type { UnidadeDeSaude } from "../dominio/UnidadeDeSaude";
import { BuscaDeEstabelecimentos } from "../padrao/BuscaDeEstabelecimentos";
import type { CriterioDeBusca } from "../padrao/CriterioDeBusca";
import type { Natureza } from "../padrao/PorNatureza";
import type { ListaDeCriterios } from "./criteriosDisponiveis";
import "./TelaRedeDeSaude.css";

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

export function TelaRedeDeSaude({ estabelecimentos, criterios }: TelaRedeDeSaudeProps) {
  const [busca] = useState(() => new BuscaDeEstabelecimentos(criterios[0].criterio));
  const [idDoCriterio, setIdDoCriterio] = useState(criterios[0].id);
  const [resultado, setResultado] = useState(() => busca.buscar(estabelecimentos));

  function selecionarCriterio(criterio: CriterioDeBusca) {
    busca.definirCriterio(criterio);
    setResultado(busca.buscar(estabelecimentos));
  }

  function aoTrocarCriterio(id: string) {
    const opcao = criterios.find((c) => c.id === id);
    if (!opcao) return;
    setIdDoCriterio(opcao.id);
    selecionarCriterio(opcao.criterio);
  }

  return (
    <main className="rede-de-saude">
      <header className="rede-de-saude__cabecalho">
        <h1>Rede de Saúde</h1>
        <p>Estabelecimentos próximos de você</p>
      </header>

      <label className="rede-de-saude__seletor">
        Ordenar por
        <select value={idDoCriterio} onChange={(e) => aoTrocarCriterio(e.target.value)}>
          {criterios.map((c) => (
            <option key={c.id} value={c.id}>
              {c.rotulo}
            </option>
          ))}
        </select>
      </label>

      <ol className="rede-de-saude__lista" aria-label="Estabelecimentos">
        {resultado.map((u) => (
          <li key={u.id} className="rede-de-saude__item">
            <strong>{u.nome}</strong>
            <span>
              {u.categoria} · {ROTULO_DA_NATUREZA[u.natureza]} · {u.distanciaKm.toFixed(1)} km
            </span>
          </li>
        ))}
      </ol>
    </main>
  );
}
