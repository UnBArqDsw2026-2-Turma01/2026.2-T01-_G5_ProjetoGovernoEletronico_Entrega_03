# Uso de Inteligência Artificial Generativa | GoF Criacional

---

## 1. Descrição e Objetivo

Este documento registra o apoio, a experimentação e a análise crítica sobre o uso de ferramentas de **Inteligência Artificial Generativa (IAG)** na **Entrega 3 (Padrões de Projeto GoF Criacionais — Factory Method)** pela **SubEquipe 01**. O propósito deste relatório é apresentar, com transparência, rigor técnico e rastreabilidade, de que maneira os modelos de linguagem e geração de código foram empregados durante o ciclo de engenharia de software da equipe — compreendendo as etapas de concepção visual, modelagem UML, implementação em TypeScript/React, elaboração de testes automatizados e confecção da documentação.

Seguindo a diretriz metodológica já consagrada na Entrega 2, a subequipe manteve a postura de tratar a IA estritamente como um **mecanismo acelerador e co-piloto exploratório**, reservando à engenharia humana a totalidade das decisões de design arquitetural, validação de regras de domínio e fiscalização das saídas geradas. Em especial, busca-se evidenciar nesta entrega os riscos e limites da geração automática quando desprovida de contexto visual e semântico adequado, contrapondo o comportamento dos modelos às necessidades reais do ecossistema do **Meu SUS Digital**.

---

## 2. Metodologia do Foco

A coleta de dados, registros de experimentos e reflexões críticas é realizada de forma **individual e assíncrona** por cada um dos integrantes da SubEquipe 01, respeitando o particionamento em quatro versões incrementais do domínio clínico (Vacinas, Exames Laboratoriais, Medicamentos e Seletor Unificador / Hub "Minha Saúde"). Cada participante tem a atribuição de documentar um experimento prático significativo em seu respectivo foco temático (modelagem, código, interface ou auditoria de qualidade), explicitando os objetivos, os prompts de entrada, os artefatos obtidos e as devidas correções ou descartes efetuados.

### Ferramentas Empregadas

* **ChatGPT (OpenAI - GPT-4o / Canvas):** Utilizado em experimentos de geração de código para prototipação de interfaces web e testes de layouts a partir de especificações em linguagem natural.
* **Claude (Anthropic - Claude 3.5 Sonnet):** Empregado na revisão sintática de código TypeScript, validação de tipagem estática e auxílio na formatação de relatórios em Markdown.
* **Google Gemini (Advanced / 1.5 Pro):** Utilizado para confrontar modelos conceituais de design patterns e apoiar análises comparativas de requisitos do ecossistema governamental.
* *[PREENCHER: Ferramentas adicionais utilizadas pelos demais integrantes]*

---

## 3. Experimentos com IA Generativa nesta Entrega

---

### Experimento 01: Geração de Interface com IA sem Contexto Visual — O Fenômeno da "Interface Alucinada" e o Desalinhamento com o Meu SUS Digital

#### Integrante Responsável

