import type { UnidadeDeSaude } from "./UnidadeDeSaude";
import { estabelecimentosSimulados } from "./estabelecimentosSimulados";

export const redeDeSaudeSimulada: readonly UnidadeDeSaude[] = [
  ...estabelecimentosSimulados,
  { id: "5", nome: "Hospital Universitário de Brasília", distanciaKm: 2.9, natureza: "publica", categoria: "Hospital" },
  { id: "6", nome: "UBS Cruzeiro Velho", distanciaKm: 3.4, natureza: "municipal", categoria: "UBS" },
  { id: "7", nome: "CAPS Asa Sul", distanciaKm: 5.6, natureza: "estadual", categoria: "Atenção Psicossocial" },
  { id: "8", nome: "Maternidade Nascer Bem", distanciaKm: 2.1, natureza: "privada", categoria: "Maternidade" },
  { id: "9", nome: "Hemocentro de Brasília", distanciaKm: 3.9, natureza: "estadual", categoria: "Serviços Hemoterápicos" },
  { id: "10", nome: "Clínica Odontológica Sorriso", distanciaKm: 1.7, natureza: "privada", categoria: "Saúde Bucal" },
];
