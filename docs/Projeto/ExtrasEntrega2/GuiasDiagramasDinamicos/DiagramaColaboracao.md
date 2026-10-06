### Diagramas Dinâmicos
# Guia do Diagrama de Colaboração

Este documento apresenta uma introdução ao **Diagrama de Colaboração** (também chamado de **Diagrama de Comunicação** a partir da UML 2.x) e orientações sobre quando utilizá-lo, como construí-lo e quais ferramentas de modelagem empregar no projeto.

---

## Introdução ao Diagrama de Colaboração

O **Diagrama de Colaboração** (UML 1.x) — renomeado para **Diagrama de Comunicação** na UML 2.x — é um diagrama de interação que descreve a **estrutura organizacional dos objetos** que participam de uma interação e as **mensagens trocadas entre eles**. Diferentemente do Diagrama de Sequência, que enfatiza a ordem cronológica das mensagens ao longo de linhas de vida verticais, o Diagrama de Colaboração enfatiza o **vínculo estrutural** (ligação) entre os objetos, numerando as mensagens para indicar a sequência de execução.

Segundo o material de *Modelagem UML Dinâmica* da Profa. Milene Serrano, os diagramas de interação da UML são semanticamente equivalentes — ou seja, um Diagrama de Sequência pode ser convertido em um Diagrama de Colaboração/Comunicação e vice-versa —, diferenciando-se apenas na perspectiva que oferecem: **temporal** (sequência) versus **estrutural** (colaboração).

---

## Quando usar e quando não usar

| Use quando…                                                                                                                             | Prefira outro diagrama quando…                                                                                                                  |
| :-------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| Você quer visualizar **quais objetos colaboram diretamente** entre si (conexões e vínculos) para realizar uma funcionalidade             | A **ordem temporal** das mensagens é mais importante que a estrutura de ligações → **Diagrama de Sequência**                                     |
| Precisa destacar a **topologia ou arquitetura** de comunicação (quem fala com quem)                                                     | Você precisa modelar o **ciclo de vida interno** de um único objeto → **Diagrama de Estados**                                                   |
| O cenário possui poucos objetos e poucas mensagens, e a disposição espacial livre facilita a leitura                                    | O processo envolve múltiplos atores e caminhos paralelos complexos → **Diagrama de Atividades**                                                 |
| Deseja mostrar em um mesmo diagrama a **estrutura estática** (ligações) e o **comportamento dinâmico** (mensagens) de forma integrada   | Existem muitas mensagens e fragmentos combinados (loops, alternativas) que ficariam difíceis de numerar → **Diagrama de Sequência**              |
| A equipe precisa identificar rapidamente **dependências excessivas** (um objeto acoplado a muitos outros)                               | Você deseja representar a interação entre componentes de alto nível → **Diagrama de Componentes** com interfaces                                |

---

## Principais Elementos da Notação

- **Objeto (*Object / Instance*):** Representado por um retângulo com o nome sublinhado no formato `nomeObjeto : NomeClasse` (ou apenas `: NomeClasse` para instâncias anônimas). Cada retângulo no diagrama corresponde a uma instância que participa da interação.

- **Ligação (*Link*):** Uma linha sólida conectando dois objetos. Representa uma **associação em nível de instância** — ou seja, indica que os dois objetos podem trocar mensagens. A ligação é uma instância de uma associação definida no Diagrama de Classes.

- **Mensagem (*Message*):** Uma seta rotulada sobre uma ligação, indicando a comunicação entre dois objetos. O rótulo segue o formato:
  `número_sequencial : nomeOperação(parâmetros)`
  - Exemplo: `1: autenticar(login, senha)`
  - Exemplo: `1.1: validarToken(token)`

