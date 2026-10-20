# Guia de React

O **React** é uma biblioteca JavaScript, mantida pela Meta, para construir interfaces de usuário a partir de **componentes**. Nesta entrega, as três subequipes usaram React para dar uma interface aos padrões GoF implementados, cada uma em seu mini-projeto (`code/criacional`, `code/estrutural` e `code/comportamental`).

Este guia apresenta, de forma resumida, o que é o React, como ele foi usado no projeto e quais qualidades justificaram a escolha.

---

## 1. Conceitos Principais

| Conceito | O que é |
| :--- | :--- |
| **Componente** | Função que recebe dados e devolve um pedaço da interface. A tela é montada combinando componentes menores. |
| **JSX** | Sintaxe parecida com HTML, escrita dentro do JavaScript/TypeScript, que descreve o que o componente exibe. |
| **Props** | Dados que um componente recebe de quem o usa, como os parâmetros de uma função. |
| **Estado (`useState`)** | Dados internos do componente que podem mudar. Quando o estado muda, o React atualiza a tela automaticamente. |
| **Hooks** | Funções como `useState` e `useMemo`, que dão recursos de estado e memória aos componentes. |

Exemplo simples de componente com props:

```tsx
interface Props {
  titulo: string
}

function Cartao({ titulo }: Props) {
  return <div className="cartao">{titulo}</div>
}
```

---

## 2. Uso no Projeto

Os mini-projetos foram criados com **Vite** e **TypeScript** e seguem a mesma organização:

| Pasta | Conteúdo | Usa React? |
| :--- | :--- | :---: |
| `padrao/` | Núcleo do padrão GoF (classes e interfaces) | Não |
| `dominio/` | Dados simulados usados pelo padrão | Não |
| `ui/` | Componentes React que exibem o resultado do padrão | Sim |

Essa separação mantém o padrão de projeto **independente da interface**: as classes de `padrao/` podem ser testadas e reaproveitadas sem React, e a camada `ui/` apenas exibe o que o núcleo devolve.

Exemplos de componentes de cada subequipe:

- **SubEquipe 01 (Criacional):** `CartaoVacinaView` exibe os registros criados pelo Factory Method.
- **SubEquipe 02 (Estrutural):** `PainelView` e `ElementoView` desenham a árvore do Composite. O `ElementoView` chama a si mesmo para cada filho de uma seção, repetindo na tela a recursão do padrão.
- **SubEquipe 03 (Comportamental):** `TelaBuscaDeConteudos` e `TelaRedeDeSaude` permitem trocar a estratégia de busca do Strategy.

Os componentes também são testados com **React Testing Library** junto ao **Vitest**, verificando o que o usuário vê na tela.

---

## 3. Qualidades

- **Componentização e reuso:** a interface é dividida em partes pequenas e independentes, que podem ser reaproveitadas e mantidas separadamente.
- **Abordagem declarativa:** o desenvolvedor descreve *como a tela deve ficar* para cada estado, e o React cuida de atualizar a página quando os dados mudam.
- **Desempenho:** o React compara a nova versão da tela com a anterior e altera no navegador apenas o que mudou.
- **Integração com TypeScript:** props e estados tipados evitam erros comuns ainda durante o desenvolvimento.
- **Testabilidade:** componentes isolados são fáceis de testar, como feito com a React Testing Library.
- **Ecossistema e comunidade:** é uma das bibliotecas de interface mais usadas, com documentação oficial completa, muitas bibliotecas de apoio e ferramentas como o Vite.

---

## 4. Pontos de Atenção

- O React cuida apenas da **interface**. Recursos como rotas e chamadas a APIs exigem bibliotecas adicionais.
- Misturar regras de negócio dentro dos componentes dificulta testes e manutenção. Por isso, no projeto, o padrão GoF fica fora de `ui/`.

---

## Referências

META. **React: the library for web and native user interfaces**. [S. l.], [s. d.]. Disponível em: https://react.dev/. Acesso em: 19 out. 2026.

META. **Thinking in React**. *React Docs*, [s. d.]. Disponível em: https://react.dev/learn/thinking-in-react. Acesso em: 19 out. 2026.

TESTING LIBRARY. **React Testing Library**. [S. l.], [s. d.]. Disponível em: https://testing-library.com/docs/react-testing-library/intro/. Acesso em: 19 out. 2026.

VITE. **Vite: Getting Started**. [S. l.], [s. d.]. Disponível em: https://vite.dev/guide/. Acesso em: 19 out. 2026.

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Victor Leandro](https://github.com/Afrontoso) | Criação do Guia de React | 19/10/2026 | |
