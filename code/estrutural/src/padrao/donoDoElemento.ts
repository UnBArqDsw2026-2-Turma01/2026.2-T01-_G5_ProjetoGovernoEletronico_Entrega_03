// Contribuição: Gustavo Fornaciari (@GUGOFO) — Melhorias 1, 2 e 3
// Relação com a modelagem: o diagrama V2 declara a composição com multiplicidade 0..1
// (cada elemento tem no máximo um pai) e "1" do lado do Dashboard (cada Secao de topo
// pertence a um único painel). Este registro guarda quem é o dono de cada elemento sem
// acrescentar atributos ou operações que o diagrama não tem: ElementoDeTela continua igual.

const donos = new WeakMap<object, object>()

export function obterDono(elemento: object): object | undefined {
  return donos.get(elemento)
}

export function definirDono(elemento: object, dono: object): void {
  donos.set(elemento, dono)
}

export function liberarDono(elemento: object): void {
  donos.delete(elemento)
}