* **Nome:** [Artur Galdino](https://github.com/ArturFGaldino)
* **Foco / Papel:** Versão 1: Modelagem e Implementação do Factory Method — Fatia de Vacinas / Carteira de Vacinação Digital

#### Objetivo:

Investigar a capacidade e as limitações de uma IA Generativa (ChatGPT GPT-4o) ao receber a solicitação de prototipar uma interface gráfica em React/Tailwind/HTML para a demonstração do padrão de projeto GoF Criacional **Factory Method** aplicado à fatia de vacinas do **Meu SUS Digital**, **sem o fornecimento de imagens de referência, capturas de tela do aplicativo oficial, protótipos do Figma ou diretrizes do Design System do Governo Federal (DS-Gov)**.

O objetivo precípuo do experimento foi verificar na prática a hipótese de que, ao ser instruída unicamente por um prompt textual genérico, a IA tende a "delirar" (alucinar) — preenchendo as lacunas de contexto visual e semântico com metáforas conceituais artificiais, criando layouts que nada têm a ver com o produto real do Ministério da Saúde e expondo detalhes de baixo nível da arquitetura de software diretamente na interface do usuário.

#### Prompt Utilizado:

> Crie uma interface web moderna em HTML, CSS e React para demonstrar o padrão de projeto GoF Criacional Factory Method aplicado ao Meu SUS Digital, especificamente para a fatia de histórico de vacinas do cidadão. Mostre o usuário autenticado via Gov.br, um botão para acionar o Factory Method instanciando uma nova vacina e cards com as vacinas aplicadas (Covid-19, Gripe, Febre Amarela, Hepatite B) sincronizadas com a RNDS.


#### Resultado Obtido:

A Inteligência Artificial gerou uma página web completa e estilizou os componentes conforme demonstrado na imagem a seguir:

<div align="center">

![Interface Alucinada Gerada pela IA Generativa](../assets/subequipe01-padroes/ia/exp-ia-interface-alucinada.png)

</div>

<center><strong>Figura 1:</strong> Interface gráfica gerada pela IA generativa a partir de prompt puramente textual sem insumos visuais prévios. Nota-se a criação de um "painel didático de desenvolvedor" descolado da identidade real do Meu SUS Digital (Autoria: Artur Galdino).</center>

<br>

Para fins de contraste e fundamentação da análise crítica, apresenta-se abaixo a **interface real da Versão 1**, desenvolvida manualmente pela subequipe em estrita conformidade com o Design System oficial do Ministério da Saúde e as especificações do Gov.br:

<div align="center">

![Interface Real da Versão 1 Desenvolvida pela Equipe](../assets/subequipe01-padroes/execucao/v1-app-carteira-vacinacao.png)

</div>

<center><strong>Figura 2:</strong> Interface real da Carteira Nacional de Vacinação Digital (Versão 1) desenvolvida pela equipe com fidelidade visual ao Meu SUS Digital e isolamento arquitetural do padrão de projeto (Autoria: Artur Galdino).</center>

<br>

#### Análise Crítica e Intervenção Humana:

A confrontação detalhada entre o resultado fabricado pela IA (Figura 1) e a aplicação desenvolvida pela equipe (Figura 2) revelou falhas conceituais, semânticas e ergonômicas profundas decorrentes da ausência de contexto visual:

1. **Alucinação Conceitual: O "Dashboard Acadêmico de Depuração" (*Toy Showcase*)**  
   Ao desconhecer o layout e a finalidade prática do aplicativo oficial do Meu SUS Digital, a IA interpretou o pedido de "demonstrar o padrão Factory Method" de forma excessivamente literal. Em vez de projetar um sistema de governo focado na jornada do paciente, a ferramenta alucinou um painel de laboratório didático para desenvolvedores. Ela inseriu cabeçalhos artificiais grotescos como *"Demonstração do Padrão GoF Criacional: Factory Method"*, criou uma tarja destacada *"PADRÃO DE PROJETO GOF CRIACIONAL Factory Method em Ação"* com a explicação teórica do código, e chegou a inventar uma janela textual intitulada *"LOG DE EXECUÇÃO: Factory Method pronto. 4 instâncias de CartaoVacina criadas via BuscadorDeVacinas"*. Em nenhum ambiente governamental de produção tais dados de infraestrutura/debug seriam exibidos em tela para o cidadão.

2. **Vazamento Abstrato da Arquitetura na Interface do Cidadão (*Leaky Abstraction*)**  
   Um dos desvios mais graves produzidos pela IA foi estampar nos cartões de cada imunizante a inscrição explícita: `"Classe: CartaoVacina"`. Sob a ótica da Engenharia de Software e das boas práticas de arquitetura em camadas (Gamma et al., 1995; Martin, 2002), o padrão de projeto existe para organizar e desacoplar o código-fonte internamente. A camada de apresentação (View/UI) deve consumir dados clínicos higienizados; expor o nome da classe concreta orientada a objetos na interface do paciente constitui uma violação crassa de encapsulamento e usabilidade.

3. **Incompatibilidade Estética e Ergonômica com o Design System Oficial (DS-Gov / Meu SUS Digital)**  
   Visualmente, a interface gerada pela IA não possui qualquer convergência com o aplicativo oficial:
   * **Cores e Banner Superior:** A IA adotou uma barra verde-escura chapada sem relação com o padrão azul clássico do Governo Federal (`#1351b4`) e do Meu SUS Digital.
   * **Identificação do Usuário:** A IA gerou um card genérico em cinza com ícone circular básico, enquanto a identidade do Meu SUS Digital utiliza o card azul escuro característico do cidadão com CPF, CNS e status de autenticação unificado.
   * **Cards Clínicos:** Os cards gerados pela IA dividiram a tela em colunas horizontais genéricas com badges de cores arbitrárias, omitindo informações essenciais da Carteira Nacional de Vacinação (como doses subsequentes, selo oficial de validação e rastreamento da RNDS no padrão oficial).

4. **Intervenção Humana e Decisão da Equipe:**  
   O código e a tela gerados pela IA foram **completamente descartados**. A equipe optou por:
   * Manter o código do padrão GoF estritamente isolado no pacote de domínio e regras de negócio (`code/criacional/src/padrao/`), sem nenhuma menção ou acoplamento a classes na tela de visualização do usuário.
   * Construir a interface do zero em React e CSS puro ([`meuSus.css`](file:///code/criacional/src/ui/meuSus.css)), inspirando-se fielmente nos fluxos reais capturados do aplicativo mobile/web do Ministério da Saúde.
   * Alocar a demonstração técnica do Factory Method em um painel discreto e segregado (o "Dock GoF" interativo), preservando o realismo e a fidedignidade do sistema principal.

**Conclusão do Experimento:** O teste comprovou empiricamente que o uso de IAs generativas sem insumos multimodais (screenshots, protótipos visuais, paletas de design tokens) é ineficaz para o design de interfaces de domínio específico. Quando a ferramenta é alimentada apenas com texto, ela tende a inventar uma estética genérica e misturar a lógica de depuração técnica na camada visual. A engenharia humana é indispensável para contextualizar, podar alucinações e aplicar o devido isolamento arquitetural.

---

### Experimento 02: Prototipação Visual de Interface vs. Implementação Real do Factory Method (Fatia de Exames Laboratoriais — Versão 2)

#### Integrante Responsável

* **Nome:** [Giovani Coelho](https://github.com/Gotc2607)
* **Foco / Papel:** Versão 2: Extensão do Factory Method para Exames Laboratoriais (`BuscadorDeExames` e `ResultadoExame`)
* **Artefatos Relacionados:** [GoFCriacional.md](../../../3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/GoFCriacional.md) (Versão 2), [Codigo.md](../../../3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/Codigo.md) (Versão 2), [Execucao.md](../../../3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/Execucao.md) (Versão 2).

#### Objetivo:

Avaliar a capacidade de um modelo generativo em sintetizar a experiência visual e a densidade de informações clínicas de uma interface governamental de saúde ("Meu SUS Digital — Exames Laboratoriais"), e contrapor criticamente o artefato visual gerado à implementação real da arquitetura de software orientada ao padrão GoF Factory Method (`BuscadorDeExames` e `ResultadoExame`).

#### Prompt Utilizado:

```text
Interface moderna de aplicativo web desktop para o sistema público de saúde brasileiro "Meu SUS Digital", estilo visual oficial Gov.br nas cores azul marinho e branco limpo. A tela ativa é "Exames Laboratoriais". O painel exibe cartões modernos de histórico de exames clínicos realizados: Hemograma Completo, Glicemia de Jejum e Lipidograma Completo. Cada cartão contém identificação do laboratório (LACEN/DF), categoria clínica, tag de status "Liberado" em verde e tabela clínica estruturada com parâmetros, resultados, unidades de medida (mg/dL) e valores de referência. Estilo mockup de UI/UX do Figma, design limpo, institucional e de alta fidelidade para saúde digital.
```

*(Prompt equivalente em inglês utilizado para refinamento da renderização de layout: `Modern desktop web application interface of the Brazilian public health system "Meu SUS Digital", official Gov.br design system aesthetics with navy blue and clean white palette. The active section is "Exames Laboratoriais" (Laboratory Clinical Exams). The screen displays modern medical cards showing completed diagnostic lab tests: Complete Blood Count (Hemograma), Fasting Blood Glucose (Glicemia), and Lipid Panel. Each card highlights the issuing laboratory (LACEN/DF), exam category, status tag "Liberado" in green, and an expandable structured clinical table with parameters, detected values, measurement units (mg/dL, cells/mm³), and standard reference ranges. Clean corporate government dashboard, Figma UI mockup style, high resolution, minimalist healthcare UX design, no blur.`)*

#### Resultado Obtido:

A ferramenta de IA generativa (Google Gemini) produziu uma maquete visual de alta resolução representando o painel web do Meu SUS Digital:

<div align="center">

![Mockup de Exames Laboratoriais gerado por IA Generativa](../assets/subequipe01-padroes/IA/v2-ia-mockup-exames.jpeg)

</div>

<center><strong>Figura 3:</strong> Mockup conceitual da interface de Exames Laboratoriais gerado pelo Google Gemini a partir de engenharia de prompt (Autoria: Giovani Coelho via Google Gemini).</center>

<br>

#### Análise Crítica e Intervenção Humana:

1. **Aderência Visual e Estética (O que a IA acertou):**
   - **Paleta Institucional e Identidade:** A IA absorveu muito bem as diretrizes do Design System do Gov.br (DS-Gov), utilizando a tipografia sem serifa limpa, cabeçalhos em tons sóbrios de azul marinho (`#1351b4`) e fundos neutros.
   - **Estruturação Clínica:** A disposição dos dados em cartões individuais para cada laudo (Hemograma Completo, Glicemia de Jejum, Lipidograma Completo), o uso de tags verdes de status ("Liberado") e a apresentação de tabelas com parâmetros, resultados e valores de referência demonstraram boa apreensão do domínio conceitual de laudos laboratoriais.

2. **Divergências, Alucinações e Erros de Domínio:**
   - **Alucinação Semântica e Textual:** A IA apresentou artefatos clássicos de modelos de difusão de texto em imagens: no subtítulo superior, gerou uma repetição incoerente (*"Histórico de exames clínicos e para os histórico de exames clínicos."*); na categoria do hemograma, alucinou o termo inexistente *"Humacattática"* em vez de *"Hematologia"*; e nas datas dos exames, grafou erros tipográficos como *"21 aun. 2023"*.
   - **Inconsistência Fisiológica dos Dados:** Os valores numéricos nos parâmetros laboratoriais gerados pela IA não possuem base clínica real: no hemograma, a IA indicou uma hemoglobina de `1,6 g/dL` com faixa de referência de `0,2 a 1,0` (valores clinicamente impossíveis ou incompatíveis com a vida). Em contrapartida, no código real do projeto ([`examesMock.ts`](file:///code/criacional/src/dominio/examesMock.ts)), foram pesquisados e implementados valores e unidades fisiológicas consistentes da RNDS e do LACEN/DF (ex.: Hemoglobina `14.8 g/dL`, referência de `13.0 a 17.5 g/dL`, com situação clínica calculada como `NORMAL`).

3. **O Limite Insuperável: A Ausência de Arquitetura de Software:**
   - **Casca Visual vs. Padrão GoF Factory Method:** A imagem da IA é uma representação puramente estática e cosmética. Ela não tem consciência de nenhum princípio de Orientação a Objetos. Na aplicação real, cada exame é uma instância do produto concreto `ResultadoExame`, criado exclusivamente pelo criador concreto `BuscadorDeExames` que sobrepõe o método fábrica `criarRegistroClinico()` da classe base `BuscadorDeHistorico`.
   - **Interatividade e Despacho Polimórfico:** A interface real desenvolvida conta com o **Dock GoF interativo** (`⚡ +Exame (V2)`), permitindo que o usuário ou avaliador dispare a fábrica em tempo de execução, consuma novos payloads brutos e visualize o registro sendo instanciado e renderizado reativamente pelo React. A imagem da IA não provê nenhuma dinamicidade.
   - **Robustez e Tipagem Estática:** A implementação humana assegurou tipagem rigorosa em TypeScript (`ParametroExame[]`), validação defensiva de payloads malformatados e uma suíte com **27 testes unitários e de integração** aprovados no Vitest, garantindo a integridade do sistema contra regressões.

**Conclusão do Experimento:** O experimento comprovou que a IA generativa é um recurso ágil para exploração de ideias e benchmarking de interfaces de usuário, mas a concepção da arquitetura, a fidelidade dos dados clínicos, a garantia dos padrões de projeto GoF/GRASP e a implementação do código executável dependem estritamente da intervenção e do rigor da engenharia humana.

---

### Experimento 03: [PREENCHER: Título do Experimento — João Leles]

#### Integrante Responsável

* **Nome:** [João Leles](https://github.com/joaoleless)
* **Foco / Papel:** Versão 3: Refinamento do Factory Method para Medicamentos e Farmácia Popular (`BuscadorDeMedicamentos` e `ReceitaMedicamento`)

#### Objetivo:

[PREENCHER: Descrever o objetivo da experimentação com IA Generativa conduzida pelo integrante na modelagem, no código ou nos testes da fatia de medicamentos]

#### Prompt Utilizado:

```text
[PREENCHER: Inserir o prompt exato fornecido à ferramenta]
```

#### Resultado Obtido:

[PREENCHER: Descrever a resposta ou código gerado pela ferramenta, com evidências visuais]

#### Análise Crítica e Intervenção Humana:

[PREENCHER: Apontar as forças, inconsistências ou alucinações da IA e detalhar as intervenções manuais realizadas]

---

### Experimento 04: [PREENCHER: Título do Experimento — Nicole Jovita]

#### Integrante Responsável

* **Nome:** [Nicole Jovita](https://github.com/nicolejovita)
* **Foco / Papel:** Versão 4: Consolidação Final, Seletor Dinâmico de Histórico, Hub "Minha Saúde" e Suíte Consolidada de Testes

#### Objetivo:

[PREENCHER: Descrever o objetivo da experimentação com IA Generativa na orquestração do Seletor de Histórico, integração das 3 fatias clínicas ou auditoria visual do Hub]

#### Prompt Utilizado:

```text
[PREENCHER: Inserir o prompt exato fornecido à ferramenta]
```

#### Resultado Obtido:

[PREENCHER: Descrever o retorno da ferramenta com respectivas capturas de tela e explicações]

#### Análise Crítica e Intervenção Humana:

[PREENCHER: Análise crítica, decisões de engenharia adotadas e correções manuais realizadas no artefato final]

---

## 4. Análise Crítica e Lições Aprendidas

Abaixo estão consolidados os aspectos avaliados durante a experimentação de Inteligência Artificial Generativa no escopo dos Padrões GoF Criacionais (Factory Method):

* **Cobertura Conceitual:** A IA Generativa compreende satisfatoriamente as definições teóricas do catálogo GoF (identificando os papéis clássicos de *Creator*, *ConcreteCreator*, *Product* e *ConcreteProduct*). No entanto, sua capacidade de contextualizar esses papéis em cenários do mundo real (como dados da RNDS, HL7 FHIR e conformidade com a LGPD) é rasa, demandando que a equipe forneça detalhadamente as regras de negócio em cada iteração.
* **Aderência ao Padrão e à UML:** Quando solicitada a gerar código ou diagramas, a IA frequentemente confunde o padrão **Factory Method** (que depende de herança e polimorfismo via método abstrato) com o padrão **Simple Factory** (uma classe utilitária com métodos estáticos) ou tenta empurrar variantes com **Abstract Factory**. A mediação humana foi indispensável para assegurar a conformidade com a notação UML canônica e com os princípios GRASP de atribuição de responsabilidades.
* **Qualidade do Código Gerado e Execução:** A IA produz código funcional para estruturas triviais, mas tende a desconsiderar particularidades de ambientes estritos de compilação (como a flag `erasableSyntaxOnly` do TypeScript, tipagem estrita de payloads nulos ou invariantes de domínio). O código sugerido pela IA nunca deve ser integrado sem prévia checagem estática (`tsc`), análise de linting e validação pela suíte de testes do Vitest.
* **Influência do Prompting e Ausência de Contexto Multimodal:** Conforme demonstrado de forma cabal no [Experimento 01](#experimento-01-geracao-de-interface-com-ia-sem-contexto-visual-o-fenomeno-da-interface-alucinada-e-o-desalinhamento-com-o-meu-sus-digital), o modelo de IA sofre de forte tendência à alucinação quando recebe comandos puramente textuais para criação visual. A ausência de insumos multimodais (screenshots, guias de estilo ou design tokens) faz com que a ferramenta gere layouts bizarros, expondo logs de execução e nomes de classes internas na interface do cidadão.
* **Confiabilidade e Validação:** A taxa de alucinação e simplificação excessiva das respostas exige que todo artefato gerado por IA seja submetido a revisão técnica humana antes de ser incorporado aos relatórios ou à base de código. A IA atua como um assistente preliminar de produtividade, nunca como autoridade arquitetural.
* **Limites do Experimento:** Os testes com IA nesta entrega reforçam que modelos generativos não possuem julgamento crítico sobre usabilidade e ergonomia governamental. Eles apenas completam sequências estatisticamente prováveis de código, cabendo aos projetistas delimitar o escopo, separar as camadas e garantir a integridade arquitetural do sistema.

---

## 5. Pontos de Vista Individuais

### Resumo por Integrante

| Integrante | O que aprendi | Uso de IA Generativa |
| :--- | :--- | :--- |
| [Artur Galdino](https://github.com/ArturFGaldino) | Prompts puramente textuais sem contexto multimodal causam delírio na IA, que mistura código interno de debug na UI; o padrão GoF deve ficar isolado no domínio. | Prototipação de interface com ChatGPT GPT-4o, análise comparativa de alucinações visuais e estruturação da documentação. |
| [Giovani Coelho](https://github.com/Gotc2607) | Compreendi na prática o contraste entre uma maquete visual estática gerada por IA e a engenharia de software real: a IA sintetiza bem a identidade visual de governo, mas alucina dados clínicos e não tem noção da arquitetura GoF (Factory Method), exigindo intervenção humana em 100% da lógica e dos testes. | Geração de mockup de interface no Google Gemini a partir de engenharia de prompt e comparação crítica com o protótipo real e a arquitetura da Versão 2 (Exames Laboratoriais). |
| [João Leles](https://github.com/joaoleless) | *[PREENCHER]* | *[PREENCHER]* |
| [Nicole Jovita](https://github.com/nicolejovita) | *[PREENCHER]* | *[PREENCHER]* |

---

### Detalhamento por Membro

### Artur Galdino

* **GitHub:** [@ArturFGaldino](https://github.com/ArturFGaldino)

* **Uso da IA Generativa (Senso Crítico):**  
  Nesta Entrega 3, utilizei a IA Generativa prioritariamente para testar os limites da geração de código e interfaces front-end aplicadas ao nosso mini-projeto do Meu SUS Digital. Conduzi o Experimento 01 avaliando como o modelo lida com a requisição de telas de demonstração do Factory Method sem o suporte de imagens de referência ou tokens do DS-Gov.  
  A experiência foi extremamente reveladora: a ferramenta apresentou uma alucinação marcante, misturando elementos de depuração interna de engenharia (como o nome da classe `CartaoVacina`, explicações conceituais do GoF e janelas de "Log de Execução") diretamente na visualização do paciente, além de errar completamente a paleta de cores e o layout institucional do SUS. Esse resultado confirmou a necessidade de uma postura estritamente cética e técnica: a IA é incapaz de inferir o contexto tácito de um domínio governamental sem diretrizes rígidas. Em razão disso, descartei integralmente a proposta visual da ferramenta e desenvolvi a interface da Versão 1 de forma manual e fidedigna ao Meu SUS Digital, mantendo a camada do Factory Method perfeitamente desacoplada do cliente.

* **Lições Aprendidas:**  
  A principal lição aprendida foi que a geração de interfaces por IA sem insumos visuais concretos (imagens, Figma, design systems) resulta em produtos superficiais e semanticamente incoerentes. Em Engenharia de Software, as camadas arquiteturais devem ser respeitadas: padrões de projeto como o Factory Method pertencem ao domínio e à lógica de instanciação de objetos, nunca à camada de apresentação visual do usuário. Aprendi também que a engenharia de prompt ganha muito em eficácia quando complementada por abordagens multimodais e restrições negativas explícitas, mas que nenhuma técnica de prompting substitui a validação humana rigorosa, a escrita criteriosa de testes automatizados e o compromisso ético de transparência na documentação.

---

### Giovani Coelho

* **GitHub:** [@Gotc2607](https://github.com/Gotc2607)

* **Uso da IA Generativa (Senso Crítico):**  
  Utilizei o Google Gemini para gerar uma imagem conceitual de interface representando a fatia de Exames Laboratoriais do Meu SUS Digital, comparando o resultado obtido com o código e a interface que implementei na Versão 2. Meu objetivo foi avaliar até onde a IA consegue antecipar a experiência do usuário de um sistema de governo eletrônico e onde ela falha. Exercendo o senso crítico, constatei que a imagem gerada é esteticamente coerente com o Gov.br, mas apresenta falhas de alucinação de texto e valores laboratoriais fisiologicamente incorretos (como hemoglobina letal), além de ser puramente uma maquete estática. Não adotei nenhum código ou dado gerado cegamente pela IA; toda a arquitetura do Factory Method (`BuscadorDeExames` instanciando `ResultadoExame`), a tipagem TypeScript, a tabela de parâmetros e a suíte de 27 testes unitários e de integração no Vitest foram construídos com rigor técnico manual.

* **Lições Aprendidas:**  
  Aprendi que IAs generativas de imagem são úteis para brainstorming e exploração preliminar de layout, mas não têm qualquer capacidade de estruturar arquitetura de software, garantir integridade de dados clínicos ou atender aos princípios GoF e GRASP (Creator, Polymorphism, Low Coupling). A engenharia de software reside na correta separação de responsabilidades e na garantia de qualidade do código executável, algo que depende essencialmente do julgamento e da atuação humana.

---

### João Leles

* **GitHub:** [@joaoleless](https://github.com/joaoleless)

* **Uso da IA Generativa (Senso Crítico):**  
  *[PREENCHER: Relato pessoal do integrante sobre a utilização de IA Generativa no desenvolvimento e validação de seus artefatos]*

* **Lições Aprendidas:**  
  *[PREENCHER: Aprendizados do integrante com relação ao uso da ferramenta versus os requisitos técnicos do projeto]*

---

### Nicole Jovita

* **GitHub:** [@nicolejovita](https://github.com/nicolejovita)

* **Uso da IA Generativa (Senso Crítico):**  
  *[PREENCHER: Relato pessoal da integrante sobre o apoio da IA na consolidação da V4, fidelidade visual e testes de interface]*

* **Lições Aprendidas:**  
  *[PREENCHER: Lições e conclusões da integrante sobre o papel da IA no ciclo de desenvolvimento]*

---

## 6. Síntese do Aprendizado da Subequipe

A vivência da **SubEquipe 01** com ferramentas de Inteligência Artificial Generativa na Entrega de Padrões de Projeto (GoF Criacional) consolidou uma compreensão madura e aprofundada a respeito das potencialidades e armadilhas dessas tecnologias no desenvolvimento de software de alta complexidade. 

A constatação mais contundente da equipe foi a constatação prática da **hiper-literalidade e do delírio alucinatório** dos modelos de linguagem quando requisitados a projetar soluções sem um contexto visual, normativo e arquitetural estrito. A tentativa de gerar interfaces e códigos orientados a padrões a partir de descrições simplificadas demonstrou que a IA não hesita em "vazar" abstrações internas de desenvolvimento (como nomes de classes concretas e painéis de logs artificiais) para dentro de telas que deveriam ser dedicadas ao cidadão, deturpando completamente os princípios fundamentais de encapsulamento, separação de responsabilidades (SoC) e usabilidade.

Dessa forma, a SubEquipe 01 reafirma a premissa de que a IA Generativa deve ser empregada apenas como uma ferramenta auxiliar de exploração de sintaxe e redação de rascunhos preliminares. O projeto arquitetural, a correta aplicação dos padrões GoF e princípios GRASP, o refinamento da fidelidade estética ao ecossistema do Meu SUS Digital e a garantia formal de integridade via suítes de testes unitários herméticos (Vitest) permanecem como prerrogativa e responsabilidade exclusiva da engenharia humana.

*[PREENCHER: Espaço reservado para consolidação final e acréscimos dos demais membros da SubEquipe 01]*

---

## 7. Referências e Ferramentas Utilizadas

1. **ChatGPT (OpenAI - GPT-4o):** Utilizado em experimentos de geração de interfaces em HTML/React/Tailwind e testes de prompts conceituais. Disponível em: <https://chat.openai.com/>. Acesso em: 18 out. 2026.
2. **Claude 3.5 Sonnet (Anthropic):** Empregado na revisão de consistência textual, validação de tipagem em TypeScript e formatação de documentação em Markdown. Disponível em: <https://claude.ai/>. Acesso em: 18 out. 2026.
3. **Google Gemini (Advanced / 1.5 Pro):** Utilizado para suporte à consulta teórica de padrões GoF e comparação com artefatos anteriores da disciplina. Disponível em: <https://gemini.google.com/>. Acesso em: 18 out. 2026.
4. GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. **Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos**. Porto Alegre: Bookman, 2000.
5. LARMAN, Craig. **Utilizando UML e Padrões: Uma Introdução à Análise e ao Projeto Orientados a Objetos e ao Desenvolvimento Iterativo**. 3. ed. Porto Alegre: Bookman, 2005.
6. BRASIL. Ministério da Saúde. **Meu SUS Digital - Aplicativo Oficial e Diretrizes de Identidade Visual**. Disponível em: <https://www.gov.br/saude/pt-br/assuntos/meu-sus-digital>. Acesso em: 18 out. 2026.
7. BRASIL. Governo Federal. **Padrão Digital de Governo (Design System DS-Gov)**. Disponível em: <https://www.gov.br/ds/>. Acesso em: 18 out. 2026.
8. [PREENCHER: Demais fontes e ferramentas consultadas pelos outros integrantes]

---

## Histórico de Versionamento

| Versão | Data | Descrição / Contribuição | Autor(es) | Commit(s) |
| :---: | :---: | :--- | :--- | :--- |
| `0.1` | 06/10/2026 | Início do template do trabalho | [Gustavo Fornaciari](https://github.com/GUGOFO) | [`18b6195`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/18b61958e419b67f95469d4a704ddcb9629b9803) |
| `0.2` | 14/10/2026 | Template mais detalhado de IA Generativa | [Gustavo Fornaciari](https://github.com/GUGOFO) | [`7c66f78`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/7c66f78dc795f080bc43dc01f094e8976462d5b8) |
| `1.0` | 18/10/2026 | Documentação completa do Experimento 01 de IA Generativa por Artur Galdino (análise da interface alucinada versus design system real do Meu SUS Digital, ausência de contexto multimodal, vazamento de abstrações), fundamentação crítica, relato e ponto de vista individual e estruturação de placeholders para os demais integrantes | [Artur Galdino](https://github.com/ArturFGaldino) | [`b7e1a9e`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/b7e1a9e) |
| `2.0` | 18/10/2026 | Documentação do Experimento 02 de IA Generativa por Giovani Coelho (Google Gemini na prototipação visual de exames laboratoriais versus arquitetura real do Factory Method, alucinação de dados clínicos) e ponto de vista da V2 | [Giovani Coelho](https://github.com/Gotc2607) | [`e87e841`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/e87e841) |