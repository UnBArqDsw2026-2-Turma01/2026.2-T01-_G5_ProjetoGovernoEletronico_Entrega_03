### Diagramas Dinâmicos 
# Guia do Diagrama de Sequência

Este documento apresenta uma introdução ao **Diagrama de Sequência (UML)** e orientações sobre a escolha e utilização de ferramentas de modelagem para o projeto.

---

## Introdução ao Diagrama de Sequência

Segundo o material de *Modelagem UML Dinâmica* da Profa. Milene Serrano, o **Diagrama de Sequência** é o artefato dinâmico mais relevante da UML, em especial para a fase de projeto/desenho de software. Ele confere a representação gráfica das interações entre os objetos distribuídas ao longo de suas respectivas **linhas de vida** (*lifelines*) em ordem cronológica.

### Principais Elementos da Notação

- **Linha de Vida (*Lifeline*):** Linha vertical tracejada que representa a existência de um objeto ou papel durante a interação.
- **Foco de Controle / Caixa de Ativação (*Execution Specification*):** Retângulos verticais sobre a linha de vida que indicam o período em que um elemento está executando um processamento.
- **Mensagem Síncrona:** Seta contínua com ponta preenchida indicando chamadas onde o remetente aguarda a resposta para prosseguir.
- **Mensagem Assíncrona:** Seta contínua com ponta aberta para chamadas que não bloqueiam a execução do remetente.
- **Mensagem de Retorno:** Seta tracejada indicando a resposta de um processamento anterior.
- **Fragmentos Combinados (*Interaction Frames*):** Estruturas lógicas para controle de fluxo, tais como:
  - `alt` (Fluxo Alternativo/Condicional)
  - `opt` (Fluxo Opcional)
  - `loop` (Repetição/Laço)
  - `ref` (Referência a outra interação/diagrama)

---

## Ferramentas de Modelagem Recomendadas

Com base nas ferramentas de modelagem sugeridas para o projeto (**Draw.io**, **Mermaid** e **PlantUML**), detalham-se as recomendações para a equipe:

### 1. PlantUML (*Diagrams-as-Code*)

Ferramenta focada em criar diagramas via código simples. Oferece alta precisão técnica e facilita o versionamento direto no repositório.

- **Acesso:** [PlantUML Official](https://plantuml.com/) | [PlantText Editor](https://www.planttext.com/)

---

### 2. Mermaid.js (*Diagrams-as-Code*)

Ferramenta nativa para renderização de diagramas em arquivos Markdown no GitHub e GitHub Pages.

- **Acesso:** [Mermaid Live Editor](https://mermaid.ai/)

---

### 3. Draw.io (*Modelagem Visual / Drag-and-Drop*)

Ferramenta gráfica recomendada para rascunhos, diagramação colaborativa rápida e exportação de imagens em alta resolução.

- **Acesso:** [Draw.io](https://www.drawio.com/)

---

## Referências Bibliográficas

* SERRANO, Milene. **Arquitetura e Desenho de Software: Aula Modelagem UML Dinâmica**. Universidade de Brasília (UnB Gama).

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| -- | -- | -- | -- |
| [Nicole Jovita](https://github.com/nicolejovita) | Criação do template padronizado para os guias de diagramas | 14/09/2026 | [3227304](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_02/commit/3227304c3509461ab58ddf498320e2a16272fe7d) |
| [Nicole Jovita](https://github.com/nicolejovita) | Criação do Guia do Diagrama de Sequência | 14/09/2026 | [b14a35d](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_02/commit/b14a35dbfe86765ff14386dd25950939320be2f6) |