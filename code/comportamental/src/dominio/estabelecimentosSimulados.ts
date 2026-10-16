import type { UnidadeDeSaude } from "./UnidadeDeSaude";

export const estabelecimentosSimulados: readonly UnidadeDeSaude[] = [
  { id: "1", nome: "UBS Asa Norte", distanciaKm: 1.2, natureza: "publica", categoria: "UBS" },
  { id: "2", nome: "Hospital Regional da Asa Sul", distanciaKm: 4.8, natureza: "estadual", categoria: "Hospital" },
  { id: "3", nome: "Clínica Vida Privada", distanciaKm: 0.6, natureza: "privada", categoria: "Clínica" },
  { id: "4", nome: "UBS Taguatinga Centro", distanciaKm: 7.3, natureza: "municipal", categoria: "UBS" },
];
