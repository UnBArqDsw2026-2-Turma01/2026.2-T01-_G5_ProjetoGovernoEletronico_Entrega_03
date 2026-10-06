### Diagramas Dinâmicos
# Guia do Diagrama de Máquina de Estados

Este documento apresenta uma introdução ao **Diagrama de Máquina de Estados** (ou simplesmente Diagrama de Estados) e orientações sobre a escolha e utilização de ferramentas de modelagem para o projeto.

---

## Introdução ao Diagrama de Estados

O **Diagrama de Estados** é um diagrama **comportamental e dinâmico** da UML utilizado para modelar o ciclo de vida de **um único objeto** (ou componente) reativo. Ele descreve os diferentes estados pelos quais um objeto passa durante sua existência no sistema em resposta a eventos internos ou externos.

Diferente do Diagrama de Sequência — que foca nas mensagens trocadas entre diversos objetos — o Diagrama de Estados tem visão microscópica: ele olha para **dentro** de um elemento e responde à pergunta **"Como este objeto reage quando algo acontece com ele?"**. A base teórica deste diagrama na UML deriva dos *Statecharts* criados por David Harel.

### Quando usar e quando não usar

| Use quando… | Prefira outro diagrama quando… |
| :--- | :--- |
| O comportamento de uma classe depende do seu estado atual (ex: um Pedido que reage diferente a "Cancelar" se estiver "Em Processamento" ou "Enviado") | O objeto não tem um ciclo de vida complexo, servindo apenas para guardar dados (CRUD simples) |
| Você precisa modelar fluxos de interfaces de usuário (telas) ou sessões de autenticação | Você quer mostrar a interação/troca de mensagens entre **vários objetos diferentes** → **Diagrama de Sequência ou Colaboração** |
| Você quer documentar regras de negócio estritas sobre as etapas de um processo | Você quer mapear um fluxo de negócio completo que envolve múltiplos atores → **BPMN ou Diagrama de Atividades** |

### Principais Elementos da Notação

- **Estado (*State*):** Representado por um retângulo com cantos arredondados. Descreve uma condição ou situação na qual o objeto se encontra durante um tempo finito. O nome do estado fica centralizado na parte superior.
  - **Ações internas do Estado:** Um estado pode ter compartimentos para detalhar o que acontece lá dentro:
    - `entry / ação`: Executado imediatamente ao entrar no estado.
    - `do / atividade`: Executado continuamente enquanto o objeto permanecer no estado.
    - `exit / ação`: Executado imediatamente ao sair do estado.

- **Estado Inicial (*Initial Pseudo-state*):** Representado por um círculo sólido e preenchido. Indica o ponto de partida do ciclo de vida. Uma seta sai dele apontando para o primeiro estado real.

- **Estado Final (*Final State*):** Representado por um círculo sólido dentro de um círculo vazado (um "alvo"). Indica que a máquina de estados terminou sua execução ou que o objeto foi destruído.

- **Transição (*Transition*):** Uma seta contínua que liga um estado de origem a um estado de destino. É o "caminho" que o objeto percorre para mudar de estado.
  A sintaxe completa de uma transição é: `Evento [Condição de Guarda] / Ação`
  - **Evento:** O que disparou a transição (ex: `clicarNoBotao`, `receberPagamento`).
  - **Condição de Guarda (`[guarda]`):** Uma expressão booleana que **deve ser verdadeira** para que a transição ocorra.
  - **Ação (`/acao`):** Um comportamento executado instantaneamente durante a transição.

- **Estado Composto (*Composite State*):** Um estado grande que contém outros subestados (uma máquina de estados aninhada). Útil para organizar diagramas complexos onde uma mesma transição de erro ou cancelamento se aplica a vários subestados.

- **Regiões Ortogonais (*Orthogonal Regions*):** Usadas dentro de estados compostos separadas por uma linha tracejada. Permitem modelar concorrência, mostrando que a máquina de estados está em múltiplos subestados ao mesmo tempo.

### Erros comuns a evitar

- **Esquecer o Estado Inicial e Final:** Toda máquina de estados precisa ter um ponto claro de início. O final pode não existir para objetos perpétuos (como um loop principal de servidor), mas geralmente é necessário.
- **Modelar múltiplos objetos no mesmo diagrama:** O Diagrama de Estados descreve **um** elemento. Se você tem "Usuário", "Sistema" e "Banco de Dados" mudando de estado no mesmo papel, você provavelmente está desenhando um fluxograma ou Diagrama de Atividades.
- **Transições sem eventos ou guardas claras:** Transições vazias (sem evento) só devem ser usadas quando são disparadas automaticamente pelo término das atividades (`do/`) do estado de origem.
- **Confundir Ação (transição) com Atividade (estado):** Ações são curtas e ininterruptas (ocorrem na transição). Atividades são processos demorados e que podem ser interrompidos (ocorrem dentro do `do/` do estado).

---

## Ferramentas de Modelagem Recomendadas

O subgrupo pode escolher livremente a ferramenta, desde que o resultado final seja exportado como imagem (PNG/SVG) para o GitPages, acompanhado do arquivo-fonte editável ou de um link de edição.

### 1. diagrams.net (draw.io)

Ferramenta gratuita e acessível no navegador. Possui uma biblioteca completa de elementos UML, incluindo estados, pontos de junção e transições. 
- **Acesso:** [app.diagrams.net](https://app.diagrams.net/) (Procure pela categoria UML).

---

### 2. Visual Paradigm Online / StarUML

Ferramentas focadas estritamente em UML. Validam automaticamente as sintaxes de transições (`Evento [Guarda] / Ação`) e garantem consistência visual na criação de estados compostos e sub-máquinas.
- **Acesso:** [online.visual-paradigm.com](https://online.visual-paradigm.com/) / [staruml.io](https://staruml.io/)

---

## Referências Bibliográficas

* SERRANO, Milene. *Arquitetura e Desenho de Software — Aula: Modelagem UML Dinâmica*. Brasília: FGA/UnB, 2026. 1 arquivo PDF.
* OBJECT MANAGEMENT GROUP (OMG). *Unified Modeling Language (UML), Version 2.5.1*. Needham: OMG, 2017. Disponível em: https://www.omg.org/spec/UML/2.5.1/. Acesso em: 15/09/2026.
* UML-DIAGRAMS. *UML State Machine Diagrams*. Disponível em: https://www.uml-diagrams.org/state-machine-diagrams.html. Acesso em: 16/09/2026.

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| -- | -- | -- | -- |
| [Nicole Jovita](https://github.com/nicolejovita) | Criação do template padronizado para os guias de diagramas | 14/09/2026 | [3227304](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_02/commit/3227304c3509461ab58ddf498320e2a16272fe7d) |
| [Giovani Coelho](https://github.com/Gotc2607) | Elaboração do conteúdo completo do Guia do Diagrama de Estados | 16/09/2026 | [ffac6a9](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_02/commit/ffac6a9) |