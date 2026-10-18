# Código | GoF Estrutural

## Localização

O mini-projeto independente desta subequipe fica em `code/estrutural/`, fora de `docs/`. Ele é desenvolvido em React com Vite e TypeScript, com o núcleo do padrão separado da interface.

```text
code/estrutural/src/
├── padrao/        # Participantes do Composite (sem dependência de React)
│   ├── ElementoDeTela.ts
│   ├── CartaoDeAtalho.ts
│   ├── BannerInformativo.ts
│   ├── MiniAppLeaf.ts
│   ├── CardFaqLeaf.ts
│   ├── Secao.ts
│   ├── Dashboard.ts
│   ├── donoDoElemento.ts
│   ├── Texto.ts
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
| `MiniAppLeaf` (Modelagem V4) | Leaf | [`padrao/MiniAppLeaf.ts`](../../../../code/estrutural/src/padrao/MiniAppLeaf.ts) |
| `CardFaqLeaf` (Modelagem V4) | Leaf | [`padrao/CardFaqLeaf.ts`](../../../../code/estrutural/src/padrao/CardFaqLeaf.ts) |
| `Secao` | Composite | [`padrao/Secao.ts`](../../../../code/estrutural/src/padrao/Secao.ts) |
| `Dashboard` | Client (raiz) | [`padrao/Dashboard.ts`](../../../../code/estrutural/src/padrao/Dashboard.ts) |

---

## Versão 1 ( Victor )

### O que foi feito

A V1 implementa as quatro participantes da Modelagem V1 e os contratos definidos nas notas do diagrama:

- **Folha (`CartaoDeAtalho`):** `contarElementos()` retorna `1`; `buscarPorId(id)` retorna o próprio objeto quando o id é igual e `null` caso contrário.
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

## Versão 2 ( Gustavo )

### O que foi feito

A V2 não acrescenta classes nem operações ao modelo. Ela faz o código respeitar o que a Modelagem V2 já desenha, resolvendo as limitações que a V1 deixou registradas. As mudanças ficam em `adicionar()` e `remover()` de `Secao` e em `adicionarSecao()` e `removerSecao()` de `Dashboard`.

| Melhoria | O que entrou | Onde está na Modelagem V2 |
| :---: | :--- | :--- |
| 1. Um pai por elemento | `Secao.adicionar()` rejeita elemento que já pertence a uma seção ou painel; `remover()` o libera para ser adicionado em outro lugar. | Multiplicidade `0..1` da composição `Elementos`. |
| 2. Sem ciclos | `Secao.adicionar()` rejeita ciclo indireto (A contém B, que passaria a conter A), além da própria seção. | Nota do composto: "`adicionar()` rejeita `null` e a própria seção". |
| 3. Multiplicidades do painel | `Dashboard.adicionarSecao()` rejeita seção nula ou que já tem dono; `removerSecao()` não deixa o painel sem seções. | Multiplicidades `1` (painel por seção) e `1..*` (seções por painel). |

O dono de cada elemento fica em `donoDoElemento.ts`, um registro interno. Assim `ElementoDeTela` não ganha atributo nem método, e o diagrama continua o mesmo.

### Limitações

- **Resolvidas:** ciclos indiretos e o mesmo elemento em duas seções, as duas pendências listadas na V1.
- **Mantida:** as rotas dos cartões continuam simuladas.

### Testes da Versão 2

22 novos testes em `Secao.test.ts` (10), `Dashboard.test.ts` (8) e `BannerInformativo.test.ts` (4), um grupo por melhoria mais o grupo da folha. Resultado da execução (`npm test`, `npm run lint` e `npm run build`): a registrar após a execução local.

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

---

## Versão 3 ( Julia )

### O que foi feito

A V3 implementa a operação `buscarPorTexto(termo)` da Modelagem V4 e a usa na interface.

- **Interface comum:** `ElementoDeTela` ganhou `buscarPorTexto(termo): ElementoDeTela[]`.
- **Folhas:** `CartaoDeAtalho` compara o título; `BannerInformativo` compara o título e a mensagem.
- **Composto (`Secao`):** reúne os resultados dos filhos, de forma recursiva, e inclui a própria seção quando o título contém o termo.
- **Cliente (`Dashboard`):** delega a busca a cada seção de nível superior.
- **`Texto.ts`:** função `contemTexto()`, que compara textos sem diferenciar maiúsculas nem acentos e trata termo em branco como "sem resultado".
- **Interface (`PainelView.tsx`):** campo de busca que lista os elementos encontrados.

O trecho abaixo mostra o ponto central: a `Secao` busca nos filhos pela interface comum, sem saber se cada um é folha ou seção.

```ts
buscarPorTexto(termo: string): ElementoDeTela[] {
  const achados = this.elementos.flatMap((elemento) => elemento.buscarPorTexto(termo))
  return contemTexto(this.titulo, termo) ? [this, ...achados] : achados
}
```

### Diferenças em relação à Modelagem V4

Na V3, as folhas `MiniAppLeaf` e `CardFaqLeaf` ainda não estavam implementadas. Essa pendência foi resolvida na V4, descrita a seguir.

### Limitações

- A unicidade dos ids na árvore não é verificada.
- A busca de `Secao` considera apenas o título, não a descrição.
- As rotas dos cartões continuam simuladas.

### Testes da Versão 3

4 novos testes em `BuscaPorText.test.ts`: folhas em seções aninhadas, acentos e maiúsculas, título da seção e termo em branco ou sem resultado.

---

## Versão 4 (Ana Beatriz)

### O que foi feito

A V4 acrescenta as duas folhas previstas na Modelagem V4 ao núcleo do Composite, sem modificar a lógica de `Secao` ou `Dashboard`.

- **`MiniAppLeaf`**: representa um cartão de miniaplicativo, com `id`, `nomeApp`, `descricao` e `icone`.
- **`CardFaqLeaf`**: representa um cartão de perguntas frequentes, com `id`, `pergunta`, `resposta` e `categoria`.
- **Interface comum (`ElementoDeTela.ts`)**: amplia o tipo `ElementoRenderizado` com as variantes `miniapp` e `faq`, para que a interface receba os dados específicos de cada folha.
- **Busca por texto**: `MiniAppLeaf` pesquisa no nome e na descrição; `CardFaqLeaf`, na pergunta e na resposta. Ambas reutilizam `contemTexto()` para ignorar diferenças entre maiúsculas/minúsculas e acentos, além de não retornar resultados para termos em branco.
- **Integração com o Composite**: as novas folhas implementam `getId()`, `renderizar()`, `contarElementos()`, `buscarPorId()` e `buscarPorTexto()`. Cada folha conta como um elemento e pode ser encontrada por id ou texto quando inserida em uma `Secao` ou em um `Dashboard`.

A mudança mantém o núcleo independente de React. As classes devolvem descrições tipadas, e a camada de interface é responsável por apresentá-las.

### Testes da Versão 4

Foram adicionados 26 testes: 13 em `MiniAppLeaf.test.ts` e 13 em `CardFaqLeaf.test.ts`. Eles cobrem identificação, contagem, busca por id, estrutura retornada por `renderizar()`, busca por texto e integração das folhas com a árvore do Composite. Os testes também verificam casos sem correspondência e termos em branco.

---

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
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Código V2: um pai por elemento, sem ciclos indiretos, multiplicidades do painel e criação da folha BannerInformativo | 17/10/2026 | [89d21c1](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/89d21c1a9f41d7451ae1523f23c95990732232d7) |
| [Julia Oliveira Patricio](https://github.com/juliapat18) | Código V3: `buscarPorTexto()` e campo de busca na interface | 17/10/2026 | [83ed491](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/83ed491a98bbf07ed33a607bf89ca918458a746d) |
| [Ana Beatriz](https://github.com/AnnaBeatrizAraujo) | Código V4: implementação das folhas `MiniAppLeaf` e `CardFaqLeaf`, extensão do tipo `ElementoRenderizado` e testes unitários de integração com o Composite | 17/10/2026 | [d0bb352](https://github.com/UnBArqDsw2026-2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/d0bb3527fd695b65a3710cff9888ce9c00c4edf0) |
