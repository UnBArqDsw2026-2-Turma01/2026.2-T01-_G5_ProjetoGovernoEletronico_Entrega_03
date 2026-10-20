# Uso de Inteligência Artificial Generativa | GoF Estrutural

---

## 1. Descrição e Objetivo

Este documento registra o uso de ferramentas de Inteligência Artificial Generativa pela SubEquipe 02 — GoF Estrutural, durante a modelagem, a evolução, a implementação e a documentação do padrão de projeto Composite aplicado à interface do aplicativo Meu SUS Digital.

O objetivo é apresentar, com transparência e senso crítico, como as ferramentas foram utilizadas, quais resultados foram obtidos e quais decisões foram tomadas pelos integrantes para manter, corrigir ou descartar as sugestões geradas. O registro também busca evidenciar a participação individual dos integrantes e a importância da validação humana dos resultados.

---

## 2. Metodologia do Foco

Os registros de uso da IA Generativa são organizados individualmente, de acordo com as atividades realizadas por cada integrante durante o desenvolvimento do projeto. Cada pessoa deve descrever as ferramentas utilizadas, os prompts enviados, os resultados obtidos e as intervenções realizadas para adequar as respostas aos objetivos da entrega.

Os relatos devem refletir as experiências efetivamente realizadas, podendo abranger modelagem UML, definição de classes, implementação, execução, testes e revisão da documentação.

Após os registros individuais, a equipe apresenta uma análise crítica conjunta, considerando a aderência ao padrão Composite, a qualidade dos resultados e a necessidade de validação técnica.

### Ferramentas Empregadas

* **NotebookLM (Google)::** Utilizado como apoio aos estudos e à consulta das fontes da disciplina, auxiliando na compreensão dos conceitos relacionados aos padrões de projeto e na fundamentação das decisões de modelagem.
* **Claude Code (Anthropic):** Agente de IA executado no VS Code com acesso ao repositório, utilizado no planejamento da V4 e do Código V3 e na revisão e integração do Código V1, incluindo a execução de testes e operações de Git.

---

## 3. Experimentos com IA Generativa nesta Entrega

Esta seção apresenta um experimento individual para cada integrante da SubEquipe 02. Cada registro deve documentar uma atividade relevante realizada com apoio de IA Generativa, incluindo o objetivo, o prompt utilizado, o resultado obtido e a análise crítica das respostas.

Os experimentos devem ser preenchidos pelos próprios integrantes, com base em suas interações reais com as ferramentas.


### Experimento 01: Gustavo Fornaciari — Refinamento da V2 do padrão Composite

#### Integrante Responsável

