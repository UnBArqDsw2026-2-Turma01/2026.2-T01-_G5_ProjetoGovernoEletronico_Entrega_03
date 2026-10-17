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
* **[PREENCHER: ferramenta e versão]:** [PREENCHER: para que foi usada]

---

## 3. Experimentos com IA Generativa nesta Entrega

Esta seção apresenta um experimento individual para cada integrante da SubEquipe 02. Cada registro deve documentar uma atividade relevante realizada com apoio de IA Generativa, incluindo o objetivo, o prompt utilizado, o resultado obtido e a análise crítica das respostas.

Os experimentos devem ser preenchidos pelos próprios integrantes, com base em suas interações reais com as ferramentas.


### Experimento 01:  Gustavo Fornaciari 

#### Integrante Responsável

- **Nome:** Gustavo Fornaciari
- **GitHub:** [@GUGOFO](https://github.com/GUGOFO)

#### Objetivo:

[PREENCHER]

#### Prompt Utilizado:

```
[PREENCHER: prompt]
```

#### Resultado Obtido:

[PREENCHER]

#### Análise Crítica e Intervenção Humana:

[PREENCHER] O que a IA acertou, o que errou ou omitiu, e o que a equipe corrigiu manualmente.

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

### Experimento 03: Victor Leandro — [Título do experimento]

#### Integrante Responsável

- **Nome:** Victor Leandro
- **GitHub:** [@Afrontoso](https://github.com/Afrontoso)

#### Objetivo

[Descrever o objetivo da utilização da IA Generativa na atividade realizada pelo integrante.]

#### Prompt Utilizado

```text
[Inserir o prompt efetivamente utilizado pelo integrante.]
```

#### Resultado Obtido

[Descrever o resultado gerado pela IA e indicar quais sugestões foram aproveitadas.]

#### Análise Crítica e Intervenção Humana

[Registrar os acertos, as limitações identificadas e as decisões tomadas pelo integrante para corrigir, adaptar ou descartar as sugestões.]

---

### Experimento 04: Julia Oliveira Patricio — [Título do experimento]

#### Integrante Responsável

- **Nome:** Julia Oliveira Patricio
- **GitHub:** [@juliapat18](https://github.com/juliapat18)

#### Objetivo

[Descrever o objetivo da utilização da IA Generativa na atividade realizada pela integrante.]

#### Prompt Utilizado

```text
[Inserir o prompt efetivamente utilizado pela integrante.]
```

#### Resultado Obtido

[Descrever o resultado gerado pela IA e indicar quais sugestões foram aproveitadas.]

#### Análise Crítica e Intervenção Humana

[Registrar os acertos, as limitações identificadas e as decisões tomadas pela integrante para corrigir, adaptar ou descartar as sugestões.]

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

* **Uso da IA Generativa (Senso Crítico):** [PREENCHER]

* **Lições Aprendidas:** [PREENCHER]

---

### Ana Beatriz

* **GitHub:** [@AnnaBeatrizAraujo](https://github.com/AnnaBeatrizAraujo)

* **Uso da IA Generativa (Senso Crítico):** Utilizei o NotebookLM como apoio à evolução e à documentação da modelagem do padrão Composite. A ferramenta auxiliou na organização das descrições das classes `MiniAppLeaf` e `CardFaqLeaf`, na revisão textual da documentação da V3 e na preparação do histórico de versionamento.

Durante o processo, foi importante delimitar o escopo das solicitações e avaliar as sugestões de acordo com a proposta do projeto. A IA foi utilizada como ferramenta de apoio, sem substituir a análise da modelagem nem a responsabilidade pelas decisões e pelo conteúdo final.

* **Lições Aprendidas:** Aprendi que o padrão GoF Estrutural Composite permite organizar componentes em estruturas hierárquicas, tratando elementos individuais e agrupamentos de forma uniforme. Compreendi como essa estrutura facilita a adição de novos componentes e a manutenção da interface. Também aprendi que a IA pode auxiliar na modelagem e na documentação, mas suas sugestões precisam ser analisadas e validadas para garantir a coerência com o padrão e os objetivos do projeto.

---

### Victor Leandro

* **GitHub:** [@Afrontoso](https://github.com/Afrontoso)

* **Uso da IA Generativa (Senso Crítico):** [PREENCHER]

* **Lições Aprendidas:** [PREENCHER]

---

## 6. Síntese do Aprendizado da Subequipe

[PREENCHER]

---

## 7. Referências e Ferramentas Utilizadas

1. **Google. NotebookLM.** Disponível em: https://notebook.google.com/. Acesso em: 16 out. 2026.
2. [PREENCHER]: ferramenta, endereço e data de acesso.

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Inicio do Teamplate do trabalho | 06/10/2026 | [18b6195](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/18b61958e419b67f95469d4a704ddcb9629b9803) |
| [Ana Beatriz](https://github.com/AnnaBeatrizAraujo) | Declaração do Uso de IA| 16/10/2026 | [a528bb1](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/a528bb13853f4871f6eb771c20359fe16d54c62c) |