// Contribuição: Gustavo Fornaciari (@GUGOFO) — Melhorias 1, 2 e 3

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