- **Numeração de Sequência (*Sequence Numbering*):** Sistema de numeração que determina a ordem de execução das mensagens. Utiliza-se a **notação decimal aninhada** para representar chamadas encadeadas:
  - `1` → primeira mensagem
  - `1.1` → primeira sub-mensagem originada de `1`
  - `1.2` → segunda sub-mensagem originada de `1`
  - `2` → segunda mensagem de nível superior

- **Autochamada / Automensagem (*Self-Message*):** Uma seta que sai e retorna ao mesmo objeto, indicando que ele chama uma operação interna de si mesmo. Exemplo: `1.1: calcularDesconto()`.

- **Mensagem de Retorno (*Return Message*):** Representada por uma seta tracejada, indica o valor devolvido por uma operação. Nem sempre é representada explicitamente, pois pode ser inferida.

- **Condição de Guarda (*Guard Condition*):** Expressão booleana entre colchetes que precede a mensagem, indicando que ela só é enviada se a condição for verdadeira. Formato: `[condição] número : mensagem()`. Exemplo: `[saldoSuficiente] 2: debitar(valor)`.

- **Iteração (*Iteration / Loop*):** Indicada pelo marcador `*` antes da mensagem ou por uma condição entre colchetes que expressa repetição. Exemplo: `1 *[para cada item]: calcularTotal(item)`.

- **Estereótipos de Objetos:** Podem ser usados para indicar o tipo de responsabilidade do objeto na interação:
  - `<<boundary>>` — Objetos de fronteira (interfaces com o usuário ou sistemas externos).
  - `<<control>>` — Objetos de controle (lógica de negócio e coordenação).
  - `<<entity>>` — Objetos de entidade (dados persistentes).

---

## Como criar um Diagrama de Colaboração?

A construção de um Diagrama de Colaboração pode seguir as etapas abaixo:

1. **Identifique o cenário de uso:** Selecione o caso de uso ou funcionalidade específica que será representada. O diagrama modela **uma interação concreta** (por exemplo, "Realizar Login" ou "Processar Pagamento").

2. **Liste os objetos participantes:** Identifique todas as instâncias de classes (objetos) que participam da interação. Utilize nomes significativos e classifique-os por responsabilidade (`<<boundary>>`, `<<control>>`, `<<entity>>`), quando aplicável.

3. **Estabeleça as ligações:** Desenhe as ligações (linhas sólidas) entre os objetos que trocam mensagens entre si. Cada ligação reflete uma associação ou dependência.

4. **Defina as mensagens e sua ordem:** Sobre cada ligação, adicione as setas de mensagem com a numeração sequencial decimal aninhada (`1`, `1.1`, `1.2`, `2`, …). Inclua o nome da operação e os parâmetros.

5. **Adicione guardas e iterações:** Quando necessário, inclua condições de guarda `[condição]` e marcadores de iteração `*` para representar fluxos condicionais e repetitivos.

6. **Revise a consistência:** Verifique se a numeração está correta, se todas as ligações possuem pelo menos uma mensagem, e se os nomes de operações são coerentes com o Diagrama de Classes do projeto.

---

## Diagrama de Colaboração vs. Diagrama de Sequência

Como ambos são diagramas de interação semanticamente equivalentes, é útil entender suas diferenças de perspectiva para escolher o mais adequado para cada situação:

| Aspecto                        | Diagrama de Colaboração                                          | Diagrama de Sequência                                         |
| :----------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------ |
| **Ênfase**                     | Estrutura organizacional (quem se conecta com quem)              | Ordem temporal (o que acontece primeiro, segundo…)             |
| **Layout**                     | Disposição livre (2D) — objetos posicionados espacialmente       | Linear vertical — objetos em linhas de vida de cima para baixo |
| **Indicação de ordem**         | Numeração decimal aninhada nas mensagens                         | Posição vertical (de cima para baixo)                         |
| **Fragmentos combinados**      | Não suportados nativamente (usa guardas e iterações simples)     | Suporte completo (`alt`, `opt`, `loop`, `ref`, etc.)          |
| **Melhor para**                | Poucos objetos, foco em dependências e acoplamento               | Muitas mensagens, fluxos complexos com desvios e laços        |
| **Legibilidade em cenários grandes** | Diminui com muitos objetos e mensagens numeradas            | Melhor, pois a ordem é visual e implícita                     |

