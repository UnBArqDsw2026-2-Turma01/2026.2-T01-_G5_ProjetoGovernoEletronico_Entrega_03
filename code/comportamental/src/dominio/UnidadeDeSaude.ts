export interface UnidadeDeSaude {
  id: string;
  nome: string;
  distanciaKm: number;
  natureza: "estadual" | "municipal" | "publica" | "privada";
  categoria: string;
  endereco?: string;
  descricao?: string;
  telefone?: string;
  horario?: string;
}
