# Código | GoF Estrutural

## Localização

O mini-projeto independente desta subequipe fica em `code/estrutural/`, fora de `docs/`. Ele é desenvolvido em React com Vite e TypeScript, com o núcleo do padrão separado da interface.

```text
code/estrutural/src/
├── padrao/        # Participantes do Composite (sem dependência de React)
│   ├── ElementoDeTela.ts
│   ├── CartaoDeAtalho.ts
│   ├── BannerInformativo.ts
│   ├── Secao.ts
│   ├── Dashboard.ts
│   └── __tests__/
├── dominio/       # Dados simulados do Meu SUS Digital
│   └── painelSimulado.ts
├── ui/            # Componentes React que exibem a árvore
│   ├── PainelView.tsx
│   ├── ElementoView.tsx
│   ├── painel.css
│   └── __tests__/
└── App.tsx
```

## Mapeamento modelo-código

- **Padrão:** Composite
- **Fluxo de origem:** Navegação Principal e Dashboard Pós-Login
- **Núcleo:** participantes do GoF implementados em `padrao/`, sem dependência de React.
- **Domínio:** dados simulados do Meu SUS Digital em `dominio/`, sem chamadas a APIs reais.
- **Interface:** componentes React em `ui/`, que apresentam o cenário e acionam o núcleo.

| Participante (Modelagem V2) | Papel no Composite | Arquivo |
| :--- | :--- | :--- |
| `ElementoDeTela` | Component | [`padrao/ElementoDeTela.ts`](../../../../code/estrutural/src/padrao/ElementoDeTela.ts) |
| `CartaoDeAtalho` | Leaf | [`padrao/CartaoDeAtalho.ts`](../../../../code/estrutural/src/padrao/CartaoDeAtalho.ts) |
| `BannerInformativo` | Leaf | [`padrao/BannerInformativo.ts`](../../../../code/estrutural/src/padrao/BannerInformativo.ts) |
| `Secao` | Composite | [`padrao/Secao.ts`](../../../../code/estrutural/src/padrao/Secao.ts) |
| `Dashboard` | Client (raiz) | [`padrao/Dashboard.ts`](../../../../code/estrutural/src/padrao/Dashboard.ts) |

---

## Versão 1

### O que foi feito

A V1 implementa os cinco participantes da Modelagem V2 e os contratos definidos nas notas do diagrama:

- **Folhas (`CartaoDeAtalho` e `BannerInformativo`):** `contarElementos()` retorna `1`; `buscarPorId(id)` retorna o próprio objeto quando o id é igual e `null` caso contrário.
- **Composto (`Secao`):** `adicionar()` rejeita `null` e a própria seção; `remover()` ignora elementos que não são filhos; `renderizar()`, `contarElementos()` e `buscarPorId()` percorrem os filhos de forma recursiva, sem saber se cada filho é folha ou composto.
- **Cliente (`Dashboard`):** guarda as seções de nível superior e delega as três operações para cada uma delas.

O trecho abaixo mostra o ponto central do padrão. A `Secao` trata todos os filhos pela interface comum, então uma seção aninhada e um cartão são percorridos pelo mesmo código:

```ts
contarElementos(): number {
  return this.elementos.reduce(
    (total, elemento) => total + elemento.contarElementos(),
    0,
  )
}

buscarPorId(id: string): ElementoDeTela | null {
  if (this.id === id) {
    return this
  }
  for (const elemento of this.elementos) {
    const encontrado = elemento.buscarPorId(id)
    if (encontrado) {
      return encontrado
    }
  }
  return null
}
```

O painel simulado ([`dominio/painelSimulado.ts`](../../../../code/estrutural/src/dominio/painelSimulado.ts)) usa as seções e os cartões do fluxograma da Entrega 2: **Minha Saúde** (com a subseção aninhada **Mais serviços**) e **Mini apps**. Ao todo, são 12 elementos.

A interface exibe as seções e a contagem calculada por `contarElementos()`.

### Diferenças em relação à Modelagem V2

| Modelagem V2 | Código V1 | Motivo |
| :--- | :--- | :--- |
| `renderizar(): void` | `renderizar(): ElementoRenderizado` | Para manter o núcleo sem dependência de React, `renderizar()` devolve uma descrição do elemento (tipo, dados e, no caso da seção, os filhos já renderizados). A camada `ui/` desenha essa descrição. A recursão continua no núcleo. |
| `Dashboard.renderizar(): void` | `Dashboard.renderizar(): DashboardRenderizado` | Mesmo motivo: devolve o título e as seções renderizadas. |
| `buscarPorId(...): ElementoDeTela [0..1]` | `buscarPorId(...): ElementoDeTela \| null` | Representação em TypeScript da multiplicidade `[0..1]`. |

Sugere-se que a Modelagem V3 incorpore o retorno de `renderizar()`, para manter o diagrama alinhado ao código.

### Limitações conhecidas

- `adicionar()` impede apenas que uma seção contenha a si mesma. Ciclos indiretos (A contém B, que contém A) ainda não são verificados.
- Um mesmo elemento pode ser adicionado a duas seções diferentes, o que contraria a multiplicidade `0..1` da composição.
- As rotas dos cartões são simuladas: o clique não navega para outra tela.

Esses pontos ficam como sugestão para as próximas versões do código.

## Testes

Os testes ficam em `padrao/__tests__/` (unitários das classes do padrão) e `ui/__tests__/` (interface com React Testing Library).

| Arquivo | O que verifica | Testes |
| :--- | :--- | :---: |
| `CartaoDeAtalho.test.ts` | Contrato da folha: contagem, busca e renderização | 4 |
| `BannerInformativo.test.ts` | Mesmo contrato para a nova folha | 4 |
| `Secao.test.ts` | Soma recursiva, busca em seções aninhadas, remoção, rejeição de `null` e da própria seção, renderização da árvore | 11 |
| `Dashboard.test.ts` | Delegação das operações às seções, remoção de seção, ordem de renderização | 5 |
| `PainelView.test.tsx` | Exibição de seções e cartões; contagem | 3 |

Resultado da execução local (`npm test`) em 16/10/2026: **5 arquivos e 27 testes aprovados**. `npm run lint` e `npm run build` também foram executados sem erros.

## Como executar

```bash
cd code/estrutural
npm install
npm run dev
npm test
npm run build
```

O código fonte permanece na pasta `code/`; esta página apenas documenta e aponta para ele.

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Teamplate mais detalhado | 14/10/2026 | [7c66f78](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/7c66f78dc795f080bc43dc01f094e8976462d5b8) |
| [Victor Leandro](https://github.com/Afrontoso) | Código V1: núcleo do Composite, dados simulados, interface e testes | 15/10/2026 | [cf84aac](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/cf84aac0d0071db1514a6902c2ce302e6f58a532) |
