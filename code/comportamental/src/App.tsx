import { redeDeSaudeSimulada } from "./dominio/redeDeSaudeSimulada";
import { criteriosDisponiveis } from "./ui/criteriosDisponiveis";
import { TelaRedeDeSaude } from "./ui/TelaRedeDeSaude";

function App() {
  return <TelaRedeDeSaude estabelecimentos={redeDeSaudeSimulada} criterios={criteriosDisponiveis} />;
}

export default App;