---

## Ferramentas de Modelagem Recomendadas

O subgrupo pode escolher livremente a ferramenta, desde que o resultado final seja exportado como imagem (PNG/SVG) para o GitPages, acompanhado do arquivo-fonte editável ou de um link de edição.

### 1. diagrams.net (draw.io)

Ferramenta gratuita e acessível diretamente no navegador. Possui biblioteca completa de formas UML — incluindo retângulos de objetos, ligações e setas rotuladas — o que permite montar Diagramas de Colaboração com total flexibilidade de layout. Suporta exportação em PNG, SVG e PDF.

- **Acesso:** [app.diagrams.net](https://app.diagrams.net/) (Procure pela categoria *UML* na biblioteca de formas).

---

### 2. Visual Paradigm Online

Ferramenta UML especializada que oferece suporte nativo ao Diagrama de Comunicação (Colaboração). Possui validação automática de sintaxe de mensagens e numeração, além de templates prontos. A versão gratuita atende para projetos acadêmicos.

- **Acesso:** [online.visual-paradigm.com](https://online.visual-paradigm.com/)

---

### 3. Lucidchart

Plataforma de diagramação online colaborativa em tempo real. Permite a criação de Diagramas de Colaboração/Comunicação com uma interface intuitiva de *drag-and-drop*. Oferece conta educacional gratuita para estudantes.

- **Acesso:** [lucidchart.com](https://www.lucidchart.com/)

---

### 4. PlantUML (*Diagrams-as-Code*)

Ferramenta que permite criar diagramas via código textual. Embora seu suporte a diagramas de comunicação seja mais limitado que para sequência, é possível representar colaborações usando a sintaxe de objetos e links. Ideal para versionamento direto no repositório.

- **Acesso:** [plantuml.com](https://plantuml.com/) | [PlantText Editor](https://www.planttext.com/)

---

### 5. Miro

Plataforma de quadro branco colaborativo online que permite criar diagramas de forma livre e visual. Possui templates UML e formas personalizáveis que podem ser utilizadas para montar Diagramas de Colaboração. Destaca-se pela colaboração em tempo real, ideal para sessões de modelagem em equipe, e pela facilidade de organizar o diagrama espacialmente com *sticky notes*, setas e comentários.

- **Acesso:** [miro.com](https://miro.com/)

---

## Referências Bibliográficas

* SERRANO, Milene. *Arquitetura e Desenho de Software — Aula: Modelagem UML Dinâmica*. Brasília: FGA/UnB, 2026. 1 arquivo PDF.
* OBJECT MANAGEMENT GROUP (OMG). *Unified Modeling Language (UML), Version 2.5.1*. Needham: OMG, 2017. Seção 17 — Interactions. Disponível em: https://www.omg.org/spec/UML/2.5.1/. Acesso em: 17/09/2026.
* UML-DIAGRAMS. *UML Communication Diagrams Overview*. Disponível em: https://www.uml-diagrams.org/communication-diagrams.html. Acesso em: 17/09/2026.
* FOWLER, Martin. *UML Distilled: A Brief Guide to the Standard Object Modeling Language*. 3ª ed. Boston: Addison-Wesley, 2003.

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| -- | -- | -- | -- |
| [Nicole Jovita](https://github.com/nicolejovita) | Criação do template padronizado para os guias de diagramas | 14/09/2026 | [3227304](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_02/commit/3227304c3509461ab58ddf498320e2a16272fe7d) |
| [João Leles](https://github.com/joaoleless) | Criação do guia do diagram de colaboração | 17/09/2026 | [62661bb](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_02/commit/62661bb64c8419a3662c1ff42a208d4a4faa0657) |