- **Nome:** Gustavo Fornaciari
- **GitHub:** [@GUGOFO](https://github.com/GUGOFO)

#### Objetivo

Utilizar o NotebookLM como apoio para revisar a modelagem e os contratos do padrão Composite na V2, especialmente as responsabilidades de `Secao` e `Dashboard`, a inclusão da folha `BannerInformativo` e as regras para impedir que um elemento tenha mais de um pai ou que a composição forme ciclos. O objetivo foi organizar essas decisões para que a implementação e a documentação permanecessem coerentes com a modelagem.

#### Prompt Utilizado

*Prompt representativo reconstruído a partir da atividade documentada; não é uma transcrição literal da conversa.*

```text
Com base na documentação do nosso projeto e na modelagem V2 do padrão GoF Composite, ajude a revisar as responsabilidades de ElementoDeTela, CartaoDeAtalho, BannerInformativo, Secao e Dashboard. Explique os contratos de adicionar, remover, renderizar, contar elementos e buscar por id. Considere que cada elemento só pode pertencer a uma seção ou painel, que a composição não pode formar ciclos e que o Dashboard deve manter ao menos uma seção. Mantenha o escopo somente no Composite e organize as recomendações para a documentação, sem adicionar integrações externas nem classes que não sejam necessárias.
```

#### Resultado Obtido

O NotebookLM foi utilizado como apoio para organizar as responsabilidades das classes e explicitar os contratos das operações da V2. A análise ajudou a estruturar a documentação das regras de composição: um elemento não deve ter dois pais, a inserção de uma seção não pode criar um ciclo indireto e o `Dashboard` deve preservar ao menos uma seção. Também serviu de apoio à descrição de `BannerInformativo` como uma nova folha (*Leaf*) que segue a interface comum do Composite.

#### Análise Crítica e Intervenção Humana

As sugestões da IA foram tratadas como um ponto de partida para a documentação, não como validação automática do código. Foi necessário conferir cada regra contra a implementação real e os testes. Na V2, a responsabilidade de controlar a associação de um elemento a um único pai foi mantida em `donoDoElemento.ts`, sem acrescentar estado à interface `ElementoDeTela`; as operações de `Secao` e `Dashboard` foram avaliadas de acordo com esses contratos. A prevenção de ciclos, as regras de remoção e a multiplicidade de seções também precisavam ser verificadas nos métodos e nos testes existentes.

A principal lição foi que a IA pode ajudar a organizar conceitos e tornar explícitas as regras do padrão, mas não comprova que a implementação está correta. A decisão final dependeu da comparação com a modelagem V2, o código e os testes do projeto.

### Experimento 02: Ana Beatriz — Modelagem, Evolução e Refinamento do Padrão Composite (Meu SUS Digital)

#### Integrante Responsável

- **Nome:** Ana Beatriz
- **GitHub:** [@AnnaBeatrizAraujo](https://github.com/AnnaBeatrizAraujo)

#### Objetivo

Modelar, estruturar e evoluir o padrão de projeto GoF Estrutural Composite aplicado à camada de apresentação do Dashboard Pós-Login do aplicativo Meu SUS Digital, definindo componentes de interface.

#### Prompt Utilizado

```text
Eu quero adicionar algo ao Composite que seja fácil de codar em React com TypeScript, sem precisar de dados externos de vacinas/medicamentos: adicione MiniAppLeaf e CardFaqLeaf. Detalhe: só iremos usar o Composite no GoF, remova qualquer referência a outros padrões.
```

#### Resultado Obtido

O NotebookLM auxiliou na evolução da modelagem UML do Composite, contemplando a interface `ElementoDeTela`, o contêiner `Secao`, o cliente `Dashboard` e as classes folha `CartaoDeAtalho`, `BannerInformativo`, `MiniAppLeaf` e `CardFaqLeaf`.

Também forneceu sugestões para a descrição dos atributos e métodos das classes, exemplos de implementação em React/TypeScript e apoio à documentação das versões do diagrama.

#### Análise Crítica e Intervenção Humana

A proposta inicial do NotebookLM incluía uma abordagem combinada com o padrão Flyweight e folhas que poderiam depender de dados médicos complexos. Foi necessário refinar as solicitações para manter o escopo da entrega restrito ao padrão Composite.

As principais intervenções foram:

1. **Ajuste de escopo:** solicitar a remoção das referências ao Flyweight e manter o foco exclusivo no Composite.
2. **Viabilidade técnica:** priorizar componentes de interface que possam ser representados em React/TypeScript sem depender de integrações externas desnecessárias.
3. **Evolução da modelagem:** incluir `MiniAppLeaf`, para representar cartões de miniaplicativos, e `CardFaqLeaf`, para representar cartões de perguntas frequentes.
4. **Revisão da documentação:** reorganizar as descrições para tornar mais claras as responsabilidades das classes e a relação da estrutura com o Princípio Aberto/Fechado (OCP).

As sugestões do NotebookLM foram utilizadas como apoio, cabendo à integrante avaliar sua adequação ao escopo e à modelagem proposta. A documentação final deve permanecer coerente com o diagrama efetivamente elaborado.

---

### Experimento 03: Victor Leandro — Revisão e Integração do Código V1 do Composite

#### Integrante Responsável

- **Nome:** Victor Leandro
- **GitHub:** [@Afrontoso](https://github.com/Afrontoso)

#### Objetivo

Utilizar o Claude Code, um agente de IA que trabalha no próprio repositório pelo VS Code, como apoio para revisar o Código V1 do Composite antes da apresentação: marcar nos arquivos a parte implementada pelo integrante, retirar do painel o que estava fora do escopo, manter testes e documentação coerentes com essas mudanças e integrar o código à `main` por pull request, depois que o envio direto à `main` foi revertido no PR #23.

#### Prompt Utilizado

*Mensagens enviadas ao agente durante a atividade, transcritas literalmente.*

```text
na parte do meu codigo, que fiz os commits ontem coloque uns comentarios marcando as minha partes fiz, vou ter que fazer um video com meus colegas de equipe e vamos que ter que mostrar a parte do codigo que fizemos
```

```text
retira isso do codigo isso esta fora do escopo
```


```text
abrira um PR pra fazer o merge com a main
```

#### Resultado Obtido

O agente localizou os commits do integrante e adicionou um cabeçalho de autoria, com o hash do commit correspondente, nos 15 arquivos do Código V1. Em seguida, removeu do painel simulado a seção **Conteúdo** (banner de campanha e cartão de publicações) e o campo de busca da interface, e ajustou os testes da interface e o [Codigo.md](./Codigo.md). A cada alteração, o agente executou os testes (Vitest), a checagem de tipos, o lint e o build. A suíte passou de 29 para 27 testes, com todos aprovados.

Na integração, o agente identificou que o push era recusado por um ruleset do repositório que exige pull request em todas as branches. Também percebeu que a `main` tinha revertido o Código V1 e fez um merge que trouxe as mudanças novas da `main` sem perder os arquivos do Composite. O código foi integrado pelo PR #25.

#### Análise Crítica e Intervenção Humana

As decisões de escopo foram do integrante. O agente apresentou a seção Conteúdo como parte do fluxograma da Entrega 2, mas o integrante decidiu retirá-la, por não fazer parte do que seria apresentado. A proposta foi aceita, e as remoções ficou restritas à interface e aos dados simulados.

Também houve falhas que exigiram intervenção:

1. **Verificação tardia da `main`:** o primeiro pull request foi preparado antes de conferir se a `main` tinha mudado. Só depois o agente percebeu o revert do Código V1, o que exigiu o merge descrito acima.
2. **Comando incorreto:** um comando de consulta deixou o repositório em *detached HEAD*. O agente percebeu o erro e voltou à branch de trabalho, sem perda de alterações.

A principal lição foi que o agente acelera tarefas repetitivas e diagnósticos de Git, mas ações difíceis de desfazer, como commits e pushes, precisam ser revisadas antes de serem executadas, principalmente em um repositório com regras que impedem a correção do histórico.

---

### Experimento 04: Julia Oliveira Patricio — Planejamento da Modelagem e do Código

#### Integrante Responsável

- **Nome:** Julia Oliveira Patricio
- **GitHub:** [@juliapat18](https://github.com/juliapat18)

#### Objetivo

Planejar a consolidação da modelagem e a implementação do Código V3 a partir dos documentos da subequipe.

#### Prompt Utilizado

```text
com base nos dados sobre o projeto e quero que você me oriente de forma simplificada sobre o ponto em que estamos.
```

#### Resultado Obtido

A IA propôs a divisão do trabalho em modelagem e código com base nas partes em que foram me incubidas, portanto me orientou em qual direção seguir e o que poderia ser implementado.

#### Análise Crítica e Intervenção Humana

A primeira proposta da IA estava desatualizada: ela sugeria validar ciclos e elementos duplicados em `Secao.adicionar()`, mas V2 do código já fazia isso por meio de `donoDoElemento.ts`. Isso só foi percebido ao ler o código real da branch `codigoV2SubEquipe2`, e a V4 foi refeita para registrar o que o código já garantia.

---

## 4. Análise Crítica e Lições Aprendidas

### Cobertura Conceitual

A IA Generativa pode auxiliar na identificação e na organização dos elementos necessários para representar o padrão Composite. Entretanto, cabe à equipe verificar se a proposta contempla corretamente os componentes, os contêineres e a interface comum, sem acrescentar elementos que não façam parte do escopo definido.

### Aderência ao Padrão e à UML

Os diagramas e as descrições produzidos com apoio da IA precisam ser revisados para garantir a coerência dos relacionamentos, das responsabilidades das classes, dos atributos e dos métodos. A geração de um diagrama não assegura, por si só, sua conformidade com o padrão Composite ou com a notação UML.

### Qualidade do Código Gerado e Execução

Quando utilizada para apoiar a implementação, a IA pode sugerir estruturas e exemplos de código em React/TypeScript. Esses resultados devem ser analisados, implementados e testados antes de serem considerados adequados. Caso não tenha ocorrido geração ou execução de código em determinado experimento, essa limitação deve ser explicitada.

### Influência do Prompting

A especificidade dos prompts influencia os resultados obtidos. Solicitações que delimitam o padrão utilizado, a tecnologia desejada e as restrições do projeto ajudam a reduzir sugestões fora do escopo. O refinamento das instruções também permite corrigir resultados que inicialmente não atendem às necessidades da equipe.

### Confiabilidade e Validação

As respostas da IA devem ser tratadas como sugestões, e não como fontes de validação automática. A equipe precisa conferir as informações técnicas, comparar os resultados com os objetivos do projeto e verificar se as alterações propostas são coerentes com a modelagem e a implementação.

### Limites dos Experimentos

Os resultados dependem do contexto fornecido, da clareza dos prompts e da capacidade de avaliação dos integrantes. A IA pode apresentar soluções desnecessariamente complexas, omitir restrições ou sugerir elementos incompatíveis com o escopo. Além disso, uma resposta plausível não comprova que o código funciona ou que o diagrama está correto.

---

## 5. Pontos de Vista Individuais

Pontos de vista de cada membro da equipe sobre as lições aprendidas e o uso da IA Generativa.

### Detalhamento

### Gustavo Fornaciari

* **GitHub:** [@GUGOFO](https://github.com/GUGOFO)

* **Uso da IA Generativa (Senso Crítico):** Utilizei o NotebookLM como apoio à revisão e à documentação da V2 do padrão Composite. A ferramenta ajudou a organizar as responsabilidades de `Secao`, `Dashboard` e `BannerInformativo` e a explicitar regras como a existência de um único pai por elemento, a prevenção de ciclos e a manutenção de ao menos uma seção no painel. As sugestões foram comparadas com o código e os testes antes de serem consideradas adequadas; a IA não foi tratada como prova de correção da implementação.

* **Lições Aprendidas:** Aprendi que o Composite permite tratar folhas e composições por uma interface comum, mas exige contratos claros para adicionar e remover elementos. As regras de composição precisam ser garantidas no código, não apenas representadas no diagrama UML. Também aprendi que a IA é útil para organizar ideias e documentação, porém pode omitir detalhes de implementação; por isso, é necessário validar suas sugestões com o código real e os testes.

---

### Ana Beatriz

* **GitHub:** [@AnnaBeatrizAraujo](https://github.com/AnnaBeatrizAraujo)

* **Uso da IA Generativa (Senso Crítico):** Utilizei o NotebookLM como apoio à evolução e à documentação da modelagem do padrão Composite. A ferramenta auxiliou na organização das descrições das classes `MiniAppLeaf` e `CardFaqLeaf`, na revisão textual da documentação da V3 e na preparação do histórico de versionamento.

Durante o processo, foi importante delimitar o escopo das solicitações e avaliar as sugestões de acordo com a proposta do projeto. A IA foi utilizada como ferramenta de apoio, sem substituir a análise da modelagem nem a responsabilidade pelas decisões e pelo conteúdo final.

* **Lições Aprendidas:** Aprendi que o padrão GoF Estrutural Composite permite organizar componentes em estruturas hierárquicas, tratando elementos individuais e agrupamentos de forma uniforme. Compreendi como essa estrutura facilita a adição de novos componentes e a manutenção da interface. Também aprendi que a IA pode auxiliar na modelagem e na documentação, mas suas sugestões precisam ser analisadas e validadas para garantir a coerência com o padrão e os objetivos do projeto.

---

### Victor Leandro

* **GitHub:** [@Afrontoso](https://github.com/Afrontoso)

* **Uso da IA Generativa (Senso Crítico):** Usei o Claude Code para revisar o Código V1 do Composite antes da apresentação: marcar a autoria dos arquivos, retirar do painel a seção Conteúdo e o campo de busca e integrar o código pelo PR #25. A ferramenta executou os testes a cada mudança e ajudou a entender por que o push era recusado.

* **Lições Aprendidas:** Aprendi que no Composite o cliente trata uma folha e uma seção pela mesma interface, e que isso permite colocar uma seção dentro de outra sem mudar o código que percorre a árvore. Também aprendi que separar o núcleo do padrão da interface em React facilitou as mudanças: retirar itens do painel não exigiu alterar nenhuma classe do padrão. Sobre a IA, aprendi que ela é útil para tarefas repetitivas e diagnósticos, mas a decisão sobre o escopo e a revisão de ações irreversíveis continuam sendo responsabilidade do integrante.

---

### Julia Oliveira Patricio

* **GitHub:** [@juliapat18](https://github.com/juliapat18)

* **Uso da IA Generativa (Senso Crítico):** Usei o Claude para planejar a V4, o Código V3 e a documentação. A IA acelerou o planejamento, mas começou propondo mudanças que o código do Gustavo já havia feito, porque não via o repositório. Só percebi ao ler o código real. Também errou comandos para o meu ambiente. Aprendi a conferir cada sugestão contra o código e a rodar os testes antes de documentar.

* **Lições Aprendidas:** O Composite permite tratar folhas e composições pela mesma interface, mas acrescentar uma operação à interface obriga todas as folhas a implementá-la. Na V4 percebi também que a união fechada de `ElementoRenderizado` enfraquece o princípio aberto/fechado: uma folha nova exige uma variante nova. Aprendi que documentar o limite de uma garantia vale mais do que omiti-lo.

---

## 6. Síntese do Aprendizado da Subequipe

**Sobre o padrão Composite.** A subequipe consolidou que o valor central do Composite está na interface comum: `CartaoDeAtalho`, `BannerInformativo`, `MiniAppLeaf` e `CardFaqLeaf` (folhas) e `Secao` (composto) são tratados da mesma forma pelo `Dashboard`, que atua como cliente. Isso permitiu aninhar seções, percorrer a árvore sem alterar o código do cliente e remover itens do painel sem mexer nas classes do padrão. Também ficou claro que o padrão exige contratos explícitos: um único pai por elemento, prevenção de ciclos e manutenção de ao menos uma seção no `Dashboard` precisam ser garantidos no código e nos testes, e não apenas desenhados no diagrama UML. Por fim, a equipe observou os custos do padrão: acrescentar uma operação à interface (como `buscarPorTexto()`) obriga todas as folhas a implementá-la, e a união fechada `ElementoRenderizado` enfraquece o princípio aberto/fechado, pois cada folha nova exige uma nova variante.

**Sobre o uso da IA Generativa.** O NotebookLM e o Claude Code foram úteis para organizar responsabilidades, estruturar a documentação, executar tarefas repetitivas e diagnosticar problemas de Git. Em todos os experimentos, porém, foi necessária intervenção humana: a IA sugeriu o padrão Flyweight e folhas dependentes de dados médicos, fora do escopo; propôs validações que o código da V2 já fazia, por trabalhar sem ver o repositório; incluiu no painel uma seção que não seria apresentada; e conduziu ações de Git sem verificar o estado da `main`. Em cada caso, a correção veio de comparar a sugestão com o código real, a modelagem e os testes.

**Lições comuns.**
- Delimitar o escopo e a tecnologia nos prompts reduz sugestões fora do padrão.
- Respostas plausíveis não comprovam que o código funciona nem que o diagrama está correto; a validação é feita com testes e leitura do repositório.
- Ações difíceis de desfazer (commits, pushes, merges) devem ser revisadas antes de executadas.
- Documentar o limite de uma garantia do código vale mais do que omiti-lo.
- A responsabilidade pelas decisões e pelo conteúdo final continua sendo dos integrantes, e a IA funciona como apoio.

---

## 7. Referências e Ferramentas Utilizadas

1. **Google. NotebookLM.** Disponível em: https://notebook.google.com/. Acesso em: 16 out. 2026.
2. **Anthropic. Claude Code.** Disponível em: https://claude.com/claude-code. Acesso em: 19 out. 2026.

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Inicio do Teamplate do trabalho | 06/10/2026 | [18b6195](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/18b61958e419b67f95469d4a704ddcb9629b9803) |
| [Ana Beatriz](https://github.com/AnnaBeatrizAraujo) | Declaração do Uso de IA| 16/10/2026 | [a528bb1](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/a528bb13853f4871f6eb771c20359fe16d54c62c) |
| [Julia Oliveira Patricio](https://github.com/juliapat18) | Registro do uso de IA Generativa | 17/10/2026 | [83ed491](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/83ed491a98bbf07ed33a607bf89ca918458a746d) |
| [Gustavo Gomes Fornaciari](https://github.com/GUGOFO) | Declaracao de IA | 19/10/2026 | [22e6266](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/22e6266b658bc3f42daa10b0e32a54e9623a45dd) |
| [Victor Leandro](https://github.com/Afrontoso) | Registro do Experimento 03 e do ponto de vista individual sobre o uso de IA | 19/10/2026 | |