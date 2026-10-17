import type { Conteudo } from "./Conteudo";

export interface ArtigoDeConteudo extends Conteudo {
  id: string;
  titulo: string;
  resumo: string;
  tema: string;
  tags: readonly string[];
  imagem: string;
  altImagem: string;
}
